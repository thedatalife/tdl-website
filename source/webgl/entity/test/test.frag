varying float vOpacity;
varying vec3 vUv;
uniform float fClickX;
uniform float fClickY;

void main() {
	float pct = 0.0;
    // a. The DISTANCE from the pixel to the center
  pct = distance(vec2(fClickX, fClickY),vec2(vUv.x + 0.5, vUv.y + 0.5));

	gl_FragColor = vec4(pct, vUv.y, vUv.z, vOpacity);
}
