// @flow

import { Texture, TextureLoader, LinearFilter } from 'three';
import { ShaderPass } from 'three-effectcomposer-es6';

export default class TestShader {
  uniforms: Object;
  shaderPass: Class<ShaderPass>;
  constructor(options: ?Object) {
    options = options || {};

    this.uniforms = {
      tDiffuse: {
        type: 't',
        value: new Texture()
      },
      opacity: {
        type: 'f',
        value: 1.0
      },
      mouseX: {
        type: 'f',
        value: 0
      },
      mouseY: {
        type: 'f',
        value: 0
      }
    };

    this.shaderPass = new ShaderPass({
      uniforms: this.uniforms,
      vertexShader: require('./test.vert'),
      fragmentShader: require('./test.frag')
    });
  }

  update(state: Object) {
    if (state.mouseX) {
      this.shaderPass.uniforms.mouseX.value = state.mouseX;
    }
    if (state.mouseY) {
      this.shaderPass.uniforms.mouseY.value = state.mouseY;
    }
  }
}
