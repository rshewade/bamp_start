'use strict';

app.factory('userService', function(){
	var uname = '';
	var utype = '';
	return{
		getuname:function(){ 
			return uname;	},
		setuname:function(val){ 
			uname = val;	},
		getutype:function(){ 
			return utype;	},
		setutype:function(val){ 
			utype = val;	}
	};
});