import THREE from 'three';
window.THREE = THREE;
import Noise from './objects/Noise';
import Plane from './objects/Plane';
import OrbitControls from './class/OrbitControls';
import MarchingCubes from './class/MarchingCubes';


export default class Webgl {
  constructor( width, height ) {
    this.params = {
      usePostprocessing: false,
    };

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 100000 );
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0x262626 );

    /** MARCHING CUBES **/
    this.resolution = 28;
    this.numBlobs = 10;
    this.strength = 1.2 / ( ( Math.sqrt( this.numBlobs ) - 1 ) / 4 + 1 );
    this.speed = 1;
    this.substract = 12;
    this.time = 0;
    this.clock = new THREE.Clock();

    this.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color( 'yellow' ),
      wireframe: false,
    });

    this.effect = new THREE.MarchingCubes( this.resolution, this.material, true, true );
    this.effect.position.set( 0, 0, 0 );
    //this.effect.scale.set( 700, 700, 700 );

    this.effect.enableUvs = false;
    this.effect.enableColors = false;

    this.scene.add( this.effect );

    this.composer = null;
    this.initPostprocessing();

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
  }

  updateCubes( object, time, numblobs ) {
    object.reset();

    // fill the field with some metaballs
    let i;
    let ballx;
    let bally;
    let ballz;
    let subtract;
    let strength;

    subtract = 152;
    strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );

    for ( i = 0; i < numblobs; i ++ ) {
      ballx = Math.sin( i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.27 + 0.9;
      bally = Math.cos( i + 1.12 * time * 0.21 * Math.sin( ( 0.72 + 0.83 * i ) ) ) * 0.27 + 0.9;
      ballz = Math.cos( i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.27 + 0.9;

      object.addBall( ballx, bally, ballz, strength, subtract );
    }

    //object.addPlaneX( 2, 12 );
    //object.addPlaneY( 2, 12 );
    //object.addPlaneZ( 2, 12 );
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
      const delta = this.clock.getDelta();
      this.time += delta * this.speed * 0.5;

      this.renderer.render( this.scene, this.camera );
      this.updateCubes(
        this.effect,
        this.time,
        this.numBlobs
      );
    }
  }
}
