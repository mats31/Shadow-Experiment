import THREE from 'three';
const glslify = require( 'glslify' );

export default class Cube extends THREE.Object3D {
  constructor() {
    super();

    this.loader = new THREE.TextureLoader();
    this.loader.load(
      './textures/flowMap.jpg',
      ( map ) => {
        this.loader.load(
          './textures/plast_nm.jpg',
          ( normalMap ) => {
            this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
            this.material = new THREE.MeshPhongMaterial({
              color: new THREE.Color('white'),
              map: map,
              normalMap: normalMap,
              normalScale: new THREE.Vector2( 1, 1 ),
              shininess: 30,
              wireframe: false,
            });
            this.mesh = new THREE.Mesh( this.geometry, this.material );
            this.material.normalScale.x = 2;
            this.material.normalScale.y = 2;
            this.add( this.mesh );
          }
        );
      }
    );
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
