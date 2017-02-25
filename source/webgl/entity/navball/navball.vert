uniform float fTime;
uniform float fMouseX;
uniform float fMouseY;

varying vec2 vUv;
varying float normalized;

void main() {
  float max_spread = 1.1 + (sin(fTime * cos(fTime / 4.0)) / 2.0 + 0.5) / 10.0;
  float magnitude = -0.9 + (sin(fTime) / 2.0 + 0.5) / 10.0;

  vUv = uv;

  float proximity = distance(vec2(fMouseX, fMouseY),vec2(position.x, position.y));
  float spread = clamp(max_spread - proximity, 0.0, max_spread);
  normalized = spread / max_spread;
  float influence = 1.0 + normalized * magnitude;
  vec3 p = position * influence;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
