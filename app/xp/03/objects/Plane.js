import THREE from 'three';
const glslify = require( 'glslify' );

export default class Cube extends THREE.Object3D {
  constructor( target ) {
    super();
    this.geometry = new THREE.PlaneGeometry( 100, 100, 200, 200 );

    this.uniforms = {
      map: {
        type: 't',
        value: target,
      },
    };

    this.material = new THREE.MeshBasicMaterial({
      //color: new THREE.Color( 'white' ),
      map: target,
      side: THREE.DoubleSide,
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
