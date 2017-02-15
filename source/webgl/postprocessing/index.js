// @flow

import { WebGLRenderTarget, LinearFilter, RGBFormat, Vector2 } from 'three';
import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6';
import FXAA from './fxaa';
import LookupTable from './lookuptable';
import TestShader from './test';

class PostProcessing {
  renderer: any;
  scene: any;
  camera: any;
  composer: any;
  target: any;
  effects: Array<any>;
  constructor(renderer: any, scene: any, camera: any) {
    console.log('new PostProcessing', renderer, scene, camera);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.effects = [];

    this.target = new WebGLRenderTarget(window.innerWidth, window.innerHeight);
    this.target.texture.stencil = false;
    this.target.texture.minFilter = LinearFilter;
    this.target.texture.magFilter = LinearFilter;
    this.target.texture.format = RGBFormat;
    this.target.texture.generateMipmaps = false;

    this.effects.push(new FXAA({
      resolution: new Vector2(window.innerWidth, window.innerHeight)
    }));
    this.effects.push(new LookupTable());
    //this.effects.push(new TestShader());


    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.effects.forEach((effect) => {
      console.log('Adding effects to the composer.', effect);
      this.composer.addPass(effect.shaderPass);
    });

    const copyPass = new ShaderPass(CopyShader);
    copyPass.renderToScreen = true;
    this.composer.addPass(copyPass);
  }

  update(state: Object) {
    this.effects.forEach((effect) => {
      effect.update(state);
    });
  }

  render() {
    this.composer.render();
  }
}

export default PostProcessing;
