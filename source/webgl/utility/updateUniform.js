// @flow

/*
  updateUniform

  takes an object, value and object path as a string 'resolution.value.x'
  traverses the shaderPass object to find a property
  'resolution.value.x' will resolve to shaderPass.resolution.value.x
  sets the value in the object
*/

function updateUniform(obj: Object, value: any, pathString: any) {
  // break the path into parts
  const pathParts = pathString.split('.');
  let currentNode = obj;

  // walk the tree until we reach one node from the end
  let pathFragment;
  let count = pathParts.length;
  let i = 0;
  for (; i < count - 1; i++) {
    currentNode = currentNode[pathParts[i]];
  }

  // set the value of the desired path in the shaderPass object
  currentNode[pathParts[i]] = value;
}

export default updateUniform;
