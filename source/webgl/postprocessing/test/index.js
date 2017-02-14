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
      fMouseY: {
        type: 'f',
        value: 0
      },
      fMouseX: {
        type: 'f',
        value: 0
      },
      fTime: {
        type: 'f',
        value: 0
      },
      iSide: {
        type: 'i',
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
      this.shaderPass.uniforms.fMouseX.value = state.mouseX;
    }
    if (state.mouseY) {
      this.shaderPass.uniforms.fMouseY.value = state.mouseY;
    }
    if (state.time) {
      this.shaderPass.uniforms.fTime.value = state.time;
    }
  }
}
