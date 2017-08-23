'use strict;'
angular.module('NewsPaperApp')
.controller('loginController', function($scope, $http,$cookies) {
	$scope.greeting = "hello";
	console.log($cookies.get('language'));
	console.log("login controller");


	$scope.email;
	$scope.password;
	$scope.invalidCreds=false;
	$scope.logIn = function(){
		console.log($scope.email+" "+$scope.password+"  loing in user");
		var request = $http({
			method: "post",
			url:   "php/login.php",
			data: {
				email: $scope.email,
				pass: $scope.password
			},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});
		request.success(function (data) {
			 
			 
			if(data.id === undefined ){
				console.log(data);

				$cookies.put("userIsLoggedIn",false);
				$scope.invalidCreds=true;
			}else{
				$cookies.putObject("user",data);
				$cookies.put("userIsLoggedIn",true);
				location.href="index.html";
			}
		});
	}


});