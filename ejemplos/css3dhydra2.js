//zxcvbs:

import * as THREE from '../build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from './js/renderers/CSS3DRenderer.js';


var glScene, camera, glRenderer, mesh;
var meshFloor, ambientLight, light;

var cssScene;
var cssRenderer;
var cssCamera;

var crate, crateTexture, crateNormalMap, crateBumpMap;
var container;


var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;



function createGlRenderer() {

  var glRenderer = new THREE.WebGLRenderer({alpha:true});

  glRenderer.setClearColor(0xECF8FF);
  glRenderer.setPixelRatio(window.devicePixelRatio);
  glRenderer.setSize(window.innerWidth, window.innerHeight);

  glRenderer.domElement.style.position = 'absolute';
  glRenderer.domElement.style.zIndex = 1;
  glRenderer.domElement.style.top = 0;

  return glRenderer;
}

function createCssRenderer() {

  var cssRenderer = new CSS3DRenderer();

  cssRenderer.setSize(window.innerWidth, window.innerHeight);

  cssRenderer.domElement.style.position = 'absolute';
  glRenderer.domElement.style.zIndex = 0;
  cssRenderer.domElement.style.top = 0;

  return cssRenderer;
}


function createPlane(w, h, position, rotation) {

  var material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0.0,
    side: THREE.DoubleSide
  });

  var geometry = new THREE.PlaneGeometry(w, h);

  var mesh = new THREE.Mesh(geometry, material);

  mesh.position.x = position.x;
  mesh.position.y = position.y;
  mesh.position.z = position.z;

  mesh.rotation.x = rotation.x;
  mesh.rotation.y = rotation.y;
  mesh.rotation.z = rotation.z;

  return mesh;
}


function createCssObject(w, h, position, rotation, url) {

  var html = [

    '<div style="width:' + w + 'px; height:' + h + 'px;">',
    '<iframe src="' + url + '" width="' + w + '" height="' + h + '">',
    '</iframe>',
    '</div>'

  ].join('\n');

  var div = document.createElement('div');

  $(div).html(html);

  var cssObject = new CSS3DObject(div);

  cssObject.position.x = position.x;
  cssObject.position.y = position.y;
  cssObject.position.z = position.z;

  cssObject.rotation.x = rotation.x;
  cssObject.rotation.y = rotation.y;
  cssObject.rotation.z = rotation.z;

  return cssObject;
}

function create3dPage(w, h, position, rotation, url) {

  var plane = createPlane(
      w, h,
      position,
      rotation);

  glScene.add(plane);

  var cssObject = createCssObject(
      w, h,
      position,
      rotation,
      url);

  cssScene.add(cssObject);
}

function createColoredMaterial() {

  var material = new THREE.MeshBasicMaterial({
    color: Math.floor(Math.random() * 16777215),
    shading: THREE.FlatShading,
    side: THREE.DoubleSide
  });

  return material;
}


function create3dGeometry() {

  var mesh1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 200, 300, 20, 4),
    createColoredMaterial());

  mesh1.position.x = 0;
  mesh1.position.y = -300;
  mesh1.position.z = 400;

  glScene.add(mesh1);

  var mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(200, 200, 200),
    createColoredMaterial());

  mesh2.position.x = -300;
  mesh2.position.y = -300;
  mesh2.position.z = 400;

  glScene.add(mesh2);


  var mesh3 = new THREE.Mesh(
      new THREE.SphereGeometry(100, 128, 128),
      createColoredMaterial());

  mesh3.position.x = 500;
  mesh3.position.y = -300;
  mesh3.position.z = 400;

  glScene.add(mesh3);
}


function initialize() {

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000);

  camera.position.set(0, 100, 3000);

  //controls = new THREE.TrackballControls(camera);

  glRenderer = createGlRenderer();
  cssRenderer = createCssRenderer();

  //document.body.appendChild(glRenderer.domElement);

  document.body.appendChild(cssRenderer.domElement);
  cssRenderer.domElement.appendChild(glRenderer.domElement);

  glScene = new THREE.Scene();
  cssScene = new THREE.Scene();

  var ambientLight = new THREE.AmbientLight(0x555555);
  glScene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set( -.5, .5, -1.5 ).normalize();
  glScene.add(directionalLight);

  create3dPage(
    1000, 1000,
    new THREE.Vector3(-1050, 0, 400),
    new THREE.Vector3(0, 45 * Math.PI / 180, 0),
    'https://hydra.ojack.xyz/');

  create3dPage(
    900, 1000,
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0),
    'https://hydra.ojack.xyz/?code=b3NjKDIwMCUyQyUyMDApLmthbGVpZCgyMDApLnNjYWxlKDElMkMxJTJDKCklM0QlM0V3aW5kb3cuaW5uZXJXaWR0aCUyRndpbmRvdy5pbm5lckhlaWdodCkub3V0KG8wKSUwQQ==');

  create3dPage(
    1000, 1000,
    new THREE.Vector3(1050, 0, 400),
    new THREE.Vector3(0, -45 * Math.PI / 180, 0),
    'https://hydra.ojack.xyz/?sketch_id=MMMSULye1dfveWT1');

  create3dGeometry();

  update();
}


function update() {



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

















  glRenderer.render(glScene, camera);
  cssRenderer.render(cssScene, camera);

  requestAnimationFrame(update);
}




function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

$(document ).ready(function() {
  initialize();
});
