// @flow

import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

class Application {
  sceneClass: any;
  scene: Class<Scene>;
  camera: Class<PerspectiveCamera>;
  renderer: Class<WebGLRenderer>;
  scenes: Array<any>;

  constructor() {
    this.sceneClass = null;
    this.scenes = [];
    this.createScene();
  }

  createScene() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 20;

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (document.body) {
      document.body.appendChild(this.renderer.domElement);
    }

    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.scenes.forEach((scene) => {
      scene.update();
    });

    this.renderer.render(this.scene, this.camera);
  }

  playScene(sceneClass: any) {
    this.scenes.push(sceneClass);
    sceneClass.init(this.scene, this.camera);
  }
}

export default Application;
