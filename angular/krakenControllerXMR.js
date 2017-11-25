'use strict;'
angular.module('BitstampTickerApp')
    .controller('KrakenTickerControllerXMR', function ($scope, $http) {
        var hourlyApi = "https://www.bitstamp.net/api/ticker_hour/";
        var realTimeApi = "https://www.bitstamp.net/api/v2/ticker/";

        $scope.greeting = "hello";
        $scope.text1 = "sdfdsdsdgsdsggds";
        $scope.addon = 1;

        $scope.tickerInterval = 20;
        $scope.tickerData;
        $scope.date;
        $scope.calculatedData;
        $scope.krakenPriceWithAddon;
        $scope.eurToBtc;

        $scope.setedAddon = 1;
        //var date = new Date(unix_timestamp * 1000);
        $scope.selectedParity = "btcusd";
        myVar = setInterval(getParity,  $scope.tickerInterval * 1000);


        $scope.parities = ["btcusd", "btceur", "eurusd", "xrpusd", "xrpeur", "xrpbtc", "ltcusd", "ltceur", "ltcbtc", "ethusd", "etheur", "ethbtc"];



        getParity();
        function getParity() {
            $scope.date = new Date();
            var request = $http({
                method: "post",
                url: "php/krakenTickerXMR.php",
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

                $scope.krakenPriceWithAddon =  data.result.XXMRZEUR.a[0]*1.07;
                calculateAddonValue( $scope.setedAddon);

            });
        }

        $scope.setAddon = function (val) {
            $scope.setedAddon = val;
            calculateAddonValue(val);
        }

        function calculateAddonValue(dataObject) {
            $scope.eurToBtc = (dataObject/$scope.krakenPriceWithAddon).toFixed(8);

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
 