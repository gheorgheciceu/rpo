'use strict;'
angular.module('NewsPaperApp')
.controller('rubyTest', function($scope, $http,$cookies,$translate,StatisticsService) {
	$scope.greeting = "hello";
	var admin = $cookies.get("roleAdmin");
	$scope.userEmail= $cookies.get("adminName");
	console.log(admin);
	if(admin === true || admin==='true'){

	}else{
		location.href="index.html";
	}

	$scope.logOut = function(){
		$cookies.remove("adminName");
		$cookies.remove("roleAdmin");
		location.href="index.html";
	}

	$scope.loadedUsers=false;
	$scope.loadedComments=false;

	$scope.loadUsers= function(){
		$http.get("http://localhost:4567/findAllUsers").success(function(data) {
			console.log(data);
			$scope.users = data;
			$scope.loadedUsers = true;
			$scope.loadedComments=false;
			$scope.loadedStatistics=false;
		});

	}
	$scope.loadComments= function(){
		$http.get("http://localhost:4567/findAllComments").success(function(data) {
			console.log(data);
			$scope.comments = data;
			$scope.loadedUsers = false;
			$scope.loadedComments=true;
			$scope.loadedStatistics=false;
		});

	}
	$scope.loadStatistics= function(){

		 
			 //$scope.demoChart = StatisticsService.commentsMonth()
			 $scope.demoChart=StatisticsService.commentsPerNews();
			 $scope.npm=StatisticsService.commentsPerMonth();
			 $scope.statisticsDemo=StatisticsService.demoFunction();
			 $scope.loadedUsers = false;
			 $scope.loadedComments=false;
			 $scope.loadedStatistics=true;


			}
			$scope.goHome= function(){
				location.href="index.html";

			}

			$scope.deleteUser= function(usrId){
				$http.get("http://localhost:4567/deleteUser/"+usrId).success(function(data) {});
		//reloadUsers();
		findAndRemove($scope.users,'id',usrId);
		console.log("deleting usr "+usrId);
	}

	$scope.deleteComment= function(usrId){
		$scope.comments
		$http.get("http://localhost:4567/deleteComment/"+usrId).success(function(data) {});
		console.log("deleting comm "+usrId);
		findAndRemove($scope.comments,'id',usrId);
	}

	function reloadUsers(){
		$http.get("http://localhost:4567/findAllUsers").success(function(data) {
			console.log(data);
			$scope.users = data;
			$scope.loadedUsers = true;
			$scope.loadedComments=false;
		});
	}
	function reloadComments(){
		$http.get("http://localhost:4567/findAllComments").success(function(data) {
			console.log(data);
			$scope.comments = data;
			$scope.loadedUsers = false;
			$scope.loadedComments=true;
		});
	}
	function findAndRemove(array, property, value) {
		array.forEach(function(result, index) {
			if(result[property] === value) {

				array.splice(index, 1);
			}    
		});
	}
	$scope.toEd = {};

	$scope.setEditUser = function(id, password, email, name){
		$scope.toEd.id = id;
		$scope.toEd.password = password;
		$scope.toEd.email = email;
		$scope.toEd.name = name;

	}

	$scope.editUser = function(){
		$http.get("http://localhost:4567/updateUser/"+$scope.toEd.id+"/"+$scope.toEd.email+"/"+$scope.toEd.password+"/"+$scope.toEd.name).success(function(data) {});
		console.log($scope.toEd);
		setTimeout(function(){
			reloadUsers();

		},750); 

	}
	$scope.commEd = {};
	$scope.setEditComment = function(id,description){
		$scope.commEd.id = id;
		$scope.commEd.comment = description;


	}

	$scope.editComment = function(){
		console.log($scope.commEd);
		$http.get("http://localhost:4567/updateComment/"+$scope.commEd.id+"/"+$scope.commEd.comment).success(function(data) {});
		setTimeout(function(){
			reloadComments();

		},750); 
		
	}

	$scope.insertUser = function(name, email, password){
		$http.get("http://localhost:4567/insertUser/"+name+"/"+email+"/"+password).success(function(data) {});
		setTimeout(function(){
			reloadUsers();

		},750); 

	}

	$scope.insertComment = function(uid,te,pid){
		$http.get("http://localhost:4567/insertComment/"+te+"/"+uid+"/"+pid).success(function(data) {});
		setTimeout(function(){
			reloadComments();
			$scope.te="";
			$scope.uid="";
			$scope.pid="";
		},750); 
	}

});

