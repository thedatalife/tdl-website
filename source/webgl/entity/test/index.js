// @flow
import { Mesh, BufferGeometry, BufferAttribute, ShaderMaterial, PlaneGeometry, DoubleSide } from 'three';

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
      updateUniform(this.material.uniforms, state.hoverIntersect.uv.x, 'fClickX.value');
      updateUniform(this.material.uniforms, state.hoverIntersect.uv.y, 'fClickY.value');
    }
  }
  build(state: Object) {
    // material
    this.material = new ShaderMaterial({
      uniforms: {
        delta: {
          value: 1
        },
        fTime: {
          value: state.time,
          type: 'f'
        },
        fClickX: {
          value: 0,
          type: 'f'
        },
        fClickY: {
          value: 0,
          type: 'f'
        }
      },
      vertexShader: require('./test.vert'),
      fragmentShader: require('./test.frag')
    });
    this.material.side = DoubleSide;

    // geometry
    const geometry = new PlaneGeometry(2, 2, 2, 2);
    this.geometry = new BufferGeometry().fromGeometry(geometry);

    // geometry attributes
    const vertexDisplacement = new Float32Array(this.geometry.attributes.position.count);

    this.geometry.addAttribute('vertexDisplacement', new BufferAttribute(vertexDisplacement, 1));

    // mesh
    this.mesh = new Mesh(this.geometry, this.material);
  }
  destroy() {}
}
