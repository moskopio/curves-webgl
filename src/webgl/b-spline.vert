attribute float t;
attribute vec2 p;

uniform mat4 mvp;
uniform vec2 p0;
uniform vec2 p1;
uniform vec2 p2;
uniform vec2 p3;

varying vec4 vPos;


vec2 calculateSpline(in vec2 p0, in vec2 p1, in vec2 p2, in vec2 p3, in float t) {
  float t2 = pow(t, 2.0);
  float t3 = pow(t, 3.0);
  
  vec2 part0 = (-1.0 * t3 + 3.0 * t2 - 3.0 * t + 1.0) * p0;
  vec2 part1 = ( 3.0 * t3 - 6.0 * t2 + 4.0          ) * p1;
  vec2 part2 = (-3.0 * t3 + 3.0 * t2 + 3.0 * t + 1.0) * p2;
  vec2 part3 = t3 * p3;
  
  return (1.0/6.0) * (part0 + part1 + part2 + part3);
}


void main() {
  vec2 part1 = calculateSpline(p0, p0, p1, p2, t * 3.0);
  vec2 part2 = calculateSpline(p0, p1, p2, p3, (t - 0.33) * 3.0);
  vec2 part3 = calculateSpline(p1, p2, p3, p3, (t - 0.66) * 3.0);
  
  vec2 pos = p + part1 * float(t >= 0.0 && t < 0.33) +
             part2 * float(t >= 0.33 && t <= 0.66) +
             part3 * float(t > 0.66);
             
  gl_Position = mvp * vec4(pos, 0,1);
}
