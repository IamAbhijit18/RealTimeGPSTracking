(function () {
  angular.module('gpstracker')

    .controller('homeCtrl', ['$scope', 'gpsClient', homeCtrl])

  function homeCtrl ($scope, gpsClient) {
    var myLatLng
    navigator.geolocation.getCurrentPosition(function (position) {
      myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      var mapOptions = {
        center: myLatLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      var map = new google.maps.Map(document.getElementById('map'), mapOptions)

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Your Pos'
      })

      map = map
    })
  }
})();
