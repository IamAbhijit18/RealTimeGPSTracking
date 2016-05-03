angular.module('myApp.controllers', ['ionic'])


.controller('NavCtrl', function($scope, $ionicLoading, $compile) {
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

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

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

function calcRoute() {
  var start = "your start latlng here";
  var end = "your destinationl latlng here";
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
*/