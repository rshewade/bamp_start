<?php
require 'start.php';

$app->post('/start','login');
$app->post('/users', 'users');

$app->run();
?>