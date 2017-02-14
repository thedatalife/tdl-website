uniform sampler2D tDiffuse;
uniform int side;
uniform float mouseX;
uniform float mouseY;

varying vec2 vUv;

void main() {
  vec2 p = vUv;
  if (side == 0){
  	if (p.x > mouseX) p.x = 1.0 - p.x;
  }else if (side == 1){
  	if (p.x < mouseX) p.x = 1.0 - p.x;
  }else if (side == 2){
  	if (p.y < mouseY) p.y = 1.0 - p.y;
  }else if (side == 3){
  	if (p.y > mouseY) p.y = 1.0 - p.y;
  }
  vec4 color = texture2D(tDiffuse, p);
  gl_FragColor = color;
}
