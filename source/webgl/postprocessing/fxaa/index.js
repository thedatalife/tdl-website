import { Texture, Vector2 } from 'three';
import { ShaderPass } from 'three-effectcomposer-es6';

export default function(opt) {
  opt = opt || {};

  const fxaa = new ShaderPass({
    uniforms: {
      tDiffuse: {
        type: 't',
        value: new Texture()
      },
      resolution: {
        type: 'v2',
        value: opt.resolution || new Vector2()
      }
    },
    vertexShader: require('./fxaa.vert'),
    fragmentShader: require('./fxaa.frag')
  });

  console.log('fxaa', fxaa);
  return fxaa;
}
