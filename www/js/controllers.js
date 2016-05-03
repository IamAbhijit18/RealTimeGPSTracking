var gpsapp = angular.module('myApp.controllers', ['ionic']);


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
  function initializeRoute() {
    navigator.geolocation.getCurrentPosition(function(position) {
      myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);targetLatLng = new google.maps.LatLng(12.978020, 77.572327);
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
    
    /*
    navigator.geolocation.getCurrentPosition(function(position) {
    
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

    });
    */
    
  } 

  ionic.Platform.ready(initializeRoute)
});
/*
// http://stackoverflow.com/questions/29339145/implement-google-map-directions-using-angular-google-map-in-ionic

<body ng-app="starter">

    <ion-pane>
      <ion-header-bar class="bar-stable">
        <h1 class="title">Ionic Blank Starter</h1>
      </ion-header-bar>
      <ion-content ng-controller="locationController">          
          <div id="googleMap" style="width:100%;height:380px;" name="googleMap"></div>                    
      </ion-content>
    </ion-pane>
  </body>


var exampleApp=angular.module('starter', ['ionic'])

var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    function initialize()
    {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var inticor= new google.maps.LatLng("Your Lat Long here");
        var mapOptions =
                {
                    zoom: 9,
                    center: inticor,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                };

        map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
        directionsDisplay.setMap(map);      
        calcRoute();

    };
google.maps.event.addDomListener(window, 'load', initialize); 


*/



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