import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.163/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.163/examples/jsm/controls/OrbitControls.js';

import vertexShader from './shaders/vertex.glsl?raw';
import fragmentShader from './shaders/fragment.glsl?raw';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(2, 4, 2);
light.castShadow = true;
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambient);

// Plano com Shader
const geometry = new THREE.PlaneGeometry(4, 4, 200, 200);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    time: { value: 0 },
    lightPosition: { value: light.position },
  },
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate(t) {
  material.uniforms.time.value = t * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
