'use strict;'
angular.module('BitstampTickerApp')
    .controller('Bl3pTickerController', function ($scope, $http) {


        $scope.greeting = "hello";
        $scope.text1 = "sdfdsdsdgsdsggds";
        $scope.addon = 1;

        $scope.tickerInterval = 600;
        $scope.tickerData;
        $scope.date;
        $scope.calculatedData;
        $scope.setedAddon = 1;
        //var date = new Date(unix_timestamp * 1000);
        $scope.selectedParity = "btcusd";
        myVar = setInterval(getParity,  $scope.tickerInterval * 1000);


        $scope.parities = ["btcusd"];



        getParity();
        function getParity() {
            var request = $http({
                method: "post",
                url: "php/Bl3pInstantTicker.php",
                data: {
                    parity: $scope.selectedParity
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(function (data) {
                console.log(data);
                console.log(data.timestamp);
                console.log(new Date());
                $scope.tickerData = data;
                calculateAddonValue(data);

                $scope.date = timeConverter(data.timestamp);
            });
        }

        $scope.setAddon = function (val) {
            $scope.setedAddon = val;
            calculateAddonValue($scope.tickerData);
        }

        function calculateAddonValue(dataObject) {
            $scope.calculatedData = Object.create(dataObject);

            $scope.calculatedData.high = $scope.calculatedData.high * $scope.setedAddon;
            $scope.calculatedData.last = $scope.calculatedData.last * $scope.setedAddon;
        }

        function timeConverter(UNIX_timestamp) {
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time;
        }


    });
 