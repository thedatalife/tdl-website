import { Texture, Vector2 } from 'three';
module.exports = threeShaderFXAA;
function threeShaderFXAA(opt) {
  opt = opt || {}
  return {
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
    vertexShader: require('./vert.glsl'),
    fragmentShader: require('./frag.glsl')
  }
}
