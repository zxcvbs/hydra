//zxcvbs:

import * as THREE from '../build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from './js/renderers/CSS3DRenderer.js';
import { TrackballControls } from './js/controls/TrackballControls.js';


var camera, scene, renderer;

			var scene2, renderer2;

			var controls;

			init();
			animate();

    function piso() {

			var geometry = new THREE.PlaneGeometry( 2000, 2000, 10, 10 );
			var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
		//	material.color.set('black')
		//	material.opacity   = 1;
		//	material.blending  = THREE.NoBlending;

			var floor = new THREE.Mesh( geometry, material );
			floor.material.side = THREE.DoubleSide;
			floor.position.set(0,0,0);
			floor.rotation.x = Math.PI/2;
			scene.add( floor );




		}


function camara() {


	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100000 );
	camera.position.set( 200, 200, 200 );

	scene = new THREE.Scene();
	//scene.background = new THREE.Color( 0xff0000 );

}



      function Element( id, x, y, z, ry ) {

        //const div = document.createElement( 'div' );
        //div.style.width = 480/10 +'px';
        //div.style.height = 360/10 +'px';
        //div.style.backgroundColor = '#000';

        const iframe = document.createElement( 'iframe' );
				iframe.src = id;
        iframe.style.width = 480 + 'px';
        iframe.style.height = 360 +'px';
        //iframe.style.border = '0px';
        //iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
        //div.appendChild( iframe );

        const object = new CSS3DObject( iframe );
        object.position.set( x, y, z );
        object.rotation.y = ry;

        return object;

      };

			function init() {

			camara();

				scene2 = new THREE.Scene();



				var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );


      //  const group = new THREE.Group();
				scene2.add( new Element( 'https://hydra.ojack.xyz/?code=b3NjKDIwMCUyQyUyMDApLmthbGVpZCgyMDApLnNjYWxlKDElMkMxJTJDKCklM0QlM0V3aW5kb3cuaW5uZXJXaWR0aCUyRndpbmRvdy5pbm5lckhlaWdodCkub3V0KG8wKSUwQQ==',
				0, 1000, 0, 0 ) );

				//scene2.add( group );


//




		piso();











				renderer2 = new CSS3DRenderer();
				renderer2.setSize( window.innerWidth, window.innerHeight );
				renderer2.domElement.style.position = 'absolute';
				renderer2.domElement.style.top = 0;
				renderer2.domElement.style.margin	= 0;
				renderer2.domElement.style.padding	= 0;
				document.body.appendChild( renderer2.domElement );


				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.domElement.style.position	= 'absolute';
				renderer.domElement.style.top	= 0;
				renderer.domElement.style.zIndex	= 1;
				document.body.appendChild( renderer.domElement );
				renderer2.domElement.appendChild(renderer.domElement);

			//renderer.domElement.appendChild(renderer2.domElement);
			//	document.body.appendChild( renderer2.domElement );



				controls = new TrackballControls( camera, renderer2.domElement );

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;

				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				renderer2.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update();

				renderer2.render( scene2, camera );
				renderer.render( scene, camera );


			}
