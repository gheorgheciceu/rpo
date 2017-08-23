'use strict;'
angular.module('NewsPaperApp')
.controller('ContactController', function($scope) {
  $scope.greeting = "hello";
  $scope.sentMsg = false;
  $scope.sendMessage = function(){
    console.log("sending message");
    $scope.sentMsg = true;
  }
  

});