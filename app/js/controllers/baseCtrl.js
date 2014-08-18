'use strict';

app.controller('baseController', function($http, $scope, loginService, userService){
	$scope.$watch(
		function(){return userService.getuname();},
		function(newval){
			$scope.username = newval;
		});
	$scope.$watch(
		function(){return userService.getutype();},
		function(newval){
			$scope.usertype = newval;
		});
	$scope.logout = function(){
		loginService.logout();
	}
});