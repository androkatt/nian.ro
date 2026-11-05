import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex Shader for Multi-Depth Glowing & Twinkling Stars
const starVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aBrightness;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aFlare;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vFlare;

  void main() {
    vColor = color;
    vFlare = aFlare;

    // Organic twinkling per star
    float twinkle = 0.72 + 0.28 * sin(uTime * aSpeed + aPhase);
    vAlpha = aBrightness * twinkle;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Perspective size attenuation (closer stars appear larger, farther stars smaller)
    float distScale = 18.0 / max(-mvPosition.z, 2.0);
    gl_PointSize = aSize * distScale * uPixelRatio * (0.88 + 0.12 * twinkle);
  }
`;

// Fragment Shader for Soft Radial Star Halo + Hot Core + Celestial Diffraction Spikes
const starFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vFlare;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv) * 2.0;
    if (d > 1.0) discard;

    // Hot white-hot stellar core + soft colored corona
    float core = exp(-d * d * 28.0);
    float halo = exp(-d * 4.2) * 0.65;
    float outerGlow = pow(max(0.0, 1.0 - d), 2.4) * 0.35;

    // 4-point diffraction flare for closer/brighter beacon stars
    float spikeH = exp(-abs(uv.y) * 36.0) * exp(-abs(uv.x) * 4.5);
    float spikeV = exp(-abs(uv.x) * 36.0) * exp(-abs(uv.y) * 4.5);
    float spikes = (spikeH + spikeV) * vFlare * 0.75;

    float intensity = core + halo + outerGlow + spikes;
    vec3 finalColor = mix(vColor, vec3(1.0, 0.99, 0.96), clamp(core * 1.1 + spikes * 0.5, 0.0, 1.0));

    gl_FragColor = vec4(finalColor, clamp(intensity * vAlpha, 0.0, 1.0));
  }
`;

// Vertex & Fragment Shaders for Procedural Volumetric Nebula Clouds
const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform float uSeed;

  varying vec2 vUv;

  // 2D Simplex-style hash & smooth noise
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.05 + vec2(0.12 * uTime, -0.08 * uTime);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 centered = (vUv - 0.5) * 2.0;
    float dist = length(centered);
    if (dist > 1.0) discard;

    // Soft radial falloff so nebula edges never clip
    float radialMask = pow(1.0 - dist, 2.2);

    vec2 p = vUv * 3.2 + vec2(uSeed, uSeed * 0.7);
    float n1 = fbm(p + vec2(uTime * 0.015, -uTime * 0.01));
    float n2 = fbm(p * 1.6 - vec2(uTime * 0.012, uTime * 0.018) + n1 * 0.8);

    float cloud = smoothstep(0.22, 0.82, n1 * 0.55 + n2 * 0.45) * radialMask;
    vec3 col = mix(uColorA, uColorB, n2);

    gl_FragColor = vec4(col, cloud * uOpacity);
  }
