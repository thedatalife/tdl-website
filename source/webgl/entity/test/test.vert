attribute float vertexDisplacement;
uniform float delta;
uniform float fTime;
uniform float fClickX;
uniform float fClickY;

varying float vOpacity;
varying vec3 vUv;

void main()
{

  vOpacity = vertexDisplacement;

  vec3 p = position;
  float pct = distance(vec2(fClickX, fClickY),vec2(position.x + 0.5, position.y + 0.5));
  p.z += (sin(fTime * position.x + position.y) * (pct + 0.1));

  vUv = p;
	vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);
	gl_Position = projectionMatrix * modelViewPosition;
}
