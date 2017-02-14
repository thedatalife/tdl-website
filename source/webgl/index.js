// @flow

import * as THREE from 'three';
import { Scene, PerspectiveCamera, WebGLRenderer, WebGLRenderTarget, FogExp2 } from 'three';
import OrbitControls from 'orbit-controls-es6';


import GradientBackground from './background';
import PostProcessing from './postprocessing';

class WebGLApplication {
  domElement: HTMLElement;
  debug: boolean;
  app: any;
  state: Object;
  postprocessing: any;
  scene: Class<Scene>;
  camera: Class<PerspectiveCamera>;
  renderer: Class<WebGLRenderer>;

  constructor(domElement: HTMLElement, options: Object) {
    this.domElement = domElement;
    this.debug = options.debug || false;

    this.state = {};

    this.init();
    this.resize();
  }

  init() {
    this.camera = this.setupCamera();
    this.renderer = this.setupRenderer();
    this.scene = this.setupScene();
    this.postprocessing = new PostProcessing(this.renderer, this.scene, this.camera);
    this.attachToDOM(this.renderer.domElement);

    if (this.debug) {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.enabled = true;
      controls.maxDistance = 1500;
      controls.minDistance = 0;
    }

    this.domElement.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  setupCamera() {
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 5;
    return camera;
  }

  setupRenderer() {
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    return renderer;
  }

  setupScene() {
    const scene = new Scene();
    const background = GradientBackground();

    scene.add(background);
    // scene.fog = new FogExp2(0x000000, 0.00025);

    return scene;
  }

  attachToDOM(element: HTMLElement) {
    this.domElement.appendChild(element);
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.app.update(this.state);
    this.postprocessing.update(this.state);

    //this.renderer.render(this.scene, this.camera);
    this.postprocessing.render();
  }

  resize() {}

  playApp(app: any) {
    this.app = app;
    this.app.init(this.scene, this.camera);
    this.render();
  }

  setState(stateUpdate: Object) {
    this.state = Object.assign({}, this.state, stateUpdate);
  }

  // Event Handlers

  handleMouseMove(e: MouseEvent) {
    this.setState({
      mouseX: e.offsetX / this.domElement.offsetWidth,
      mouseY: e.offsetY / this.domElement.offsetHeight,
      movementX: e.movementX,
      movementY: e.movementY
    })
  }
}

export default WebGLApplication;
