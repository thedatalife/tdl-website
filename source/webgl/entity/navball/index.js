// @flow

import { Mesh, BufferGeometry, BufferAttribute, ShaderMaterial, SphereBufferGeometry, BoxBufferGeometry, DoubleSide } from 'three';

import EntityInterface from '../EntityInterface';
import updateUniform from '../../utility/updateUniform';

export default class EntityTest extends EntityInterface {
  mesh: Class<Mesh>;
  geometry: Class<BufferGeometry>;
  material: Class<ShaderMaterial>;
  constructor(state: Object) {
    super(state);

    this.build(state);
  }
  update(state: Object) {
    updateUniform(this.material.uniforms, state.time, 'fTime.value');
    if (state.hoverIntersect && state.hoverIntersect.uuid === this.mesh.uuid) {
      updateUniform(this.material.uniforms, state.hoverIntersect.point.x, 'fMouseX.value');
      updateUniform(this.material.uniforms, state.hoverIntersect.point.y, 'fMouseY.value');
    }
  }
  build(state: Object) {

    // material
    this.material = new ShaderMaterial({
      uniforms: {
        fTime: {
          value: state.time,
          type: 'f'
        },
        fMouseX: {
          value: 0,
          type: 'f'
        },
        fMouseY: {
          value: 0,
          type: 'f'
        }
      },
      vertexShader: require('./navball.vert'),
      fragmentShader: require('./navball.frag')
    });

    // geometry
    this.geometry = new SphereBufferGeometry(2, 32, 32);
    //this.geometry = new BoxBufferGeometry(2, 32, 32);

    // mesh
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.z = -1;
  }
  destroy() {}
}
