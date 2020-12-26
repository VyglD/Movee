<?php
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);

	// header('Content-Type: application/json');
	// header("Access-Control-Allow-Origin: *");
	// header("Access-Control-Allow-Headers: *");

	$json = file_get_contents('./offers.json');

	echo $json;
?>
