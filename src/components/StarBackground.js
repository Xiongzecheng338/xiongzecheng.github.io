'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm'; // 需要安装 maath，或者在代码里简化随机生成

// 简单的高性能粒子背景
export default function StarBackground(props) {
  const ref = useRef();
  // 生成 5000 个随机点
  const positions = new Float32Array(5000 * 3);
  for (let i = 0; i < 5000; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // x
    positions[i + 1] = (Math.random() - 0.5) * 10; // y
    positions[i + 2] = (Math.random() - 0.5) * 10; // z
  }

  // 动画循环：让星星缓慢旋转
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#64ffda" // 科技青色
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
