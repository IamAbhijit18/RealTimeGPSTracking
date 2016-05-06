var dburl = 'mongodb://localhost:27017/testdb';
var dbserverurl = 'mongodb://localhost:27017/';
(function () {
    var app = angular.module('gpstracker');
    app.factory('gpsClient', [gpsClient]);
    function gpsClient() {
        var users = [];

        return {
            getUsers: function ($http) {
                return $http.get("http://localhost:3000/getuserlocations").then(function (response) {
                    users = response;
                    return users;
                });
            },
            getUserLocation: function (userId, $http) {
                return $http.get("http://localhost:3000/getuserlocations/"+userId).then(function (response) {
                    users = response;
                    return users;
                });
            }
        }
    }
})();
