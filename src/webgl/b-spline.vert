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
  
  vec2 part0 = (-t3 + 3.0 * t2 - 3.0 * t + 1.0) * p0;
  vec2 part1 = (3.0 * t3 - 6.0 * t2 + 4.0) * p1;
  vec2 part2 = (-3.0 * t3 + 3.0 * t2 + 3.0 * t + 1.0) * p2;
  vec2 part3 = t3 * p3;
  
  return (1.0/6.0) * (part0 + part1 + part2 + part3);
}

vec2 calculateDerivative(in vec2 p0, in vec2 p1, in vec2 p2, in vec2 p3, in float t) {
  float t2 = pow(t, 2.0);
  
  vec2 part0 = (-2.0 * t2 + 6.0 * t - 3.0) * p0;
  vec2 part1 = (9.0 * t2 - 12.0 * t) * p1;
  vec2 part2 = (-9.0 * t2 + 6.0 * t + 3.0) * p2;
  vec2 part3 = 3.0 * t2 * p3;
  
  return (1.0/6.0) * (part0 + part1 + part2 + part3);
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
  vec2 part0 = calculateCurve(p0, p0, p0, p1, t / 0.05);
  vec2 part1 = calculateCurve(p0, p0, p1, p2, (t - 0.05) / 0.30);
  vec2 part2 = calculateCurve(p0, p1, p2, p3, (t - 0.35) / 0.30);
  vec2 part3 = calculateCurve(p1, p2, p3, p3, (t - 0.65) / 0.30);
  vec2 part4 = calculateCurve(p2, p3, p3, p3, (t - 0.95) / 0.05);
  
  vec2 pos = part0 * float(t >= 0.0  && t < 0.05) +
             part1 * float(t >= 0.05 && t < 0.35) +
             part2 * float(t >= 0.35 && t < 0.65) +
             part3 * float(t >= 0.65 && t < 0.95) +
             part4 * float(t >= 0.95);
  
  gl_Position = mvp * vec4(pos, 0, 1);
}
