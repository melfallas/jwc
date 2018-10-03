(function () {
    angular.module('start')
        .service('ADUserService', ['$http', 'initConstant', function ($http, initConstant) {
            this.saveUserData = function(roster, tabbedView, loadChatMessagesFunction,
                                                getChatRoomsCached, getAdminChatRooms) {
                var adGetAllUserServiceUrl = initConstant.AD_USER_SERVICE_ROOT_URL + initConstant.AD_ALL_USER_SERVICE_URL;
                if(initConstant.UTL_DEBUG_MODE != 0) {
                    console.log(adGetAllUserServiceUrl);
                }
                $('#system_preparing_dialog').dialog('close');
                $('#userinfo_load_dialog').dialog('open');
                $http({
                    method: "GET",
                    url: adGetAllUserServiceUrl
                }).then(function correcto(response)
                { 
                    var adUserArray = response.data;
                    // Filtrar usuarios duplicados en la respuesta
                    var hash = {};
                    var uniqueUserList = adUserArray.filter(function(current) {
                        var exists = !hash[current.username] || false;
                        hash[current.username] = true;
                        return exists;
                    });
                    // Guardar el resultado en el local storage
                    saveInLocalStorage(initConstant.AD_USER_LIST, uniqueUserList);
                    var count = isNotEmptyArray(uniqueUserList) ? uniqueUserList.length : 0;
                    console.log('c ' + count);
                    // Actualizar nombres de los contactos al terminar de cargar usuarios del AD
                    $('.name-session-container').text(getDisplayNameByUserName($('#username').val()));
                    // Actualizar nombres de los contactos al terminar de cargar usuarios del AD
                    var rosterGroups = roster._groupings;
                    for(var i = 0; i < rosterGroups.length; i++) {
                        var rosterGroupInfo = rosterGroups[i];
                        var rosterContactsList = rosterGroupInfo._itemsMap;
                        for(var j = 0; j < rosterContactsList.length; j++) {
                            var contact = rosterContactsList[j];
                            //console.log('Actualizando contacto: ' + contact.entity.getDisplayName());
                            contact.update();
                        }
                    }
                    getChatRoomsCached(true);
                    getAdminChatRooms(true);
                    // Cerrar dialog del servicio
                    $('#userinfo_load_dialog').dialog('close');
                    // Recargar conversaciones del MessageHistory con el displayName del AD
                    var tabList = tabbedView.getAllTabs();
                    for(var i = 0; i < tabList.length; i++) {
                        var chatView = tabList[i].content;
                        if(chatView._className != 'sample.IntroView') {
                            var messageHistory = chatView._messageListView;
                            var loggedUser = $("#username").val();
                            var sessionUser = (tabList[i].id.split('@')[0]).replace('chat:', '');
                            loadChatMessagesFunction(chatView, chatView._messageListView, loggedUser, sessionUser);
                        }
                    }
                    return response.data;
                },
                function error(response)
                {
                    return '{}';
                });
            };

            this.inicializateComponents = function() {
                autocomplete(document.getElementById('name'));
            };

            this.userDataArray = function(p_username) {
                $http({
                    method: "GET",
                    url: "http://localhost:8080/jabber/getallusers"
                }).then(function correcto(response)
                {
                    saveInLocalStorage(initConstant.AD_USER_LIST, response.data);
                    return response.data;
                },
                function error(response)
                {
                    console.log("Ha fallado la petición. Estado HTTP:"+response);
                    return '{}';
                });
            };

            this.getUserInfoByUsername = function(p_username) {
                var userList = getFromLocalStorage(initConstant.AD_USER_LIST);
                return findUserInfoFromList(p_username, userList);
            };

            this.getDisplayNameByUser = function(p_username) {
                return this.getUserInfoByUsername(p_username).displayname;
            };

            this.getDisplayNameSession = function(p_username) {
                return this.getDisplayNameByUser(p_username);
            }

        }])
        .factory('initJabberChat', ['$http', 'initConstant', 'initFactory', 'ADUserService',  function ($http, initConstant, initFactory, ADUserService) {

            var flagFromAddUser = false;
            var system_preparing_dialog, dialog, contactDeleted, confirmation, form, roster1, chatController, rosterView,
            name = $( "#name" ),
            allFields = $( [] ).add( name ),
            tips = $( ".validateTips" );
            var mucview;
            var tabbedView;
            var chatView;
            var  messageHistory;
            var tabbedMUCView;
            var systemUsername;
            var systemName;
            var chat;
            var msgHtml;
            var bigName;
            var shortName;
            var appendMsg;
            var loadChatRoomsActivated = false;

            // JabberChat Configuration
            var jabber_config = {
                domain: initConstant.JABBER_CLIENT_DOMAIN,
                httpBindingURL: initConstant.JABBER_BINDING_URL,
                ipServices: initConstant.SERVER_HOST + initConstant.SERVER_PORT_SERVICES,
                fileStorageDomain: initConstant.FILE_SERVER_DOMAIN + initConstant.SERVER_PORT_FILES,
                unsecureAllowed: true
            }

            jabberwerx._config.unsecureAllowed = jabber_config.unsecureAllowed;
            jabberwerx._config.httpBindingURL = jabber_config.httpBindingURL;
            jabberwerx.ipServices = jabber_config.ipServices;
            jabberwerx.fileStorageDomain = jabber_config.fileStorageDomain;
            jabberwerx.chatFileInputId = 0;

            // JabberWerx Constants Injection
            jabberwerx.systemUsername = '';
            jabberwerx.FILE_DOWNLOAD_TARGET = initConstant.FILE_DOWNLOAD_TARGET;
            jabberwerx.CHAT_BADGE_IS_WRITING_STATE = initConstant.CHAT_BADGE_IS_WRITING_STATE;
            jabberwerx.CHAT_BADGE_LEFT_CONVERSATION_STATE = initConstant.CHAT_BADGE_LEFT_CONVERSATION_STATE;
            // JabberWerx Functions Injection
            jabberwerx.getEntityDisplayName = getDisplayNameByUserName;
            jabberwerx.closeEmoticonPopup = closeEmoticonPopup;
            jabberwerx.getMessageViewDisplayName = getMessageDisplayName;
            jabberwerx.formatMessageName = formatMessageName;

            // Create an object to hold our tabbed view
            var sample = {};

            //setup up our view
            sample.IntroView = jabberwerx.ui.JWView.extend({
                init: function () {
                    this._super();
                },
                destroy: function () {
                    this._super();
                },

                createDOM: function (doc) {
                    var data = $("<div/>", doc).addClass("jabberwerx intro");

                    $("<h2/>").appendTo(data).
                    text("Bienvenido al chat de Jabber, haz click en un " +
                        "contacto/room para comenzar a hablar").addClass("welcome-title");

                    return data;
                },

                setTabControl: function (tab) {
                    this._super(tab);

                    if (tab) {
                        tab.label("Bienvenido");
                    }
                }
            }, "sample.IntroView");

            sample.IntroView.mixin(jabberwerx.ui.Tabbable);


            var varFactory = {};

            //***** Set Parent System Username *****//
            varFactory.setSystemUsername = function(system, username) {
                systemName = system;
                systemUsername = username;
                //jabberwerx.systemUsername = systemUsername;
            };

            varFactory.getLoginCredentials = function(system, sysUsername, success, error) {
                var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" +
                    initConstant.SERVER_URL_GETLOGIN + "?system=" + system + "&username=" + sysUsername;
                $http.get(urlService, { headers: {'Content-Type': 'application/json'}}).then(success);
            };

            //***** Create controllers and views *****//
            varFactory.initializeJabberChat = function () {

                // Initilize dialog for system preparing operations
                system_preparing_dialog = $('#system_preparing_dialog').dialog({
                    dialogClass: 'spinner-dialog',
                    autoOpen: false,
                    height: 350,
                    width: 350,
                    modal: true,
                    buttons: {
                    },
                    close: function() {
                    }
                });

                // Initilize dialog for user load info
                system_preparing_dialog = $('#userinfo_load_dialog').dialog({
                    dialogClass: 'spinner-dialog',
                    autoOpen: false,
                    height: 350,
                    width: 350,
                    modal: true,
                    buttons: {
                    },
                    close: function() {
                    }
                });

                confirmation = $( "#dialog-confirm" ).dialog({
                  autoOpen: false,
                  resizable: false,
                  height: "auto",
                  width: 400,
                  modal: true,
                  buttons: {
                    "Si": function() {
                      deleteContact();
                    },
                    "No": function() {
                      $( this ).dialog( "close" );
                    }
                  }
                });
                // Initilize dialog for add contact
                dialog = $( "#dialog-form" ).dialog({
                  autoOpen: false,
                  height: 350,
                  width: 350,
                  modal: true,
                  buttons: {
                    "Agregar Contacto": addUser,
                    "Cancelar": function() {
                      $(".validateTips").text('Digite el usuario a agregar');   
                      document.getElementById('add-display-name-label').innerHTML = "";  
                      $('#add-contact-button').css('color', '#333333');
                      dialog.dialog( "close" );
                    }
                  },
                  close: function() {
                    form[ 0 ].reset();
                    allFields.removeClass( "ui-state-error" );
                  }
                });
                form = dialog.find( "form" ).on( "submit", function( event ) {
                  event.preventDefault();
                  addUser();
                });
                //create new client
                client = new jabberwerx.Client('sampleclient');

                /**
                 * Instantiate the client side multi-user chat controller. The
                 * constructor is passed the associated client and registers itself
                 * with the client. The controller is managed by the client.
                 * The MUCController allows us to manage rooms.
                 *
                 * see ../api/symbols/jabberwerx.MUCController.html
                 */
                mucController = new jabberwerx.MUCController(client);


                //creates roster controller
                var roster = client.controllers.roster || new jabberwerx.RosterController(client);

                //creates chat controller
                chat = client.controllers.chat || new jabberwerx.ChatController(client);

                //create authentication view
                var auth = new jabberwerx.ui.AuthenticationView(client, jabber_config.domain);
                auth.allowAtSymbol = jabber_config.atSymbolAllowed;
                auth.render().appendTo("div.my_auth");
                //system_preparing_dialog.dialog('open');
                //$('#system_preparing_dialog').dialog('open');

                //create view of your own presence
                var prsView = new jabberwerx.ui.SelfPresenceView(client);

                prsView.allowUnavailable = true;
                prsView.setStatusChoices("available",prsView.getStatusChoices("available"));
                prsView.setStatusChoices("away",prsView.getStatusChoices("away"));
                prsView.setStatusChoices("unavailable",prsView.getStatusChoices("unavailable"));

                //append to container div for my presence
                $(prsView.render()["0"].children).addClass("form-control");
                prsView.render().appendTo(".my_presence");
                prsView.height()
                prsView.update();

                //create roster view
                rosterView = new jabberwerx.ui.RosterView(client.entitySet, jabberwerx.ui.RosterView.groupmode_expanded);
                rosterView.setDefaultGroupingName("default");
                rosterView.render().prependTo("div.my_roster");
                rosterView.height(380);


                //create tabbed view
                tabbedView = new jabberwerx.ui.TabbedView();
                tabbedView.render().appendTo("div.my_tabs");
                tabbedView.dimensions({
                    width:  520,
                    height: 385
                });
                tabbedView.addTab("introview", new sample.IntroView());

                //create tabbed view
                tabbedMUCView = new jabberwerx.ui.TabbedView();
                tabbedMUCView.render().appendTo("div.my_muc_tabs");
                tabbedMUCView.dimensions({
                    width: 520,
                    height: 385
                });
                tabbedMUCView.addTab("introview", new sample.IntroView());
                $('a[href^="#3a"]').on('click',function(){
                    cancelAlerts(tabbedMUCView);
                   });
                //console.log('----- Sel -----');
                //console.log($('div.my_tabs:not(div.emoticon_input)'));

                // Evento para cancelación de emoticones
                /*
                $('div:not(div.emoticon_input)').on('click', function(evt) {
                    console.log('my_tabs - clicked');
                    $(".emoticon_popup").removeClass("show_popup");
                    $(".emoticon_popup").addClass("hide_popup");
                });
                $('div:not(div.emoticon_input)').on('click', function(evt) {
                    console.log('my_tabs - clicked');
                    $(".emoticon_popup").removeClass("show_popup");
                    $(".emoticon_popup").addClass("hide_popup");
                });
                */
                

                //**** Events Biding ******//

                client.event("messageReceived").bind(function(evt) {
                    try {
                    //console.log("Event messageReceived triggered");
                        var type = $(evt.data._DOM).attr("type");
                        var id = $(evt.data._DOM).attr("id");
                        var children = $(evt.data._DOM).children();
                        var protocol = children[0].namespaceURI;
                        var attrFrom = $(evt.data._DOM).attr("from");
                        //console.log(attrFrom);
                        var from = $(evt.data._DOM).attr("from").split("/")[0];
                        var from2 = from.split("@");
                        var from3 = $(evt.data._DOM).attr("from").split("/")[1];
                        var showNotification = true;
                        var innerHTML = $(evt.data._DOM)[0].innerHTML;
                        var message;
                        for ( var i = 0; i < children.length; i++ ) {
                            if(children[i].tagName == "body"){
                                message = children[i].textContent;
                            }
                        }
                        // Aplicar filtros al mensaje
                        if(message.indexOf('You have been granted membership to this room') != -1) {
                            message = 'Has sido agregado a una nueva sala';
                        }

                        //console.log('PRT: ' + protocol);
                        //if(protocol == "jabber:client" || protocol == "http://jabber.org/protocol/httpbind") {
                        if(protocol == initConstant.NATIVE_APPLICATION_PROTOCOL){
                            var text = children[0].textContent;
                            if(text != "Your chat application does not support downloading this file") {
                                appendMsg = true;
                                var cssClassName = "messageView";
                                var messageObj = new jabberwerx.Message();
                                messageObj._DOM.textContent = children[0].textContent;
                                var msgView = new jabberwerx.ui.MessageView({
                                    content: messageObj._DOM,
                                    displayName: getChatMessageDisplayName(ADUserService.getDisplayNameByUser(from2[0])),
                                    timestamp: new Date(evt.data.timestamp),
                                    cssClassName: cssClassName
                                });
                                msgHtml = msgView.render();

                                // Actualizar chats web en el Receptor del mensaje
                                var receiberTabDataChatId = initConstant.MESSAGE_RECEIVED_SELECTOR_PREFIX + from2[0] + initConstant.MESSAGE_RECEIVED_SELECTOR_DOMAIN;
                                var startIdSelector = '[id^='+ receiberTabDataChatId  + ']';
                               var tapId = receiberTabDataChatId;
                               var getID =  tapId.replace("jabberwerx_tabdata_","");
                               var identity = getID.replace("#chat:","");
                               $.each(tabbedView.getAllTabs(), function () {
                               var getID =  tapId.replace("jabberwerx_tabdata_","");
                                    if (this.id.includes(getID)) {
                                       this.requestAttention();
                                    }else if(this.id.includes(identity)){
                                        this.requestAttention();
                                    }
                                });
                                jQuery.each(tabbedMUCView.getAllTabs(), function () {
                                    var tapId = receiberTabDataChatId;
                                   var getID =  tapId.replace("jabberwerx_tabdata_","");
                                   var findID = $(this.jq[0].innerHTML).text();
                                   if (this.id.includes(getID)) {
                                    this.requestAttention();
                                 }else if(this.id.includes(identity)){
                                     this.requestAttention();
                                 }
                                     });
                                //console.log('TDCId:' + receiberTabDataChatId);
                                startIdSelector = "[id^='jabberwerx_tabdata_chat']";
                                //console.log('select:' + startIdSelector);
                                var receiberTabDataChatElementList = $(startIdSelector);
                                //console.log(receiberTabDataChatElementList);
                                $.each(receiberTabDataChatElementList, function() {
                                    var userChatId = $(this).attr('id').split(":")[1];
                                    var userReceiverId = from2[0] + initConstant.MESSAGE_RECEIVED_SELECTOR_DOMAIN;
                                    if($(this).attr('id').indexOf(userReceiverId) != -1) {
                                        //console.log("rec: " + userReceiverId + " - usu: " + userChatId);
                                        //console.log($(this));
                                        if ($(this).length != 0) {
                                            $(this).find("div.chat_incoming").append(msgHtml);
                                        }
                                    }
                                });
                                
                                /*
                                if (receiberTabDataChatElement.length != 0) {
                                    receiberTabDataChatElement.find("div.chat_incoming").append(msgHtml);
                                }
                                */
                                /*
                                bigName = initConstant.MESSAGE_RECEIVED_SELECTOR_PREFIX + from2[0] + initConstant.MESSAGE_RECEIVED_SELECTOR_DOMAIN + from3;
                                shortName = initConstant.MESSAGE_RECEIVED_SELECTOR_PREFIX + from2[0] + initConstant.MESSAGE_RECEIVED_SELECTOR_DOMAIN;
                                
                                //console.log('BigName:' + bigName);
                                if ($(bigName).length != 0) {
                                    appendMsg = false;
                                    $(bigName).find("div.chat_incoming").append(msgHtml);
                                }

                                //console.log('shortName:' + shortName);
                                if ($(shortName).length != 0) {
                                    $(shortName).find("div.chat_incoming").append(msgHtml);
                                }
                                */

                                setScrollDown();
                                //console.log('pasa');
                                //$("div.chat_incoming").scrollTop($("div.chat_incoming")[0].scrollHeight);
                            }else{
                                SyncFileMessage(from, $.parseHTML(innerHTML)[1].innerHTML,$.parseHTML(innerHTML)[2].innerHTML);
                            }
                        }
                        else {
                            var text = children[0].textContent;
                            // Actualizar url de los archivos en caso de que no cumpla el protocolo
                            if(text == "Your chat application does not support downloading this file") {
                                SyncFileMessage(from, $.parseHTML(innerHTML)[1].innerHTML,$.parseHTML(innerHTML)[2].innerHTML);
                            }
                        }

                        var htmlDOM = $.parseHTML(innerHTML);
                        // ChatRooms file download feature
                        if($(htmlDOM)[1] && $(htmlDOM)[1].nodeName == "ADVANCED-FILE-TRANSFER"){
                            var innerChildren = $($(htmlDOM)[1]).children();
                            jabberwerx.tempTransferedFilename = innerChildren[0].textContent;
                            jabberwerx.tempTransferedFile = innerChildren[2].textContent.split("/")[4];
                        }

                        if($(htmlDOM)[2] && $(htmlDOM)[2].nodeName == "ADVANCED-FILE-TRANSFER"){
                            var innerChildren = $($(htmlDOM)[2]).children();
                            jabberwerx.tempTransferedFilename = innerChildren[0].textContent;
                            jabberwerx.tempTransferedFile = innerChildren[2].textContent.split("/")[4];
                        }

                        // Obtener el sender y aplicar filtros para identificadores numéricos de salas de chat
                        var sender = $(evt.data._DOM).attr("from").split("@")[0];
                        sender = cleanNameRoom(sender);
                        //sender = getDisplayNameByUserName(cleanNameRoom(sender));

                        //Avoid message from file transfer action
                        if(message == "Your chat application does not support downloading this file"){
                            message = sender + " te ha enviado un archivo: " + jabberwerx.tempTransferedFilename;
                        }

                        if(message && message.includes("JabberFileManager")){
                            var fileName = message.split("/")[7];
                            message = sender + " te ha enviado un archivo: " + fileName;
                        }

                        if(type == "groupchat"){
                            showNotification = false;
                        }

                        // Validar si se debe enviar la notificación
                        if(showNotification) {
                            if(message != undefined && sender != undefined) {
                                var senderName = getDisplayNameByUserName(sender);
                                var logoURL = initConstant.COMPONENT_SERVER + initConstant.COMPONENT_ROUTE + initConstant.APP_IMAGES_ROUTE;
                                Push.create(
                                    senderName,                 // Titulo de la notificación
                                    {
                                        body: message,          // Texto del cuerpo del mensaje
                                        icon: logoURL,          // Ruta de la imagen para el logo
                                        timeout: 5000,          // Tiempo de duración de la notificación
                                        /*
                                        onClick: function () {
                                            //this.close();
                                        }
                                        */
                                    }
                                );
                            }

                            /*
                            // Old Notification Code to delete
                            console.log("Sending notification");
                            var urlService = initConstant.QUEUE_HOST + initConstant.SERVER_PORT + "/messageservice" +
                                initConstant.SERVER_URL_NOTIFICATION + "?receiver=" + systemUsername.toLowerCase() + "&sender=" + sender + "&message=" + message;
                            $http.post(urlService, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(function (data, status, headers, config) {
                                if(!$.isEmptyObject(data.data)){
                                    console.log("Notification Sent");
                                }
                            });
                            */
                        }
                    } catch (error) {
                        console.log('MessageReceived Exception:');
                        //console.log(error);
                    }
                });

                /**
                 * Respond to an inviteReceived event, triggered when an
                 * invitation is received. evt.data is a room invite object
                 * with a getInvitor() method that returns the jid of the user
                 * that invited us and a getRoom() method
                 * that returns the room the invitation is to.
                 *
                 * see ../api/symbols/jabberwerx.MUCInvite.html
                 */
                mucController.event("mucInviteReceived").bind(function(evt) {
                    enterRoom(evt.data.getRoom(),$("#username").val());
                    var chatroom = evt.data.getRoom();
                    //Saving opened chat
                    var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" +
                    //initConstant.SERVER_URL_SESSIONCHATROOMS + "?username=" + systemUsername + "&chatroomid=" + chatroom._node + "&chatroom=" + escape(JSON.stringify(chatroom)) + "&action=save"; 
                    initConstant.SERVER_URL_SESSIONCHATROOMS + "?username=" + $("#username").val() + "&chatroomid=" + chatroom._node + "&chatroom=" + escape(JSON.stringify(chatroom)) + "&action=save";
                    $http.post(urlService, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (data, status, headers, config) {
                        if(!$.isEmptyObject(data.data)){
                            console.log("Save chatroom completed");
                        }
                    });

                    // alert(evt.data.getInvitor() + " invited you to chat in room: " + evt.data.getRoom());
                });

                /*Triggered when a client's status changes. The status codes are one of:
                 status_disconnected
                 status_connecting
                 status_connected
                 status_disconnecting
                 take actions to hide/show appropriate controls when client is connected or disconnected*/
                client.event("clientStatusChanged").bind(function (evt) {
                    if (evt.data.next == jabberwerx.Client.status_connected) {
                        $('#system_preparing_dialog').dialog('open');
                        $(".my_auth").hide();
                        $( "#initial_container" ).hide();
                        saveCredentials($("#username").val(), $("#password").val());
                        $(".my_client").show();
                        tabbedView.show();
                        prsView.update();
                        rosterView.update();
                        tabbedView.update();
                        //console.log('-ObtUsr-');
                        $('#system_preparing_dialog').dialog('close');
                        // Llamar servicio de lista de usuarios y cargar solamente si no están en storage
                        if(isUsersListLoadedInStorage(initConstant.AD_USER_LIST)){
                            loadChatRoomsActivated = true;
                        } else {
                            ADUserService.saveUserData(rosterView, tabbedView, loadSessionMessages, getChatRoomsCached, getAdminChatRooms);
                        }
                        //console.log('-FObtUsr-');
                        $('#system_preparing_dialog').dialog('open');
                        restoreSessions();
                        ADUserService.inicializateComponents();
                        //$('#system_preparing_dialog').dialog('close');
                        setTimeout(function() {$('#system_preparing_dialog').dialog('close')}, 10000);
                    } else if (evt.data.next == jabberwerx.Client.status_disconnected) {
                        jQuery.each(tabbedView.getAllTabs(), function () {
                            if (this.id != "introview") {
                                this.destroy();
                            } else {
                                this.activate();
                            }
                        });
                        tabbedView.hide();
                        auth.show();
                        //$(".my_client").hide();
                    }
                });

                //TODO: Kevin, Alerta usuario existente
                var count = 3;
                client.entitySet.event("entityUpdated").bind(function (evt) {
                    var entityAdded = evt.data.getPrimaryPresence();
                    
                    if(flagFromAddUser){
                        if(entityAdded){
                            $(".validateTips").text('Digite el usuario a agregar');
                            flagFromAddUser = false;
                            if(count == 3){
                                 count = 0;
                            }else{
                                var clasecontador = $('.jabberwerx.contact.presence.show');
                                var count1 = clasecontador.size();
                                var encontrado = false;
                                var nombreSession = obtenerUsuario;
                                var correos; 
                                correos = $('a[class=contactlink]');
                                var conta;
                                for(var i = 0; i < correos.length; i ++){
                                    conta = correos[i];
                                    conta.outerHTML;
                                    var novo =   conta.getAttribute("href");
                                    var novo2 = novo.replace('#', '');
                                if(novo2.startsWith(nombreSession)){

                                    if(count == 0){
                                        encontrado = true;
                                        name.addClass( "ui-state-error" );
                                        updateTips( "El usuario " + novo2 + " ya existe.");
                                    }
                                 }

                                 allFields.removeClass( "ui-state-error" );

                                 }
                             }  
                                }else if(entityAdded == null) {

                                        count = 3;
                                        $('#dialog-form').dialog('close');
                                       // updateTips( "El usuario " + novo2 + " ha sido agregado con exito.");
                                        // TODO: Verify Adding one user several times
                                        /*
                                        var contact = evt.data.jid._full;
                                        $( "#name" ).addClass( "ui-state-error" );
                                        updateTips( "El usuario " + evt.data.jid._node + " no es valido.");
                                        count = 0;
                                        flagFromAddUser = false;
                                        var entity = client.entitySet.entity(contact);
                                        entity.remove();
                                        console.log("delete");
                                        */
                                    }
                            }
                    });
                
                rosterView.event("rosterItemDeleted").bind(function (evt) {
                    contactDeleted = evt.data.item.entity.jid._full;
                    roster1 = roster;
                    chatController = evt.data.item.entity.controller.client.controllers.chat;
                    confirmation.dialog( "open" );
                });
                //Triggered when an item  in the roster is selected.
                //opens session with selected contact, the chatSessionOpened handler creates a new tab if no tab is open for the contact
                rosterView.event("rosterItemSelected").bind(function (evt) {
                    // :KEVIN
                    hideRoomTapsChat();
                    //console.log("rosterItemSelected");
                    var item = evt.data.item;
                    var entity = item.entity;
                    if (entity instanceof jabberwerx.Contact) {
                        var id = "chat:" + entity.jid.getBareJIDString();
                        //jabberwerx.ChatController.openSession opens a new session or returns existing session for the passed contact
                        //console.log("id: " + id);
                        $(tabbedView.getAllTabs()).each(function( index ) {
                            $(this).hide();
                        });
//                        $(".tabdata").hide();
                        $("#1a").removeClass("active");
                        $("#2a").addClass("active");
                        var children = $(".nav-pills").children();

                        $(children[0]).removeClass("active");
                        $(children[1]).addClass("active");

                        var session = chat.openSession(entity.jid);//****************** */
                        var tab = tabbedView.getTab(id);
                      // KEVIN
                      var tabs = $(".tab");
                        if (tab) {
                        tab.activate();
                        } else{
                            $.each( tabs, function( key, value) {
                                  var userID = value.jw_view.id;
                                  var getUserID = userID.replace("/sampleclient","");
                            if(id.includes(getUserID)){
                                $('#'+ value.id).trigger('click');
                                }
                                    });
                          }  
                        //jQuery('.nav-pills a[href="#2a"]').tab('show');
                    } else if(entity instanceof jabberwerx.MUCRoom){
                        var id = "room" + entity._guid;

                        $(tabbedMUCView.getAllTabs()).each(function( index ) {
                            $(this).hide();
                        });

                        $("#1a").removeClass("active");
                        $("#3a").addClass("active");
                        var children = $(".nav-pills").children();

                        $(children[0]).removeClass("active");
                        $(children[2]).addClass("active");

                        var session = chat.openSession(entity.jid);
                        var tab = tabbedMUCView.getTab(id);

                        if (tab) {
                            tab.activate();
                        }
                    }else{
                        alert("selected via " + evt.data.type + ": " + evt.data.item.entity);
                        return;
                    }
                    setScrollDown();
                });
                //chatSessionOpened is triggered whenever a chat session is opened
                //check to see if tab for that user already exists, if not add a tab
                chat.event("chatSessionOpened").bind(function (evt) {
                    var session = evt.data.chatSession;
                    var id = "chat:" + session.jid
                    var chat = session.jid._full.split('/')[0];
                    var labelUserName = session.jid._full.split('@')[0];
                    var displayChatName = session.jid._full;
                   if(displayChatName.indexOf(initConstant.CHATROOMS_DOMAIN) == -1){
                    //$('#system_preparing_dialog').dialog('open');
                    //Saving opened chat
                    var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" +
                    //initConstant.SERVER_URL_SESSIONCHATS + "?username=" + systemUsername + "&chat=" + chat + "&action=save"; 
                    initConstant.SERVER_URL_SESSIONCHATS + "?username=" + $("#username").val() + "&chat=" + chat + "&action=save";
                    $http.post(urlService, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (data, status, headers, config) {
                        if(!$.isEmptyObject(data.data)){
                            console.log("Save completed");
                        }
                        //$('#system_preparing_dialog').dialog('close');
                    });
                    var tab = tabbedView.getTab(id);
                    if (!tab) {
                        var chatView = new jabberwerx.ui.ChatView(session);
                        var messageHistory = new jabberwerx.ui.MessageHistory();
                        chatView.render();
                        messageHistory.jq = chatView._messageListView.jq;
                        var loggedUser = $("#username").val();
                        var sessionUser = (session.jid._full.split('/')[0]).split('@')[0];
                        loadSessionMessages(chatView, messageHistory, loggedUser, sessionUser);
                        //loadSessionMessages(chatView, messageHistory, $("#username").val() + "@" + jabber_config.domain,session.jid._full.split('/')[0]);
                        // Get the Tab Label Display Name and Create Tab
                        tab = tabbedView.addTab(id, chatView);
                        var displayName = ADUserService.getDisplayNameByUser(labelUserName);
                        if(displayName) {
                            tab.label(displayName);
                        }
                        if(appendMsg) {
                            $(bigName).find("div.chat_incoming").append(msgHtml);
                            appendMsg = false;
                        }
                    }
              }

                });


                //bind to event that is triggered when a tab is activated
                //set up the remove contact button to remove the currently selected contact
                tabbedView.event("tabActivated").bind(function (evt) {
                    var id = evt.data.id;
                    $("input.remove_contact_btn").
                    unbind("click").
                    attr("disabled", "true").
                    val("Quitar Contacto");


                    var session = evt.data.content.session;
                    if (session) {
                        if (session.getEntity() instanceof jabberwerx.Contact) {
                            //activate the remove contact button, add username (remove everything after the @ in the displayname)
                            $("input.remove_contact_btn").
                            removeAttr("disabled").
                            val("Remove " + session.getEntity().getDisplayName().split('@')[0]).
                            unbind("click").
                            click(function () {
                                //remove the contact
                                session.getEntity().remove();
                                chat.closeSession(session.jid);
                                $("input.remove_contact_btn").
                                unbind("click").
                                attr("disabled", "true").
                                val("Remove Contact");
                                tabbedView.removeTab(id);
                            });

                        }
                    }
                });


                //******************define click handler for add contact button *********************************

                //when add input button is clicked add contact to roster
                $("input.add_contact_btn").click(function () {
                    roster1 = roster;
                    dialog.dialog( "open" );
                });


                //hide the chat window initially
                $("div.my_client").hide();

            };
            
            $(".searchInput").keyup(function(){
                filterContact();
            });
            
            $(".searchInputChats").keyup(function(){
                filterChats();
            });
            
            $(".searchInputGroups").keyup(function(){
                filterGroups();
            });
            
            function filterGroups(){
                var input, filter, divContainer, groups, a, i;
                input = document.getElementById("myInputGroups");
                filter = input.value.toUpperCase();
                divContainer = document.getElementsByClassName("jabberwerx tabpane");
                groups = divContainer["1"].childNodes["0"].childNodes;
                for (i = 0; i < groups.length; i++) {
                    a = groups[i].getElementsByTagName("a")[0];
                    if (a.textContent.toUpperCase().indexOf(filter) != -1) {
                        $(groups[i]).attr("style", "display: ");
                    } else {
                        $(groups[i]).attr("style", "display: none !important");

                    }
                }
            }
            
            function filterChats(){
                var input, filter, divContainer, chats, a, i;
                input = document.getElementById("myInputChats");
                filter = input.value.toUpperCase();
                divContainer = document.getElementsByClassName("jabberwerx tabpane");
                chats = divContainer["0"].childNodes["0"].childNodes;
                for (i = 0; i < chats.length; i++) {
                    a = chats[i].getElementsByTagName("a")[0];
                    if (a.textContent.toUpperCase().indexOf(filter) != -1) {
                        $(chats[i]).attr("style", "display: ");
                    } else {
                        $(chats[i]).attr("style", "display: none !important");

                    }
                }
            }
            
            function filterContact(){
                var input, filter, divContainer, contact, a, i, e;
                input = document.getElementById("myInput");
                filter = input.value.toUpperCase();
                divContainer = document.getElementsByClassName("group items");
                for(e = 0; e < divContainer.length; e++){
                    contact = divContainer[e].childNodes;
                    for (i = 0; i < contact.length; i++) {
                        a = contact[i].getElementsByTagName("a")[0];
                        if (a.textContent.toUpperCase().indexOf(filter) != -1) {
                            $(contact[i]).attr("style", "display: ");
                        } else {
                            $(contact[i]).attr("style", "display: none !important");
                        }
                    }
                }
            }

            function getChatRoomsCached(loadRoomsActive) {
                if(loadRoomsActive) {
                    //var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" + initConstant.SERVER_URL_SESSIONCHATROOMS + "?username=" + systemUsername; 
                    var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" + initConstant.SERVER_URL_SESSIONCHATROOMS + "?username=" + $("#username").val();
                    $http.get(urlService, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (data, status, headers, config) {
                        var datos = data.data;
                        datos.forEach( function(chatroom) {
                            enterRoom(JSON.parse(chatroom.chatroom), $("#username").val());
                        });
                    });
                }
            }

            function getAdminChatRooms(loadRoomsActive){
                if(loadRoomsActive) {
                    //var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" + initConstant.SERVER_URL_ADMINCHATROOMS + "?username=" + systemUsername +"@"+ initConstant.JABBER_CLIENT_DOMAIN; 
                    var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" + initConstant.SERVER_URL_ADMINCHATROOMS + "?username=" + $("#username").val() +"@"+ initConstant.JABBER_CLIENT_DOMAIN;
                    $http.get(urlService, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (data, status, headers, config) {
                        var datos = data.data;
                        datos.forEach( function(chatroom) {
                            var chatRoomName = { _full : chatroom.chatroom};
                            enterRoom(chatRoomName, $("#username").val());
                        });
                    });
                }
            }

            function getSessionChats(){
                //var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" + initConstant.SERVER_URL_SESSIONCHATS + "?username=" + systemUsername; 
                var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" + initConstant.SERVER_URL_SESSIONCHATS + "?username=" + $("#username").val();
                $http.get(urlService, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (data, status, headers, config) {
                    var datos = data.data;
                    datos.forEach( function(obj){
                        var session = chat.getSession(obj.chat);
                        if (!session) {
                            session = chat.openSession(obj.chat);
                        }
                    });
                });
            }

            //Restore previous state
            function restoreSessions() {
                console.log("Restoring sessions");
                getChatRoomsCached(loadChatRoomsActivated);
                getAdminChatRooms(loadChatRoomsActivated);
                getSessionChats();
            }


            
             function updateTips( t ) {
               tips
                 .text( t )
                 .addClass( "ui-state-highlight" );
               setTimeout(function() {
                 tips.removeClass( "ui-state-highlight", 1500 );
               }, 500 );
             }

             function checkLength( o, n) {
               if ( o.val().length == 0) {
                 o.addClass( "ui-state-error" );
                 updateTips( "El valor de " + n + " no es valido.");
                 return false;
               } else {
                 return true;
               }
             }

             function deleteContact() {
               var contact = contactDeleted;
               var entity = client.entitySet.entity(contact);
               try {
                   var id = "chat:" + contact;
                   var tab = tabbedView.getTab(id);
                    if (tab) {
                        tab = tabbedView.removeTab(id);
                    }
                   var i;
                   for(i = 0; i< chatController._chatSessions.length; i++){
                       if(chatController._chatSessions[i].jid._full == contact){
                           chatController.closeSession(chatController._chatSessions[i]);
                       }
                   }
                   //entity.remove();
                   roster1.deleteContact(entity.jid);
               } catch (e) {
                   console.log(e);
               }

              confirmation.dialog( "close" );
              return true;
            }
            var obtenerUsuario;
            function addUser() {
                var valid = true;
                allFields.removeClass( "ui-state-error" );
                
                valid = valid && checkLength( name, "Jabber id");
                var user = name.val();
                var toloweUser = user.toLowerCase();
                user = toloweUser;
                obtenerUsuario = user;
                if (valid) {
                    
                    var contact = user + "@" + jabber_config.domain;
                    var entity = client.entitySet.entity(contact);
                    try {
                        flagFromAddUser = true;
                        var username = contact.split('@')[0];
                        var isValidUser = isValidADUser(username);
                        if(isValidUser) { // WARNING: Esta línea restringe la agregación de usuarios locales
                        //if(true) {
                            var displayName = ADUserService.getDisplayNameByUser(username);
                            roster1.addContact(contact, displayName, 'Contacts');
                            document.getElementById('add-display-name-label').innerHTML = ""; 
                           // $('#dialog-form').dialog('close');
                        } else {
                            name.addClass( "ui-state-error" );
                            updateTips( "El usuario " + user + " no es valido.");
                            document.getElementById('add-display-name-label').innerHTML = ""; 
                            valid = false;
                        }
                        
                    } catch (e) {
                        name.addClass( "ui-state-error" );
                        updateTips( "El usuario " + user + " no es valido.");
                        document.getElementById('add-display-name-label').innerHTML = ""; 
                        return false;
                    }
                }
                return valid;
            }

            function loadSessionMessages(chatView, messageHistory, loggedUser, session) {
                chatView._messageListView.jq.find("div.chat_incoming").html(
                    '<div class="chat_view_loading align-middle" >' 
                        + '<div class="chatview-spinner-container" style="height: 100%;">'
                            + '&nbsp;<img src="images/simple-loading.gif" alt="Cargando..." class="center-block" '
                            + 'style="vertical-align:middle; margin-top: 20%;" />'
                        + '</div>'
                        + '<div class="chatview-spinner-text" >'
                        + initConstant.CHAT_VIEW_LOADING_LABEL
                        + '</div>' +
                    '</div>'
                );
                var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" + initConstant.SERVER_URL_SESSIONMESSAGES + "?session=" + session + "/" + loggedUser;
                $http.get(urlService, {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }).then(function (data, status, headers, config) {
                    chatView._messageListView.jq.find("div.chat_incoming").html('');
                    var datos = data.data;
                        datos.forEach( function(singleMessage){
                            var cssClassName = "messageView";
                            var message = new jabberwerx.Message();
                            if(singleMessage.content != "Your chat application does not support downloading this file") {
                                if (singleMessage.content.includes("JabberFileManager")) {
                                    var body = singleMessage.content.replace("GetFile", "UploadDownloadFileServlet");
                                    var filename = singleMessage.content.split("/");
                                    message._DOM.textContent = "<img src='images/download-icon.png' alt='Download File' height='16' width='16'>&nbsp<a href='" + body + "' target='" + initConstant.FILE_DOWNLOAD_TARGET + "'>" + filename[filename.length - 1] + "</a>"
                                } 
                                else if(singleMessage.content.includes("/files/")){
                                    var encryptfilename = singleMessage.content.substring(singleMessage.content.indexOf("/files/")+7).replace("</url>","");
                                    var filename = singleMessage.content.substring(0,singleMessage.content.indexOf("</filename>")).replace("<filename>","")
                                    var body = initConstant.FILE_SERVER_DOMAIN + initConstant.SERVER_PORT_FILES + "/JabberFileManager/UploadDownloadFileServlet?filename=" + encryptfilename; 
                                    message._DOM.textContent = "<img src='images/download-icon.png' alt='Download File' height='16' width='16'>&nbsp<a href='" + body + "' target='" + initConstant.FILE_DOWNLOAD_TARGET + "'>" + filename + "</a>"
                                }
                                else {
                                    message._DOM.textContent = singleMessage.content;
                                }
                                var fullDisplayName = ADUserService.getDisplayNameByUser(singleMessage.displayName);
                                var msgView = new jabberwerx.ui.MessageView({
                                    content: message._DOM,
                                    displayName: fullDisplayName,
                                    timestamp: new Date(singleMessage.timestamp),
                                    cssClassName: cssClassName
                                });
                                var msgViewHtml = msgView.render();
                                chatView._messageListView.event("historyMessageAppended").trigger(msgViewHtml);
                                chatView._messageListView.jq.find("div.chat_incoming").append(msgViewHtml);
                            }
                        });
                        messageHistory._scrollToBottom();
                    });
            }

            function SyncFileMessage(from, threadId,filetransfer){
                var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" + initConstant.SERVER_URL_SESSIONMESSAGES + "?messageInfo=" + from + "/" + client.connectedUser.jid._full + "/" + threadId + "/" + filetransfer;
                $http.post(urlService, {
                    headers: {
                    'Content-Type': 'text/plain'
                    }
                }).then(function (data, status, headers, config) {
                        var datos = data.data;
                        console.log(datos);
                    });

            }

            function saveCredentials(username, password){
               encodeURIComponent(username,password);
                console.log("saveCredentials");
                var uri = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" +
                    initConstant.SERVER_URL_GETLOGIN + "?system=" + systemName + "&username=" + systemUsername + "&jusername=" + username + "&jpassword=" + password;
                    urlService = encodeURI(uri); 
                $http.post(urlService, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (data, status, headers, config) {
                    if(!$.isEmptyObject(data.data)){
                        console.log("Save completed");
                    }
                });
            }

            /**
             * Callback fired upon failed entry into the room. Note no room
             * events are fired if this callback is invoked.
             *
             * Cleanup the room object and clear our local reference.
             */
            function onRoomEnterError(err, aborted) {
                //alert('Error entering room: ' + err.message);
                room.destroy();
            }

            /**
             * Called when the "Exit Room" button is pressed.
             * Simply exists the room.
             *
             * see ../api/symbols/jabberwerx.MUCRoom.html#exit
             */
            function exitRoom() {
                console.log("Exit Room");
                room.exit();
            }

            // Called when the "Enter Room" button is pressed
            function enterRoom(chatRoomName, nickname) {
                // if the client has not been created or we are not yet fully connected...
                if(client == null || !client.isConnected()) {
                    alert("The client is not connected.  Please connect first.");
                    return;
                }
                //create the room using the user supplied room name
                //see ../api/symbols/jabberwerx.MUCController.html#room
                var newroom = mucController.room(chatRoomName._full);

                // Respond to an event that is triggered when an occupant is added to the room
                newroom.occupants.event("entityCreated").bind(function(evt) {
                    //console.log("To be implemented");
                });

                // Respond to an event that is triggered when an occupant is updated in the room
                newroom.occupants.event("entityUpdated").bind(function(evt) {
                    //console.log("To be implemented");
                });

                // Respond to an event that is triggered when an occupant is removed from the room
                newroom.occupants.event("entityDestroyed").bind(function(evt) {
                    //console.log("To be implemented");
                });

                // Respond to an event that is triggered when an occupant in the room is renamed
                newroom.occupants.event("entityRenamed").bind(function(evt) {
                    //console.log("To be implemented");
                });

                /**
                 * Event fired when the room has been entered completely. This
                 * event handler maps other event handlers that are valid only
                 * when a room has been entered.
                 */
                newroom.event("roomEntered").bind(function(evt) {
                    /**
                     * event fired when we have fully exited a room.
                     * Destroy the room and clear our local reference.
                     *
                     * see ../api/symbols/jabberwerx.MUCRoom.html#destroy
                     */
                    newroom.event("roomExited").bind(function(evt) {
                        console.log("roomExited");
                        newroom.destroy();
                        newroom = null;
                        /*
                        // Deleting opened chat
                        var urlService = initConstant.SERVER_HOST + initConstant.SERVER_PORT + "/JabberFileManager" +
                        initConstant.SERVER_URL_SESSIONCHATROOMS + "?username=" + nickname  + "&chatroomid=" + chatRoomName._node + "&chatroom=" + escape(JSON.stringify(chatRoomName)) + "&action=delete"; 
                        //initConstant.SERVER_URL_SESSIONCHATROOMS + "?username=" + nickname + "&chatroomid=" + chatRoomName._node + "&chatroom=" + escape(JSON.stringify(chatRoomName)) + "&action=delete";
                        $http.post(urlService, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(function (data, status, headers, config) {
                            if(!$.isEmptyObject(data.data)) {
                                console.log("Deleted chatroom completed");
                            }
                        });
                        */
                    });
                    
                    /**
                     * event fired when the room receives a message. evt.data
                     * is the jabberwerx.Message received.
                     *
                     * ../api/symbols/jabberwerx.Message.html#getBody
                     */

                    newroom.event("beforeRoomBroadcastSent").bind(function(evt) {
                        console.log("beforeRoomBroadcastSent");
                    });
                
                    //
                    newroom.event("roomBroadcastReceived").bind(function(evt) {
                        if(mucview == undefined ){
                            mucview = new jabberwerx.ui.MucView(newroom);
                            mucview.render();
                        }else if(mucview._MucRoom != newroom){
                            mucview = new jabberwerx.ui.MucView(newroom);
                            mucview.render();
                        }
                        var tab = tabbedMUCView.getTab("room" + evt.source._guid);
                        if (!tab) {
                            tab = tabbedMUCView.addTab("room" + evt.source._guid, mucview);
                        }
                        if(mucview){
                            mucview.update();
                        }
                    });

                    /**
                     * event fired when the room receives a new subject.
                     * evt.data is the jabberwerx.Message whose subject is the
                     * new room subject.
                     *
                     * see ../api/symbols/jabberwerx.Message.html#getSubject
                     */
                    newroom.event("roomSubjectChanged").bind(function(evt) {
                        $("#subjectLabel").html(evt.data.getSubject());
                    });

                    /**
                     * The room's subject is one opf its properties and is
                     * available via room.properties.subject.
                     */
                    //$('#subjectLabel').html(room.properties.subject);
                });

                /**
                 * jabberwerx.MUCRoom.enter takes the nickname we want to
                 * enter the room with and an addition argument object that
                 * may define callbacks fired when the asynchronous function
                 * completes. Since we have an event handler bound to the
                 * roomEntered event all we need is an error callback in case
                 * the server did not allow the room's creation.
                 *
                 * enter may also throw exaceptions for invalid arguments or
                 * bad state so it should be wrapped in a try-catch.
                 *
                 * see ../api/symbols/jabberwerx.MUCRoom.html#enter
                 */
                var enterRoomArgs = { errorCallback: onRoomEnterError };

                try {
                    newroom.enter(nickname, enterRoomArgs);
                } catch(ex) {
                    console.log('EnterRoomError: ' + ex.message);
                    //alert("The following error occurred while attempting to enter the room: " + ex.message);
                }
            }

            return varFactory;
        }]);

})()


