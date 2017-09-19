<?php

/**
 *  File that handles queries to the database.
 */



/**
 *
 **/
function mad_iBot_include() {
	require_once (dirname(__FILE__) . '/../ws_function_def.inc');
	require_once 'fun_mad_iBot.inc';
	require_once 'db_mad_iBot.inc';
	require_once 'sql_mad_iBot.inc';
}


function ws_Mad_iBot_main(){
	//Include files
	mad_iBot_include();
	header('Access-Control-Allow-Origin: *'); //Allow CROS.
 	header('Content-Type: application/json'); //JSON Content type.
 	$response =  new stdClass();
	$params;
	$fun;
	
	//$obj = json_decode($json_string);

	if (!isset($_POST["PARAM"])){
		//$response->Error = $data;
		$response -> Error = "Petición no encontrada";
	}else{
		$params = json_decode($_POST["PARAM"]);

		try{
			$fun  = $params -> funcion;
			$args = $params -> args;
		} catch(Exception $e){
			$response -> Error = $e -> getMessage();
			echo json_encode($response);
			return;
		}

		$response -> funcion = $fun;

		try{
			switch ($fun) {
				case "GET_SERVER_RESPONSE_TIME":
					$response  = fun_Mad_iBot_get_reportTimeServerResponses($args);
					break;
				case "GET_MOST_USED_CONTEXTS":
					$response  = fun_mad_iBot_reportMostUsedContexts($args);
					break;
				case "GET_MOST_ANSWERED_QUESTIONS":
					$response  = fun_mad_iBot_reportMostAnsweredQuestions($args);
					break;
				case "GET_NUMBER_OF_TRANSACTIONS":
					$response  = fun_mad_iBot_reportNumberOfTransactions($args);
					break;
				case "GET_QUESTIONS_BY_CONTEXTS":
					$response  = fun_mad_iBot_reportQuestionsByContext($args);
					break;
				default:
					throw new Exception('Funcion:  '.$fun.', no encontrada', 1); 	break;
					break;
			}
		}catch(Exception $e){
			$response -> error = $e -> getMessage();
		}
	}
	echo json_encode($response);
}
