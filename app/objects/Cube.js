import THREE from 'three';
const glslify = require( 'glslify' );


export default class Cube extends THREE.Object3D {
  constructor() {
    super();
    this.clock = new THREE.Clock();

    // this.modelGeom = new THREE.BoxGeometry( 10, 10, 10 );
    this.geometry = new THREE.BoxGeometry( 50, 50, 50, 10, 10, 10 );
    // this.geometry = new THREE.BufferGeometry().fromGeometry( this.modelGeometry );
    this.uniforms = {
      lightPosition: { type: 'v3', value: new THREE.Vector3( 700, 700, 700 ) },
      time: { type: 'f', value: 0 },
    };
    this.material = new THREE.ShaderMaterial({
      fragmentShader: glslify( '../shaders/fragmentCube.glsl' ),
      uniforms: this.uniforms,
      vertexShader: glslify( '../shaders/vertexCube.glsl' ),
    });
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.add( this.mesh );
  }

  update() {
    this.uniforms.time.value = this.clock.getDelta() * 10;
    // console.log(this.uniforms.time.value);
  }
}
