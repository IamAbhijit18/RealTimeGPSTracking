var gpsapp = angular.module('gpstracker.controllers', ['ionic']);

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

gpsapp.controller('NavCtrl', function($scope, $ionicLoading, $compile) {
    var myLatLng, targetLatLng;
    var map;
    // userLocations.init()
    //     .then(function (_data) {
    //         console.log(_data.data.deployment_id);
    //         userLocations.all().then(function (_data) {
    //             $scope.userLocationsdata = _data.data;
    //         })
    //     }, function (_error) {
    //         console.log("error");
    //     });
    
    function initializeRoute() {
    navigator.geolocation.getCurrentPosition(function(position) {
        myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        targetLatLng = new google.maps.LatLng(12.978020, 77.572327);
        directionsDisplay = new google.maps.DirectionsRenderer();
        console.log(myLatLng);
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

  ionic.Platform.ready(initializeRoute)
});
// http://stackoverflow.com/questions/29339145/implement-google-map-directions-using-angular-google-map-in-ionic

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