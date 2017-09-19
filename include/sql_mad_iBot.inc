<?php
/**
 * SQL Queries.
 */

//3 params
$GLOBALS ["SQL_SELECT_TIME_SERVER_RESPONSES"] = "SELECT DISTINCT (TIME(Fecha)) AS Hora,Sesion,COUNT((Sesion)) as NumeroPeticiones, (TIMEDIFF(MAX(Fecha), MIN(Fecha))) as TiempoSesion,GROUP_CONCAT(DISTINCT(Contexto) SEPARATOR ', ') as ContextosMasUsados FROM cdrprincipal WHERE DATE(Fecha) = ? AND Contexto = ? GROUP BY Sesion;";




//2 params
$GLOBALS ["SQL_SELECT_MOST_USED_CONTEXTS"]	=
											"SELECT Contexto , COUNT(*) as Frecuencia
											 FROM cdrPrincipal
											 WHERE Fecha BETWEEN ? AND ?
											 GROUP BY Contexto;";


//2 params
$GLOBALS["SQL_SELECT_MOST_ANSWERED_QUESTIONS"] =
											"SELECT Fecha, Contexto , Pregunta, Respuesta, 
											 CASE WHEN isError = 1 THEN 'INCORRECTO' ELSE 'CORRECTO' END AS Estado 
											 FROM cdrPrincipal
											 WHERE Fecha BETWEEN ? AND ?;";


//2 params
$GLOBALS["SQL_SELECT_NUMBER_OF_TRANSACTIONS"] = 
											"SELECT 
											 TIME(Fecha) as Fecha,
											 COUNT(*) AS Transacciones
											 FROM cdrPrincipal 
											 WHERE Fecha 
											 BETWEEN ? and ?;";


$GLOBALS["SQL_SELECT_QUESTIONS_BY_CONTEXTS"] = 
											"SELECT 
											Pregunta 
											FROM cdrPrincipal 
											WHERE Contexto=? AND Fecha BETWEEN ? AND ?;";


