	var Tiempo = 0; 				//Tiempo que queda del juego
	var Ticks;						//Tick para restar tiempo
	var Inicio = false; 			//Inicio de Juego
	var InicializaTimer = false;	//inicializar timer cuando el escenario este listo
	var Jugadores = 2;				//Numero de Jugadores
	var Dificultad = 0;				//dificultad 0 = facil, 1 Medio, 2 Dificil
	var CPU = false; 				//si se marca la casilla marcar true, en caso de que no siempre mandar false
	var Activos=[false,false,false,false,false,false,false,false,false,false,false,false]; //dianas activas
	var Dianas=[];					//Arreglo para detectar colision de objetivos

	var mover = false;
	var maximo = false;

	
	var Disparo1 = false;			//bool de disparo 1
	var Objetivo1=[1.0,1.0,1.0];	//auxiliar posicion Proyectil 1

	var Disparo2 = false;			//bool de disparo 2
	var Objetivo2=[1.0,1.0,1.0]; 	//auxiliar posicion Proyectil 2

	var contador = 0;

	var PuntosP1 = 0;
	var PuntosP2 = 0;

	var Pausa = false;
	let star;
	var stars;
	let starGeo;
	var ParticulaActiva = false;

	function setupScene() {		
		var visibleSize = { width: 900, height: 800};
		
		clock = new THREE.Clock();
		rayCaster1 = new THREE.Raycaster();
		rayCaster2 = new THREE.Raycaster();
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);
		camera.position.z = -2;
		camera.position.y = 5;

		renderer = new THREE.WebGLRenderer( {precision: "mediump" } );
		renderer.setClearColor(new THREE.Color(0, 0, 0));
		renderer.setPixelRatio(visibleSize.width / visibleSize.height);
		renderer.setSize(visibleSize.width, visibleSize.height);

		var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
		scene.add(ambientLight);

		var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 0.4);
		directionalLight.position.set(0, 0, 1);
		scene.add(directionalLight);

		// PARTICULA
		starGeo = new THREE.Geometry();
		for(let i=0;i<6000;i++) {
		  star = new THREE.Vector3(
		    Math.random() * 600 - 300,
		    Math.random() * 600 - 300,
		    Math.random() * 600 - 300
		  );
		  star.velocity = 0;
		  star.acceleration = 0.002;
		  starGeo.vertices.push(star);
		}

		let sprite = new THREE.TextureLoader().load( 'Recursos/star2.png' );
		let starMaterial = new THREE.PointsMaterial({
		  size: 0.9,
		  map: sprite,
		  blending: THREE.AdditiveBlending, 
		  depthTest:false, 
		  transparent:true 
		});

		stars = new THREE.Points(starGeo,starMaterial);	
		//FIN DE PARTICULA

		//AQUI COMIENZA CODIGO DE SKYDOME
		var geometraEsfera = new THREE.SphereGeometry(100, 60, 40);  
		var uniforms = {  
  		texture: { type: 't', value: THREE.ImageUtils.loadTexture('Recursos/sky.jpg') }
		};

		var materialEsfera = new THREE.ShaderMaterial( {  
		  uniforms:       uniforms,
		  vertexShader:   document.getElementById('sky-vertex').textContent,
		  fragmentShader: document.getElementById('sky-fragment').textContent
		});

		var skyDome = new THREE.Mesh(geometraEsfera, materialEsfera); 
		skyDome.position=(0,0,0); 
		skyDome.scale.set(-1, 1, 1);  
		skyDome.eulerOrder = 'XZY';  
		skyDome.renderDepth = 1000.0;  
		scene.add(skyDome);  
		skyDome.name="Sky";
		//AQUI ACABA CODIGO DE SKYDOME

		$("#escena").append("<div id='canvas'/>");
		$("#canvas").append(renderer.domElement);
	}

	function render() {
		requestAnimationFrame(render);
		deltaTime = clock.getDelta();	
		
			if (keys["B"]) {
				var valor = scene.getObjectByName("Target2");
				console.log(valor.position);
			}
		if (!Pausa && Tiempo > 0 && Inicio){
			if (keys["A"]) {
				var puntero = scene.getObjectByName("Target1");
				if(LimitesCursor(puntero,"Izquierda")){
						MueveTarget1Izquierda();
				}	
			}
			if (keys["D"]) {	
				var puntero = scene.getObjectByName("Target1");
				if(LimitesCursor(puntero,"Derecha")){
						MueveTarget1Derecha();
				}
			}
			if (keys["W"]) {
				var puntero = scene.getObjectByName("Target1");
				if(LimitesCursor(puntero,"Arriba")){
						MueveTarget1Arriba();
				}
			}
			if (keys["S"]) {
				var puntero = scene.getObjectByName("Target1");
				if(LimitesCursor(puntero,"Abajo")){
						MueveTarget1Abajo();
				}
			}
			
			if (keys["V"]) {
				//console.log("Disparo Player 1");
				if(!Disparo1){
					Disparo1=true;
					var aux = scene.getObjectByName("Target1");
					Objetivo1[0] = aux.position.x;
					Objetivo1[1] = aux.position.y;
					Objetivo1[2] = -43.0;
				}
			}	

			if(Jugadores == 2){
				var Jugador2 = scene.getObjectByName("Target2");
					if(keys["U"]){
						var puntero = scene.getObjectByName("Target2");
						if(LimitesCursor(puntero,"Arriba")){
								MueveTarget2Arriba();
						}
					}
					if(keys["H"]){
						var puntero = scene.getObjectByName("Target2");
						if(LimitesCursor(puntero,"Izquierda")){
								MueveTarget2Izquierda();
						}
					}
					if(keys["K"]){
						var puntero = scene.getObjectByName("Target2");
						if(LimitesCursor(puntero,"Derecha")){
								MueveTarget2Derecha();
						}
					}
					if(keys["J"]){
						var puntero = scene.getObjectByName("Target2");
						if(LimitesCursor(puntero,"Abajo")){
								MueveTarget2Abajo();
						}
					}
					if(keys["P"]){
						//console.log("Disparo Player 2");
						DispararTarget2();
					}
				}	//fin de if jugador2

		} //fin condicion de pausa y solo si el juego esta listo
			
	
		if (isWorldReady[0]&&isWorldReady[1]&&isWorldReady[2]) {
			
			//LogicaJuego();
			//logica de tiempo
			if(!InicializaTimer){
				InicializaTimer=true;
				Inicio=true;
				function FunAux(){
				TiempoDiana();
				}
				Ticks = setInterval(FunAux, 500);
				Musica();
				//LevantaTodo();	//Recordatorio: QUITAR ESTO SI NO ES PRUEBA DE POSICION
			}
			
			if(Inicio){
				if(Dificultad==0){
					Facil();	//evitar el tiempo de espera de contador en facil
				}		
			}	
		
		//mover cielo
		var cielo = scene.getObjectByName("Sky");
		cielo.rotation.y += THREE.Math.degToRad(0.01);
		} //cierre del isworldready

		//Si el juego esta en pausa no sigas moviendo los proyectiles
		if(!Pausa){
		InteligenciaArtificial();
		MueveProyectil1();
		MueveProyectil2();
		Final();			//acaba la ejecucion
		}

		if(ParticulaActiva){
			PlayParticula();
		}
						

		renderer.render(scene, camera);
	
	}

		function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath(path);
		mtlLoader.load(mtlFile, (materials) => {
			
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath(path);
			objLoader.load(objFile, (object) => {
				onLoadCallback(object);
			});

		});
	}

	function onKeyDown(event) {
		keys[String.fromCharCode(event.keyCode)] = true;
	}
	function onKeyUp(event) {
		keys[String.fromCharCode(event.keyCode)] = false;
	}

	function MueveProyectil1(){
		if(Disparo1){
			//valores de la posicion original -10, 5 , -15
			var x = -5.0;
			var y = 5.0;
			var z = -15.0;

			//posicion destino
			var x1 = Objetivo1[0];
			var y1 = Objetivo1[1];
			var z1 = Objetivo1[2];


			var moverseX = x1 - x;
			var moverseY = y1 - y;
			var moverseZ = z1 - z;

			//velocidad: para que se usara para añadirse + /10
			moverseX=(moverseX/15);
			moverseY=(moverseY/15);
			moverseZ=(moverseZ/15);

			//sumar movimiento disminuido (para no hacer teleport al proyectil con posicion objetivo)
			var objeto = scene.getObjectByName("Proyectil1");
			objeto.position.x+=moverseX;
			objeto.position.y+=moverseY;
			objeto.position.z+=moverseZ;

			//Para no checar siempre la colision, solo revisar cuando este en Z -35 al menos
			if(objeto.position.z <= -35.0){
				ColisionDisparo1(objeto);
			}

			//Si uno llega a la posicion, todos los demas tambien lo hicieron
			if(objeto.position.z <= z1 || objeto.position.z<=-50){
				Disparo1=false;
				objeto.position.x = -5.0;
				objeto.position.y = 5.0;
				objeto.position.z = -15.0;
			}
		} // fin de logica de disparo
	}

	function MueveProyectil2(){
		if(Disparo2){
			//valores de la posicion original -10, 5 , -15
			var x = 5.0;
			var y = 5.0;
			var z = -15.0;

			//posicion destino
			var x1 = Objetivo2[0];
			var y1 = Objetivo2[1];
			var z1 = Objetivo2[2];


			var moverseX = x1 - x;
			var moverseY = y1 - y;
			var moverseZ = z1 - z;

			//velocidad: para que se usara para añadirse + /10
			moverseX=(moverseX/15);
			moverseY=(moverseY/15);
			moverseZ=(moverseZ/15);

			//sumar movimiento disminuido (para no hacer teleport al proyectil con posicion objetivo)
			var objeto = scene.getObjectByName("Proyectil2");
			objeto.position.x+=moverseX;
			objeto.position.y+=moverseY;
			objeto.position.z+=moverseZ;
		
			//Para no checar siempre la colision, solo revisar cuando este en Z -35 al menos
			if(objeto.position.z <= -35.0){
				ColisionDisparo2(objeto);
			}


			//Si uno llega a la posicion, todos los demas tambien lo hicieron
			if(objeto.position.z <= z1 || objeto.position.z<=-50){
				Disparo2=false;
				objeto.position.x = 5.0;
				objeto.position.y = 5.0;
				objeto.position.z = -15.0;
			}
		} // fin de logica de disparo
	}

	function ColisionDisparo1(objeto){
			
			var Lugar1 = scene.getObjectByName("Diana1");
			var Lugar2 = scene.getObjectByName("Diana2");
			var Lugar3 = scene.getObjectByName("Diana3");
			var Lugar4 = scene.getObjectByName("Diana4");
			var Lugar5 = scene.getObjectByName("Diana5");
			var Lugar6 = scene.getObjectByName("Diana6");
			var Lugar7 = scene.getObjectByName("Diana7");
			var Lugar8 = scene.getObjectByName("Diana8");
			var Lugar9 = scene.getObjectByName("Diana9");
			var Lugar10 = scene.getObjectByName("Diana10");
			var Lugar11 = scene.getObjectByName("Diana11");
			var Lugar12 = scene.getObjectByName("Diana12");

			for(var i = 0; i<objeto.rayo.length;i++){
				//console.log(Dianas[i].position);
				var rayo = objeto.rayo[i];
				rayCaster1.set(objeto.position, rayo);
				//console.log(objeto.position);
				var colision = rayCaster1.intersectObject(Lugar1,true);
				
				if(colision.length > 0 && colision[0].distance < 5){
					console.log("Colision con Diana: 1");
					if(Activos[0]){ 
					Activos[0]=false;
					Lugar1.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}	
				}
				colision = rayCaster1.intersectObject(Lugar2,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 2");
					if(Activos[1]){ 
					Activos[1]=false;
					Lugar2.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}	
				}
				colision = rayCaster1.intersectObject(Lugar3,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 3");
					if(Activos[2]){ 
					Activos[2]=false;
					Lugar3.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}	
				}
				colision = rayCaster1.intersectObject(Lugar4,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log(colision);
				console.log("Colision con Diana: 4");
					if(Activos[3]){ 
					Activos[3]=false;
					Lugar4.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}	
				}
				colision = rayCaster1.intersectObject(Lugar5,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 5");
					if(Activos[4]){ 
					Activos[4]=false;
					Lugar5.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}	
				}	
				colision = rayCaster1.intersectObject(Lugar6,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 6");
					if(Activos[5]){ 
					Activos[5]=false;
					Lugar6.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}
				}	
				colision = rayCaster1.intersectObject(Lugar7,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 7");
					if(Activos[6]){ 
					Activos[6]=false;
					Lugar7.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}
				}	
				colision = rayCaster1.intersectObject(Lugar8,true);						
					if(colision.length > 0 && colision[0].distance < 5){
					console.log("Colision con Diana: 8");
					if(Activos[7]){ 
					Activos[7]=false;
					Lugar8.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}
				}	
				colision = rayCaster1.intersectObject(Lugar9,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 9");
					if(Activos[8]){ 
					Activos[8]=false;
					Lugar9.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}
				}	
				colision = rayCaster1.intersectObject(Lugar10,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 10");
					if(Activos[9]){ 
					Activos[9]=false;
					Lugar10.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}
				}	
				colision = rayCaster1.intersectObject(Lugar11,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 11");
					if(Activos[10]){ 
					Activos[10]=false;
					Lugar11.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}
				}	
				colision = rayCaster1.intersectObject(Lugar12,true);						
				if(colision.length > 0 && colision[0].distance < 5){
					console.log("Colision con Diana: 12");
					if(Activos[11]){ 
					Activos[11]=false;
					Lugar12.rotation.x = THREE.Math.degToRad(-90);
					PuntosP1++;
					SonidoDiana();
					}
				}	
		} //fin de for
	}

	function ColisionDisparo2(objeto){
			
			var Lugar1 = scene.getObjectByName("Diana1");
			var Lugar2 = scene.getObjectByName("Diana2");
			var Lugar3 = scene.getObjectByName("Diana3");
			var Lugar4 = scene.getObjectByName("Diana4");
			var Lugar5 = scene.getObjectByName("Diana5");
			var Lugar6 = scene.getObjectByName("Diana6");
			var Lugar7 = scene.getObjectByName("Diana7");
			var Lugar8 = scene.getObjectByName("Diana8");
			var Lugar9 = scene.getObjectByName("Diana9");
			var Lugar10 = scene.getObjectByName("Diana10");
			var Lugar11 = scene.getObjectByName("Diana11");
			var Lugar12 = scene.getObjectByName("Diana12");

			for(var i = 0; i<objeto.rayo.length;i++){
				//console.log(Dianas[i].position);
				var rayo = objeto.rayo[i];
				rayCaster2.set(objeto.position, rayo);
				//console.log(objeto.position);
				var colision = rayCaster2.intersectObject(Lugar1,true);
				
				if(colision.length > 0 && colision[0].distance < 5){
					console.log("Colision con Diana: 1");
					if(Activos[0]){ 
					Activos[0]=false;
					Lugar1.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}	
				}
				colision = rayCaster2.intersectObject(Lugar2,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 2");
					if(Activos[1]){ 
					Activos[1]=false;
					Lugar2.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}	
				}
				colision = rayCaster2.intersectObject(Lugar3,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 3");
					if(Activos[2]){ 
					Activos[2]=false;
					Lugar3.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}	
				}
				colision = rayCaster2.intersectObject(Lugar4,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log(colision);
				console.log("Colision con Diana: 4");
					if(Activos[3]){ 
					Activos[3]=false;
					Lugar4.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}	
				}
				colision = rayCaster2.intersectObject(Lugar5,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 5");
					if(Activos[4]){ 
					Activos[4]=false;
					Lugar5.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}	
				}	
				colision = rayCaster2.intersectObject(Lugar6,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 6");
					if(Activos[5]){ 
					Activos[5]=false;
					Lugar6.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}
				}	
				colision = rayCaster2.intersectObject(Lugar7,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 7");
					if(Activos[6]){ 
					Activos[6]=false;
					Lugar7.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}
				}	
				colision = rayCaster2.intersectObject(Lugar8,true);						
					if(colision.length > 0 && colision[0].distance < 5){
					console.log("Colision con Diana: 8");
					if(Activos[7]){ 
					Activos[7]=false;
					Lugar8.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}
				}	
				colision = rayCaster2.intersectObject(Lugar9,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 9");
					if(Activos[8]){ 
					Activos[8]=false;
					Lugar9.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}
				}	
				colision = rayCaster2.intersectObject(Lugar10,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 10");
					if(Activos[9]){ 
					Activos[9]=false;
					Lugar10.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}
				}	
				colision = rayCaster2.intersectObject(Lugar11,true);						
				if(colision.length > 0 && colision[0].distance < 5){
				console.log("Colision con Diana: 11");
					if(Activos[10]){ 
					Activos[10]=false;
					Lugar11.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}
				}	
				colision = rayCaster2.intersectObject(Lugar12,true);						
				if(colision.length > 0 && colision[0].distance < 5){
					console.log("Colision con Diana: 12");
					if(Activos[11]){ 
					Activos[11]=false;
					Lugar12.rotation.x = THREE.Math.degToRad(-90);
					PuntosP2++;
					SonidoDiana();
					}
				}	
		} //fin de for
	}


	function Escenario(scene){

		loadOBJWithMTL("models/Modelos/", "Diana.obj", "Diana.mtl", (object) => {
			object.position.x = -17.5;
			object.position.y = 10.5;
			object.position.z = -43;
			scene.add(object);
			//PRIMER FILA DIANAS						

			var Diana2 = object.clone();
			Diana2.position.x=-10.5;
			Diana2.position.y = 10.5;
			Diana2.position.z=-43;

			var Diana3 = object.clone();
			Diana3.position.x=-3.5;
			Diana3.position.y = 10.5;
			Diana3.position.z=-43;

			var Diana4 = object.clone();
			Diana4.position.x=3.5;
			Diana4.position.y = 10.5;
			Diana4.position.z=-43;

			var Diana5 = object.clone();
			Diana5.position.x=10.5;
			Diana5.position.y = 10.5;
			Diana5.position.z=-43;

			var Diana6 = object.clone();
			Diana6.position.x=17.5;
			Diana6.position.y = 10.5;
			Diana6.position.z=-43;

			//SEGUNDA FILA DIANAS
			var Diana7 = object.clone();
			Diana7.position.x=-17.5;
			Diana7.position.y=0;
			Diana6.position.z=-43;

			var Diana8 = object.clone();
			Diana8.position.x=-10.5;
			Diana8.position.y=0;
			Diana8.position.z=-43;

			var Diana9 = object.clone();
			Diana9.position.x=-3.5;
			Diana9.position.y=0;
			Diana9.position.z=-43;

			var Diana10 = object.clone();
			Diana10.position.x=3.5;
			Diana10.position.y=0;
			Diana10.position.z=-43;

			var Diana11 = object.clone();
			Diana11.position.x=10.5;
			Diana11.position.y=0;
			Diana11.position.z=-43;

			var Diana12 = object.clone();
			Diana12.position.x=17.5;
			Diana12.position.y=0;
			Diana12.position.z=-43;
	
			object.name="Diana1";
			Diana2.name="Diana2";
			Diana3.name="Diana3";
			Diana4.name="Diana4";
			Diana5.name="Diana5";
			Diana6.name="Diana6";
			Diana7.name="Diana7";
			Diana8.name="Diana8";
			Diana9.name="Diana9";
			Diana10.name="Diana10";
			Diana11.name="Diana11";
			Diana12.name="Diana12";
	
			Dianas.push(object);
			Dianas.push(Diana2);
			Dianas.push(Diana3);
			Dianas.push(Diana4);
			Dianas.push(Diana5);
			Dianas.push(Diana6);
			Dianas.push(Diana7);
			Dianas.push(Diana8);
			Dianas.push(Diana9);
			Dianas.push(Diana10);
			Dianas.push(Diana11);
			Dianas.push(Diana12);

			scene.add(Diana2);
			scene.add(Diana3);
			scene.add(Diana4);
			scene.add(Diana5);
			scene.add(Diana6);
			scene.add(Diana7);
			scene.add(Diana8);
			scene.add(Diana9);
			scene.add(Diana10);
			scene.add(Diana11);
			scene.add(Diana12);

			//AnclaDiana1.rotation.x= THREE.Math.degToRad(20);
			isWorldReady[1] = true;
			});

		loadOBJWithMTL("models/Modelos/", "Galeria.obj", "Galeria.mtl", (object) => {
								object.position.z = -40;			
								scene.add(object);
								isWorldReady[0] = true;
								});

							loadOBJWithMTL("models/Modelos/targets/Player1/", "target.obj", "target.mtl", (object) => {
								object.position.z = -40.0;
								object.position.x = -10;
								object.position.y = 0;
								object.name="Target1";
								scene.add(object);															
								isWorldReady[2] = true;
								});

							loadOBJWithMTL("models/Modelos/targets/Player2/", "target.obj", "target.mtl", (object) => {
								object.position.z = -40; //era -30.5
								object.position.x = 10;
								object.name="Target2";
								if(Jugadores == 1){
								//si entra aqui escogió facil
								object.position.z =-100;
								}
								//si entra aqui escogió entrenamiento
								if(Jugadores == 2 || CPU){
								object.position.z =-40;
								}
								
									
								scene.add(object);
								//AnclaDiana1.rotation.x= THREE.Math.degToRad(20);
								isWorldReady[3] = true;
								});

							var P_Material1 = new THREE.MeshLambertMaterial( { color: new THREE.Color(1,0,1) });
							var P_Material2 = new THREE.MeshLambertMaterial( { color: new THREE.Color(0,1,1) });
					
							var figura = new THREE.BoxGeometry(0.5, 0.5, 0.5);
						
							var Proyectil1 = new THREE.Mesh(figura,P_Material1);
							Proyectil1.position.x =-5;
							Proyectil1.position.y = 5;
							Proyectil1.position.z =-15;
							Proyectil1.rayo = [new THREE.Vector3(0,0,-1)];
							var Proyectil2 = new THREE.Mesh(figura,P_Material2);
							Proyectil2.position.x = 5;
							Proyectil2.position.y = 5;
							if(Jugadores == 1){
							//si entra aqui escogió facil
							Proyectil2.position.z =-100;
							}
							//si entra aqui escogió entrenamiento o 2 jugadores
							if(Jugadores == 2 || CPU){
							Proyectil2.position.z =-15;
							}
							
							
							Proyectil2.rayo = [new THREE.Vector3(0,0,-1)];

							Proyectil1.name="Proyectil1";
							Proyectil2.name="Proyectil2";
							scene.add(Proyectil1);
							scene.add(Proyectil2);
	}


	function Entrenamiento(){
		//si es aqui quitar el segundo proyectil de pantalla
		var objeto = scene.getObjectByName("Proyectil2");
		
	}

	function Facil(){
		//en caso de derribar dianas poner el contador en 0 para abrir una nueva, solo si la escena esta lista
		if(Inicio && Tiempo > 0 && isWorldReady[0]&&isWorldReady[1]&&isWorldReady[2]){
			//Revisar dianas
			if(!Activos[0] && !Activos[1] && !Activos[2] && !Activos[3] && !Activos[4] && !Activos[5]){
				//revisar segunda fila
				if(!Activos[6] && !Activos[7] && !Activos[8] && !Activos[9] && !Activos[10] && !Activos[11]){
					contador=0;
					TiempoDiana();

				}
			}
		}
	}


	function RandomEntero(){
		var random = Math.floor(Math.random() * 12 + 1);
		random = random - 1;
		return random;
	}

	function BajaTodo(){
		for(var i = 0 ; i < Dianas.length; i++){
		Dianas[i].rotation.x = THREE.Math.degToRad(-90);
		Activos[i]=false;	
		}
	}

	function LevantaDiana(){
		var i = RandomEntero();
		Dianas[i].rotation.x = THREE.Math.degToRad(0);
		Activos[i]=true;
	}

	function TiempoDiana(){
		if(Inicio && !Pausa){ //si el juego esta listo y no esta en pausa
			console.log("Este es el tick");
		if(Dificultad == 2){
			//Modo Dificil
						if (contador == 5){
						//la diana lleva 2 segundos activa, reinicia (en el segundo 2.5 hace esto)
						contador = 0;
						}
			}else{
		if(Dificultad==1){
						//Modo Medio
						if (contador == 7){
						//la diana lleva 3 segundos activa, reinicia (en el segundo 3.5 hace esto)
						contador = 0;
						}

				}else{

		if(Dificultad==0){
						//Modalidad Facil
						if(contador == 11){
						//la diana lleva 5 segundos activa, reinicia (en el segundo 5.5 hace esto)
						contador = 0;
						}

					}			
				}
			}

		//Desactivacion y activacion de diana
					if(contador == 0){
						BajaTodo();
						LevantaDiana();
						}
			
					
					//Restar Tiempo
					if(contador==0||contador==2||contador==4||contador==6||contador==8||contador==10||contador==12){
						//cada 2 veces que entre al timer de 500ms sera 1 segundo real 
						//los posibles datos que puede habier aqui son 0,2,4,6,8 (este ultimo es imposible pero no esta de mas)
						Tiempo--;
						}
					//aumenta contador
					contador++;

		}	//fin de inicio
	} //fin de funcion Tiempo Diana

	function Final(){
		//si el mundo esta cargado
		if(isWorldReady[0]&&isWorldReady[1]&&isWorldReady[2]){
				if(Inicio && !Pausa){ // el timer esta corriendo y no está em pausa
						if(Tiempo == 0){
							//el tiempo ya es 0
							if(Inicio){
								Inicio = false;			//detiene el juego
								clearInterval(Ticks);	//borra contador
								BajaTodo();
								console.log("Puntuacion de Jugador 1:" + (PuntosP1));
								console.log("Puntuacion de Jugador 2:" + (PuntosP2));
								ReproduceFinal();
								AltaPuntuacionDificultad();
								scene.add(stars);
								ParticulaActiva = true;
								//alert("Fin de Juego");
					}
						
				}
			}
		}
	}

	

	function MueveTarget2Arriba(){
		var Extra = VelocidadExtra();		
		var Jugador2 = scene.getObjectByName("Target2");
		Jugador2.position.y+=(0.1+Extra);
	}
	function MueveTarget2Abajo(){
		var Extra = VelocidadExtra();
		var Jugador2 = scene.getObjectByName("Target2");
		Jugador2.position.y-=(0.1+Extra);
	}
	function MueveTarget2Derecha(){
		var Extra = VelocidadExtra();
		var Jugador2 = scene.getObjectByName("Target2");
		Jugador2.position.x+=(0.1+Extra);
	}
	function MueveTarget2Izquierda(){
		var Extra = VelocidadExtra();
		var Jugador2 = scene.getObjectByName("Target2");
		Jugador2.position.x-=(0.1+Extra);
	}
	function MueveTarget1Arriba(){
		var Extra = VelocidadExtra();
		var Jugador1 = scene.getObjectByName("Target1");
		Jugador1.position.y+=(0.1+Extra);
	}
	function MueveTarget1Abajo(){
		var Extra = VelocidadExtra();
		var Jugador1 = scene.getObjectByName("Target1");
		Jugador1.position.y-=(0.1+Extra);
	}
	function MueveTarget1Derecha(){
		var Extra = VelocidadExtra();
		var Jugador1 = scene.getObjectByName("Target1");
		Jugador1.position.x+=(0.1+Extra);
	}
	function MueveTarget1Izquierda(){
		var Extra = VelocidadExtra();
		var Jugador1 = scene.getObjectByName("Target1");
		Jugador1.position.x-=(0.1+Extra);
	}

	function AltaPuntuacionDificultad(){
		// hay que saber si jugo en la dificultad media o dificil
		if(Dificultad==2||Dificultad==1){
			if(Jugadores==1){ //solo guardar puntuaciones de modo solitario y si es mayor a 1
				if(PuntosP1>0){
					//alert("Es candidato");
					var minombre = localStorage.getItem("NombrePlayer1");
					RegistraPuntuacion(minombre,PuntosP1,Dificultad);
					//console.log("Revisa la base de datos");
				}
			}
		}

	}

	function RegistraPuntuacion(n, p, d) {
			// Objeto en formato JSON el cual le enviaremos al webservice (PHP)
			var dataToSend = {
				//..
				action: "RegistraPuntuacion",
				nombre: n,
				puntos: p,
				dificultad: d
			};
			$.ajax({
				url: "webservice/webservice.php",
				async: true,
				type: 'POST',
				data: dataToSend, 
				success: function (data){
					//alert(data);
				}
			});
		}

	function SonidoDiana(){
			const listener = new THREE.AudioListener();
			const sound = new THREE.Audio( listener );
			const audioLoader = new THREE.AudioLoader();
			audioLoader.load( 'audio/impacto.mp3', function( buffer ) {
			sound.setBuffer( buffer );
			sound.setVolume( 0.55);
			sound.play();
			});		
	}

	function Musica(){
			const listener1 = new THREE.AudioListener();
			const sound = new THREE.Audio( listener1 );
			const audioLoader = new THREE.AudioLoader();
			audioLoader.load( 'audio/HiddenVillageTW.mp3', function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( true );
			sound.setVolume( 0.55 );
			sound.play();
		});	

	}

	function EmpateDerrota(){
		const listener = new THREE.AudioListener();
		const sound = new THREE.Audio( listener );
		const audioLoader = new THREE.AudioLoader();
		audioLoader.load( 'audio/Draw.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setVolume( 0.75);
		sound.play();
		});
	}

	function Victoria(){
		const listener = new THREE.AudioListener();
		const sound = new THREE.Audio( listener );
		const audioLoader = new THREE.AudioLoader();

		MusicaFondo=true;
		audioLoader.load( 'audio/Winner.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setVolume( 0.75);
		sound.play();	
		});
	}

	function ReproduceFinal(){

		if(Jugadores==1 && CPU){
						//Perdio contra la IA
					if(PuntosP2>PuntosP1 || PuntosP2==PuntosP1 || PuntosP1 == 0){
						EmpateDerrota();
						PantallaFacil(PuntosP1);
					}else{
						//Le gano a la IA
						if(PuntosP1>PuntosP2){
							Victoria();
							PantallaFacil(PuntosP1);
					}
				}
			}

			if(Jugadores==1 && !CPU){	//solitario, no esta contra la IA de Facil
						if(Dificultad==0){
								if(PuntosP1>0)
								Victoria();
								else
								EmpateDerrota();
								//aqui llamar a puntuacion individual
								PantallaFacil(PuntosP1);
							}
						if(Dificultad==1){
								if(PuntosP1>0)
								Victoria();
								else
								EmpateDerrota();
								//aqui llamar a puntuacion individual
								PantallaMedia(PuntosP1);
						}
						if(Dificultad==2){
								if(PuntosP1>0)
								Victoria();
								else
								EmpateDerrota();
								//aqui llamar a puntuacion individual
								PantallaDificil(PuntosP1);							
						}
			}						
									
								

				if(Jugadores==2){
					if(Dificultad==2){
						//quien gano?
								if(PuntosP1>PuntosP2){
									Victoria();
									var nombrejugador = localStorage.getItem("NombrePlayer1");
									PantallaMultijugador(nombrejugador,PuntosP1);
									}
								if(PuntosP2>PuntosP1){
									Victoria();
									var nombrejugador = localStorage.getItem("NombrePlayer2");
									PantallaMultijugador(nombrejugador,PuntosP2);
									}
								if(PuntosP1==PuntosP2){
									EmpateDerrota();
									PantallaEmpate();
								}
					}

					if(Dificultad==1){
									//quien gano?
									if(PuntosP1>PuntosP2){
										Victoria();
										var nombrejugador = localStorage.getItem("NombrePlayer1");
										PantallaMultijugador(nombrejugador,PuntosP1);
									}
									if(PuntosP2>PuntosP1){
										Victoria();
										var nombrejugador = localStorage.getItem("NombrePlayer2");
										PantallaMultijugador(nombrejugador,PuntosP2);
									}
									if(PuntosP1==PuntosP2){
										EmpateDerrota();
										PantallaEmpate();
									}
	
					}
				}//fin jugadores 2
						
			}//fin funcion
	
		


	function VelocidadExtra(){
			var velocidadExtra = 0;
			if(Dificultad==1)
			return 0.1; 	//cambiar a 0.1 en media
			else if(Dificultad==2)
			return 0.1;		//cambiar a 0.1 en dificil
			else return 0.0;
	}

	function LimitesCursor(objetoTarget, direccion){
		objetoTarget.position.x;
			if(direccion=="Izquierda"){
				if(objetoTarget.position.x> - 22.5)	//esquina izqueirda
				return true;
				else
				return false;
			}
			if(direccion=="Derecha"){
				if(objetoTarget.position.x < 22.5)	//esquinaderecha
				return true;
				else
				return false;
			}
			if(direccion=="Arriba"){
				if(objetoTarget.position.y < 15.7)	//Limite Superior
				return true;
				else
				return false;
			}

			if(direccion=="Abajo"){
				if(objetoTarget.position.y > -3.10)	//Limite Inferior
				return true;
				else
				return false;
			}
		
			return false;	//pos si las dudas
	}

	function LevantaTodo(){
		for(var i = 0; i< Activos.length;i++){
			Activos[i]=true;
			Dianas[i].rotation.x=THREE.Math.degToRad(0);
		}
	}

	function DispararTarget2(){
		if(!Disparo2){
		Disparo2=true;
		var aux = scene.getObjectByName("Target2");
		Objetivo2[0] = aux.position.x;
		Objetivo2[1] = aux.position.y;
		Objetivo2[2] = -43.0;
		}
	}

	function InteligenciaArtificial(){
		if(Dificultad==0 && CPU && contador > 2){
			var mover = scene.getObjectByName("Target2");
			//Inteligencia Artificial Activa
				if(Activos[0]){					
				//si la diana 1 está activa, posicion -17.59 , 14.69
					if(mover.position.x > -17.799999999999965)
						MueveTarget2Izquierda();
						else				
					if(mover.position.x < -17.799999999999965)
						MueveTarget2Derecha();

					if(mover.position.y > 14.899999999999963)
						MueveTarget2Abajo();
					else
					if(mover.position.y < 14.899999999999963)
						MueveTarget2Arriba();

					if(mover.position.x == -17.799999999999965 && mover.position.y == 14.899999999999963)
						DispararTarget2();
				}else{
					if(Activos[1]){
					//si la Diana 2 está activa
					if(mover.position.x > -9.899999999999963)
						MueveTarget2Izquierda();
						else				
					if(mover.position.x < -9.899999999999963)
						MueveTarget2Derecha();

					if(mover.position.y > 14.899999999999963)
						MueveTarget2Abajo();
					else
					if(mover.position.y < 14.899999999999963)
						MueveTarget2Arriba();

					if(mover.position.x == -9.899999999999963 && mover.position.y == 14.899999999999963)
						DispararTarget2();
					}else{
							if(Activos[2]){
								//si la Diana 3 está activa
								if(mover.position.x > -3.299999999999983)
									MueveTarget2Izquierda();				
								if(mover.position.x < -3.299999999999983)
									MueveTarget2Derecha();
								if(mover.position.y > 14.899999999999963)
									MueveTarget2Abajo();
								if(mover.position.y < 14.899999999999963)
									MueveTarget2Arriba();
								if(mover.position.x == -3.299999999999983 && mover.position.y == 14.899999999999963)
									DispararTarget2();
							}else{
								if(Activos[3]){
									//si la Diana 4 está activa
									if(mover.position.x > 3.400000000000021)
										MueveTarget2Izquierda();				
									if(mover.position.x < 3.400000000000021)
										MueveTarget2Derecha();
									if(mover.position.y > 14.899999999999963)
										MueveTarget2Abajo();
									if(mover.position.y < 14.899999999999963)
										MueveTarget2Arriba();
									if(mover.position.x == 3.400000000000021 && mover.position.y == 14.899999999999963)
										DispararTarget2();
							}else{
								if(Activos[4]){
									//si la Diana 5 está activa
									if(mover.position.x > 10)
										MueveTarget2Izquierda();
										else				
									if(mover.position.x < 10)
										MueveTarget2Derecha();

									if(mover.position.y > 14.899999999999963)
										MueveTarget2Abajo();
									else
									if(mover.position.y < 14.899999999999963)
										MueveTarget2Arriba();

									if(mover.position.x == 10 && mover.position.y == 14.899999999999963)
										DispararTarget2();
								}else{
										if(Activos[5]){
										//si la Diana 6 está activa
										if(mover.position.x > 16.599999999999987)
											MueveTarget2Izquierda();	
											else			
										if(mover.position.x < 16.599999999999987)
											MueveTarget2Derecha();

										if(mover.position.y > 14.899999999999963)
											MueveTarget2Abajo();
										else
										if(mover.position.y < 14.899999999999963)
											MueveTarget2Arriba();

										if(mover.position.x == 16.599999999999987  && mover.position.y == 14.899999999999963)
											DispararTarget2();
									}else{
										if(Activos[6]){
											//diana7
										if(mover.position.x > -16.899999999999952)
											MueveTarget2Izquierda();	
											else			
										if(mover.position.x < -16.899999999999952)
											MueveTarget2Derecha()
										if(mover.position.y >  4.799999999999999)
											MueveTarget2Abajo();
										else
										if(mover.position.y <  4.799999999999999)
											MueveTarget2Arriba()
										if(mover.position.x == -16.899999999999952  && mover.position.y ==  4.799999999999999)
													DispararTarget2();
									}else{
										if(Activos[7]){
												//diana8
										if(mover.position.x > -9.999999999999963)
											MueveTarget2Izquierda();	
											else			
										if(mover.position.x < -9.999999999999963)
											MueveTarget2Derecha();
										if(mover.position.y >  4.799999999999999)
											MueveTarget2Abajo();
										else
										if(mover.position.y <  4.799999999999999)
											MueveTarget2Arriba();
										if(mover.position.x == -9.999999999999963  && mover.position.y ==  4.799999999999999)
														DispararTarget2();
									}else{
										if(Activos[8]){
												//diana9
										if(mover.position.x > -3.199999999999983)
											MueveTarget2Izquierda();	
											else			
										if(mover.position.x < -3.199999999999983)
											MueveTarget2Derecha();
										if(mover.position.y >  4.799999999999999)
											MueveTarget2Abajo();
										else
										if(mover.position.y <  4.799999999999999)
											MueveTarget2Arriba();
										if(mover.position.x == -3.199999999999983  && mover.position.y ==  4.799999999999999)
											DispararTarget2();
									}else{
										if(Activos[9]){
												//diana10
										if(mover.position.x > 3.3000000000000207)
											MueveTarget2Izquierda();	
											else			
										if(mover.position.x < 3.3000000000000207)
											MueveTarget2Derecha();
										if(mover.position.y >  4.799999999999999)
											MueveTarget2Abajo();
										else
										if(mover.position.y <  4.799999999999999)
											MueveTarget2Arriba();
										if(mover.position.x == 3.3000000000000207  && mover.position.y ==  4.799999999999999)
											DispararTarget2();
									}else{
										if(Activos[10]){
												//diana11
										if(mover.position.x > 9.8)
											MueveTarget2Izquierda();	
											else			
										if(mover.position.x < 9.8)
											MueveTarget2Derecha();
										if(mover.position.y >  4.799999999999999)
											MueveTarget2Abajo();
										else
										if(mover.position.y <  4.799999999999999)
											MueveTarget2Arriba();
										if(mover.position.x == 9.8  && mover.position.y ==  4.799999999999999)
											DispararTarget2();
									}else{
										if(Activos[11]){
													//diana12
										if(mover.position.x > 16.399999999999984)
											MueveTarget2Izquierda();	
											else			
										if(mover.position.x < 16.399999999999984)
											MueveTarget2Derecha();
										if(mover.position.y >  4.799999999999999)
											MueveTarget2Abajo();
										else
										if(mover.position.y < 4.799999999999999)
											MueveTarget2Arriba();
										if(mover.position.x == 16.399999999999984  && mover.position.y == 4.799999999999999)
											DispararTarget2();
															}
														}
													}
												}
											}
										}

									}
								}
							}
						}
					}
				}																		
		} //sin de condicion
	} //fin de funcion


