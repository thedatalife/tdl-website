// @flow

import { Texture, TextureLoader, LinearFilter } from 'three';
import { ShaderPass } from 'three-effectcomposer-es6';
import PostEffect from '../PostEffect';

export default class LookupTableShader extends PostEffect {
  uniforms: Object;
  shaderPass: Class<ShaderPass>;
  constructor(options: ?Object) {
    super();

    options = options || {};

    const uniforms = {
      tDiffuse: {
        type: 't',
        value: new Texture()
      },
      tLookup: {
        type: 't',
        value: new Texture()
      }
    };

    this.init(
      uniforms,
      require('./lookuptable.vert'),
      require('./lookuptable.frag')
    );

    const tLookup = new TextureLoader().load('images/haze.png');
    tLookup.generateMipmaps = false;
    tLookup.minFilter = LinearFilter;
    this.shaderPass.uniforms.tLookup.value = tLookup;
  }
}
