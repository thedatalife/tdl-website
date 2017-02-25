uniform float fMouseX;
uniform float fMouseY;

varying vec2 vUv;
varying float normalized;

void main() {
	gl_FragColor = vec4(1, normalized, 0, 1);
}
