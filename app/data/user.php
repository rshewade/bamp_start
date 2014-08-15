<?php
session_start();
require 'start.php';

$app->get('/',function () {
        echo "Only Test";
    }
);

// $app->post('/login','login');
$app->post('/users', 'users');
// $app->post('/utypes','get_types');
// $app->post('/update', 'updateUser');
function users(){
	$data = json_decode(file_get_contents("php://input"));
	// if ($data->token == "0"){
	// 	$app->exit();
	// } else {
		$users = ORM::for_table('user_db')->find_array();
    	echo json_encode($users);	
	// }
	
}

$app->run();
?>