'use strict';

app.factory('loginService', function($http, $location, sessionService, userService){
	return {
		login:function(user, scope){
			var $promise = $http.post('app/data/user.php/login', user);
			$promise.then(function(msg){
				var uid = msg.data;
				if (uid) {
					if (uid == 'error'){
						scope.msgtext = "Incorrect User ID or Password !";
					} else {
						// correct login
						delete user.pass;
						sessionService.set('uid',uid);
						$http.defaults.headers.common['auth'] = uid;
						$http.post('app/data/user.php/user').success(function(name){
							user.name = name[0];
							user.type = name[1];
							userService.setuser(user);
							$location.path('/home');
						});
					}
				}});
		},
		logout:function(){
			sessionService.destroy('uid');
			sessionService.destroy('data');
			$http.defaults.headers.common['auth'] = "";
			// userService.setuname('');
			// userService.setutype('');
			$location.path('/login');
		},
		islogged:function(callback){
			var uid = sessionService.get('uid');
			$http.defaults.headers.common['auth'] = uid;
			$http.post('app/data/user.php/sescheck').success(callback);
		},
		getuser:function(){

		}
}});