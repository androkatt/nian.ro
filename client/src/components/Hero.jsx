import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import LoaderLogo from './LoaderLogo';

// Inline crisp SVGs for brands removed from SimpleIcons CDN (AWS, Azure, OpenAI)
const INLINE_SVGS = {
  amazonaws: (color) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={`#${color}`}>
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.024.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.024.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.064.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08h-.686zm10.296.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.399-1.158c0-.335.072-.63.216-.886.143-.255.335-.479.574-.654.24-.184.519-.32.838-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144.111.064.191.128.239.2.048.064.072.151.072.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.288.878.415l1.133.359c.575.184.99.44 1.237.767.247.327.367.702.367 1.133 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zm1.624 4.478c-2.607 1.923-6.393 2.945-9.635 2.945-4.558 0-8.668-1.686-11.787-4.492-.244-.22-.026-.521.268-.35 3.354 1.952 7.5 3.126 11.791 3.126 2.891 0 6.077-.6 9.008-1.84.441-.188.812.29.355.611zm1.084-1.236c-.333-.427-2.205-.202-3.047-.101-.256.031-.295-.192-.065-.353 1.492-1.049 3.938-.746 4.222-.395.285.354-.075 2.805-1.475 3.972-.215.18-.42.084-.325-.154.315-.787 1.023-2.544.69-2.969z" />
    </svg>
  ),
  azure: (color) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={`#${color}`}>
      <path d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505v.014L13.23 2.7z" />
    </svg>
  ),
  openai: (color) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={`#${color}`}>
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  )
};

// 3 Structured Architectural Orbits (Inside-Out: 01 Cloud/Runtime -> 02 DevOps/SRE -> 03 App/Data/AI)
const ORBITAL_LAYERS = [
  {
    id: 'cloud',
    label: '01 · CLOUD & RUNTIME',
    accent: '#d4af37', // Luxury Gold
    radius: 4.9,
    activeScale: 1.32, // Expands spaciously when solo-filtered
    tilt: [0.46, 0.18, 0.14],
    speed: 0.14,
    nodes: [
      { name: 'AWS', color: 'FF9900', slug: 'amazonaws' },
      { name: 'GCP', color: '4285F4', slug: 'googlecloud' },
      { name: 'Azure', color: '0089D6', slug: 'azure' },
      { name: 'Linux', color: 'FCC624', slug: 'linux' },
      { name: 'Kubernetes', color: '326CE5', slug: 'kubernetes' },
      { name: 'Docker', color: '2496ED', slug: 'docker' },
      { name: 'Nginx', color: '009639', slug: 'nginx' }
    ]
  },
  {
    id: 'devops',
    label: '02 · DEVOPS & SRE',
    accent: '#8ea072', // Luxury Olive
    radius: 7.2,
    activeScale: 1.1,
    tilt: [-0.36, 0.22, -0.34],
    speed: -0.095,
    nodes: [
      { name: 'Terraform', color: '844FBA', slug: 'terraform' },
      { name: 'Ansible', color: 'EE0000', slug: 'ansible' },
      { name: 'GitLab', color: 'FC6D26', slug: 'gitlab' },
      { name: 'Jenkins', color: 'D24939', slug: 'jenkins' },
      { name: 'Bash', color: '4EAA25', slug: 'gnubash' },
      { name: 'Prometheus', color: 'E6522C', slug: 'prometheus' },
      { name: 'Grafana', color: 'F46800', slug: 'grafana' }
    ]
  },
  {
    id: 'runtime',
    label: '03 · APP, DATA & AI',
    accent: '#38968f', // Luxury Teal
    radius: 9.5,
    activeScale: 1.0,
    tilt: [0.22, -0.32, 0.28],
    speed: 0.065,
    nodes: [
      { name: 'Vue.js', color: '4FC08D', slug: 'vuedotjs' },
      { name: 'React', color: '61DAFB', slug: 'react' },
      { name: 'Node.js', color: '5FA04E', slug: 'nodedotjs' },
      { name: 'Python', color: '3776AB', slug: 'python' },
      { name: 'PostgreSQL', color: '4169E1', slug: 'postgresql' },
      { name: 'MongoDB', color: '47A248', slug: 'mongodb' },
      { name: 'LLMs & AI', color: '10A37F', slug: 'openai' }
    ]
  }
];

