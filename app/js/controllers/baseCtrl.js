'use strict';

app.controller('baseController', function($http, $scope, loginService, userService){
	$scope.$watch(
		function(){return userService.getuser();},
		function(newval){
			$scope.user = newval;},
		true);
	$scope.logout = function(){
		loginService.logout();
	}
	$scope.display = function(val){
		var AdminRoles = ['UL1'];
		var StaffRoles = ['UL1','UL2'];
		var ClientRoles = ['UL1','UL2','CL1'];
		var EndClientRoles = ['UL1','UL2','CL1','CL2'];
		if ($scope.user){
			switch (val) {
				case 'Admin':
					return AdminRoles.indexOf($scope.user.type) > -1;
				break;
				case 'Staff':
					return StaffRoles.indexOf($scope.user.type) > -1;
				break;
				case 'Client':
					return ClientRoles.indexOf($scope.user.type) > -1;
				break;
				case 'EndClient':
					return EndClientRoles.indexOf($scope.user.type) > -1;
				break;
				}
			} else {
				return false;
			}
	}
	
});
