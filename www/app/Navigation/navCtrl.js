;(function () {
  angular.module('gpstracker')

    .controller('NavigationCtrl', ['$stateParams', 'gpsClient', NavigationCtrl])

  function NavigationCtrl ($stateParams, gpsClient) {
    var ctrl = this;
    var myLatLng, targetLatLng
    var map
    gpsClient.getUserLocation($stateParams.targetUserId).then(function (targetuserdetail) {
      if (targetuserdetail) {
        targetLatLng = new google.maps.LatLng(targetuserdetail.lat, targetuserdetail.lng)
        ionic.Platform.ready(function () {
          navigator.geolocation.getCurrentPosition(function (position) {
            myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            directionsDisplay = new google.maps.DirectionsRenderer()

            var mapOptions =
            {
              zoom: 9,
              center: myLatLng,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
            }

            map = new google.maps.Map(document.getElementById('map'), mapOptions)
            directionsDisplay.setMap(map)
            var directionsService = new google.maps.DirectionsService()
            var request = {
              origin: myLatLng,
              destination: targetLatLng,
              travelMode: google.maps.TravelMode.DRIVING
            }
            directionsService.route(request, function (response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response)
              }
            })
            ctrl.map = map
          })
        })
      }
      else {
        ctrl.map = "User location un available";
      }
    })
  }
})()
