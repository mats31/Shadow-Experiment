const glslify = require( 'glslify' );
import THREE from 'three';

export default class Point extends THREE.Object3D {
  constructor() {
    super();
    this.uniforms = {
      time: { type: 'f', value: Date.now() * 0.005 },
      color: { type: 'c', value: new THREE.Color( 0xffffff ) },
      map: { type: 't', value: null },
      up: { type: 'f', value: 0 },
      wind: { type: 'f', value: 0.1 },
    };
    this.loader = new THREE.TextureLoader();
    this.number = 50000;
    this.clock = new THREE.Clock();
    this.createPoints();
  }

  createPoints() {
    const positions = new Float32Array( parseInt( this.number * 3, 10 ) );
    const colors = new Float32Array( parseInt( this.number * 3, 10 ) );
    const sizes = new Float32Array( this.number );
    const velocities = new Float32Array( this.number );
    const radius = new Float32Array( this.number );
    let i3 = 0;
    let i = 0;

    for ( let j = 0; i < this.number; i++ ) {
      const color = new THREE.Color( 0xdf5a00 );

      positions[i3 + 0] = Math.random() * 100 - 50;
      // positions[i3 + 1] = Math.random() * 150 - 20;
      positions[i3 + 1] = 1;
      positions[i3 + 2] = Math.random() * 100 - 50;

      colors[i3 + 0] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = 10;
      velocities[i] = Math.random() * 50;
      radius[i] = Math.random() * 40;

      i3 += 3;
      i++;
    }

    this.geometry = new THREE.BufferGeometry();

    this.geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    this.geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    this.geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    this.geometry.addAttribute( 'velocity', new THREE.BufferAttribute( velocities, 1 ) );
    this.geometry.addAttribute( 'radius', new THREE.BufferAttribute( radius, 1 ) );

    this.loader.load(
      './textures/particle.png',
      ( texture ) => {

        this.uniforms.map.value = texture;

        this.material = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: glslify( '../shaders/vertexPoint.glsl' ),
          fragmentShader: glslify( '../shaders/fragmentPoint.glsl' ),
          blending: THREE.AdditiveBlending,
          transparent: true,
        });

        this.particleSystem = new THREE.Points( this.geometry, this.material );
        this.particleSystem.position.set( 0, 0, 0 );
        this.particleSystem.castShadow = true;
        this.particleSystem.receiveShadow = false;
        this.particleSystem.customDepthMaterial = new THREE.ShaderMaterial({
          vertexShader: this.shaderParse( glslify( '../shaders/customDepthPointVertex.glsl' ) ),
          fragmentShader: this.shaderParse( glslify( '../shaders/customDepthPointFragment.glsl' ) ),
          uniforms: this.material.uniforms,
        });
        console.log( this.particleSystem );

        this.add( this.particleSystem );
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
    if ( typeof this.uniforms !== 'undefined' ) {
      this.uniforms.time.value = this.clock.getElapsedTime();
      if ( this.uniforms.up.value < 20 ) {
        this.uniforms.up.value += 0.04;
      }
    }
  }
}
