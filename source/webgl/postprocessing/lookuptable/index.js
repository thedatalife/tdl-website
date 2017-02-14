// @flow

import { Texture, TextureLoader, LinearFilter } from 'three';
import { ShaderPass } from 'three-effectcomposer-es6';

export default class LookupTableShader {
  uniforms: Object;
  shaderPass: Class<ShaderPass>;
  constructor(options: ?Object) {
    options = options || {};

    this.uniforms = {
      tDiffuse: {
        type: 't',
        value: new Texture()
      },
      tLookup: {
        type: 't',
        value: new Texture()
      }
    };

    this.shaderPass = new ShaderPass({
      uniforms: this.uniforms,
      vertexShader: require('./lookuptable.vert'),
      fragmentShader: require('./lookuptable.frag')
    });

    const tLookup = new TextureLoader().load('images/haze.png');
    tLookup.generateMipmaps = false;
    tLookup.minFilter = LinearFilter;
    this.shaderPass.uniforms.tLookup.value = tLookup;
  }

  update(state: Object) {}
}
