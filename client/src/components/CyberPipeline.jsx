import React, { useState, useEffect } from 'react';
import { Github, Settings, Container, ShipWheel, Cloud } from 'lucide-react';

const CyberPipeline = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [gridOffset, setGridOffset] = useState(0);

  // Animate perspective grid
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setGridOffset((prev) => (prev + 0.2) % 40);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // 1. Nodes in Zig-Zag "Waterfall" Pattern
  const nodes = [
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      x: 300, y: 80,
      brandColor: '#F05032',
      techSpecs: ['Source Control', 'PR Automation', 'Security Scan']
    },
    {
      id: 'jenkins',
      label: 'Jenkins',
      icon: Settings,
      x: 150, y: 200,
      brandColor: '#D24939',
      techSpecs: ['CI Pipelines', 'Unit Testing', 'Artifact Builds']
    },
    {
      id: 'docker',
      label: 'Docker',
      icon: Container,
      x: 450, y: 320,
      brandColor: '#2496ED',
      techSpecs: ['Containerization', 'Image Optimization', 'Registry']
    },
    {
      id: 'k8s',
      label: 'Kubernetes',
      icon: ShipWheel,
      x: 150, y: 440,
      brandColor: '#326CE5',
      techSpecs: ['Orchestration', 'Auto-scaling', 'Service Mesh']
    },
    {
      id: 'aws',
      label: 'AWS',
      icon: Cloud,
      x: 300, y: 560,
      brandColor: '#FF9900',
      techSpecs: ['Cloud Infra', 'Serverless', 'Global CDN']
    }
  ];

  // 2. Connections (Dual-Line Cabling)
  // Adjusted coordinates for logic flow
  const connections = [
    { id: 'c1', from: 'github', to: 'jenkins', path: 'M 300 110 C 300 160, 150 120, 150 170' },
    { id: 'c2', from: 'jenkins', to: 'docker', path: 'M 150 230 C 150 280, 450 240, 450 290' },
    { id: 'c3', from: 'docker', to: 'k8s', path: 'M 450 350 C 450 400, 150 360, 150 410' },
    { id: 'c4', from: 'k8s', to: 'aws', path: 'M 150 470 C 150 520, 300 480, 300 530' }
  ];

  // Hexagon Generator
  const createHexagon = (r) => {
    const a = 2 * Math.PI / 6;
    return Array.from({ length: 6 }, (_, i) => [
      r * Math.cos(a * i),
      r * Math.sin(a * i)
    ]).map(p => p.join(',')).join(' ');
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-[#030712] relative overflow-hidden rounded-xl border border-gray-800 shadow-2xl"
    >

      {/* Background: Deep Void with Fading Binary/Hex Codes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Simple gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0f172a] to-[#030712] opacity-80"></div>
      </div>

      <svg
        viewBox="0 -100 600 750"
        className="w-full h-full max-w-2xl z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Neon Glow Filter */}
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strong-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients */}
          <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />  {/* Cyan */}
            <stop offset="100%" stopColor="#a855f7" /> {/* Purple */}
          </linearGradient>

          <linearGradient id="hologramGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.1)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </linearGradient>

          {/* Grid Pattern */}
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse" y={gridOffset}>
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Perspective Floor */}
        <g transform="perspective(600px) rotateX(25deg)">
          <rect x="-200" y="-100" width="1000" height="1000" fill="url(#gridPattern)" opacity="0.4" />
        </g>

        {/* Connections (Data Highways) */}
        {connections.map((conn) => {
          return (
            <g key={conn.id}>
              {/* Static Dark Rail */}
              <path
                d={conn.path}
                fill="none"
                stroke="#0f172a"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d={conn.path}
                fill="none"
                stroke="#1e293b"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Pulsing Energy Cable */}
              <path
                d={conn.path}
                fill="none"
                stroke="url(#energyGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="15, 15"
                filter="url(#neon-glow)"
                opacity="1"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="30"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              </path>

              {/* Data Packets (Comets on the line) */}
              <circle r="3" fill="#fff" filter="url(#neon-glow)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={conn.path}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
              </circle>
              {/* Trail for the packet */}
              <path d={conn.path} stroke="url(#energyGradient)" strokeWidth="3" fill="none" strokeDasharray="0, 100" opacity="0.5">
                <animate
                  attributeName="stroke-dasharray"
                  values="0,100; 20,100; 0,100"
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={conn.path}
                  calcMode="linear"
                />
              </path>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const Icon = node.icon;

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              {/* Holographic Card (Projects Upwards) */}
              <g
                transform={`translate(0, ${isHovered ? -110 : -90})`}
                opacity={isHovered ? 1 : 0}
                style={{ transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                filter="url(#strong-glow)"
              >
                {isHovered && (
                  <>
                    <path
                      d="M 0 55 L 0 75"
                      stroke={node.brandColor}
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <g>
                      {/* Glass Card Background */}
                      <defs>
                        <linearGradient id={`grad-${node.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(30, 41, 59, 0.9)" />
                          <stop offset="100%" stopColor="rgba(15, 23, 42, 0.95)" />
                        </linearGradient>
                      </defs>
                      <rect
                        x="-80" y="-60"
                        width="160" height="100"
                        rx="4"
                        fill={`url(#grad-${node.id})`}
                        stroke={node.brandColor}
                        strokeWidth="1"
                      />
                      {/* Scanline Effect */}
                      <rect x="-80" y="-60" width="160" height="100" fill="url(#hologramGradient)" opacity="0.3" rx="4" />

                      {/* Text Content */}
                      <text x="0" y="-35" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" fontFamily="monospace" letterSpacing="1px">
                        {node.label.toUpperCase()}
                      </text>
                      <line x1="-60" y1="-25" x2="60" y2="-25" stroke={node.brandColor} strokeWidth="0.5" opacity="0.5" />

                      {node.techSpecs.map((spec, i) => (
                        <text key={i} x="0" y={-5 + (i * 18)} textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="sans-serif">
                          &gt; {spec}
                        </text>
                      ))}
                    </g>
                  </>
                )}
              </g>

              {/* Orbital Rings */}
              {/* Outer fast ring */}
              <circle
                r="55"
                fill="none"
                stroke={isHovered ? node.brandColor : "#334155"}
                strokeWidth="1"
                strokeDasharray="20 40"
                opacity={isHovered ? 0.8 : 0.2}
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  dur={isHovered ? "3s" : "15s"}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Inner opposing ring */}
              <circle
                r="48"
                fill="none"
                stroke={isHovered ? "#fff" : "#475569"}
                strokeWidth="1"
                strokeDasharray="4 8"
                opacity={isHovered ? 0.6 : 0.2}
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="360 0 0"
                  to="0 0 0"
                  dur={isHovered ? "4s" : "20s"}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Base Hexagon (Glassmorphism) */}
              <g className="transition-transform duration-300" transform={isHovered ? 'scale(1.1)' : 'scale(1)'}>
                <polygon
                  points={createHexagon(38)}
                  fill="rgba(15, 23, 42, 0.6)"
                  stroke={isHovered ? "#fff" : node.brandColor}
                  strokeWidth={isHovered ? 2 : 1.5}
                  filter="url(#neon-glow)"
                  className="transition-all duration-300"
                />
                {/* Inner hex fill for solid feel if needed, but keeping it glass for now */}
              </g>

              {/* Icon */}
              <foreignObject x="-30" y="-30" width="60" height="60" style={{ pointerEvents: 'none' }}>
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Icon
                    size={38}
                    color={isHovered ? "#fff" : node.brandColor}
                    className="transition-colors duration-300"
                    strokeWidth={1.5}
                    style={{ filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'none' }}
                  />
                </div>
              </foreignObject>

              {/* Label below node */}
              <text
                y="65"
                textAnchor="middle"
                fill={isHovered ? "#fff" : "#94a3b8"}
                fontSize="12"
                fontWeight="600"
                fontFamily="monospace"
                className="transition-colors duration-300"
                style={{ textShadow: isHovered ? `0 0 10px ${node.brandColor}` : 'none' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* CSS Styles for animations that need @keyframes */}
      <style>{`
        @keyframes cometFade {
          0% { opacity: 0; transform: translateY(0) translateX(0); }
          50% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(100px) translateX(100px); }
        }
        .animate-comet {
          animation: cometFade linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CyberPipeline;