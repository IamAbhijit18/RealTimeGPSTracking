var dalayerService = ngular.module('gpstracker.services', []);
var dburl = 'mongodb://localhost:27017/testdb';
var dbserverurl = 'mongodb://localhost:27017/';

dalayerService.factory('userLocations', function ($http) {
    // Might use a resource here that returns a JSON array
    var APIKEY = "wdoRx9E5TffPOmIdFA9RhTz4I91mx9vnk4pJuDeybtU";
    var HEADER_VALUES = {"Authorization": "api-key " + APIKEY, "Accept": "application/json"};
    var deploymentId;

    var getCallback = function (data, status, headers, config) {
        console.log(JSON.stringify(data, null, 2));
        return data;
    };
    return {
        init: function () {
            condole.log("ok");
            // get the deployment id
            return $http.get(dburl, { headers: HEADER_VALUES})
                .success(function (_data) {
                    console.log(_data.deployment_id)
                    deploymentId = _data.deployment_id;
                    return deploymentId;
                });
        },
        all: function () {
            var url = "https://beta-api.mongohq.com/mongo/" + deploymentId + "/testdb/collections/userlocations";
            return $http.get(url, { headers: HEADER_VALUES}).success(getCallback);
        },
        get: function (userId) {
            var url = BASE_URL + "/collections/userlocations/" + userId;
            return $http.get(url, { headers: HEADER_VALUES}).success(getCallback);
        }
    };
});