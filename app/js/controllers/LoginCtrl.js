'use strict';

app.controller('loginController', function($scope, loginService){
		// $scope.msgtext = 'test message';
		loginService.logout();
		$scope.login = function(user){
			loginService.login(user, $scope);
		}
});