function isValidADUser(p_username) {
    var isValid = false;
    var userList = getFromLocalStorage("adusrlst")
        .filter(userObjet => userObjet.username == p_username);
    isValid = isNotEmptyArray(userList);
    return isValid;
}

function getMessageDisplayName(p_username) {
    return formatMessageName(findUserInfoFromList(p_username, getADAllUserInfoList()).displayname);
}

function formatMessageName(pName) {
    var WORD_SIZE = 15;
    var nameTokens = pName.split(' ');
    var messageName = (nameTokens.length <= 1 ? nameTokens[0] : nameTokens[0] + ' ' + nameTokens[1]);
    if (messageName.length > WORD_SIZE) {
        messageName = messageName.substring(0, WORD_SIZE) + '';
    }
    return messageName;
}

function getDisplayNameByUserName(p_username) {
    return findUserInfoFromList(p_username, getADAllUserInfoList()).displayname;
}

function findUserInfoFromList(p_username, p_userArray) {
    var objectResult = {};
    if (p_userArray != null && typeof p_userArray !== 'undefined' && p_userArray.length > 0) {
        objectResult = p_userArray.find(x => x.username.toLowerCase() == p_username.toLowerCase());
        if(objectResult == undefined || objectResult == null || !objectResult.displayname ) {
            objectResult = createDefaultUserInfo(p_username);
        }
    }
    else {
        objectResult = createDefaultUserInfo(p_username);
    }
    return objectResult;
}

