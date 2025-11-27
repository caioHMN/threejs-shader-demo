uniform vec3 lightPosition;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(lightPosition - vPosition);

  // iluminação difusa
  float diff = max(dot(normal, lightDir), 0.0);
  
  // cor base + gradiente
  vec3 baseColor = mix(vec3(0.0, 0.2, 0.5), vec3(0.5, 0.8, 1.0), vPosition.y * 0.5 + 0.5);
  vec3 color = baseColor * diff + 0.05;

  // brilho especular
  vec3 viewDir = normalize(-vPosition);
  vec3 reflectDir = reflect(-lightDir, normal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
  color += vec3(0.8) * spec;

  gl_FragColor = vec4(color, 1.0);
}
