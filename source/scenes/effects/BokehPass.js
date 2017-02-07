import { WebGLRenderTarget, LinearFilter, RGBFormat, MeshDepthMaterial, UniformsUtils, ShaderMaterial, OrthographicCamera, Scene, Mesh, PlaneBufferGeometry } from 'three';
import BokehShader from './BokehShader.js';


const Pass = function() {

  // if set to true, the pass is processed by the composer
  this.enabled = true;

  // if set to true, the pass indicates to swap read and write buffer after rendering
  this.needsSwap = true;

  // if set to true, the pass clears its buffer before rendering
  this.clear = false;

  // if set to true, the result of the pass is rendered to screen
  this.renderToScreen = false;

};

Object.assign(Pass.prototype, {

  setSize: function(width, height) {},

  render: function(renderer, writeBuffer, readBuffer, delta, maskActive) {

    console.error("THREE.Pass: .render() must be implemented in derived pass.");

  }

});


const BokehPass = function(scene, camera, params) {

  Pass.call(this);

  this.scene = scene;
  this.camera = camera;

  var focus = (params.focus !== undefined) ? params.focus : 1.0;
  var aspect = (params.aspect !== undefined) ? params.aspect : camera.aspect;
  var aperture = (params.aperture !== undefined) ? params.aperture : 0.025;
  var maxblur = (params.maxblur !== undefined) ? params.maxblur : 1.0;

  // render targets

  var width = params.width || window.innerWidth || 1;
  var height = params.height || window.innerHeight || 1;

  this.renderTargetColor = new WebGLRenderTarget(width, height, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBFormat
  });

  this.renderTargetDepth = this.renderTargetColor.clone();

  // depth material

  this.materialDepth = new MeshDepthMaterial();

  // bokeh material

  if (BokehShader === undefined) {

    console.error("THREE.BokehPass relies on THREE.BokehShader");

  }

  var bokehShader = BokehShader;
  var bokehUniforms = UniformsUtils.clone(bokehShader.uniforms);

  bokehUniforms["tDepth"].value = this.renderTargetDepth.texture;

  bokehUniforms["focus"].value = focus;
  bokehUniforms["aspect"].value = aspect;
  bokehUniforms["aperture"].value = aperture;
  bokehUniforms["maxblur"].value = maxblur;

  this.materialBokeh = new ShaderMaterial({
    uniforms: bokehUniforms,
    vertexShader: bokehShader.vertexShader,
    fragmentShader: bokehShader.fragmentShader
  });

  this.uniforms = bokehUniforms;
  this.needsSwap = false;

  this.camera2 = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene2 = new Scene();

  this.quad2 = new Mesh(new PlaneBufferGeometry(2, 2), null);
  this.quad2.frustumCulled = false; // Avoid getting clipped
  this.scene2.add(this.quad2);

};

BokehPass.prototype = Object.assign(Object.create(Pass.prototype), {

  constructor: BokehPass,

  render: function(renderer, writeBuffer, readBuffer, delta, maskActive) {

    this.quad2.material = this.materialBokeh;

    // Render depth into texture

    this.scene.overrideMaterial = this.materialDepth;

    renderer.render(this.scene, this.camera, this.renderTargetDepth, true);

    // Render bokeh composite

    this.uniforms["tColor"].value = readBuffer.texture;

    if (this.renderToScreen) {

      renderer.render(this.scene2, this.camera2);

    } else {

      renderer.render(this.scene2, this.camera2, writeBuffer, this.clear);

    }

    this.scene.overrideMaterial = null;

  }

});

module.exports = BokehPass;
