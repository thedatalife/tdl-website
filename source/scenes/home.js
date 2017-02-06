// @flow

import { Scene, PerspectiveCamera, TorusKnotGeometry, MeshPhongMaterial, Mesh, HemisphereLight } from 'three';

class Home {
  geometry: Class<TorusKnotGeometry>;
  material: Class<MeshPhongMaterial>;
  mesh: Class<Mesh>;
  light: Class<HemisphereLight>;
  constructor() {
    console.log('Home constructor');
  }

  init(scene: Class<Scene>, camera: Class<PerspectiveCamera>) {
    console.log('Home init');

    this.material = new MeshPhongMaterial();
    this.geometry = new TorusKnotGeometry(2, 0.2, 600, 600, 14, 2, 3);

    this.mesh = new Mesh(this.geometry, this.material);
    this.light = new HemisphereLight('#f9b641', '#361448', 1);

    scene.add(this.mesh);
    scene.add(this.light);
  }

  update() {
    this.mesh.rotation.x += 0.001;
    this.mesh.rotation.y += 0.001;
  }
}

export default Home;
