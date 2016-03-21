import THREE from 'three';
import BufferGeometryUtils from './../class/BufferGeometryUtils.js';
const glslify = require( 'glslify' );

export default class Cube extends THREE.Object3D {
  constructor() {
    super();

    this.loader = new THREE.TextureLoader();
    this.loader.load(
      './textures/jeepster_skinmat2.jpg',
      ( map ) => {
        this.loader.load(
          './textures/brickwork-normal.jpg',
          ( normalMap ) => {

            this.modelGeometry = new THREE.BoxGeometry( 10, 10, 10 );
            console.log(this.modelGeometry);
            this.geometry = new THREE.BufferGeometry().fromGeometry( this.modelGeometry );
            console.log(this.geometry);
            const indices = new Uint32Array( this.modelGeometry.faces.length * 3 );
            console.log('test',this.modelGeometry.faces);
            let indicesIncrement = 0;
            for ( let i = 0; i < this.modelGeometry.faces.length; i++ ) {
              const face = this.modelGeometry.faces[i];

              const i0 = face.a;
              const i1 = face.b;
              const i2 = face.c;

              indices[indicesIncrement++] = i0;
              indices[indicesIncrement++] = i1;
              indices[indicesIncrement++] = i2;
            }
            this.geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );
            //this.geometry.computeVertexNormals();
            console.log(this.geometry);
            THREE.BufferGeometryUtils.computeTangents( this.geometry );

            this.uniforms = THREE.UniformsUtils.merge([
              THREE.UniformsLib.common,
              THREE.UniformsLib.lights,
              THREE.UniformsLib.ambient,
              THREE.UniformsLib.normalmap,
              {
                noise: { type: 'f', value: 0.04 },
                normalRepeat: { type: 'f', value: 1 },
                normalScale: { type: 'f', value: 0.5 },
                repeat: { type: 'v2', value: new THREE.Vector2( 1, 1 ) },
                rimPower: { type: 'f', value: 2 },
              },
            ]);
            map.minFilter = THREE.LinearFilter;
            this.uniforms.normalMap.value = normalMap;
            this.uniforms.map.value = map;

            // this.uniforms = {
            //   map: { type: 't', value: map },
            //   normalMap: { type: 't', value: normalMap },
            //   normalScale: { type: 'v2', value: new THREE.Vector2( 1, 1 ) },
            // };

            this.material = new THREE.ShaderMaterial({
              uniforms: this.uniforms,
              fragmentShader: this.shaderParse( glslify( '../shaders/fragmentCube.glsl' ) ),
              vertexShader: this.shaderParse( glslify( '../shaders/vertexCube.glsl' ) ),
              wireframe: false,
              morphNormals: false,
              extensions: {
                derivatives: true,
              },
              lights: true,
            });
            console.log(this.material);

            this.mesh = new THREE.Mesh( this.geometry, this.material );
            this.material.uniforms.map.value.wrapS = this.material.uniforms.map.value.wrapT = THREE.ClampToEdgeWrapping;
            console.log( this.mesh );
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
