'use strict';

app.controller('baseController', function($http, $scope, loginService, userService){
    var list = ['item1','item2','item3'];
//     $scope.items = list;
	$scope.$watch(
		function(){return userService.getuser();},
		function(newval){
			$scope.user = newval;
//         	$scope.items = $scope.user.routes;
        },
		true);
	$scope.logout = function(){
		loginService.logout();
	}
	
});
