(function () {
    angular.module('gpstracker')

    .controller("userCtrl", ['gpsClient', userCtrl]);

    function userCtrl(gpsClient) {
        var map;
        var vm = this;
        gpsClient.getPermittedUserdetails(1)
            .then(function (data) {
                vm.permittedUsers = data;
            });
    }
})();
