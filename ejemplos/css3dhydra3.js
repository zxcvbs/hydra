//zxcvbs:

import * as THREE from '../build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from './js/renderers/CSS3DRenderer.js';
import { TrackballControls } from './js/controls/TrackballControls.js';


var camera, scene, renderer;

			var scene2, renderer2;

			var controls;

			init();
			animate();

      function Element( id, x, y, z, ry ) {

        const div = document.createElement( 'div' );
        div.style.width = 480/10 +'px';
        div.style.height = 360/10 +'px';
        div.style.backgroundColor = '#000';

        const iframe = document.createElement( 'iframe' );
        iframe.style.width = 480 + 'px';
        iframe.style.height = 360 +'px';
        iframe.style.border = '0px';
        //iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
        iframe.src = id;
        div.appendChild( iframe );

        const object = new CSS3DObject( div );
        object.position.set( x, y, z );
        object.rotation.y = ry;

        return object;

      };

			function init() {

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 200, 200, 200 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				scene2 = new THREE.Scene();

				var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );

				//

				for ( var i = 0; i < 10; i ++ ) {

					var element = document.createElement( 'div' );
					element.style.width = '100px';
					element.style.height = '100px';
					element.style.opacity = ( i < 5 ) ? 0.5 : 1;
					element.style.background = new THREE.Color( Math.random() * 0xffffff ).getStyle();

					var object = new CSS3DObject( element );
					object.position.x = Math.random() * 200 - 100;
					object.position.y = Math.random() * 200 - 100;
					object.position.z = Math.random() * 200 - 100;
					object.rotation.x = Math.random();
					object.rotation.y = Math.random();
					object.rotation.z = Math.random();
					object.scale.x = Math.random() + 0.5;
					object.scale.y = Math.random() + 0.5;
					scene2.add( object );

					var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.copy( object.position );
					mesh.rotation.copy( object.rotation );
					mesh.scale.copy( object.scale );
					scene.add( mesh );

				}

        const group = new THREE.Group();
				group.add( new Element( 'https://hydra.ojack.xyz/?code=b3NjKDIwMCUyQyUyMDApLmthbGVpZCgyMDApLnNjYWxlKDElMkMxJTJDKCklM0QlM0V3aW5kb3cuaW5uZXJXaWR0aCUyRndpbmRvdy5pbm5lckhlaWdodCkub3V0KG8wKSUwQQ==', 0, 0, 240, 0 ) );
				group.add( new Element( 'https://hydra.ojack.xyz/?sketch_id=92Gav3VofG2OECTF', 240, 0, 0, Math.PI / 2 ) );
				group.add( new Element( 'https://hydra.ojack.xyz/?sketch_id=mywWlQrtTNzHOlMt', 0, 0, - 240, Math.PI ) );
				group.add( new Element( 'https://hydra.ojack.xyz/?sketch_id=fvIAqvAWefyMaxLi', - 240, 0, 0, - Math.PI / 2 ) );
				scene2.add( group );


	for ( var i = 0; i < 5; i ++ ) {


        var geom = new THREE.BoxGeometry( 100, 100, 100 );
        var mat = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff } );
        var cube = new THREE.Mesh( geom, mat );
          cube.rotation.z = Math.random();
          cube.position.x = Math.random() * 500;
          cube.position.y = Math.random() * 500;
          cube.position.z = Math.random() * 500;

        scene.add( cube );//

}




        var geometry = new THREE.PlaneGeometry( 200, 200, 1, 1 );
	      var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
	      var floor = new THREE.Mesh( geometry, material );
	      floor.material.side = THREE.DoubleSide;
	      floor.rotation.x = 90;
	      scene.add( floor );



				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

				renderer2 = new CSS3DRenderer();
				renderer2.setSize( window.innerWidth, window.innerHeight );
				renderer2.domElement.style.position = 'absolute';
				renderer2.domElement.style.top = 0;
				document.body.appendChild( renderer2.domElement );

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

				renderer.render( scene, camera );
				renderer2.render( scene2, camera );

			}
