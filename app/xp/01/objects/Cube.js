import THREE from 'three';
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
            this.geometry = new THREE.BufferGeometry().fromGeometry( this.modelGeometry );

            this.uniforms = THREE.UniformsUtils.merge([
              THREE.UniformsLib.common,
              THREE.UniformsLib.lights,
              THREE.UniformsLib.ambient,
              THREE.UniformsLib.normalmap,
            ]);
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

            this.mesh = new THREE.Mesh( this.geometry, this.material );
            this.material.uniforms.map.value.wrapS = this.material.uniforms.map.value.wrapT = THREE.ClampToEdgeWrapping;
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
