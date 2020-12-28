<?php
  ini_set('error_reporting', E_ALL);
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);

  $json = file_get_contents('php://input');
  $request_params = json_decode($json, true);

  echo json_encode($request_params);
?>
