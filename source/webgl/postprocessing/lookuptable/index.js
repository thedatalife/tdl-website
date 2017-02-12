// @flow

import { Texture, TextureLoader, LinearFilter } from 'three';
import { ShaderPass } from 'three-effectcomposer-es6';

export default function(opt: ?Object) {
  opt = opt || {};

  const lookupTable = new ShaderPass({
    uniforms: {
      tDiffuse: {
        type: 't',
        value: new Texture()
      },
      tLookup: {
        type: 't',
        value: new Texture()
      }
    },
    vertexShader: require('./lookuptable.vert'),
    fragmentShader: require('./lookuptable.frag')
  });

  const tLookup = new TextureLoader().load('images/haze.png');
  tLookup.generateMipmaps = false;
  tLookup.minFilter = LinearFilter;
  lookupTable.uniforms.tLookup.value = tLookup;

  return lookupTable;
}
