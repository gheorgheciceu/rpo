'use strict;'
angular.module('NewsPaperApp')
.controller('adminLoginController', function($scope, $http,$cookies,$translate) {
	$scope.greeting = "hello";


	 

	$scope.logMeIn= function(email, password){
		$scope.email=email;
		$http.get("http://localhost:4567/login/"+email+"/"+password).success(function(data) {
			console.log(data);
			  
			if(data === "true" || data === true){
				console.log("bad credentials");
				$scope.invalidCreds = true;
			}else{
				$cookies.put('roleAdmin',true);
				$cookies.put("adminName",$scope.email);
				location.href = "demoRuby.html";
				console.log("good creds");
			}
		});
	}
});

