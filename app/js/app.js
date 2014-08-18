var app = angular.module("myApp",['ngRoute']);
app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/home',{
			// This will show the data get
			templateUrl	: 'app/partials/main.html',
			controller 	: 'mainController'
		})
		.when('/login',{
			// This will show the data get
			templateUrl	: 'app/partials/login.html',
			controller 	: 'loginController'
		})
		.otherwise({ redirectTo : '/login'});
	// $locationProvider.html5Mode(true);	
}]);

app.run(function($rootScope, $location, loginService){
	var routepermission = ['/home'];
	$rootScope.$on('$routeChangeStart', function(){
		if (routepermission.indexOf($location.path()) !=-1 ){
			loginService.islogged(function(results){
				if (results != 'authenfied') {
					loginService.logout();
					$location.path('/login');
				} else {
					loginService.getuser();
				}
			});
		}
	});
});