function CompartirEnFacebook(){
	var nombre;
	if(Jugadores==2){
		if(PuntosP1 > PuntosP2){
			nombre = localStorage.getItem("NombrePlayer2");
			if(Dificultad==2)
			shareScoreRival(nombre,PuntosP1,"Dificil");
			else
				if(Dificultad==1)
					shareScoreRival(nombre,PuntosP1,"Media");
		}else{
			if(PuntosP2 > PuntosP1){
				nombre = localStorage.getItem("NombrePlayer1");
				if(Dificultad==2)
				shareScoreRival(nombre,PuntosP2,"Dificil");
				else
					if(Dificultad==1)
						shareScoreRival(nombre,PuntosP2,"Media");
			}
		}
	}else{
		if(Jugadores==1){
				if(Dificultad==0 && CPU){
					MensajeSolitarioIA();
				}else{
					MensajeSolitario();
				}

		}
	}
}

function MensajeSolitarioIA(){
	shareScoreIA(PuntosP1);
}

function MensajeSolitario(){
	if(Dificultad==1)
		shareScoreMedia(PuntosP1);
	else
	if(Dificultad==2)
		shareScoreDificil(PuntosP1);
	else
	if(Dificultad==0)
		shareScoreFacil(PuntosP1);
}

 function PlayParticula(){
 	starGeo.vertices.forEach(p => {
 	  p.velocity += p.acceleration
 	  p.y -= p.velocity;
 	  
 	  if (p.y < -200) {
 	    p.y = 200;
 	    p.velocity = 0;
 	  }
 	});
 	starGeo.verticesNeedUpdate = true;
 	stars.rotation.y +=0.002;
 	stars.rotation.x += 0.002;
 	stars.rotation.z += 0.006;

 }