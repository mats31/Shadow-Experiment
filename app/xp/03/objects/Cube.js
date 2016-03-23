import THREE from 'three';
const glslify = require( 'glslify' );

export default class Cube extends THREE.Object3D {
  constructor() {
    super();

    this.noiseScene = new THREE.Scene();
    this.noiseCameraOrtho = new THREE.OrthographicCamera(
      window.innerWidth / - 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / - 2,
      -10000,
      10000
    );
    this.noiseCameraOrtho.position.z = 100;
    this.noiseScene.add( this.noiseCameraOrtho );

    this.noiseQuadTarget = new THREE.Mesh(
      new THREE.PlaneGeometry(
        window.innerWidth,
        window.innerHeight,
        100,
        100
      ),
      this.noiseMaterial
    );
    this.noiseQuadTarget.position.z = -500;
    this.noiseScene.add( this.noiseQuadTarget );
    this.add( this.noiseScene );
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
