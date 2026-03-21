'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticlePoint {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  speed: number;
}

export default function ThreeParticleDoor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const targets: ParticlePoint[] = [];

    const gradientColors = [
      new THREE.Color(0x667EEA),
      new THREE.Color(0x764BA2),
      new THREE.Color(0xF093FB),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const color = gradientColors[Math.floor(Math.random() * gradientColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 10;
      targets.push({
        x: positions[i3],
        y: positions[i3 + 1],
        z: positions[i3 + 2],
        targetX: Math.cos(angle) * radius * 0.3,
        targetY: Math.sin(angle) * radius * 0.5,
        targetZ: 0,
        speed: 0.005 + Math.random() * 0.01,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 15;

    let isAnimating = true;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!isAnimating) return;
      requestAnimationFrame(animate);

      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const target = targets[i];

        posAttr.array[i3] += (target.targetX - posAttr.array[i3]) * target.speed;
        posAttr.array[i3 + 1] += (target.targetY - posAttr.array[i3 + 1]) * target.speed;
        posAttr.array[i3 + 2] += (target.targetZ - posAttr.array[i3 + 2]) * target.speed;
      }

      posAttr.needsUpdate = true;

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isAnimating = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0" />;
}