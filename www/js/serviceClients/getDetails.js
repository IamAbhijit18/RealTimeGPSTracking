var serviceAPIUrl = 'http://localhost:3000/';
(function () {
  var app = angular.module('gpstracker')
  app.factory('gpsClient', ['$http', '$q', gpsClient])
  function gpsClient ($http, $q) {
    function getUsres () {
      var deferred = $q.defer()
      $http.get(serviceAPIUrl + 'getuserlocations')
        .success(function (response) {
          deferred.resolve(response)
        })
      return deferred.promise
    }
    function getPermittedUserdetails (userId) {
      var deferred = $q.defer()
      $http.get(serviceAPIUrl + 'getpermitteduserdetail/' + userId)
        .success(function (response) {
          deferred.resolve(response)
        })
      return deferred.promise
    }
    function getUserLocation (userId) {
      var deferred = $q.defer()
      $http.get(serviceAPIUrl + 'getuserlocations/' + userId)
        .success(function (response) {
          deferred.resolve(response)
        })
      return deferred.promise
    }
    return {
      getUsers: getUsres,
      getPermittedUserdetails: getPermittedUserdetails,
      getUserLocation: getUserLocation
    }
  }
})();
