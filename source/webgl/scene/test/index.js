// @flow

import { MeshBasicMaterial, Scene, PerspectiveCamera, PlaneGeometry, ShaderMaterial, Mesh, BufferAttribute, BufferGeometry, HemisphereLight } from 'three';
import NavBall from '../../entity/navball';

export default class Test {
  light: Class<HemisphereLight>;
  entities: Array<any>;
  constructor() {}

  init(state: Object, scene: Class<Scene>, camera: Class<PerspectiveCamera>) {
    console.log('Test init');

    this.entities = [];

    this.light = new HemisphereLight('#f9b641', '#361448', 1);
    scene.add(this.light);

    this.entities.push(new NavBall(state));

    this.entities.forEach((entity) => {
      scene.add(entity.mesh);
    });
  }

  update(state: Object) {
    this.entities.forEach((entity) => {
      entity.update(state);
    });
  }
}
