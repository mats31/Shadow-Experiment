import THREE from 'three';
const glslify = require( 'glslify' );

export default class Cube extends THREE.Object3D {
  constructor( target ) {
    super();
    this.geometry = new THREE.BoxGeometry( 10, 10, 10 );

    const video = document.getElementById( 'video' );
    video.play();
    console.log(video);
    const texture = new THREE.VideoTexture( video );
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    console.log(texture);

    this.material = new THREE.MeshBasicMaterial({
      //color: new THREE.Color( 'white' ),
      map: texture,
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
