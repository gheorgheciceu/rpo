'use strict;'
angular.module('NewsPaperApp')
.controller('registerController', function($scope, $http,$cookies) {
	$scope.greeting = "hello";
	console.log($cookies.get('language'));
	console.log("register controller");
	$scope.registered = false;
	$scope.name;
	$scope.email;
	$scope.password;
	$scope.registerMe = function(){
		console.log($scope.email+" "+$scope.password+" "+$scope.name+" registering user");
		$scope.registered = true;
		var request = $http({
			method: "post",
			url:   "php/register.php",
			data: {
				email: $scope.email,
				pass: $scope.password,
				name: $scope.name
			},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});
		request.success(function (data) {
			console.log("good credentials, have to add user to cookie");
			console.log(data);
			 
		});
	}
});