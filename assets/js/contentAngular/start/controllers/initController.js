(function () {
    angular.module('start', ['ngMaterial','ipCookie'])
    
      .controller('first', ['$http','$scope', '$anchorScroll','ipCookie', 'initFactory', 'initConstant', 'ADUserService', 'initJabberChat', function ($http, $scope, $anchorScroll, ipCookie, initFactory, initConstant, ADUserService, initJabberChat) {
        $scope.userNameSession = '';

        angular.element(document).ready(function () {
            initJabberChat.initializeJabberChat();
            $scope.checkJabberLogin();
            $('#name').attr("autocomplete", "off");
        });
        //JabberChat Initialization
        $scope.checkJabberLogin = function(){
            var url = window.location.search.substring(1);
            var qArray = url.split('&'); //get key-value pairs
            for (var i = 0; i < qArray.length; i++) {
                var pArr = qArray[i].split('='); //split key and value
                if (pArr[0] == "uid") {
                    $scope.txtUsuario = pArr[1];
                } else {
                    if (pArr[0] == "prt") {
                        $scope.parent = pArr[1];
                    } else {
                        $scope.txtSystem = pArr[1];
                    }
                }
            }
            // Modificaciones para multisesión
            PARENT_SERVER = $scope.parent;
            var flag = false;
            $scope.txtUsuario =   $scope.credentials( $scope.txtUsuario, flag=true);
            initJabberChat.setSystemUsername($scope.txtSystem, $scope.txtUsuario);
            initJabberChat.getLoginCredentials(
                $scope.txtSystem, $scope.txtUsuario, $scope.launchAuthenticationProcess, $scope.authenticationProcessFail
            );
        }
        $scope.launchAuthenticationProcess = function(data, status, headers, config) {
            var jabberUsername = data.data.username;
            var jabberPassword = data.data.password;
            if( $scope.isValidCredential(jabberUsername) && $scope.isValidCredential(jabberPassword)) {
                $('#username').val(jabberUsername);
                $('#password').val(jabberPassword);
                $scope.userNameSession = ADUserService.getDisplayNameSession(jabberUsername);
                $scope.saveInLocalSession(initConstant.AUTH_JABBER_USERNAME,jabberUsername);
                $scope.saveInLocalSession(initConstant.AUTH_JABBER_PASS, $scope.txtpassword);
                $(".auth_submit").click();
            } else {
                $( "#initial_container" ).hide();
                $('.auth_submit').click(function() {
                    var jabberUsername = $('#username').val();
                    var jabberPassword =  $scope.credentials( $scope.txtpassword, flag );
                    $scope.saveInLocalSession(initConstant.AUTH_JABBER_USERNAME, jabberUsername);
                    $scope.saveInLocalSession(initConstant.AUTH_JABBER_PASS, jabberPassword);
                    $scope.userNameSession = ADUserService.getDisplayNameSession(jabberUsername);
                });
            }
        }
        $scope.isValidCredential = function(stringValue) {
            return stringValue != undefined && stringValue != '';
        }
        $scope.authenticationProcessFail = function(data, status, headers, config) {
            console.log('logerr');
        }
         $scope.credentials = function(dataToDecrypt,flag){
            var iterationCount = 1000;
            var keySize = 128;
            var encryptionKey  = "Abcdefghijklmnop";
            var iv = "dc0da04af8fee58593442bf834b30739";
            var salt = "dc0da04af8fee58593442bf834b30739";
            var aesUtil = new AesUtil(keySize, iterationCount);
             if(flag){
                var plaintext =  aesUtil.decrypt(salt, iv, encryptionKey, dataToDecrypt);
                return plaintext;
             }else{
                var plaintext =  aesUtil.encrypt(salt, iv, encryptionKey, dataToEncrypt);
                return plaintext;
             }
        }
        $scope.saveInLocalSession = function(clave,data){

            if (typeof(Storage) !== "undefined") {
                    sessionStorage.setItem(clave,data);
            }
        }
        $scope.getFromLocalSession = function(p_itemName,p_object){
            var objectResult = {};
            // Verify LocalStorage
            if (typeof(Storage) !== "undefined") {
                objectResult = JSON.parse(sessionStorage.setItem(p_itemName, JSON.stringify(p_object)));
            } else {
                // LocalStorage not supported
            }
            return objectResult;
        }
    }]);
})()
function registerMultisessionEvents(pFunctionName) {
    var functionObject = {};
    // Envia mensaje al html para cerrar el Iframe
    function CloseIframe() {
        parent.postMessage('Close()', PARENT_SERVER);
    }
    // Recibe el mensaje para restaura la sesion cerrada
    function receiver(event) {
        // Registrar dominio de donde proviene el evento
        if (event.origin == PARENT_SERVER) {
            eval(event.data);
        }
    }
    // Se agrega el escuchador de eventos para el llamado del html
    window.addEventListener('message', receiver, false);
    // Restaura la sesion haciendo click en el login
    function Recharge() {
        $(".auth_submit").trigger('click');
    }
    // Retornar funciones para cierre y recarga del iframe
    functionObject.CloseIframe = CloseIframe;
    functionObject.Recharge = Recharge;
    return functionObject[pFunctionName]();
}