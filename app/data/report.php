<?php
session_start();
require 'start.php';

$app->get('/', function () {
//     $users = ORM::for_table('user_db')->where('Auto_id',1)->find_array();
//     echo json_encode($users);
   echo "Test Only"; 
});

$app->post('/admin','admin');
$app->post('/staff','staff');
$app->post('/cladmin','cladmin');
$app->post('/clstaff','clstaff');
$app->post('/test','test');

function test(){
    if (IsValid('admin')){
        echo "Success";
    } else {
        
        return header('HTTP/1.1 401 Unauthorized', true, 401);
//         echo "Unauthorized";
    }
// 	$headers = getallheaders();
// 	$en_auth = $headers['auth'];
// 	$auth = decrypt($en_auth,'R#235689');
// 	$auth_arr = explode('_', $auth);
// 	$user = ORM::for_table('user_db')->where('Auto_id', $auth_arr[0] )->find_one();
//     $routevalid = ORM::for_table('access_db')->select_expr('COUNT(*)', 'cnt')->where('role', $user->Type)->where('route','client2')->find_one();
//     echo $routevalid->cnt;	
}


function admin(){
    IsValid('admin');
    $users = ORM::for_table('user_db')->find_array();
    echo json_encode($users); 
}

function staff(){
    IsValid('staff');
    $users = ORM::for_table('user_db')->where_in('Type',array('UL2','CL1','CL2'))->find_array();
    echo json_encode($users);
}

function cladmin(){
    IsValid('client1');
    $users = ORM::for_table('user_db')->where_in('Type',array('CL1','CL2'))->find_array();
    echo json_encode($users);
        
}

function clstaff(){
    IsValid('client2');
    $users = ORM::for_table('user_db')->where_in('Type',array('CL2'))->find_array();
    echo json_encode($users);
}

function IsValid($route){
    $headers = getallheaders();
	$en_auth = $headers['auth'];
	$auth = decrypt($en_auth,'R#235689');
	$auth_arr = explode('_', $auth);
	$user = ORM::for_table('user_db')->where('Auto_id', $auth_arr[0] )->find_one();
    $routevalid = ORM::for_table('access_db')->select_expr('COUNT(*)', 'cnt')->where('role', $user->Type)->where('route',$route)->find_one();
    if ($routevalid->cnt <= 0){
        $app = \Slim\Slim::getInstance();
     	$app->response->setStatus(401);
    }
}

$app->run();
?>