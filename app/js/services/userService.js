'use strict';

app.factory('userService', function(sessionService){
	return{
		getuser:function(){ 
			var user = JSON.parse(sessionService.get('data'));
				return user;	
				},
		setuser:function(val){ 
				sessionService.set('data',JSON.stringify(val));
			},
		display:function(){
			console.log("Function Called");
			return true;
		}
	};
});