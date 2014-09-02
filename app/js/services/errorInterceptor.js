'use strict';

app.factory('HttpResponseInterceptor',function($q, $location){
    return{
      response: function(response){
                return response;
    	},
        responseError: function(rejection) {
            if(rejection.status === 401 ){
                $location.path('/401');
            }
            return $q.reject(rejection);
        }
  }
})