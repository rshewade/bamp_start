'use strict';
// app.controller('baseController', function($http, $scope, loginService, userService){
// 	$scope.$watch(
// 		function(){return userService.getuser();},
// 		function(newval){
// 			$scope.user = newval;},
// 		true);
// 	$scope.logout = function(){
// 		loginService.logout();
// 	}
// });

app.controller('mainController', function($scope, $http, loginService, sessionService, userService){
	
	$scope.logout = function(){
		loginService.logout();
	}
	$scope.test_btn = function(){
		$http.post('app/data/report.php/test').success(function(data){
        $scope.Test1 = data;
    	});
	}
	$scope.test_btn2 = function(){
		
	}
});