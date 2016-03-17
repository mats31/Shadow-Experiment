import THREE from 'three';
const glslify = require( 'glslify' );


export default class Cube extends THREE.Object3D {
  constructor() {
    super();
    this.clock = new THREE.Clock();

    // this.modelGeom = new THREE.BoxGeometry( 10, 10, 10 );
    // this.geometry = new THREE.IcosahedronGeometry( 20, 1 );
    this.geometry = new THREE.SphereGeometry( 20, 62, 62 );
    // this.geometry = new THREE.BoxGeometry( 50, 50, 50, 10, 10 );
    // this.geometry = new THREE.BufferGeometry().fromGeometry( this.modelGeometry );
    this.loader = new THREE.TextureLoader();
    this.loader.load(
      './textures/jeepster_skinmat2.jpg',
      ( texture ) => {
        texture.minFilter = THREE.LinearFilter;
        console.log(texture);
        this.uniforms = THREE.UniformsUtils.merge([
          THREE.UniformsLib.common,
          THREE.UniformsLib.lights,
          THREE.UniformsLib.ambient,
          // THREE.UniformsLib[ "common" ],
    			// THREE.UniformsLib[ "aomap" ],
    			// THREE.UniformsLib[ "lightmap" ],
    			// THREE.UniformsLib[ "emissivemap" ],
    			// THREE.UniformsLib[ "bumpmap" ],
    			// THREE.UniformsLib[ "normalmap" ],
    			// THREE.UniformsLib[ "displacementmap" ],
    			// THREE.UniformsLib[ "fog" ],
    			// THREE.UniformsLib[ "ambient" ],
          {
            lightPosition: { type: 'v3', value: new THREE.Vector3( 0, 450, 0 ) },
            myMap: { type: 't', value: texture },
            time: { type: 'f', value: 0 },
          },
        ]);
        this.material = new THREE.ShaderMaterial({
          fragmentShader: this.shaderParse( glslify( '../shaders/fragmentCube.glsl' ) ),
          uniforms: this.uniforms,
          vertexShader: this.shaderParse( glslify( '../shaders/vertexCube.glsl' ) ),
          lights: true,
        });

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.customDepthMaterial = new THREE.ShaderMaterial({
          vertexShader: this.shaderParse( glslify( '../shaders/customDepthVertex.glsl' ) ),
          fragmentShader: THREE.ShaderLib.depthRGBA.fragmentShader,
          uniforms: this.material.uniforms,
        });

        // this.mesh2 = new THREE.Mesh( this.geometry, this.material );
        // this.mesh2.position.set( 10, 50, 0 );
        // this.mesh2.castShadow = true;
        // this.mesh2.receiveShadow = true;

        this.add( this.mesh );
        // this.add( this.mesh2 );
      }
    )
  }

  shaderParse( glsl ) {
    return glsl.replace( /\/\/\s?chunk\(\s?(\w+)\s?\);/g, this.replaceThreeChunkFn );
  }

  replaceThreeChunkFn( a, b ) {
    return THREE.ShaderChunk[b] + '\n';
  }

  update() {
    if (typeof this.uniforms !== 'undefined') {
      this.uniforms.time.value = this.clock.getElapsedTime() * 5;
      this.uniforms.myMap.value.needsUpdate = true;
    }
    //this.mesh.rotation.x += 0.005;
    //this.mesh.rotation.z += 0.005;
    // this.mesh2.rotation.x -= 0.05;
    // this.mesh2.rotation.z -= 0.05;
    // console.log(this.uniforms.time.value);
  }
}
