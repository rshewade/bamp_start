'use strict';
app.controller('baseController', function($http, $scope, loginService, userService){
	var nouser = true;
	$scope.$watch(
		function(){return userService.getuname();},
		function(newval){
			$scope.username = newval;
			if (newval) nouser = !nouser;
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
app.controller('mainController', function($scope, $http, loginService, sessionService, userService){
	
	$scope.logout = function(){
		loginService.logout();
	}
	$scope.test_btn = function(){
		$scope.Test1 = "Function Called";
		$scope.username = userService.getuname();
		$scope.usertype = "test type";
	}
	$scope.test_btn2 = function(){
		console.log(userService.getuname().length)
	}
});