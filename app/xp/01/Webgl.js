import THREE from 'three';
window.THREE = THREE;
import Cube from './objects/Cube';
import OrbitControls from './class/OrbitControls';


export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
    };

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);

    this.composer = null;
    this.initPostprocessing();

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

    this.cube = new Cube();
    this.cube.position.set(0, 0, 0);
    this.scene.add(this.cube);

    this.spotLight = new THREE.SpotLight( 0xffffff );
    this.spotLight.position.set( 100, 1000, 100 );

    this.spotLight.castShadow = true;

    this.spotLight.shadowMapWidth = 1024;
    this.spotLight.shadowMapHeight = 1024;

    this.spotLight.shadowCameraNear = 500;
    this.spotLight.shadowCameraFar = 4000;
    this.spotLight.shadowCameraFov = 30;

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

    this.cube.update();
  }
}
