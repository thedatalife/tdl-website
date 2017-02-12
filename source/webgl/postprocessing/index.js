// @flow

import { WebGLRenderTarget, LinearFilter, RGBFormat } from 'three';
import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6';
import FXAA from './fxaa';
import LookupTable from './lookuptable';

class PostProcessing {
  renderer: any;
  scene: any;
  camera: any;
  composer: any;
  target: any;
  constructor(renderer: any, scene: any, camera: any) {
    console.log('new PostProcessing', renderer, scene, camera);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.target = new WebGLRenderTarget(window.innerWidth, window.innerHeight);
    this.target.texture.stencil = false;
    this.target.texture.minFilter = LinearFilter;
    this.target.texture.magFilter = LinearFilter;
    this.target.texture.format = RGBFormat;
    this.target.texture.generateMipmaps = false;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(FXAA());
    this.composer.addPass(LookupTable());

    const copyPass = new ShaderPass(CopyShader);
    copyPass.renderToScreen = true;
    this.composer.addPass(copyPass);
  }

  update() {
    this.composer.passes.forEach(pass => {
      if (pass.uniforms && pass.uniforms.resolution) {
        pass.uniforms.resolution.value.set(
          this.target.width, this.target.height
        );
      }
    });
  }

  render() {
    this.composer.render();
  }
}

export default PostProcessing;
