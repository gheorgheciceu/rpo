'use strict;'
angular.module('NewsPaperApp')
.controller('navController', function($scope, $http,$cookies,$translate,$timeout, Facebook) {
	$scope.greeting = "hello";
	 
	$translate.use($cookies.get('language'));
	$scope.selectLanguage = function(lang){
		console.log(lang);
		$cookies.put('language',lang);
		$translate.use(lang);
	} 
	$scope.userIsLoggedIn = false;
	$scope.userEmail;
 	$scope.hideFbLogin = true;
	$http.get("php/getSessionUser.php").success(function(data) {
		if(data === "noSession"){
			$scope.userIsLoggedIn = false;
			// user might log in with facebook
		}else{
			$cookies.putObject("user",data);
			$scope.userEmail = data.email;
			$scope.userIsLoggedIn = true;
			$scope.fbLogin=false;
		}
		 

	});
	 
	console.log("user logged in ? "+$scope.userIsLoggedIn);
	$scope.logOut = function(){
		console.log("logging out");
		$cookies.remove("user");
		$cookies.remove("userIsLoggedIn");
		$http.get("php/logout.php").success(function(data) {});
		location.href="index.html";
	}

	  
      
      console.log("createt");
      // Define user empty data :/
      $scope.user = {};
      
      // Defining user logged status
      $scope.logged = false;
      
      // And some fancy flags to display messages upon user status change
      $scope.byebye = false;
      $scope.salutation = false;
      
      /**
       * Watch for Facebook to be ready.
       * There's also the event that could be used
       */
      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(newVal) {
        	if (newVal)
            $scope.facebookReady = true;
        }
      );
      
      var userIsConnected = false;
      
      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          userIsConnected = true;
        }
      });
      
      /**
       * IntentLogin
       */
      $scope.IntentLogin = function() {
        if(!userIsConnected) {
        console.log("1");
          $scope.login();
        }else{
        	console.log("-1");
        	 $scope.login();
        }
      };
      
      /**
       * Login
       */
       $scope.login = function() {
         Facebook.login(function(response) {
          if (response.status == 'connected') {
          	console.log("2");
            $scope.logged = true;
            $scope.me();
          }
        
        });
       };
       
       /**
        * me 
        */
        $scope.me = function() {
          Facebook.api('/me', function(response) {
          	console.log("3");
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
            	console.log("4");
            	
              $scope.user = response;
              $cookies.putObject("fbUser",$scope.user)
              console.log( $scope.user);
             $scope.hideFbLogin = false;
              register($scope.user.name);
              logIn($scope.user.name,"generatePass");


            });
            
          });
        };
      
      /**
       * Logout
       */
       
      
      /**
       * Taking approach of Events :D
       */
      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
          $scope.$apply(function() {
            $scope.salutation = true;
            $scope.byebye     = false;    
          });
        } else {
          $scope.$apply(function() {
            $scope.salutation = false;
            $scope.byebye     = true;
            
            // Dismiss byebye message after two seconds
            $timeout(function() {
              $scope.byebye = false;
            }, 2000)
          });
        }
        
        
      });

      function register(name){
      	var request = $http({
			method: "post",
			url:   "php/register.php",
			data: {
				email: name,
				pass: "generatePass",
				name: name
			},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});
		request.success(function (data) {
			console.log("good credentials, have to add user to cookie");
			console.log(data);
			 
		});
      }
      logIn = function(name, pass){
		console.log($scope.email+" "+$scope.password+"  loing in user");
		var request = $http({
			method: "post",
			url:   "php/login.php",
			data: {
				email: name,
				pass: pass
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