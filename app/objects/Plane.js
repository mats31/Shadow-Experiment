import THREE from 'three';

export default class Plane extends THREE.Object3D {
  constructor() {
    super();

    this.geometry = new THREE.PlaneGeometry( 200, 200, 10, 10 );
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: false,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
    this.mesh.rotation.x = -1.57;

    this.add( this.mesh );
  }

  update() {

  }
}
