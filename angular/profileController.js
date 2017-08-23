'use strict;'
angular.module('NewsPaperApp')
.controller('profileController', function($scope, $http,$cookies) {
	$scope.greeting = "hello";
	console.log($cookies.get('language'));
	console.log("profile controller");
	$scope.registered = false;
	$scope.name;
	$scope.email;
	$scope.password;
	$scope.user = $cookies.getObject("user");
	$scope.passWordMatch = false;
	$scope.oldPasswordWrong = false;

	$scope.registerMe = function(){
		console.log($scope.email+" "+$scope.password+" "+$scope.name+" registering user");
		$scope.registered = true;
	}

	$scope.changePassword = function(newPass1, newPass2, oldPass){
		
		if(newPass2 === newPass1){
			if($scope.user.password === oldPass){
				var request = $http({
					method: "post",
					url:   "php/changePassword.php",
					data: {
						email: $scope.user.email,
						newPassword: newPass1
					},
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
				request.success(function (data) {
					console.log(data);

					 
					$scope.user.password=newPass1;			 
					
				});
				console.log("changing password");
			}else{
				$scope.oldPasswordWrong = true;
			}
		}else{
			$scope.passWordMatch = true;
		}
		console.log("changing pass"+newPass2+newPass1+oldPass);
	}
	$scope.clear = function(){
		console.log("clear");
		$scope.passWordMatch = false;
		$scope.oldPasswordWrong = false;
	}
});