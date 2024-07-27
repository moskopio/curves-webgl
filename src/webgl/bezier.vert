attribute float t;
attribute vec2 p;

uniform mat4 mvp;
uniform vec2 p0;
uniform vec2 p1;
uniform vec2 p2;
uniform vec2 p3;

vec2 calculateSpline(in vec2 p0, in vec2 p1, in vec2 p2, in vec2 p3, in float t) {
  float t2 = pow(t, 2.0);
  float t3 = pow(t, 3.0);
  
  vec2 part0 = (1.0 - t) * (1.0 - t) * (1.0 - t) * p0;
  vec2 part1 = 3.0 * t * (1.0 - t) * (1.0 - t) * p1;
  vec2 part2 = 3.0 * t2 * (1.0 - t) * p2;
  vec2 part3 = t3 * p3;
  
  return part0 + part1 + part2 + part3;
}

void main() {
  vec2 pos = p + calculateSpline(p0, p1, p2, p3, t);
  
  gl_Position = mvp * vec4(pos, 0, 1);
}
