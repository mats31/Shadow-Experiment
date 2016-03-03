import THREE from 'three';
window.THREE = THREE;
import OrbitControls from './class/OrbitControls';
import Cube from './objects/Cube';
import Sphere from './objects/Sphere';
import Plane from './objects/Plane';
import Point from './objects/Point';

export default class Webgl {
  constructor( width, height ) {
    this.params = {
      windForce: 0.1,
    };

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 1000 );
    this.camera.position.z = 200;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0xe3e3e3 );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.composer = null;
    this.initPostprocessing();

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

    this.spotLight = new THREE.SpotLight( 0xffffff, 0.8 );
    this.spotLight.position.set( 0, 450, 0 );
    this.spotLight.castShadow = true;
    this.spotLight.shadow.camera.fov = 50;
    this.spotLight.shadow.mapSize.width = 2048;
    this.spotLight.shadow.mapSize.height = 2048;
    this.spotLight.shadow.bias = 0;

    this.cube = new Cube();
    this.scene.add( this.cube );

    // this.sphere = new Sphere();
    // this.sphere.position.set( 0, 45, 0 );
    // this.scene.add( this.sphere );

    this.plane = new Plane();
    this.plane.position.set( 0, -40, 0 );
    this.scene.add( this.plane );

    this.point = new Point();
    this.point.position.set( 0, -40, 0 );
    this.scene.add( this.point );

    this.scene.add( this.spotLight );
  }

  initPostprocessing() {
    if (!this.params.usePostprocessing) { return; }

    /* Add the effect composer of your choice */
  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  render() {
    if (this.params.usePostprocessing) {
      console.warn('WebGL - No effect composer set.');
    } else {
      this.renderer.render(this.scene, this.camera);
    }
    //this.controls.update();
    this.cube.update();
    this.point.update();
  }
}
