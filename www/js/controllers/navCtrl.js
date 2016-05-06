(function () {
    var gpsapp = angular.module('gpstracker.controllers', ['ionic']);

    gpsapp.controller("NavCtrl", ['gpsClient','$scope','$http', NavCtrl]);

    function NavCtrl (gpsClient, $scope, $http, userId) {
        var myLatLng, targetLatLng;
        var map;
        gpsClient.getUserLocation(1,$http).then(function (targetuserdetail) {
            targetLatLng = new google.maps.LatLng(targetuserdetail.data.lat, targetuserdetail.data.lng);

            ionic.Platform.ready(function () {
                navigator.geolocation.getCurrentPosition(function (position) {
                    myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    directionsDisplay = new google.maps.DirectionsRenderer();

                    var mapOptions =
                        {
                            zoom: 9,
                            center: myLatLng,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                        };

                    map = new google.maps.Map(document.getElementById('map'), mapOptions);
                    directionsDisplay.setMap(map);
                    var directionsService = new google.maps.DirectionsService();
                    var request = {
                        origin: myLatLng,
                        destination: targetLatLng,
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });
                    $scope.map = map;
                });
            });
        })
    }

})();