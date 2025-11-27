uniform float time;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 pos = position;

  // deformação senoidal
  float freq = 2.0;
  float amp = 0.2;
  pos.z += sin(pos.x * freq + time) * amp;
  pos.z += cos(pos.y * freq + time * 0.8) * amp;

  vNormal = normalMatrix * normal;
  vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
