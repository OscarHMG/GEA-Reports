<?php

/**
 * Function to define function constants
 */

 	$GLOBALS["ws_funciones_def_Mad_iBot"] =
 		array("FUN_ID_DEF" => 
			array(
				"GET_SERVER_RESPONSE_TIME",
				"GET_MOST_USED_CONTEXTS",
				"GET_MOST_ANSWERED_QUESTIONS",
				"GET_NUMBER_OF_TRANSACTIONS",
				"GET_QUESTIONS_BY_CONTEXTS"),
			
			"FUN_NAME_DEF" =>
			array(
				"Get server response times",
				"Obtain the contexts most used by users",
				"Get the most answered response to users",
				"Get number of transactions with iBot",	
				"Get questions by contexts"));




 	define('BDD_ERROR_CONECCION', "IMPOSIBLE CONECTAR A LA BASE DE DATOS");
	define('BDD_TIMEOUT_ORA', 	30);

 	define('BDD_SERVER', 		'127.0.0.1');
	define('BDD_USER_NAME', 	'root');
	define('BDD_PASSWORD', 		'root');
	define('BBD_DB_NAME','maquetabot');
	

	/*$servername = "127.0.0.1";
	$username = "root";
	$password = "root";
	$dbName = "maquetabot";*/
	
