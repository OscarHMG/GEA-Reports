
<?php
/**
 * Functions to create operations with DB
 */



/**
 * Obtiene la conexion a la base de datos del iBot
 * @return $conn Conector por defecto con la base de WEB GUI.
 */
function db_MAD_iBot_connect(){



	$servername = BDD_SERVER;
	$username = BDD_USER_NAME;
	$password = BDD_PASSWORD;
	$dbName = BBD_DB_NAME;

	$conn = new mysqli($servername, $username, $password, $dbName);

	if ($conn->connect_error) 
    	die("Connection failed: " . $conn->connect_error);
	return $conn;
}




function db_Mad_iBot_reports($queryString, $args){
	$db_connection = db_MAD_iBot_connect();
	$query = $queryString;
    $result = array();
	if ($stmt = $db_connection->prepare($query)) {
		bindParams(count($args), $args, $stmt);
     	$stmt->execute();
		$res = $stmt->get_result();
		while($row = $res->fetch_array(MYSQLI_ASSOC)) {
  			array_push($result, $row);
		}
	}
	return $result;
}


function bindParams($numElements, $args, $stmt){
	switch ($numElements) {
		case 1:
			$stmt->bind_param("s", $args[0]);
			break;
		
		case 2:
			$stmt->bind_param("ss", $args[0], $args[1]);
			break;
		case 3:
			$stmt->bind_param("sss", $args[0], $args[1], $args[2]);
			break;
		default:
			return;
			break;
	}
}