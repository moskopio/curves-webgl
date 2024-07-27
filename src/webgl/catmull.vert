attribute float t;
attribute float weight;

uniform mat4 mvp;
uniform vec2 p0;
uniform vec2 p1;
uniform vec2 p2;
uniform vec2 p3;

varying vec4 vPos;


vec2 calculateSpline(in vec2 p0, in vec2 p1, in vec2 p2, in vec2 p3, in float t) {
  float t2 = pow(t, 2.0);
  float t3 = pow(t, 3.0);
  
  vec2 part0 = (-t + 2.0 * t2 - t3) * p0;
  vec2 part1 = (2.0 - 5.0 * t2 + 3.0 * t3) * p1;
  vec2 part2 = (t + 4.0 * t2 - 3.0 * t3) * p2;
  vec2 part3 = (-t2 + t3) * p3;
  
  return 0.5 * (part0 + part1 + part2 + part3);
}

vec2 calculateDerivative(in vec2 p0, in vec2 p1, in vec2 p2, in vec2 p3, in float t) {
  float t2 = pow(t, 2.0);
  
  vec2 part0 = (-1.0 + 4.0 * t - 3.0 * t2) * p0;
  vec2 part1 = (-10.0 * t + 9.0 * t2) * p1;
  vec2 part2 = (1.0 + 8.0 * t - 9.0 * t2) * p2;
  vec2 part3 = (-2.0 * t + 3.0 * t2) * p3;
  
  return 0.5 * (part0 + part1 + part2 + part3);
}

vec2 calculateNormal(in vec2 d) {
  return normalize(vec2(-d.y, d.x));
}

vec2 calculateCurve(in vec2 p0, in vec2 p1, in vec2 p2, in vec2 p3, in float t) {
  vec2 curve = calculateSpline(p0, p1, p2, p3, t);
  vec2 derivative = calculateDerivative(p0, p1, p2, p3, t);
  vec2 normal = calculateNormal(derivative);
  
  return  curve + normal * weight;
}

void main() {
  vec2 part1 = calculateCurve(p0, p0, p1, p2, t * 3.0);
  vec2 part2 = calculateCurve(p0, p1, p2, p3, (t - 0.33) * 3.0);
  vec2 part3 = calculateCurve(p1, p2, p3, p3, (t - 0.66) * 3.0);
  
  vec2 pos = part1 * float(t >= 0.0 && t < 0.33) +
             part2 * float(t >= 0.33 && t <= 0.66) +
             part3 * float(t > 0.66);
      
  gl_Position = mvp * vec4(pos, 0,1);
}
