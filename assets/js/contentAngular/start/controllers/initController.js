(function () {
    angular.module('start', ['ngMaterial','ipCookie'])
    
      //.controller('first', ['$scope', '$anchorScroll', function ($scope, $anchorScroll) {
      .controller('first', ['$http','$scope', '$anchorScroll','ipCookie', 'initFactory', 'initConstant', 'ADUserService', 'initJabberChat', function ($http, $scope, $anchorScroll, ipCookie, initFactory, initConstant, ADUserService, initJabberChat) {

        $scope.userNameSession = '';

        angular.element(document).ready(function () {
            initJabberChat.initializeJabberChat();
            $scope.checkJabberLogin();
            $('#name').attr("autocomplete", "off");
        });

        //JabberChat Initialization
        $scope.checkJabberLogin = function(){

            var url = window.location.search.substring(1); //get rid of "?" in querystring
            var qArray = url.split('&'); //get key-value pairs
            for (var i = 0; i < qArray.length; i++) {
                var pArr = qArray[i].split('='); //split key and value
                if (pArr[0] == "uid") {
                    $scope.txtUsuario = pArr[1];
                }else{
                    $scope.txtSystem = pArr[1];
                }
            }

            var iterationCount = 1000;
            var keySize = 128;
            var encryptionKey  ="Abcdefghijklmnop";
            var dataToDecrypt = $scope.txtUsuario;
            var iv = "dc0da04af8fee58593442bf834b30739";
            var salt = "dc0da04af8fee58593442bf834b30739";
            var aesUtil = new AesUtil(keySize, iterationCount);
            var plaintext =  aesUtil.decrypt(salt, iv, encryptionKey, dataToDecrypt);
            var encryptPass =  aesUtil.encrypt(salt, iv, encryptionKey, dataToDecrypt);
            $scope.txtUsuario = plaintext;
            $scope.txtpassword = encryptPass;
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
                var iterationCount = 1000;
                var keySize = 128;
                var encryptionKey  ="Abcdefghijklmnop";
                var dataToDecrypt = $scope.txtUsuario;
                var iv = "dc0da04af8fee58593442bf834b30739";
                var salt = "dc0da04af8fee58593442bf834b30739";
                var aesUtil = new AesUtil(keySize, iterationCount);
                var encryptPass =  aesUtil.encrypt(salt, iv, encryptionKey, dataToDecrypt);
                $('.auth_submit').click(function() {
                    var jabberUsername = $('#username').val();
                    var jabberPassword =  encryptPass;
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
        //Kevin
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


