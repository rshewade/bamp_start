'use strict';

app.directive('loginDirective',function(){
	return{
		templateUrl	: 'app/partials/tpl/login.tpl.html'
	}
});

app.directive('userlistDirective', function(){
   return{
       templateUrl : 'app/partials/tpl/userlist.tpl.html'
   } 
});