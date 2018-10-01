(function () {

    var app = angular.module('start', ['ipCookie']);
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);
    
})();