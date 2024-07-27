attribute float t;
attribute float weight;

uniform mat4 mvp;
uniform vec2 p0;
uniform vec2 p1;
uniform vec2 p2;
uniform vec2 p3;

vec2 calculateSpline(in float t) {
  float t2 = pow(t, 2.0);
  float t3 = pow(t, 3.0);
  float mt = (1.0 - t);
  float mt2 = pow(mt, 2.0);
  float mt3 = pow(mt, 3.0);
  
  vec2 part0 = mt3 * p0;
  vec2 part1 = 3.0 * t * mt2 * p1;
  vec2 part2 = 3.0 * t2 * mt * p2;
  vec2 part3 = t3 * p3;
  
  return part0 + part1 + part2 + part3;
}

vec2 calculateDerivative(in float t) {
  float t2 = pow(t, 2.0);
  float mt = (1.0 - t);
  float mt2 = pow(mt, 2.0);
  
  vec2 part0 = -3.0 * mt2 * p0;
  vec2 part1 = 3.0 * (3.0 * t2 - 4.0 * t + 1.0) * p1;
  vec2 part2 = 3.0 * (2.0 * t - 3.0 * t2) * p2;
  vec2 part3 = 3.0 * t2 * p3;
    
  return part0 + part1 + part2 + part3;
}

vec2 calculateNormal(in vec2 d) {
  return normalize(vec2(-d.y, d.x));
}

void main() {
  vec2 curve = calculateSpline(t);
  vec2 derivative = calculateDerivative(t);
  vec2 normal = calculateNormal(derivative);
  
  vec2 pos = curve + normal * weight;
  gl_Position = mvp * vec4(pos, 0, 1);
}
