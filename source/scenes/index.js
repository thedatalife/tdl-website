// @flow

import * as THREE from 'three';
import { Scene, PerspectiveCamera, WebGLRenderer, WebGLRenderTarget } from 'three';
import createBackground from './background';

const createFXAA = require('./fxaa');
const EffectComposer = require('three-effectcomposer')(THREE);

class Application {
  sceneClass: any;
  scene: Class<Scene>;
  camera: Class<PerspectiveCamera>;
  renderer: Class<WebGLRenderer>;
  target: Class<WebGLRenderTarget>;
  composer: Class<any>;
  scenes: Array<any>;

  constructor() {
    this.sceneClass = null;
    this.scenes = [];
    this.createScene();
  }

  createScene() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 5;

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    this.target.texture.stencil = false;
    this.target.texture.minFilter = THREE.LinearFilter;
    this.target.texture.magFilter = THREE.LinearFilter;
    this.target.texture.format = THREE.RGBFormat;
    this.target.texture.generateMipmaps = false;

    this.composer = new EffectComposer(this.renderer, this.target);

    this.composer.addPass(new EffectComposer.RenderPass(this.scene, this.camera));
    this.composer.addPass(new EffectComposer.ShaderPass(createFXAA()));

    // Add the Lookup Table shader
    const lut = new EffectComposer.ShaderPass({
      vertexShader: require('./shaders/pass.vert'),
      fragmentShader: require('./shaders/lut.frag'),
      uniforms: {
        tDiffuse: {
          type: 't',
          value: new THREE.Texture()
        },
        tLookup: {
          type: 't',
          value: new THREE.Texture()
        }
      }
    });
    this.composer.addPass(lut);

    const tLookup = new THREE.TextureLoader().load('images/haze.png');
    tLookup.generateMipmaps = false;
    tLookup.minFilter = THREE.LinearFilter;
    lut.uniforms.tLookup.value = tLookup;


    this.composer.passes[this.composer.passes.length - 1].renderToScreen = true;

    if (document.body) {
      document.body.appendChild(this.renderer.domElement);
    }

    var background = createBackground();
    this.scene.add(background);

    this.scene.fog = new THREE.Fog(0x000000, 1, 100);

    this.resize();
    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.composer.passes.forEach(pass => {
      if (pass.uniforms && pass.uniforms.resolution) {
        pass.uniforms.resolution.value.set(
          this.target.width, this.target.height
        );
      }
    });

    this.scenes.forEach((scene) => {
      scene.update();
    });

    this.composer.render();
  }

  resize() {
    // We need to resize the composer carefully to
    // make sure it looks good at all sizes!
    const dpr = this.renderer.getPixelRatio();
    const targets = [
      this.composer.renderTarget1,
      this.composer.renderTarget2
    ];
    targets.forEach(target => {
      target.setSize(dpr * window.innerWidth, dpr * window.innerHeight);
    });
  }

  playScene(sceneClass: any) {
    this.scenes.push(sceneClass);
    sceneClass.init(this.scene, this.camera);
  }
}

export default Application;
