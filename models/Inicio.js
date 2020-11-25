

	
			function PantallaMenu(){
					$("#escena").append(
						"<div id='TituloPantalla' name ='Titulo pantalla' style='padding-top: 70px; font-size: 36px; color:white;'>Inicio</div>"+
						"<div id='Titulos' name='Titulo1' style='padding-top: 50px; padding-bottom: 50px;   color:white;'>" +
						"<br><br><br><br><br><br><br><br>"+
						"<h1>"+
						"<label id='IrPantallaJugar'>Jugar</label>"+
						"<br><br>"+
						"<label id='IrPantallaPuntuacion'>Puntuaciones</label>" +
						"<br><br>" +
						"<label id='IrPantallaConfiguracion'>Configuracion</label>" +
						"<br><br>" +
						"</h1>" +
						"</div>"+	//div titulos
						"</div>"); //cierre de div escena									
		}

		function PantallaConfiguracion(){
					$("#escena").append(
						"<div id='TituloPantalla' name ='Titulo pantalla' style='padding-top: 70px; font-size: 36px; color:white;'>Configuracion</div>"+
						"<div id='Titulos' name='Titulo1' style='padding-top: 10px; padding-bottom: 50px;   color:white;'>" +
						"<br><br><br>"+
						"<br><h2>"+
						"<p>Nombre Jugador 1:<br></h2>"+	
						"<h3><input type='text' id='Jugador1' placeholder='Player 1'>"+
						"<label id='GuardaP1'> Guardar</label> <br><br></p> </h3>"+
						"<br><h2>"+
						"<p>Nombre Jugador 2:<br></h2>"+	
						"<h3><input type='text' id='Jugador2' placeholder='Player 2'>"+
						"<label id='GuardaP2'> Guardar</label> <br><br></p> </h3>"+
						"<br><br><br><br><br><br>"+
						"<h2><label id='VolverPantallaMenu'>Volver</label></h2>"+
						"</div>"+	//div titulos
						"</div>"); //cierre de div escena	
		}

		function PantallaJugar(){
					$("#escena").append(
						"<div id='TituloPantalla' name ='Titulo pantalla' style='padding-top: 70px; font-size: 36px; color:white;'>Jugar</div>"+
						"<div id='Titulos' name='Titulo1' style='padding-top: 10px; color:white;'>" +
						"<br><br><br>"+
						"<p><h2>Jugadores:</p></h2><h3>"+
						"<input type='radio' id='Media' value='Media' name='Players' checked='true'>"+
						"<label for='Media'> 1 Jugador(Solitario VS CPU) </label>"+							
						"<input type='radio' id='Dificil' value='Dificil' name='Players'> "+
						"<label for='Dificil'>2 Jugadores </label><br></h3>"+
						"<h3><p>Nombre Jugador1:"+	
						"<input type='text' name='Judador1' placeholder='Player 1'></p>"+
						"<p>Nombre Jugador2:"+
						"<input type='text' name='Judador2' placeholder='Player 2'></p></h3>"+
						"<br><br><p><h2>Dificultad:</p></h2><h3>"+
						"<input type='radio' id='Nivel' value='Media' name='Dificultad' checked='true'>"+
						"<label for='Facil'> Facil </label>"+
						"<input type='radio' id='Nivel' value='Dificil' name='Dificultad'>"+
						"<label for='Media'>Media </label>"+
						"<input type='radio' id='Nivel' value='Dificil' name='Dificultad'>"+ 
						"<label for='Dificil'>Dificil </label><br>"+
						"<br><br><br><h2>"+
						"<label id='PlayEscena'>Jugar</label><br><br>"+
						"<label id='VolverPantallaMenu'>Volver</label></h2>"+
						"</div>"+	//div titulos
						"</div>"); //cierre de div escena	
		}
		
		function PantallaPausa(){
			$("#escena").append(
						"<div id='TituloPantalla' name ='Titulo pantalla' style='padding-top: 70px; font-size: 36px; color:white;'>Pausa</div>"+
						"<div id='Titulos' name='Titulo1' style='padding-top: 50px; padding-bottom: 50px;   color:white;'>"+
						"<br><br><br><br><h3>"+
						"<label id='IrPantallaJugar'>Modificar Sensibilidad Jugador 1</label>"+
						"<br><br>"+
						"1%<input type='range' min='1' max='100'>100%"+
						"<br><br>"+
						"<label id='IrPantallaJugar'>Modificar Sensibilidad Jugador 2</label>"+
						"<br><br>"+
						"1%<input type='range' min='1' max='100'>100%"+
						"<br><br><br><br><br><br><br><br><br><br>"+
						"<label id='VolverPantallaMenu'>Volver al Juego</label>"+
						"<br><br>"+
						"<label id='VolverPantallaMenu'>Menu Principal</label>"+
						"</h3></div>");				

		}

		function AgregarElementos(){
									$("#escena").append(
									"<div id='Titulos' style='float: center;  color:white;'>"+
									"<br><h3>"+
									"<label id='DetenTiempo'>Pausa</label>"+
									"</h3></div>");					

			}

		function BorradoTotal(){
			var miescena = document.getElementById("Titulos");
			miescena.remove();
			miescena = document.getElementById("canvas");
			miescena.remove();

			
		}
		
		function PantallaSeleccionDificultad(){
				$("#escena").append(
				"<div id='TituloPantalla' name ='Titulo pantalla' style='padding-top: 70px; font-size: 36px; color:white;'>Dificultad</div>"+
				"<div id='Titulos' name='Titulo1' style='padding-top: 10px; color:white;'>"+
				"<br><br><br><br><br><br><br><br><br>"	+
				"<h1><label id='Facil' >Facil</label><br></h1>"+
				"<h1><label id='Medio' >Medio</label><br></h1>"+
				"<h1><label id='Dificil'>Dificil	</label><br></h1>"+
				"<br><br><br><br><h2>"+
				"<label id='VolverPantallaMenu'>Volver</label></h2>"+
				"</div>"); 
		}

		function PantallaDificultadFacil(){
				$("#escena").append(
				"<div id='TituloPantalla' name ='Titulo pantalla' style='padding-top: 70px; font-size: 36px; color:white;'>Modo de Juego: Facil</div>"+
				"<div id='Titulos' name='Titulo1' style='padding-top: 10px; color:white;'>"+
				"<br><br><br><br><br><br><br>"+
				"<h1><label id='Entrenamiento' >Entrenamiento</label><br></h1>"+
				"<h3><label style='color:gray;'>(Practica tu punteria con objetivos estaticos)	</label><br></h3><br>"+
				"<h1><label id='Competir' >1 Jugador .vs. CPU</label><br></h1>"+
				"<h3><label style='color:gray;'>(Compite contra la CPU derribando objetivos en movimiento)	</label><br></h3><br>"+
				"<br><br><br><br><h2>"+
				"<label id='Dificultad'>Regresar a Dificultad</label><br><br>"+
				"<label id='VolverPantallaMenu'>Regresar a Pantalla Principal</label></h2>"+
				"</div>");
		}

		function PantallaDificultadMedia(){
				$("#escena").append(
					"<div id='TituloPantalla' name ='Titulo pantalla' style='padding-top: 70px; font-size: 36px; color:white;'>Modo de Juego: Medio</div>"+
					"<div id='Titulos' name='Titulo1' style='padding-top: 10px; color:white;'>"+
					"<br><br><br><br><br><br><br>"+
					"<h1><label id='1Jugador' >1 Jugador</label><br></h1>"+
					"<h3><label style='color:gray;'>(Derriba dianas en movimiento en menos de 30 segundos)	</label><br></h3><br>"+
					"<h1><label id='2Jugador' >2 Jugadores</label><br></h1>"+
					"<h3><label style='color:gray;'>(Compite contra un jugador derribando dianas en menos de 30 segundos)	</label><br></h3><br>"+
					"<br><br><br><br><h2>"+
					"<label id='Dificultad'>Regresar a Dificultad</label><br><br>"+
					"<label id='VolverPantallaMenu'>Regresar a Pantalla Principal</label></h2>"+
					"</div>");
		}

		function PantallaDificultadDificil(){
			$("#escena").append(
				"<div id='TituloPantalla' name ='Titulo pantalla' style='padding-top: 70px; font-size: 36px; color:white;'>Modo de Juego: Dificil</div>"+
				"<div id='Titulos' name='Titulo1' style='padding-top: 10px; color:white;'>"+
				"<br><br><br><br><br><br><br>	"+
				"<h1><label id='1Jugador' >1 Jugador</label><br></h1>"+
				"<h3><label style='color:gray;'>(Intenta derribar dianas en movimiento en menos de 30 segundos)	</label><br></h3><br>"+
				"<h1><label id='2Jugador' >2 Jugadores</label><br></h1>"+
				"<h3><label style='color:gray;'>(Compite contra un jugador intentando derribar dianas en menos de 30 segundos)</label><br></h3><br>"+		
				"<br><br><br><br><h2>"+
				"<label id='Dificultad'>Regresar a Dificultad</label><br><br>"+
				"<label id='VolverPantallaMenu'>Regresar a Pantalla Principal</label></h2>"+
				"</div>");
		}

		function PantallaPuntuacion2(){
					$("#escena").append(
						"<div id='TituloPantalla' name ='Titulo pantalla' style='padding-top: 70px; font-size: 36px; color:white;'>Puntuaciones</div>"+
						"<div id='Titulos' name='Titulo1' style='padding-top: 50px; padding-bottom: 50px;   color:white;'>" +
						"<br><p><h2>Selecciona una Dificultad:</h2></p>"+
						"<h3><label style = 'padding-left:80px; padding-right:80px;' 	id='lbl_Media'>Media</label>"+
						"<label style = 'padding-left:80px; padding-right:80px;' 		id='lbl_Dificil'>Dificil</label>"+
						"</h3><h2>"+
						"<p>Resultados:</p> </h2>"+	
						"<div id='Latabla' style='width: 600px; height: 350px; float:center;'>"+
						"<div id = 'tabla_nombre' style=' width: 200px; height: 300px; 	text-align: center;	float:left;'><br></div>"+
						"<div id = 'tabla_puntos' style=' width: 200px; height: 300px; 	text-align: center;	float:left;'><br></div>"+
						"<div id = 'tabla_fecha'  style=' width: 200px; height: 300px; 	text-align: center;	float:left;'><br></div>"+
						"</div>"+
						"<h2><label id='VolverPantallaMenu'>Volver</label></h2>"+
						"</div>"); //cierre de div escena	
		}

		function PantallaMultijugador(nombre,Puntos){
			document.getElementById("VentanaFinal").innerHTML = "";
			$("#VentanaFinal").append("<br>"+
			"<center><h1><label style='color:white;'>~Resultados~</label><br><label id='DificultadJugada' style='color:white;'>Multijugador</label></h1></center><br>"+	
			"<center><h2><label id='Ganador' style='color:white;'>Ganador: "+nombre+"</label><br>"+
			"<label id='PuntajeObtenido' style='color:white;'>Puntaje total obtenido: "+Puntos+"</label>"+
			"</h2><br>"+
			"<button id='btn_CompartirFB' style=' background: blue; border-radius: 10px; height: 30px; color:white;'>Compartir en facebook</button>"+
			"</center><br><br>"+
			"<center><h2><label id='PausaVuelveMenu' style='color:white;'>Volver al Menu</label></h2></center>");
			document.getElementById("VentanaFinal").style.display="block";
		}

		function PantallaFacil(Puntos){
			document.getElementById("VentanaFinal").innerHTML = "";
			$("#VentanaFinal").append("<br>"+
			"<center><h1><label style='color:white;'>~Resultados~</label><br><label style='color:white;'>FACIL</label></h1></center><br>"+
			"<center><h2><label id='CierraFlotante' style='color:white;'>Puntaje total obtenido: "+Puntos+"</label></h2><br><br>"+
			"<button id='btn_CompartirFB' style=' background: blue; border-radius: 10px; height: 30px; color:white;'>Compartir en facebook</button>"+
			"</center><br><br>"+
			"<center><h2><label id='PausaVuelveMenu' style='color:white;'>Volver al Menu</label></h2></center>");
			document.getElementById("VentanaFinal").style.display="block";
		}

		function PantallaMedia(Puntos){
			document.getElementById("VentanaFinal").innerHTML = "";
			$("#VentanaFinal").append("<br>"+
			"<center><h1><label style='color:white;'>~Resultados~</label><br><label style='color:white;'>MEDIA</label></h1></center><br>"+
			"<center><h2><label id='CierraFlotante' style='color:white;'>Puntaje total obtenido: "+Puntos+"</label></h2><br><br>"+
			"<button id='btn_CompartirFB' style=' background: blue; border-radius: 10px; height: 30px; color:white;'>Compartir en facebook</button>"+
			"</center><br><br>"+
			"<center><h2><label id='PausaVuelveMenu' style='color:white;'>Volver al Menu</label></h2></center>");
			document.getElementById("VentanaFinal").style.display="block";
		}

		function PantallaDificil(Puntos){
			document.getElementById("VentanaFinal").innerHTML = "";
			$("#VentanaFinal").append("<br>"+
			"<center><h1><label style='color:white;'>~Resultados~</label><br><label style='color:white;'>DIFICIL</label></h1></center><br>"+
			"<center><h2><label id='CierraFlotante' style='color:white;'>Puntaje total obtenido: "+Puntos+"</label></h2><br><br>"+
			"<button id='btn_CompartirFB'style=' background: blue; border-radius: 10px; height: 30px; color:white;'>Compartir en facebook</button>"+
			"</center><br><br>"+
			"<center><h2><label id='PausaVuelveMenu' style='color:white;'>Volver al Menu</label></h2></center>");
			document.getElementById("VentanaFinal").style.display="block";
		}
		function PantallaEmpate(){
			document.getElementById("VentanaFinal").innerHTML = "";
			$("#VentanaFinal").append("<br>"+
			"<center><h1><label style='color:white;'>~Resultados~</label><br><label style='color:white;'>EMPATE</label></h1></center><br>"+
			"<br><br><br><br><br>"+
			"<center><h2><label id='PausaVuelveMenu' style='color:white;'>Volver al Menu</label></h2></center>");
			document.getElementById("VentanaFinal").style.display="block";
		}
		function CargaPuntuacionMedia(){
				document.getElementById("tabla_nombre").innerHTML = "";
				document.getElementById("tabla_puntos").innerHTML = "";
				document.getElementById("tabla_fecha").innerHTML = "";
				$('#tabla_nombre').append("<label><h2>Jugador</label></h2><br>");
				$('#tabla_puntos').append("<label><h2>Puntuacion</label></h2><br>");
				$('#tabla_fecha').append("<label><h2>Fecha de record</label></h2><br>");	
				getPuntuacionMedia();
		}

		function CargaPuntuacionDificil(){
				document.getElementById("tabla_nombre").innerHTML = "";
				document.getElementById("tabla_puntos").innerHTML = "";
				document.getElementById("tabla_fecha").innerHTML = "";
				$('#tabla_nombre').append("<label><h2>Jugador</label></h2><br>");
				$('#tabla_puntos').append("<label><h2>Puntuacion</label></h2><br>");
				$('#tabla_fecha').append("<label><h2>Fecha de record</label></h2><br>");	
				getPuntuacionDificil();
		}	

		function getPuntuacionMedia(){
			var dataToSend = { 
				action: "getPuntuacionMedia"
			};
			$.ajax({
			url: "webservice/webservice.php",
			async: true,
			type: 'POST',
			data: dataToSend, 
			success: function (data){
					var datos = JSON.parse(data);			
					for (var i = 0; i < datos.length; i++) {	
					$('#tabla_nombre').append(datos[i].p_jugador+"<br>");
					$('#tabla_puntos').append(". . . . . . "+datos[i].p_puntaje+". . . . . . <br>");
					$('#tabla_fecha').append(datos[i].p_fecha+"<br>");		
					} 
				}
			});

		}

		function getPuntuacionDificil(){
			var dataToSend = { 
				action: "getPuntuacionDificil"
			};
			$.ajax({
			url: "webservice/webservice.php",
			async: true,
			type: 'POST',
			data: dataToSend, 
			success: function (data){
					var datos = JSON.parse(data);
					for (var i = 0; i < datos.length; i++) {						
					$('#tabla_nombre').append(datos[i].p_jugador+"<br>");
					$('#tabla_puntos').append(". . . . . . "+datos[i].p_puntaje+". . . . . . <br>");
					$('#tabla_fecha').append(datos[i].p_fecha+"<br>");		
					} 
				}
			});
		}

		function RevisaNombres(){
				var NombrePlayer1 = localStorage.getItem("NombrePlayer1");
				if (NombrePlayer1==null){
					localStorage.setItem("NombrePlayer1", "Player1");
				}
				var NombrePlayer2 = localStorage.getItem("NombrePlayer2");
				if (NombrePlayer2==null){
					localStorage.setItem("NombrePlayer2", "Player2");
				}	
				
		}
		function GuardaNombreP1(nombreP1){
			localStorage.setItem("NombrePlayer1", nombreP1);
		}
		function GuardaNombreP2(nombreP2){
			localStorage.setItem("NombrePlayer2", nombreP2);
		}