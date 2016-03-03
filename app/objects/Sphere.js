import THREE from 'three';

export default class Sphere extends THREE.Object3D {
  constructor() {
    super();

    this.time = 0;
    this.geometry = new THREE.SphereGeometry( 8, 32, 32 );
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: false,
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.rotation.x = -1.57;

    this.add( this.mesh );

    // this.mesh3 = new THREE.Mesh( this.geometry, this.material );
    // this.mesh3.castShadow = true;
    // this.mesh3.receiveShadow = true;
    // this.mesh3.rotation.x = -1.57;
    // this.mesh3.position.set(0, 20, 0);
    // this.add( this.mesh3 );
  }

  update() {
    this.time += 0.1;
    // this.mesh.position.x = this.mesh.position.x + Math.cos(this.time) * 0.5;
    // this.mesh.position.z = this.mesh.position.z + Math.sin(this.time) * 0.9;
  }
}
