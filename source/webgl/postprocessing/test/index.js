// @flow

import { Texture, TextureLoader, LinearFilter } from 'three';
import { ShaderPass } from 'three-effectcomposer-es6';
import PostEffect from '../PostEffect';

export default class TestShader extends PostEffect {
  shaderPass: Class<ShaderPass>;
  constructor(options: ?Object) {
    super();
    options = options || {};

    const uniforms = {
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

    const stateBindings = {
      mouseX: 'fMouseX.value',
      mouseY: 'fMouseY.value',
      time: 'fTime.value'
    };

    this.init(
      uniforms,
      require('./test.vert'),
      require('./test.frag'),
      stateBindings
    );
  }
}
