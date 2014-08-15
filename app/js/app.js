var app = angular.module("myApp",['ngRoute','MainCtrl']);
app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/',{
			// This will show the data get
			templateUrl	: 'app/partials/main.html',
			controller 	: 'mainController'
		})
		.otherwise({ redirectTo : '/'});
	// $locationProvider.html5Mode(true);	
}]);
