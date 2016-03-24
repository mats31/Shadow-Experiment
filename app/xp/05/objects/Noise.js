import THREE from 'three';

export default class Noise extends THREE.Object3D {
  constructor() {
    super();
    this.geometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight, 200, 200 );

    this.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color( 'red' ),
      wireframe: false,
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.add( this.mesh );
  }

    shaderParse( glsl ) {
      return glsl.replace( /\/\/\s?chunk\(\s?(\w+)\s?\);/g, this.replaceThreeChunkFn );
    }

    replaceThreeChunkFn( a, b ) {
      return THREE.ShaderChunk[b] + '\n';
    }

    update() {
      this.rotation.x += 0.01;
      this.rotation.z += 0.01;
    }
  }