`;

// Multi-Tier Starfield + Cosmic Dust Belt
const CosmicStarfield = () => {
  const starsRef = useRef();
  const dustRef = useRef();

  // 1. Generate 3 tiers of stars (Far, Mid, Near Beacons)
  const starAttributes = useMemo(() => {
    const farCount = 950;
    const midCount = 320;
    const nearCount = 55;
    const total = farCount + midCount + nearCount;

    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const sizes = new Float32Array(total);
    const brightness = new Float32Array(total);
    const phases = new Float32Array(total);
    const speeds = new Float32Array(total);
    const flares = new Float32Array(total);

    const palette = [
      new THREE.Color('#ffffff'), // Pure starlight
      new THREE.Color('#f7e3a1'), // Warm champagne gold
      new THREE.Color('#d4af37'), // Luxury gold
      new THREE.Color('#b6d4a2'), // Soft celestial olive
      new THREE.Color('#8ee0da'), // Icy cyan-teal
      new THREE.Color('#cfd8f7')  // Cool blue-white giant
    ];

    for (let i = 0; i < total; i++) {
      let tier = 0; // 0 = far, 1 = mid, 2 = near beacon
      if (i >= farCount + midCount) tier = 2;
      else if (i >= farCount) tier = 1;

      // Distribute across wide viewport frustum
      const spreadX = tier === 0 ? 52 : tier === 1 ? 38 : 30;
      const spreadY = tier === 0 ? 32 : tier === 1 ? 24 : 18;
      const z =
        tier === 0
          ? -14 - Math.random() * 18 // Far: -14 to -32
          : tier === 1
          ? -5 - Math.random() * 9   // Mid: -5 to -14
          : -1.5 - Math.random() * 4; // Near: -1.5 to -5.5

      positions[i * 3] = (Math.random() - 0.5) * spreadX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      positions[i * 3 + 2] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      if (tier === 0) {
        // Far stars: tiny, subtle
        sizes[i] = 4.0 + Math.random() * 7.0;
        brightness[i] = 0.22 + Math.random() * 0.45;
        flares[i] = 0.0;
        speeds[i] = 0.6 + Math.random() * 1.2;
      } else if (tier === 1) {
        // Mid stars: medium, distinct glow
        sizes[i] = 11.0 + Math.random() * 13.0;
        brightness[i] = 0.5 + Math.random() * 0.4;
        flares[i] = Math.random() > 0.7 ? 0.35 : 0.0;
        speeds[i] = 1.0 + Math.random() * 1.8;
      } else {
        // Near bright stars: refined size & softer flare so they never overpower text
        sizes[i] = 16.0 + Math.random() * 14.0;
        brightness[i] = 0.65 + Math.random() * 0.2;
        flares[i] = 0.55 + Math.random() * 0.25;
        speeds[i] = 1.0 + Math.random() * 1.5;
      }

      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, brightness, phases, speeds, flares, total };
  }, []);

  // 2. Generate Sweeping Galactic Cosmic Dust Band
  const dustAttributes = useMemo(() => {
    const count = 700;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightness = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const flares = new Float32Array(count);

    const gold = new THREE.Color('#d4af37');
    const olive = new THREE.Color('#8ea072');
    const teal = new THREE.Color('#38968f');

    for (let i = 0; i < count; i++) {
      // Diagonal galactic stream across the sky
      const t = (Math.random() - 0.5) * 44;
      const gaussianSpread = (Math.random() + Math.random() + Math.random() - 1.5) * 3.8;
      const x = t;
      const y = t * 0.24 + gaussianSpread + Math.sin(t * 0.22) * 1.6;
      const z = -9 - Math.random() * 12;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const ratio = (t + 22) / 44;
      const col = ratio < 0.5
        ? gold.clone().lerp(olive, ratio * 2)
        : olive.clone().lerp(teal, (ratio - 0.5) * 2);

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = 7.0 + Math.random() * 14.0;
      brightness[i] = 0.14 + Math.random() * 0.26;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.4 + Math.random() * 0.8;
      flares[i] = 0.0;
    }

    return { positions, colors, sizes, brightness, phases, speeds, flares, count };
  }, []);

  const starUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
    }),
    []
  );

  const dustUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
    }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    starUniforms.uTime.value = t;
    dustUniforms.uTime.value = t;

    if (starsRef.current) {
      starsRef.current.rotation.z = t * 0.004;
      starsRef.current.rotation.y = Math.sin(t * 0.02) * 0.03;
    }
    if (dustRef.current) {
      dustRef.current.rotation.z = -t * 0.003;
    }
  });

  return (
    <group>
      {/* Multi-Depth Starfield */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starAttributes.total}
            array={starAttributes.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starAttributes.total}
            array={starAttributes.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={starAttributes.total}
            array={starAttributes.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aBrightness"
            count={starAttributes.total}
            array={starAttributes.brightness}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            count={starAttributes.total}
            array={starAttributes.phases}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aSpeed"
            count={starAttributes.total}
            array={starAttributes.speeds}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aFlare"
            count={starAttributes.total}
            array={starAttributes.flares}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={starUniforms}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Galactic Cosmic Dust Band */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustAttributes.count}
            array={dustAttributes.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={dustAttributes.count}
            array={dustAttributes.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={dustAttributes.count}
            array={dustAttributes.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aBrightness"
            count={dustAttributes.count}
            array={dustAttributes.brightness}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            count={dustAttributes.count}
            array={dustAttributes.phases}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aSpeed"
            count={dustAttributes.count}
            array={dustAttributes.speeds}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aFlare"
            count={dustAttributes.count}
            array={dustAttributes.flares}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={dustUniforms}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Single Volumetric Nebula Cloud Plane
const NebulaCloud = ({ position, scale, colorA, colorB, opacity, seed, rotSpeed }) => {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uOpacity: { value: opacity },
      uSeed: { value: seed }
    }),
    [colorA, colorB, opacity, seed]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    if (meshRef.current) {
      meshRef.current.rotation.z = t * rotSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Deep Space Scene with Mouse & Scroll Parallax
const CosmicScene = () => {
  const rigRef = useRef();
  const pointerTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      pointerTarget.current.x = nx * 0.65;
      pointerTarget.current.y = -ny * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (rigRef.current) {
      rigRef.current.position.x = THREE.MathUtils.lerp(
        rigRef.current.position.x,
        pointerTarget.current.x,
        0.03
      );
      rigRef.current.position.y = THREE.MathUtils.lerp(
        rigRef.current.position.y,
        pointerTarget.current.y,
        0.03
      );
    }
  });

  return (
    <group ref={rigRef}>
      {/* Volumetric Nebula Clouds in Deep Background */}
      <NebulaCloud
        position={[-11, 5.5, -18]}
        scale={[26, 18, 1]}
        colorA="#d4af37"
        colorB="#38968f"
        opacity={0.11}
        seed={1.7}
        rotSpeed={0.008}
      />
      <NebulaCloud
        position={[12, -4.5, -20]}
        scale={[28, 20, 1]}
        colorA="#8ea072"
        colorB="#d4af37"
        opacity={0.1}
        seed={4.3}
        rotSpeed={-0.006}
      />
      <NebulaCloud
        position={[1, 1.5, -24]}
        scale={[34, 22, 1]}
        colorA="#1e3a5f"
        colorB="#38968f"
        opacity={0.12}
        seed={8.9}
        rotSpeed={0.005}
      />
      <NebulaCloud
        position={[-8, -7, -22]}
        scale={[24, 16, 1]}
        colorA="#4c3575"
        colorB="#d4af37"
        opacity={0.08}
        seed={12.4}
        rotSpeed={-0.007}
      />

      {/* Stars & Cosmic Dust */}
      <CosmicStarfield />
    </group>
  );
};

const WireframeWave = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.32,
        pointerEvents: 'none'
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={[1, 1.75]}>
        <CosmicScene />
      </Canvas>
    </div>
  );
};

export default WireframeWave;