function createDefaultUserInfo(p_username) {
    return {
        //displayname : p_username + '@',
        displayname : p_username,
        username : p_username,
        firstname  : p_username,
        lastName : '',
        middlename : ''
    };
}


function isUsersListLoadedInStorage(p_itemName) {
    //return !(localStorage.getItem(p_itemName) === null);
    return !(sessionStorage.getItem(p_itemName) === null);
}


function saveInLocalStorage(p_itemName, p_object) {
    // Verificar storage
    if (typeof(Storage) !== "undefined") {
        // Guardar sólo si no existe el storage
        if(!isUsersListLoadedInStorage(p_itemName)) {
            //localStorage.setItem(p_itemName, JSON.stringify(p_object));
            sessionStorage.setItem(p_itemName, JSON.stringify(p_object));
        }
    } else {
        // Storage not supported
        console.log('Not supported storage');
    }
}

function getFromLocalStorage(p_itemName) {
    var objectResult = {};
    // Verify LocalStorage
    if (typeof(Storage) !== "undefined") {
        //objectResult = JSON.parse(localStorage.getItem(p_itemName));
        objectResult = JSON.parse(sessionStorage.getItem(p_itemName));
    } else {
        // LocalStorage not supported
        console.log('Not supported storage');
    }
    return objectResult;
}


