<?php
session_start();
require 'start.php';
// require 'jwt_helper.php';

$app->get('/',function () {
    $users = ORM::for_table('user_db')->find_array();
    echo json_encode($users);
        echo "Only Test";
    }
);

$app->post('/login','login');
$app->post('/user','getuser');
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
			$_SESSION['ltime'] = time();
			echo $_SESSION['uid']; 
		} else {
			echo "error";
		}	
}

function getuser(){
	// send details of users if logged in
	$headers = getallheaders();
	$en_auth = $headers['auth'];
	$auth = decrypt($en_auth,'R#235689');
	$auth_arr = explode('_', $auth);
	$user = ORM::for_table('user_db')->where('Auto_id', $auth_arr[0] )->find_one();
    $access = ORM::for_table('access_db')->select('name')->select('route')->where('role', $user->Type)->find_array();
	$result = array($user->User_name, $user->Type, $access);
	echo json_encode($result);
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
	try {
	session_id('uid');
	session_destroy();
	session_commit();
	} catch (Exception $e){

	}
}

function ses_check(){
	$headers = getallheaders();
	try {
		$en_auth = $headers['auth'];
		$diff_time = time() - $_SESSION['ltime'];
		if( isset($_SESSION['uid']) ){
			if ($en_auth == $_SESSION['uid']) {
				if ($diff_time < 600){
					echo "authenfied" ;
					$_SESSION['ltime'] = time();
				} else {
					echo "timeout" ;	
				}
				// echo "authenfied" ;	
			} else {
				echo "unmatched" ;
			} 
		} else {
			echo "no token" ;
		}	
	} catch (Exception $e) {
		echo $e->getMessage();
	}
}

$app->run();
?>