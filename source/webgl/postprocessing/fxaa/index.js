import { Texture, Vector2 } from 'three';
import { ShaderPass } from 'three-effectcomposer-es6';
import PostEffect from '../PostEffect';

export default class FXAA extends PostEffect {
  constructor(options: ?Object) {
    super();

    options = options || {};

    const uniforms = {
      tDiffuse: {
        type: 't',
        value: new Texture()
      },
      resolution: {
        type: 'v2',
        value: options.resolution || new Vector2()
      }
    };

    this.init(uniforms, require('./fxaa.vert'), require('./fxaa.frag'));
  }

}
