// @flow

import { ShaderMaterial } from 'three';

export default class PostEffect {
  material: Class<ShaderMaterial>;
  stateBindings: Object;
  constructor() {}
  init(uniforms: Object, vertexShader: any, fragmentShader: any, stateBindings: ?Object) {
    this.material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });

    if (stateBindings) {
      this.stateBindings = stateBindings;
    }

    console.log('init', this);
  }
  update(state: Object) {
    if (this.stateBindings) {
      Object.keys(this.stateBindings).forEach((key) => {
        if (state.hasOwnProperty(key)) {
          this.updateUniform(state[key], this.stateBindings[key]);
        }
      });
    }
  }

  /*
    updateUniform

    takes a value and an object path as a string 'resolution.value.x'
    traverses the shaderPass object to find a property
    'resolution.value.x' will resolve to shaderPass.resolution.value.x
  */
  updateUniform(value: any, uniformPathString: any) {
    // if the uniformPathString is a function instead of a string
    // execute it first and the return should contain a new value and path
    if (typeof uniformPathString == 'function') {
      const transformFunctionOutput = uniformPathString(value);
      value = transformFunctionOutput.value;
      uniformPathString = transformFunctionOutput.path;
    }

    // break the path into parts
    const uniformPathParts = uniformPathString.split('.');
    let currentNode = this.material.uniforms;

    // walk the tree until we reach one node from the end
    let pathFragment;
    let count = uniformPathParts.length;
    let i = 0;
    for (; i < count - 1; i++) {
      currentNode = currentNode[uniformPathParts[i]];
    }

    // set the value of the desired path in the shaderPass object
    currentNode[uniformPathParts[i]] = value;
  }
}