function getJabberUserInfo($http, p_username) {
      $http({
        method: "GET",
        url: "http://localhost:8080/jabber/getallusers"
     }).then(function correcto(response)
     {
        console.log(response.data);
        var found = response.data.userList.find(x => x.username === p_username);
        console.log(found.displayName);
         //$scope.gatos=respuesta.data;
     },
     function error(response)
     {
        console.log("Ha fallado la petición. Estado HTTP:"+response);
     });
    var result = {id:1, username : username, display_name : this.responseText}
    return result;
}

function getUserInfo(username) {
    var result = {id:1, username : username, display_name : "Particular"}
    return result;
}

function getUserNameList(p_userNameSearch) {
    var matchPatterm = new RegExp('^' + p_userNameSearch);
    var userList = getFromLocalStorage("adusrlst")
        .filter(userObjet => matchPatterm.test(userObjet.username));
    if(userList == null || userList == undefined) {
        userList = new Array();
    }
    else {
        if(Array.isArray(userList)) {
            userList = userList.map(userObject => userObject.username);
        }
        else {
            userList = [userList];
        }
    }
    if(0 != 0) {
        var count = isNotEmptyArray(userList) ? userList.length : 0;
        console.log('l ' + count);
    }
    return userList;
}

function getUsernameFilter() {
    var usernameText = username = document.getElementById('name').value;
    var usernameList = usernameText.length > 3 ? getUserNameList(usernameText) : new Array();
    var options = '';
    for(var i = 0; i < usernameList.length; i++) {
        options += '<option value="' + usernameList[i] + '" />';
    }
    document.getElementById('datalist').innerHTML = options;
}

