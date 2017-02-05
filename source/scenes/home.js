// @flow

import { Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Home {
  geometry: Class<BoxGeometry>;
  material: Class<MeshBasicMaterial>;
  mesh: Class<Mesh>;
  constructor() {
    console.log('Home constructor');
  }

  init(scene: Class<Scene>, camera: Class<PerspectiveCamera>) {
    console.log('Home init');

    this.geometry = new BoxGeometry(10, 10, 10);
    this.material = new MeshBasicMaterial({
      color: 0xEF83A3
    });

    this.mesh = new Mesh(this.geometry, this.material);

    scene.add(this.mesh);
  }

  update() {
    console.log('update');
    this.mesh.rotation.x += 0.001;
    this.mesh.rotation.y += 0.001;
  }
}

export default Home;
