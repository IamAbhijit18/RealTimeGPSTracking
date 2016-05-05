var gpsapp = angular.module('gpstracker.controllers', ['ionic']);

gpsapp.factory('userLocations', function($http) {
	var users = [];

	return {
		getUsers: function(){
			return $http.get("http://localhost:3000/getuserlocations").then(function(response){
				users = response.data[0];
				return users;
			});
		}
	}
});



gpsapp.controller('LoginHomeCtrl', function($scope, $ionicLoading, $compile) {
  var myLatLng;
  function initialize() {
    
    navigator.geolocation.getCurrentPosition(function(position) {
        myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
          center: myLatLng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Your Pos'
        });

        $scope.map = map;
    });
  } 

  ionic.Platform.ready(initialize)
});

// gpsapp.controller('NavCtrl', function($scope, $ionicLoading, $compile) {
gpsapp.controller('NavCtrl', function($scope, $ionicLoading, $compile, userLocations) {
    var myLatLng, targetLatLng;
    var map;
    userLocations.getUsers().then(function (targetuserdetail) {
        targetLatLng = new google.maps.LatLng(targetuserdetail.lat, targetuserdetail.lng);
        function initializeRoute() {
            navigator.geolocation.getCurrentPosition(function(position) {
                myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                directionsDisplay = new google.maps.DirectionsRenderer();
                
                var mapOptions =
                {
                    zoom: 9,
                    center: myLatLng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                };

                map = new google.maps.Map(document.getElementById('map'), mapOptions);
                $scope.map = map;
                directionsDisplay.setMap(map);
                calcRoute(myLatLng, targetLatLng);
            });
        }

        ionic.Platform.ready(initializeRoute);
    });
    
});















function calcRoute(start, end) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        }
    });
}
