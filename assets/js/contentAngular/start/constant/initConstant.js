(function () {
    angular.module('start')
        .constant('initConstant', {
            REGEX_EMAIL: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/,
            REGEX_PASS: /^[a-zA-Z0-9]{5,12}$/,
            REGEX_TELEFONO: /^[0-9]{8}$/,
            REGEX_NUMEROS: /^\d+$/,
            REGEX_ALPHA: /^[a-zA-Z0-9]+$/,
            REGEX_FECHA: /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/](19|20)\d{2}$/,
            REGEX_MAYUSCULA: /[A-Z]+/,
            CARACTERES_MINIMOS: 5,
            CARACTERES_MAXIMOS: 12,
            REGEX_VALIDAR: /^\d+/,
            EADER_CONTENT_TYPE_TEXT: 'text/plain;charset=UTF-8',
            HEADER_CONTENT_TYPE_JSON: 'application/json',
            HEADER_CONTENT_TYPE_PDF: 'application/pdf',

            // JabberWerx Constants
            FILE_DOWNLOAD_TARGET: '_blank',
            CHAT_BADGE_IS_WRITING_STATE: 'está escribiendo...',
            CHAT_BADGE_LEFT_CONVERSATION_STATE: 'ha salido de la conversación...',

            // View Constants
            CHAT_VIEW_LOADING_LABEL : 'Cargando la conversación...',

            // Utility Constants
            UTL_DEBUG_MODE : 0,

            // LocalStorage Variables
            AD_USER_LIST : 'adusrlst',
            AUTH_JABBER_USERNAME : 'autjwcusr',
            AUTH_JABBER_PASS : 'autjwcps',

            // Others
            LOADING_TIMEOUT : 3000,
            APP_IMAGES_ROUTE : '/images/xmpp.png',
            CHATROOMS_DOMAIN : '@conference-',

            //------------------------------- USER SERVICES and HOST Constants ------------------------------//
            
            //--------- CONSTANTES DE AMBIENTE DATASYS ---------/
            /*
            COMPONENT_SERVER : 'http://172.31.251.15',
            COMPONENT_ROUTE : '/jabber-component',
            //FILE_SERVER_DOMAIN: 'http://localhost',
            FILE_SERVER_DOMAIN: 'http://172.31.251.11',
            SERVER_HOST : 'http://172.31.251.11',
            QUEUE_HOST : 'http://172.31.251.11',
            AD_USER_SERVICE_ROOT_URL : 'http://172.31.251.128:8085',
            JABBER_CLIENT_DOMAIN    : "datasys.la",                             // Specified somain
            JABBER_BINDING_URL      : "http://172.31.251.68:7335/httpbinding",  // BOSH url for the server
            SERVER_PORT_SERVICES: ':8080',
            //SERVER_PORT_FILES: ':8443',
            SERVER_PORT_FILES: ':8080',
            NATIVE_APPLICATION_PROTOCOL: 'http://jabber.org/protocol/httpbind',
            //MESSAGE_RECEIVED_SELECTOR_PREFIX: '#jabberwerx_tabdata_chat\\:',
            //MESSAGE_RECEIVED_SELECTOR_DOMAIN: '\\@datasys\\.la',
            MESSAGE_RECEIVED_SELECTOR_PREFIX: 'jabberwerx_tabdata_chat:',
            MESSAGE_RECEIVED_SELECTOR_DOMAIN: '@datasys.la',
            */
            //--------- CONSTANTES DE AMBIENTE GUATEMALA ---------/
            
            COMPONENT_SERVER : 'http://mp-fsapp01.mp.gob.gt',
            COMPONENT_ROUTE : '',
            FILE_SERVER_DOMAIN: 'http://mp-fsapp01.mp.gob.gt',
            SERVER_HOST: 'http://172.18.142.16',
            //SERVER_HOST: 'http://localhost',
            QUEUE_HOST: 'http://172.18.142.29',
            AD_USER_SERVICE_ROOT_URL : 'http://172.18.142.15:8085',
            JABBER_CLIENT_DOMAIN    : "mpcentral.gob",                          // Specified somain
            JABBER_BINDING_URL      : "http://172.18.142.4:7335/httpbinding",   // BOSH url for the server
            SERVER_PORT_SERVICES: ':8080',
            SERVER_PORT_FILES: ':8080',
            //SERVER_PORT_FILES: ':8443',
            NATIVE_APPLICATION_PROTOCOL: 'jabber:client',
            //MESSAGE_RECEIVED_SELECTOR_PREFIX: '#jabberwerx_tabdata_chat\\:',
            //MESSAGE_RECEIVED_SELECTOR_DOMAIN: '\\@mpcentral\\.gob',
            MESSAGE_RECEIVED_SELECTOR_PREFIX: '#jabberwerx_tabdata_chat:',
            MESSAGE_RECEIVED_SELECTOR_DOMAIN: '@mpcentral.gob',
            


            // URL User Services
            AD_ALL_USER_SERVICE_URL : '/api/UsuarioADObtenerLista',
            AD_USER_SERVICE_BY_NAME_URL : '/api/UsuarioADObtenerPorNombre/kevin.sandi/',
            AD_AUTH_USER_SERVICE_URL : '/api/UsuarioADObtenerPorCredenciales/melvin.fallas/password/',

            // Java Services Constants
            SERVER_PORT: ':8080',
            SERVER_URL_VALIDATE_DOC: '/validateDocument',
            SERVER_URL_SEARCH_DOC: '/getDocument',
            SERVER_URL_VALIDATE_DOC_INACIF: '/validateDocumentInacif',
            SERVER_URL_SEARCH_DOC_INACIF: '/getDocumentInacif',
            SERVER_URL_CONFIG: '/getConfig',
            SERVER_URL_SOLICITUD_CERTIFICACION: '/certification',
            SERVER_URL_CONSULTA_CERTIFICADO: '/certification',
            SERVER_URL_RECUPERAR_SOLICITUD: 'recover',
            SERVER_URL_LOGIN: '/login',
            SERVER_URL_VLOGIN: '/verifyLogin',
            SERVER_URL_CLOGIN: '/checkLogin',
            SERVER_URL_SESSIONMESSAGES: '/GetSessionMessagesServlet',
            SERVER_URL_SESSIONCHATS: '/GetSessionChatsServlet',
            SERVER_URL_SESSIONCHATROOMS: '/GetSessionChatRoomsServlet',
            SERVER_URL_ADMINCHATROOMS: '/GetSessionAdminChatRoomsServlet',
            SERVER_URL_GETLOGIN: '/LoginServlet',
            SERVER_URL_LOGGEDUSER: '/loggedUser',
            SERVER_URL_NOTIFICATION: '/queuemessage'
        });

})();