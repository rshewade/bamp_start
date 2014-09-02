var app = angular.module("myApp",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise("/login");
	$stateProvider
		.state('login',{
			url:"/login",
			templateUrl	: 'app/partials/login.html',
			controller 	: 'loginController'
		})
		.state('401',{
			url:"/401",
			templateUrl	: 'app/partials/401.html'
		})
		.state('user',{
			url:"/home",
			templateUrl	: 'app/partials/main.html',
			controller 	: 'mainController'
		})
		.state('admin',{
			url:"/admin",
			templateUrl	: 'app/partials/admin.html',
        	controller 	: 'adminController'
		})
    	.state('staff',{
			url:"/staff",
			templateUrl	: 'app/partials/staff.html',
        	controller 	: 'staffController'
		})
		.state('client',{
			abstract: true,
			template: "<ui-view/>"
		})
		.state('client.client1',{
			url:"/client1",
			templateUrl	: 'app/partials/client1.html',
        	controller 	: 'clientadminController'
		})
		.state('client.client2',{
			url:"/client2",
			templateUrl	: 'app/partials/client2.html',
        	controller 	: 'clientstaffController'
		})
});
app.config(function($httpProvider){
   $httpProvider.interceptors.push('HttpResponseInterceptor'); 
});
app.run(function($rootScope, $state, loginService, userService){
	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		loginService.islogged(function(results){
			if(results != 'authenfied'){
				loginService.logout();
				$state.go('login');
				} else {
					var user = userService.getuser();
				} 
			});
	});
});