// Central 3D Architectural Core
const CloudNucleus = () => {
  const innerRef = useRef();
  const cageRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.25;
      innerRef.current.rotation.x = t * 0.15;
      const pulse = 1 + Math.sin(t * 2.0) * 0.04;
      innerRef.current.scale.setScalar(pulse);
    }
    if (cageRef.current) {
      cageRef.current.rotation.y = -t * 0.18;
      cageRef.current.rotation.z = t * 0.12;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.4) * 0.15;
      ring1Ref.current.rotation.y = t * 0.35;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -Math.PI / 3 + Math.cos(t * 0.35) * 0.15;
      ring2Ref.current.rotation.z = -t * 0.28;
    }
  });

  return (
    <group>
      {/* Subtle Ambient Core Glow Halo */}
      <Html center style={{ pointerEvents: 'none' }}>
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(142, 160, 114, 0.08) 45%, rgba(10, 10, 12, 0) 72%)',
            filter: 'blur(8px)'
          }}
        />
      </Html>

      {/* Faceted Dark Metallic Nucleus */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#14161d"
          emissive="#d4af37"
          emissiveIntensity={0.18}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Outer Gold Geodesic Wireframe Shell */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[1.78, 1]} />
        <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.32} />
      </mesh>

      {/* Inner Gyroscope Gimbal 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.35, 0.016, 16, 100]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.45} />
      </mesh>

      {/* Inner Gyroscope Gimbal 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.7, 0.013, 16, 100]} />
        <meshBasicMaterial color="#8ea072" transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

// Individual Technology Node on an Orbit
const OrbitalSkillNode = ({
  position,
  tech,
  layerAccent,
  layerLabel,
  isFilteredActive,
  isFilteredOut,
  onHoverChange
}) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const inlineSvgRenderer = INLINE_SVGS[tech.slug];
  const iconUrl = `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`;

  const handleEnter = (e) => {
    if (isFilteredOut) return;
    e.stopPropagation();
    setHovered(true);
    onHoverChange(true);
  };

  const handleLeave = (e) => {
    e.stopPropagation();
    setHovered(false);
    onHoverChange(false);
  };

  const nodeScale = hovered ? 1.26 : isFilteredActive ? 1.12 : isFilteredOut ? 0.72 : 1;

  return (
    <group position={position}>
      {/* 3D Physical Anchor Bead on the Orbital Track */}
      <mesh>
        <sphereGeometry args={[hovered || isFilteredActive ? 0.15 : 0.1, 16, 16]} />
        <meshBasicMaterial
          color={hovered || isFilteredActive ? `#${tech.color}` : layerAccent}
          transparent
          opacity={isFilteredOut ? 0.12 : 1}
        />
      </mesh>

      <Html center distanceFactor={27} zIndexRange={isFilteredOut ? [10, 0] : [100, 10]}>
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${nodeScale})`,
            opacity: isFilteredOut ? 0.08 : 1,
            filter: isFilteredOut ? 'blur(1.5px) grayscale(70%)' : 'none',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: isFilteredOut ? 'default' : 'pointer',
            pointerEvents: isFilteredOut ? 'none' : 'auto',
            userSelect: 'none'
          }}
        >
          {/* Glassmorphic Luxury Pod */}
          <div
            style={{
              width: '50px',
              height: '50px',
              background:
                hovered || isFilteredActive
                  ? 'radial-gradient(circle at 30% 30%, rgba(36, 39, 49, 0.96), rgba(12, 13, 17, 0.98))'
                  : 'radial-gradient(circle at 30% 30%, rgba(24, 26, 33, 0.88), rgba(10, 10, 14, 0.94))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              border: hovered
                ? `1.5px solid #${tech.color}`
                : isFilteredActive
                ? `1.5px solid ${layerAccent}cc`
                : `1px solid ${layerAccent}55`,
              boxShadow: hovered
                ? `0 0 24px #${tech.color}66, 0 0 8px ${layerAccent}44, inset 0 0 12px #${tech.color}26`
                : isFilteredActive
                ? `0 0 18px ${layerAccent}44, 0 6px 18px rgba(0, 0, 0, 0.7)`
                : '0 6px 18px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
              transition: 'all 0.28s ease'
            }}
          >
            {inlineSvgRenderer ? (
              inlineSvgRenderer(tech.color)
            ) : !imgError ? (
              <img
                src={iconUrl}
                alt={tech.name}
                style={{
                  width: '24px',
                  height: '24px',
                  filter:
                    hovered || isFilteredActive
                      ? `drop-shadow(0 0 6px #${tech.color}88)`
                      : 'none',
                  transition: 'filter 0.25s ease'
                }}
                onError={() => setImgError(true)}
              />
            ) : (
              <span
                style={{
                  color: `#${tech.color}`,
                  fontWeight: 700,
                  fontSize: '13px',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.03em'
                }}
              >
                {tech.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          {/* Crisp Frosted Name Pill */}
          <div
            style={{
              marginTop: '5px',
              padding: '2px 8px',
              borderRadius: '999px',
              background:
                hovered || isFilteredActive
                  ? 'rgba(15, 16, 22, 0.95)'
                  : 'rgba(10, 10, 14, 0.75)',
              border: hovered
                ? `1px solid #${tech.color}66`
                : isFilteredActive
                ? `1px solid ${layerAccent}66`
                : '1px solid rgba(255, 255, 255, 0.06)',
              color: hovered || isFilteredActive ? '#ffffff' : 'rgba(255, 255, 255, 0.82)',
              fontSize: '10.5px',
              fontWeight: hovered || isFilteredActive ? 600 : 500,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              transition: 'all 0.25s ease'
            }}
          >
            {tech.name}
          </div>

          {/* Subtle Domain Layer Micro-Tag on Hover */}
          {hovered && (
            <div
              style={{
                marginTop: '2px',
                fontSize: '8.5px',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.1em',
                color: layerAccent,
                textTransform: 'uppercase',
                opacity: 0.95
              }}
            >
              {layerLabel}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

// Single Tilted Orbital Track + Nodes + Traveling Data Pulses
const OrbitalRing = ({ layer, activeLayer, onHoverChange }) => {
  const ringContainerRef = useRef();
  const orbitGroupRef = useRef();
  const pulse1Ref = useRef();
  const pulse2Ref = useRef();
  const [ringHovered, setRingHovered] = useState(false);
  const speedMultiplierRef = useRef(1);
  const scaleRef = useRef(1);

  const isFilteredActive = activeLayer === layer.id;
  const isFilteredOut = activeLayer !== null && activeLayer !== layer.id;

  // Compute evenly spaced node positions & faint radial tethers
  const { spokesGeometry, nodePositions } = useMemo(() => {
    const positions = [];
    const spokeVertices = [];
    const count = layer.nodes.length;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * layer.radius;
      const y = Math.sin(angle) * layer.radius;
      positions.push([x, y, 0]);

      // Faint tether from inner perimeter toward node
      const innerR = 2.85;
      spokeVertices.push(
        Math.cos(angle) * innerR,
        Math.sin(angle) * innerR,
        0,
        x,
        y,
        0
      );
    }

    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.Float32BufferAttribute(spokeVertices, 3));

    return {
      spokesGeometry: sGeo,
      nodePositions: positions
    };
  }, [layer]);

  const handleNodeHover = (isHovering) => {
    setRingHovered(isHovering);
    onHoverChange(isHovering);
  };

  useFrame(({ clock }, delta) => {
    // Smoothly decelerate ring rotation when hovered or solo-filtered
    const targetMult = ringHovered ? 0.08 : isFilteredActive ? 0.45 : 1.0;
    speedMultiplierRef.current = THREE.MathUtils.lerp(
      speedMultiplierRef.current,
      targetMult,
      0.08
    );

    // Smoothly expand inner/middle ring slightly when solo-filtered for readability
    const targetScale = isFilteredActive ? layer.activeScale || 1.0 : isFilteredOut ? 0.94 : 1.0;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.08);
    if (ringContainerRef.current) {
      ringContainerRef.current.scale.setScalar(scaleRef.current);
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.z += delta * layer.speed * speedMultiplierRef.current;
    }

    // Animate telemetry light packets racing along the ring
    const t = clock.getElapsedTime();
    const pAngle1 = t * (layer.speed * 4.5);
    const pAngle2 = pAngle1 + Math.PI;

    if (pulse1Ref.current) {
      pulse1Ref.current.position.set(
        Math.cos(pAngle1) * layer.radius,
        Math.sin(pAngle1) * layer.radius,
        0
      );
    }
    if (pulse2Ref.current) {
      pulse2Ref.current.position.set(
        Math.cos(pAngle2) * layer.radius,
        Math.sin(pAngle2) * layer.radius,
        0
      );
    }
  });

  const trackOpacity = isFilteredOut ? 0.04 : ringHovered || isFilteredActive ? 0.72 : 0.3;
  const outerTrackOpacity = isFilteredOut ? 0.02 : ringHovered || isFilteredActive ? 0.28 : 0.09;
  const spokeOpacity = isFilteredOut ? 0.01 : ringHovered || isFilteredActive ? 0.18 : 0.06;

  return (
    <group ref={ringContainerRef} rotation={layer.tilt}>
      <group ref={orbitGroupRef}>
        {/* Primary 3D Orbital Track Tube */}
        <mesh>
          <torusGeometry
            args={[layer.radius, ringHovered || isFilteredActive ? 0.026 : 0.016, 16, 160]}
          />
          <meshBasicMaterial color={layer.accent} transparent opacity={trackOpacity} />
        </mesh>

        {/* Secondary Precision Outer Hairline Tube */}
        <mesh>
          <torusGeometry args={[layer.radius + 0.18, 0.008, 12, 160]} />
          <meshBasicMaterial color={layer.accent} transparent opacity={outerTrackOpacity} />
        </mesh>

        {/* Subtle Radial Architecture Spokes */}
        <lineSegments geometry={spokesGeometry}>
          <lineBasicMaterial color={layer.accent} transparent opacity={spokeOpacity} />
        </lineSegments>

        {/* Live Telemetry Pulse 1 */}
        {!isFilteredOut && (
          <mesh ref={pulse1Ref}>
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        )}

        {/* Live Telemetry Pulse 2 */}
        {!isFilteredOut && (
          <mesh ref={pulse2Ref}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial color={layer.accent} />
          </mesh>
        )}

        {/* Skill Nodes along this Orbit */}
        {layer.nodes.map((tech, idx) => (
          <OrbitalSkillNode
            key={tech.name}
            position={nodePositions[idx]}
            tech={tech}
            layerAccent={layer.accent}
            layerLabel={layer.label}
            isFilteredActive={isFilteredActive}
            isFilteredOut={isFilteredOut}
            onHoverChange={handleNodeHover}
          />
        ))}
      </group>
    </group>
  );
};

// Subtle Floating Luxury Gold/Olive Dust Particles
const AmbientOrbitalDust = () => {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 90;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const gold = new THREE.Color('#d4af37');
    const olive = new THREE.Color('#8ea072');

    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 9.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = Math.random() > 0.45 ? gold : olive;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.025;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const Scene = ({ activeLayer, onAnyHover }) => {
  const systemRef = useRef();

  useFrame(({ clock }) => {
    if (systemRef.current) {
      // Gentle floating breathing motion elevated cleanly above bottom filter bar
      systemRef.current.position.y = 0.78 + Math.sin(clock.getElapsedTime() * 0.6) * 0.18;
    }
  });

  return (
    <group ref={systemRef}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 12]} intensity={2.2} color="#d4af37" />
      <pointLight position={[-10, -8, -10]} intensity={1.4} color="#8ea072" />

      <CloudNucleus />
      <AmbientOrbitalDust />

      {ORBITAL_LAYERS.map((layer) => (
        <OrbitalRing
          key={layer.id}
          layer={layer}
          activeLayer={activeLayer}
          onHoverChange={onAnyHover}
        />
      ))}
    </group>
  );
};

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [nodeHovered, setNodeHovered] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);

  // Simulate initial load sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 second initial luxury lock screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="initial-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="loader-svg-container"
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <LoaderLogo className="loader-svg-logo" />
            </motion.div>
            <motion.div
              className="loader-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Personal Portfolio
            </motion.div>
            <motion.div
              className="loader-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Nicolae Andrei
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" className="hero-section">
        <div className="container hero-grid">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate={!loading ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.4 }
              }
            }}
          >
            <motion.h3
              className="hello-text"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
              }}
            >
              Hello, I'm
            </motion.h3>
            <motion.h1
              className="hero-name"
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }
                }
              }}
            >
              Nicolae Andrei
            </motion.h1>
            <motion.h4
              className="hero-tagline"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
              }}
            >
              Cloud <span style={{ color: 'var(--glow-olive)' }}>Infrastructure Architect</span> &{' '}
              <span style={{ color: 'var(--glow-gold)' }}>DevOps Engineer</span>
            </motion.h4>
            <motion.p
              className="description"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
              }}
              style={{ fontWeight: '300' }}
            >
              I architect scalable cloud environments and automate complex workflows. With over a
              decade of experience, I merge software development with robust infrastructure using{' '}
              <strong>AWS, Kubernetes, and AI</strong> technologies.
            </motion.p>
            <motion.div
              className="hero-buttons"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
              }}
            >
              <a href="#contact" className="btn">
                Get in Touch
              </a>
              <div className="social-icons">
                <a
                  href="https://www.linkedin.com/in/nicolae-andrei/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a
                  href="https://github.com/androkatt"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Orbital Cloud System — Visible on Desktop/Laptops, Hidden on Mobile */}
          <motion.div
            className="hero-image-wrapper hero-orbital-wrapper hidden-mobile"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={!loading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
          >
            {/* Subtle Ambient Radial Backdrop behind 3D System */}
            <div
              style={{
                position: 'absolute',
                inset: '10%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, rgba(142, 160, 114, 0.03) 45%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <Canvas
              camera={{ position: [0, 0, 28.5], fov: 45 }}
              dpr={[1, 2]}
              style={{ touchAction: 'pan-y' }}
            >
              <fog attach="fog" args={['#0a0a0c', 22, 44]} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={!nodeHovered && activeLayer === null}
                autoRotateSpeed={0.45}
                enableDamping={true}
                dampingFactor={0.05}
              />
              <Scene activeLayer={activeLayer} onAnyHover={setNodeHovered} />
            </Canvas>

            {/* Interactive Layer Filter Dock */}
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 8px',
                borderRadius: '999px',
                background: 'rgba(12, 13, 18, 0.88)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 28px rgba(0, 0, 0, 0.6)',
                zIndex: 120,
                pointerEvents: 'auto'
              }}
            >
              {/* Reset / Show All Button */}
              <button
                type="button"
                onClick={() => setActiveLayer(null)}
                style={{
                  padding: '5px 11px',
                  borderRadius: '999px',
                  border:
                    activeLayer === null
                      ? '1px solid rgba(212, 175, 55, 0.55)'
                      : '1px solid transparent',
                  background:
                    activeLayer === null
                      ? 'rgba(212, 175, 55, 0.16)'
                      : 'rgba(255, 255, 255, 0.02)',
                  color: activeLayer === null ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  fontSize: '9px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.09em',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                ALL
              </button>

              {ORBITAL_LAYERS.map((layer) => {
                const isSelected = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() =>
                      setActiveLayer((prev) => (prev === layer.id ? null : layer.id))
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '999px',
                      border: isSelected
                        ? `1px solid ${layer.accent}`
                        : '1px solid rgba(255, 255, 255, 0.04)',
                      background: isSelected
                        ? `${layer.accent}24`
                        : 'rgba(255, 255, 255, 0.02)',
                      boxShadow: isSelected ? `0 0 14px ${layer.accent}33` : 'none',
                      fontSize: '9px',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: isSelected ? 600 : 500,
                      letterSpacing: '0.07em',
                      color: isSelected
                        ? '#ffffff'
                        : activeLayer === null
                        ? 'rgba(255, 255, 255, 0.72)'
                        : 'rgba(255, 255, 255, 0.4)',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.22s ease'
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: layer.accent,
                        boxShadow: isSelected
                          ? `0 0 10px ${layer.accent}`
                          : `0 0 5px ${layer.accent}88`
                      }}
                    />
                    {layer.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
