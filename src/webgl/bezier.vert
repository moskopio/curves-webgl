attribute float t;
uniform mat4 mvp;
uniform vec2 p0;
uniform vec2 p1;
uniform vec2 p2;
uniform vec2 p3;

void main() {
  float t2 = pow(t, 2.0);
  float t3 = pow(t, 3.0);
  
  vec2 part0 = (1.0 - t) * (1.0 - t) * (1.0 - t) * p0;
  vec2 part1 = 3.0 * t * (1.0 - t) * (1.0 - t) * p1;
  vec2 part2 = 3.0 * t2 * (1.0 - t) * p2;
  vec2 part3 = t3 * p3;

  vec2 pos = part0 + part1 + part2 + part3;
 
  gl_Position = mvp * vec4(pos, 0,1);
}
