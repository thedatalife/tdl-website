uniform sampler2D tDiffuse;
uniform int iSide;
uniform float fTime;
uniform float fMouseX;
uniform float fMouseY;

varying vec2 vUv;

void main() {
  vec2 p = vUv;
  float x = sin(fTime);
  if (iSide == 0){
  	if (p.x > x) p.x = 1.0 - p.x;
  }else if (iSide == 1){
  	if (p.x < fMouseX) p.x = 1.0 - p.x;
  }else if (iSide == 2){
  	if (p.y < fMouseY) p.y = 1.0 - p.y;
  }else if (iSide == 3){
  	if (p.y > fMouseY) p.y = 1.0 - p.y;
  }
  vec4 color = texture2D(tDiffuse, p);
  gl_FragColor = color;
}
