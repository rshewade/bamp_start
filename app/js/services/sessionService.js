'use strict';

app.factory('sessionService', ['$http', function($http){
	return {
		set:function(key, value){
			return sessionStorage.setItem(key, value);
		},
		get:function(key){
			return sessionStorage.getItem(key);	
		},
		destroy:function(key){
			// $http.post('app/data/destroy_session.php');
			$http.post('app/data/user.php/sesdestroy');
			return sessionStorage.removeItem(key);
		}
	};
}])