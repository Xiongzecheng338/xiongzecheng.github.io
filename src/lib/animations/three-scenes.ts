import * as THREE from 'three';

export const createParticleSystem = (
  count: number,
  colors: number[],
  spread: number = 50
) => {
  const positions = new Float32Array(count * 3);
  const colorArray = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * spread;
    positions[i3 + 1] = (Math.random() - 0.5) * spread;
    positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.4;

    const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
    colorArray[i3] = color.r;
    colorArray[i3 + 1] = color.g;
    colorArray[i3 + 2] = color.b;
  }

  return { positions, colorArray };
};

export const createRenderer = (container: HTMLElement, alpha: boolean = true) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  return renderer;
};

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 15;
  return camera;
};

export const disposeThree = (
  renderer: THREE.WebGLRenderer,
  geometry?: THREE.BufferGeometry,
  material?: THREE.Material
) => {
  if (geometry) geometry.dispose();
  if (material) material.dispose();
  renderer.dispose();
  if (renderer.domElement.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement);
  }
};