// @flow

import { Mesh, Geometry, Material } from 'three';

export default class EntityInterface {
  mesh: Class<Mesh>;
  geometry: Class<Geometry>;
  material: Class<Material>;
  constructor(state: Object) {}
  build(state: Object) {}
  destroy() {}
  update(state: Object) {}
}
