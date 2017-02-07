// @flow

import { Scene, PerspectiveCamera, TorusKnotGeometry, BoxGeometry, MeshPhongMaterial, Mesh, HemisphereLight } from 'three';

class Home {
  geometry: Class<TorusKnotGeometry>;
  material: Class<MeshPhongMaterial>;
  mesh: Class<Mesh>;
  light: Class<HemisphereLight>;
  objects: Array<any>;
  counter: number;
  constructor() {
    console.log('Home constructor');
    this.objects = [];
    this.counter = 0;
  }

  init(scene: Class<Scene>, camera: Class<PerspectiveCamera>) {
    console.log('Home init');

    // this.material = new MeshPhongMaterial();
    // this.geometry = new TorusKnotGeometry(2, 0.2, 600, 600, 14, 2, 3);
    // this.mesh = new Mesh(this.geometry, this.material);
    for (var i = 0; i < 10; i++) {
      this.objects.push(new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial()));
      scene.add(this.objects[i]);
    }

    this.light = new HemisphereLight('#f9b641', '#361448', 1);

    // scene.add(this.mesh);
    scene.add(this.light);
  }

  update() {
    this.counter++;
    this.objects.forEach((obj, index) => {
      obj.rotation.x += (index + 1) / 10000;
      obj.rotation.y += (index + 1) / 10000;
      if (index % 2) {
        obj.position.z = Math.sin((360 / index) + (this.counter / 1000));
      } else {
        obj.position.z = Math.cos((360 / index) + (this.counter / 1000));
      }
      obj.position.x = Math.cos(index * (this.counter / 1000));
      obj.position.y = Math.sin(index * (this.counter / 1000));
    })
  }
}

export default Home;
