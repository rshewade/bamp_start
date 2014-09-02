'use strict';

app.controller('adminController', function($scope, $http, $state){
	$http.post('app/data/report.php/admin').success(function(data){
        	$scope.users = data;    
    });
});

app.controller('staffController', function($scope, $http){
	$http.post('app/data/report.php/staff').success(function(data){
        $scope.users = data;
    });
});

app.controller('clientadminController', function($scope, $http){
	$http.post('app/data/report.php/cladmin').success(function(data){
        $scope.users = data;
    });
});

app.controller('clientstaffController', function($scope, $http){
	$http.post('app/data/report.php/clstaff').success(function(data){
        $scope.users = data;
    });
});