'use strict;'
angular.module('NewsPaperApp')
.controller('adminNavController', function($scope, $http,$cookies,$translate) {
	 $scope.loadUsers= function(){
		$http.get("http://localhost:4567/findAllUsers").success(function(data) {
			console.log(data);
			$scope.rubyMessage = data;
		});
	}
	$scope.loadComments= function(){
		$http.get("http://localhost:4567/findAllComments").success(function(data) {
			console.log(data);
			$scope.rubyMessage2 = data;
		});
	 
	}
	$scope.goHome= function(){
		 location.href="index.html";
	 
	}
});