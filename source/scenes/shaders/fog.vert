#define FOG_START 100
#define FOG_END 500

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

attribute vec3 position;
varying float fogAmount;

#pragma glslify: fog_linear = require(glsl-fog/linear)

void main() {
  gl_Position = projection * view * model * vec4(positon, 1.0);
  float fogDistance = length(gl_Position.xyz);
  fogAmount = fog_linear(fogDistance, FOG_START, FOG_END);
}
