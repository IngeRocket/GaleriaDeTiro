<?php
	$action = $_POST['action'];

	if ($action == "RegistraPuntuacion") 
		RegistrarPuntaje();
	else if ($action == "getPuntuacionMedia")
		getPuntosMedia();
		else if($action=="getPuntuacionDificil")
			getPuntosDificil();


	function connect() {
		$databasehost = "127.0.0.1";
		
		$databaseuser = "root";
		$databasepass = "root";
		$databasename = "mi_proyecto";

		$mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename,3306);
		if ($mysqli->connect_errno) {
			echo "Problema con la conexion a la base de datos";
		}
		return $mysqli;
	}


	function getPuntosMedia(){
		$mysqli = connect();
		$result = $mysqli->query("select * from V_PUNTUACION_MEDIA");			
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
				}			
			echo json_encode($rows);
			}
			mysqli_close($mysqli);
	}

	function getPuntosDificil(){
		$mysqli = connect();
		$result = $mysqli->query("select * from V_PUNTUACION_DIFICIL");			
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
				}			
			echo json_encode($rows);
			}
			mysqli_close($mysqli);
		}

	function RegistrarPuntaje(){
		$nombre = $_POST["nombre"];
		$puntos = $_POST["puntos"];
		$dificultad = $_POST["dificultad"];

		$mysqli = connect();
		$result = $mysqli->query("INSERT INTO Puntuaciones(p_jugador, p_puntaje, p_dificultad)VALUES('".$nombre."','".$puntos."','".$dificultad."')");
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";		
		}		
		mysqli_close($mysqli);
	}
?>