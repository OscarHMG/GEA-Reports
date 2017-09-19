<?php
/**
 * Functions operations. 
 */

/**
 * REPORT 1
 */
function fun_Mad_iBot_get_reportTimeServerResponses($args){

	$date = $args->fecha;
	$context = $args->contexto;
	
	if(isset($date)&&isset($context)){
			//$queryString, $args
			return db_Mad_iBot_reports($GLOBALS ["SQL_SELECT_TIME_SERVER_RESPONSES"], array($date, $context));
	}	
	else{
		throw new Exception("Parámetros insuficientes", 1);
	}
}

/**
 * REPORT 2
 */
function fun_mad_iBot_reportMostUsedContexts($args){
	$dateInit = $args->fechaInicio;
	$dateEnd = $args->fechaFin;
	
	if(isset($dateInit)&&isset($dateEnd)){
			return db_Mad_iBot_reports($GLOBALS ["SQL_SELECT_MOST_USED_CONTEXTS"], array($dateInit, $dateEnd));
	}	
	else{
		throw new Exception("Parámetros insuficientes", 1);
	}
}

/**
 * REPORT 3
 */
function fun_mad_iBot_reportMostAnsweredQuestions($args){
	$dateInit = $args->fechaInicio;
	$dateEnd = $args->fechaFin;
	if(isset($dateInit)&&isset($dateEnd)){
			return db_Mad_iBot_reports($GLOBALS["SQL_SELECT_MOST_ANSWERED_QUESTIONS"], array($dateInit, $dateEnd));
	}	
	else{
		throw new Exception("Parámetros insuficientes", 1);
	}
}


/**
 * REPORT 4
 */
function fun_mad_iBot_reportNumberOfTransactions($args){
	$dateInit = $args->fechaInicio;
	$dateEnd = $args->fechaFin;
	if(isset($dateInit)&&isset($dateEnd)){
			return db_Mad_iBot_reports($GLOBALS["SQL_SELECT_NUMBER_OF_TRANSACTIONS"], array($dateInit, $dateEnd));
	}	
	else{
		throw new Exception("Parámetros insuficientes", 1);
	}
}


/**
 * REPORT 5
 */
function fun_mad_iBot_reportQuestionsByContext($args){
	$context = $args->contexto;
	$dateInit = $args->fechaInicio;
	$dateEnd = $args->fechaFin;
	if(isset($context)&&isset($dateInit)&&isset($dateEnd)){
			return db_Mad_iBot_reports($GLOBALS["SQL_SELECT_QUESTIONS_BY_CONTEXTS"], array($context,$dateInit, $dateEnd));
	}	
	else{
		throw new Exception("Parámetros insuficientes", 1);
	}
}
