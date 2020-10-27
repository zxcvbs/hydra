//zxcvbs:

import * as THREE from '../build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from './js/renderers/CSS3DRenderer.js';


var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var cssScene;
var cssRenderer;
var cssCamera;

var crate, crateTexture, crateNormalMap, crateBumpMap;
var container;


var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;

function Element( id, position,rotation) {

  const div = document.createElement( 'div' );
  div.style.width = '20px';
  div.style.height = '20px';
  div.style.backgroundColor = '#000';

  const iframe = document.createElement( 'iframe' );
  iframe.style.width = '20px';
  iframe.style.height = '20px';
  iframe.style.border = '0px';
  //iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
  iframe.src = 'https://hydra.ojack.xyz/?sketch_id=46HR1gA9vVj3tWzh';
  div.appendChild( iframe );

  const object = new CSS3DObject( div );
  //object.position.set(planeposition);
  //object.rotation.set(planerotation);
  object.position.set( position);
  object.rotation.set( rotation);

  return object;

};



function init(){
	scene = new THREE.Scene();
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 90, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000;

	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0,player.height,0));


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );




	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	mesh.position.y += 1;
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);

	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(20,20, 10,10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);

	ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
	scene.add(ambientLight);

	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);


	// Texture Loading
	var textureLoader = new THREE.TextureLoader();
	//crateTexture = textureLoader.load("crate0/crate0_diffuse.png");
	//crateBumpMap = textureLoader.load("crate0/crate0_bump.png");
	//crateNormalMap = textureLoader.load("crate0/crate0_normal.png");

	// Create mesh with these textures
	crate = new THREE.Mesh(
		new THREE.BoxGeometry(3,3,3),
		new THREE.MeshPhongMaterial({
			color:0xffffff,

		//	map:crateTexture,
		//	bumpMap:crateBumpMap,
	//		normalMap:crateNormalMap
		})
	);
	scene.add(crate);
	crate.position.set(2.5, 3/2, 2.5);
	crate.receiveShadow = true;
	crate.castShadow = true;

// Iframe Superficie mesh renderer
  var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.1, side: THREE.DoubleSide });
	var planeWidth = 20;
    var planeHeight = 20;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.y += planeHeight/2;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);
// Iframe Superficie CSS  renderer1

cssCamera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
cssScene = new THREE.Scene();

cssRenderer =  new CSS3DRenderer();
cssRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
container.appendChild(cssRenderer.domElement);

const group = new THREE.Group();
group.add( new Element( 'SJOz3qjfQXU', crate.position, crate.rotation) );
//group.add( new Element( 'Y2-xZ-1HE-Q', 240, 0, 0, Math.PI / 2 ) );
//group.add( new Element( 'IrydklNpcFI', 0, 0, - 240, Math.PI ) );
//group.add( new Element( '9ubytEsCaS0', - 240, 0, 0, - Math.PI / 2 ) );

group.position.set(planeMesh.position);
group.rotation.set(planeMesh.rotation);
cssScene.add( group );









cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top	  = 0;
cssRenderer.domElement.style.margin	  = 0;
cssRenderer.domElement.style.padding  = 0;
//container.appendChild( cssRenderer.domElement );










//renderer.domElement.style.position = 'absolute';
//renderer.domElement.style.top      = 0;
// make sure original renderer appears on top of CSS renderer
//renderer.domElement.style.zIndex   = 1;
//cssRenderer.domElement.appendChild(renderer.domElement);
//renderer.domElement.appendChild(cssRenderer.domElement);








	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	document.body.appendChild(renderer.domElement);

	animate();
}

function animate(){
	requestAnimationFrame(animate);

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	crate.rotation.y += 0.01;

	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
  cssRenderer.render(cssScene, camera);
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