function isNotEmptyArray(p_array) {
    return Array.isArray(p_array) && p_array != null && typeof p_array !== 'undefined' && p_array.length > 0
}

function getADAllUserInfoList() {
    var userList = getFromLocalStorage("adusrlst");
    if(userList == null || userList == undefined) {
        userList = new Array();
    }
    else {
        if(!Array.isArray(userList)) {
            userList = [userList];
        }
    }
    if(0 != 0) {
        var count = isNotEmptyArray(userList) ? userList.length : 0;
        console.log('a ' + count);
    }
    return userList;
}

function getADUserInfoListByDisplayName(p_displayNameSearch) {
    var userList = getFromLocalStorage("adusrlst")
        .filter(userObject => (userObject.displayname ? userObject.displayname : '').toLowerCase()
            .indexOf(p_displayNameSearch.toLowerCase()) != -1
        );
    var count = isNotEmptyArray(userList) ? userList.length : 0;
    // Condición para búsqueda cuando se digita el primer caracter
    /*
    if(count == 0) {
        var matchPatterm = new RegExp('^' + p_displayNameSearch);
        var userList = getFromLocalStorage("adusrlst")
            .filter(userObjet => !matchPatterm.test(userObjet.displayname));
    }
    */
    // Validate null or undefinet list
    if(userList == null || userList == undefined) {
        userList = new Array();
    }
    else {
        if(!Array.isArray(userList)) {
            userList = [userList];
        }
    }
    // Debug
    if(0 != 0) {
        count = isNotEmptyArray(userList) ? userList.length : 0;
        console.log('f ' + count);
    }
    return userList;
}

