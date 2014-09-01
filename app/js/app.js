var app = angular.module("myApp",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");
	$stateProvider
		.state('login',{
			url:"/login",
			templateUrl	: 'app/partials/login.html',
			controller 	: 'loginController',
			data: {roles:['UL1','UL2','CL1','CL2']}
		})
		.state('401',{
			url:"/401",
			templateUrl	: 'app/partials/401.html',
			data: {roles:['UL1','UL2','CL1','CL2']}
		})
		.state('user',{
			url:"/home",
			templateUrl	: 'app/partials/main.html',
			controller 	: 'mainController',
			data: {roles:['UL1','UL2','CL1','CL2']}
		})
		.state('admin',{
			url:"/admin",
			templateUrl	: 'app/partials/admin.html',
			data: {roles:['UL1']}
		})
		.state('client',{
			abstract: true,
			template: "<ui-view/>"
		})
		.state('client.client1',{
			url:"/client1",
			templateUrl	: 'app/partials/client1.html',
			data: {roles:['UL1','CL1']}
		})
		.state('client.client2',{
			url:"/client2",
			templateUrl	: 'app/partials/client2.html',
			data: {roles:['CL1','CL2']}
		})
});

app.run(function($rootScope, $state, loginService, userService){
	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		loginService.islogged(function(results){
			if(results != 'authenfied'){
				loginService.logout();
				$state.go('login');
				} else {
					var user = userService.getuser();
					if (toState.data.roles.indexOf(user.type) == -1){
						$state.go('401');
					}
				} 
			});
	});
});