"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Lightweight product-flavoured 3D backdrop for the hero.
 * A cluster of floating rounded "module" panels + a field of particles that
 * drift toward the centre — a visual metaphor for data converging into one
 * platform. Deliberately low-poly and dpr-capped for performance.
 */

const ACCENT = new THREE.Color("#4fd1e8");
const PANEL = new THREE.Color("#17253e");

function Panel({
  position,
  rotation,
  scale = 1,
  accent = false,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  accent?: boolean;
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <boxGeometry args={[1.5, 1, 0.06]} />
          <meshStandardMaterial
            color={PANEL}
            metalness={0.35}
            roughness={0.55}
            emissive={accent ? ACCENT : new THREE.Color("#0a1120")}
            emissiveIntensity={accent ? 0.35 : 0.15}
          />
        </mesh>
        {/* accent header bar */}
        <mesh position={[-0.42, 0.36, 0.04]}>
          <boxGeometry args={[0.5, 0.12, 0.02]} />
          <meshStandardMaterial
            color={accent ? ACCENT : new THREE.Color("#2e4269")}
            emissive={accent ? ACCENT : new THREE.Color("#2e4269")}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

function DataField() {
  const ref = useRef<THREE.Points>(null);
  const count = 220;

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.sin(a) * r - 2;
      speeds[i] = 0.15 + Math.random() * 0.4;
    }
    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // drift toward centre
      arr[ix] -= arr[ix] * speeds[i] * delta * 0.25;
      arr[ix + 2] -= (arr[ix + 2] + 2) * speeds[i] * delta * 0.25;
      // respawn when close to centre
      if (Math.abs(arr[ix]) < 0.3 && Math.abs(arr[ix + 2] + 2) < 0.3) {
        const r = 6 + Math.random() * 4;
        const a = Math.random() * Math.PI * 2;
        arr[ix] = Math.cos(a) * r;
        arr[ix + 2] = Math.sin(a) * r - 2;
      }
    }
    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={ACCENT}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    // subtle parallax follow
    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, -2);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <pointLight position={[-4, -2, 2]} intensity={20} color="#0b7aab" distance={14} />

      <Panel position={[-3.4, 1.5, -1]} rotation={[0.2, 0.5, -0.1]} scale={0.9} />
      <Panel position={[3.6, 1.1, -2]} rotation={[-0.15, -0.5, 0.12]} accent />
      <Panel position={[3.1, -1.8, -1.5]} rotation={[0.1, -0.4, -0.15]} scale={0.85} />
      <Panel position={[-3.7, -1.6, -2.2]} rotation={[-0.2, 0.6, 0.1]} scale={0.8} accent />
      <Panel position={[-1.2, 2.6, -3]} rotation={[0.3, 0.2, 0.05]} scale={0.6} />

      <DataField />
      <Rig />
    </Canvas>
  );
}