function getADUserList(p_userNameSearch) {
    var userList = getFromLocalStorage("adusrlst");
    if(userList == null || userList == undefined) {
        userList = new Array();
    }
    else {
        if(Array.isArray(userList)) {
            userList = userList.map(userObject => userObject.username);
        }
        else {
            userList = [userList];
        }
    }
    if(0 != 0) {
        var count = isNotEmptyArray(userList) ? userList.length : 0;
        console.log('l ' + count);
    }
    return userList;
}

function setScrollDown(){

    var chatBox = $("div.chat_incoming");
    $.each(chatBox, function( index, chatItem ) {
        if(chatItem.scrollHeight != 0) {
            //console.log( index + " ::: " + chatItem.scrollHeight );
            //this.scrollTop(chatItem.scrollHeight);
           return $("div.chat_incoming").scrollTop(chatItem.scrollHeight);
        }
    });
}

function getUserNameSession() {
    return document.getElementById("username").value;
}

function getChatMessageDisplayName(username) {
    var chatMessageDisplayName = username;
    if (chatMessageDisplayName.length > 12) {
        chatMessageDisplayName = chatMessageDisplayName.substring(0, 12) + '...';
    }
    return chatMessageDisplayName;
}

// KEVIN
function cancelAlerts(tabView){
    $.each(tabView.getAllTabs(), function () {
     this.cancelAttention();
         });
}
function hideRoomTapsChat() {
    var userName = document.getElementById("username").value;
    var user = userName.replace(".", "");
        $("div[id*='undefined']").hide();
        $("div[id*='mucroom']").hide();
        $("div[id*=" + user + "]").hide();
}
function showRoomTaps() {
        $("div[id*='undefined']").show();
        $("div[id*='mucroom']").show();
}

