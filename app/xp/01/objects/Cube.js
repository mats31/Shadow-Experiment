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
            const vertices = new Float32Array( this.modelGeometry.vertices.length * 3 );
            const indices = new Uint32Array( this.geometry.attributes.position.array.length );
            console.log(indices);
            const uvs = new Float32Array( this.modelGeometry.vertices.length * 2 );

            let vertexIncrement = 0;
            for ( let i = 0; i < this.modelGeometry.vertices.length; i++ ){
              const vertice = this.modelGeometry.vertices[i];
              vertices[vertexIncrement++] = vertice.x;
              vertices[vertexIncrement++] = vertice.y;
              vertices[vertexIncrement++] = vertice.z;
            }

            let indicesIncrement = 0;
            for ( let i = 0, i3 = 3; i < this.geometry.attributes.position.array.length / 3; i++, i3 += 3 ) {
              const face = this.modelGeometry.faces[i];

              // const i0 = face.a;
              // const i1 = face.b;
              // const i2 = face.c;
              // console.log(i0);
              // console.log(i1);
              // console.log(i2);
              // console.log('- - - - - - - -');

              indices[indicesIncrement++] = i3 - 3;
              indices[indicesIncrement++] = i3 - 2;
              indices[indicesIncrement++] = i3 - 1;
            }
            console.log(indices);

            for ( let i = 0; i < this.modelGeometry.faceVertexUvs[0].length; i++ ) {
              const faceUvs = this.modelGeometry.faceVertexUvs[0][i];

              const uv0 = faceUvs[0];
              const uv1 = faceUvs[1];
              const uv2 = faceUvs[2];

              const face = this.modelGeometry.faces[i];
              const i0 = face.a;
              const i1 = face.b;
              const i2 = face.c;

              const uv0index = i0 * 2;
              uvs[uv0index] = uv0.x;
              uvs[uv0index + 1] = uv0.y;

              const uv1index = i1 * 2;
              uvs[uv1index] = uv1.x;
              uvs[uv1index + 1] = uv1.y;

              const uv2index = i2 * 2;
              uvs[uv2index] = uv2.x;
              uvs[uv2index + 1] = uv2.y;
            }

            // this.geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
            // this.geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
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
