<?php
session_start();
require 'start.php';
// require 'jwt_helper.php';

$app->get('/',function () {
        echo "Only Test";
    }
);

$app->post('/login','login');
$app->post('/user','getuser');
$app->post('/role','getrole');
$app->post('/users', 'users');
$app->post('/sesdestroy', 'ses_destroy');
$app->post('/sescheck', 'ses_check');

// $app->post('/utypes','get_types');
// $app->post('/update', 'updateUser');

function login(){
	$userdata = json_decode(file_get_contents("php://input"));
	$user = ORM::for_table('user_db')->where('user_id', $userdata->email)->find_one();
	$uid = uniqid($user->Auto_id.'_');
	$token = encrypt($uid,'R#235689');
		if ("pass" == $userdata->pass){
			$_SESSION['uid']= $token;
			
			echo $_SESSION['uid']; 
		} else {
			echo "error";
		}	
}

function getuser(){
	$headers = getallheaders();
	$en_auth = $headers['Auth'];
	$auth = decrypt($en_auth,'R#235689');
	$auth_arr = explode('_', $auth);
	$user = ORM::for_table('user_db')->where('Auto_id', $auth_arr[0] )->find_one();
	$result = array($user->User_name, $user->Type);
	echo json_encode($result);
}

function getrole(){
	$headers = getallheaders();
	$en_auth = $headers['Auth'];
	$auth = decrypt($en_auth,'R#235689');
	$auth_arr = explode('_', $auth);
	$user = ORM::for_table('user_db')->where('Auto_id', $auth_arr[0] )->find_one();
	echo $user->Type;
}

function users(){
	$data = json_decode(file_get_contents("php://input"));
	// if ($data->token == "0"){
	// 	$app->exit();
	// } else {
		$users = ORM::for_table('user_db')->find_array();
    	echo json_encode($users);	
	// }
	
}

function ses_destroy(){
	session_id('uid');
	session_destroy();
	session_commit();
}

function ses_check(){
	// $token = json_decode(file_get_contents("php://input"));
	$headers = getallheaders();
	$en_auth = $headers['Auth'];
	
	if( isset($_SESSION['uid']) ){
		if ($en_auth == $_SESSION['uid']) {
			echo "authenfied" ;
		} else {
			echo "unmatched" ;
		} 
	} else {
		echo "no token" ;
	}
}

$app->run();
?>