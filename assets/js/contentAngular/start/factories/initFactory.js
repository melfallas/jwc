(function () {
    angular.module('start')
        .factory('initFactory', ['$http', 'initConstant', function ($http, initConstant) {

            var varFactory = {};
            var authorization = "";
            var server = initConstant.SERVER_HOST + initConstant.SERVER_PORT;

            varFactory.setAuthorization = function (id) {
                authorization = id;
            };

            varFactory.getAuthorization = function () {
                return authorization;
            };

            varFactory.actionGetFunction = function (dirr) {
                return $http.get(server + dirr, {
                    headers: {  }
                });
            };

            varFactory.actionGetIntFunction = function (dirr, parameter) {
                return $http.get(server + dirr + "/" + parameter, {
                    headers: {  }
                });
            }

            varFactory.actionGetGetIntFunction = function (dirr, parameter, secoundparameter) {
              return $http.get(server + dirr + "/" + parameter + "/" + secoundparameter, {
                  headers: { }
              });
            }

            varFactory.actionPostFunction = function (dirr, infojson) {
                return $http.post(server + dirr, JSON.stringify(infojson),
                {
                    headers: {
                        'Content-Type': initConstant.HEADER_CONTENT_TYPE_JSON
                    }
                });
            }

            varFactory.actionPutFunction = function (dirr, id, infojson) {
                return $http.put(server + dirr + "/" + id, JSON.stringify(infojson),
                    {
                        headers: {
                            'Content-Type': initConstant.HEADER_CONTENT_TYPE_JSON
                        }
                    });
            }

            varFactory.actionDeleteFunction = function (dirr, parameter) {
                return $http.delete(server + dirr + "/" + parameter, {
                    
                });
            }


            return varFactory;
        }]);

})()