angular.module('MainCtrl',[])
	.controller('mainController', function($scope){
		$scope.Test1 = "Result will come here";
		$scope.test = function(){
			$scope.Test1 = "Test Success";
		};
	});