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
						sessionService.set('uid',uid);
						$http.defaults.headers.common['auth'] = uid;
						$http.post('app/data/user.php/user').success(function(name){
							userService.setuname(name[0]);
							userService.setutype(name[1]);
							$location.path('/home');
						});
					}
				}});
		},
		logout:function(){
			sessionService.destroy('uid');
			$http.defaults.headers.common['auth'] = "";
			userService.setuname('');
			userService.setutype('');
			$location.path('/login');
		},
		islogged:function(callback){
			var uid = sessionService.get('uid');
			$http.defaults.headers.common['auth'] = uid;
			$http.post('app/data/user.php/sescheck', {'uid': uid}).success(callback);

		},
		getuser:function(){
			$http.post('app/data/user.php/user').success(function(data){
					userService.setuname(data[0]);
					userService.setutype(data[1]);
				});
		}
}});