function closeEmoticonPopup() {
    //console.log('chat_input - clicked');
    $(".emoticon_popup").removeClass("show_popup");
    $(".emoticon_popup").addClass("hide_popup");
}

// Función que elimina identificador numérico de los nombres de salas de chat
function cleanNameRoom(roomName) {
    return (roomName == undefined ? roomName : roomName.replace(/[0-9]{3,50}$/i, ""));
}

function autocomplete(inp) {
    /*the autocomplete function takes two arguments,
    the text field element and an listArrayay of possible autocompleted values:*/
    var currentFocus;
    var itemList = getADAllUserInfoList();
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i;
        var val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val || val.length <= 2) { return false;}
        currentFocus = -1;
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        // Append the DIV element as a child of the autocomplete container:
        this.parentNode.appendChild(a);
        for (i = 0; i < itemList.length; i++) {
            var userItem = itemList[i].displayname ? itemList[i].displayname : '';
            var username = itemList[i].username ? itemList[i].username : '';
          var itemText = userItem.toUpperCase();
          var searchText = val.toUpperCase();
          var coincidencePosition = itemText.indexOf(searchText);
          // Verify word coincidence
          if (coincidencePosition != -1) {
            b = document.createElement("div");
            var coincidencePrefix = userItem.substr(0, coincidencePosition);
            var coincidenceWord = userItem.substr(coincidencePosition, val.length);
            var coincidenceSufix = userItem.substr(coincidencePosition + val.length, itemText.length);
            b.innerHTML = coincidencePrefix
                + '<strong class="autocomplete-text-concidence" >' 
                + coincidenceWord + '</strong>' + coincidenceSufix;
            b.innerHTML += "<input type='hidden' value='" + username + "'>";
            b.addEventListener("click", function(e) {
                //$('#add-display-name-label').text('valor');
                var userSelected = this.getElementsByTagName('input')[0].value;
                document.getElementById('add-display-name-label').innerHTML = getDisplayNameByUserName(userSelected);
                inp.value = userSelected;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });

    // Execute a function presses a key on the keyboard:
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) { // Key DOWN
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { // Key UP
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });

    inp.addEventListener("keyup", function(e) {
        $('#name').removeClass( "ui-state-error" );
        $(".validateTips").text('Digite el usuario a agregar');
        itemList = getADUserInfoListByDisplayName($('#name').val());
    });

    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    // Close all autocomplete lists in the document, except the one passed as an argument:
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    
    // Execute a function when someone clicks in the document:
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}



