import React, { useState, useEffect } from 'react';
import { GitBranch, Settings, Box, Hexagon, Cloud } from 'lucide-react';

const CyberPipeline = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [gridOffset, setGridOffset] = useState(0);

  // Generate random particles once using useState lazy initializer
  // Ensured positions are within 10-90% range to keep them centered initially
  const [particles] = useState(() => {
    return Array.from({ length: 20 }).map(() => ({
      left: `${10 + Math.random() * 80}%`, 
      top: `${10 + Math.random() * 80}%`,
      duration: `${5 + Math.random() * 10}s`,
      opacity: 0.2 + Math.random() * 0.5, // Increased minimum opacity for visibility
      text: Math.random() > 0.5 ? '0101' : '1010'
    }));
  });

  // Animate grid for "moving forward" effect
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setGridOffset((prev) => (prev + 0.5) % 40);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // 1. Configuration: Nodes in a Zig-Zag "Waterfall" Pattern
  const nodes = [
    { 
      id: 'github', 
      label: 'GitHub', 
      icon: GitBranch, 
      x: 100, y: 80, 
      color: '#ffffff', 
      brandColor: '#F05032',
      techSpecs: ['Source Control', 'PR Automation', 'Security Scan']
    },
    { 
      id: 'jenkins', 
      label: 'Jenkins', 
      icon: Settings, 
      x: 500, y: 180, 
      color: '#D24939',
      brandColor: '#D24939',
      techSpecs: ['CI Pipelines', 'Unit Testing', 'Artifact Builds']
    },
    { 
      id: 'docker', 
      label: 'Docker', 
      icon: Box, 
      x: 100, y: 320, 
      color: '#2496ED',
      brandColor: '#2496ED',
      techSpecs: ['Containerization', 'Image Optimization', 'Registry']
    },
    { 
      id: 'k8s', 
      label: 'Kubernetes', 
      icon: Hexagon, 
      x: 500, y: 420, 
      color: '#326CE5',
      brandColor: '#326CE5',
      techSpecs: ['Orchestration', 'Auto-scaling', 'Service Mesh']
    },
    { 
      id: 'aws', 
      label: 'AWS', 
      icon: Cloud, 
      x: 300, y: 550, 
      color: '#FF9900',
      brandColor: '#FF9900',
      techSpecs: ['Cloud Infra', 'Serverless', 'Global CDN']
    }
  ];

  // 2. Connections (The "Data Highways")
  const connections = [
    { id: 'c1', from: 'github', to: 'jenkins', path: 'M 100 110 C 100 180, 500 110, 500 150' },
    { id: 'c2', from: 'jenkins', to: 'docker', path: 'M 500 210 C 500 280, 100 220, 100 290' },
    { id: 'c3', from: 'docker', to: 'k8s', path: 'M 100 350 C 100 420, 500 320, 500 390' },
    { id: 'c4', from: 'k8s', to: 'aws', path: 'M 500 450 C 500 520, 300 500, 300 520' }
  ];

  // Hexagon Path Helper
  const createHexagon = (r) => {
    const a = 2 * Math.PI / 6;
    return Array.from({ length: 6 }, (_, i) => [
      r * Math.cos(a * i),
      r * Math.sin(a * i)
    ]).map(p => p.join(',')).join(' ');
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#030712] relative overflow-hidden rounded-xl border border-gray-800 shadow-2xl">
      {/* Background: Floating binary */}
      {/* Removed inset-0 and replaced with explicit full size + relative positioning context for children */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {particles.map((p, i) => (
          <div 
            key={i}
            className="animate-float"
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              color: '#22c55e', // text-green-500
              fontSize: '12px',
              fontFamily: 'monospace',
              animationDuration: p.duration,
              opacity: p.opacity
            }}
          >
            {p.text}
          </div>
        ))}
      </div>

      <svg 
        viewBox="0 0 600 620" 
        className="w-full h-full max-w-2xl z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
          </filter>

          <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <linearGradient id="cometGradient">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse" y={gridOffset}>
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f2937" strokeWidth="1" />
          </pattern>
        </defs>

        <g transform="perspective(500px) rotateX(20deg)">
           <rect x="-200" y="-100" width="1000" height="1000" fill="url(#gridPattern)" opacity="0.3" />
        </g>

        {connections.map((conn) => {
          const isFocus = hoveredNode && (conn.from === hoveredNode || conn.to === hoveredNode);
          const isDimmed = hoveredNode && !isFocus;

          return (
            <g key={conn.id} opacity={isDimmed ? 0.1 : 1} className="transition-opacity duration-500">
              <path 
                d={conn.path} 
                fill="none" 
                stroke="#1e293b" 
                strokeWidth="6" 
                strokeLinecap="round"
              />
              <path 
                d={conn.path} 
                fill="none" 
                stroke="url(#cableGradient)" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeDasharray="10, 10"
                filter="url(#neon-glow)"
                opacity="0.8"
              >
                <animate 
                  attributeName="stroke-dashoffset" 
                  from="100" 
                  to="0" 
                  dur="20s" 
                  repeatCount="indefinite" 
                  calcMode="linear"
                />
              </path>

              <circle r="4" fill="#fff" filter="url(#neon-glow)">
                <animateMotion 
                  dur="3s" 
                  repeatCount="indefinite" 
                  path={conn.path} 
                  keyPoints="0;1" 
                  keyTimes="0;1"
                  calcMode="linear"
                />
              </circle>
              <circle r="2" fill="url(#cableGradient)" opacity="0.6">
                 <animateMotion 
                  dur="3s" 
                  begin="0.05s"
                  repeatCount="indefinite" 
                  path={conn.path} 
                />
              </circle>
            </g>
          );
        })}

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
              <g 
                transform={`translate(0, -90)`} 
                opacity={isHovered ? 1 : 0} 
                style={{ transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                 {isHovered && (
                  <>
                    <path 
                      d="M 0 50 L 0 60" 
                      stroke={node.brandColor} 
                      strokeWidth="2" 
                      strokeDasharray="4 2"
                      opacity="0.5"
                    />
                    <g filter="url(#neon-glow)">
                        <rect 
                          x="-80" y="-50" 
                          width="160" height="90" 
                          rx="8" 
                          fill="rgba(15, 23, 42, 0.8)" 
                          stroke={node.brandColor} 
                          strokeWidth="1"
                        />
                        <text x="0" y="-30" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Jost">
                          {node.label}
                        </text>
                        {node.techSpecs.map((spec, i) => (
                           <text key={i} x="0" y={-10 + (i * 15)} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Jost">
                             {spec}
                           </text>
                        ))}
                    </g>
                  </>
                 )}
              </g>

              <circle 
                r="50" 
                fill="none" 
                stroke={isHovered ? node.brandColor : "#334155"} 
                strokeWidth="1" 
                strokeDasharray="10 20"
                opacity={isHovered ? 1 : 0.3}
              >
                <animateTransform 
                  attributeName="transform" 
                  attributeType="XML" 
                  type="rotate" 
                  from="0 0 0" 
                  to="360 0 0" 
                  dur={isHovered ? "4s" : "20s"} 
                  repeatCount="indefinite" 
                />
              </circle>
              
              <circle 
                r="44" 
                fill="none" 
                stroke={isHovered ? node.brandColor : "#334155"} 
                strokeWidth="1" 
                strokeDasharray="5 5"
                opacity={isHovered ? 0.8 : 0.2}
              >
                <animateTransform 
                  attributeName="transform" 
                  attributeType="XML" 
                  type="rotate" 
                  from="360 0 0" 
                  to="0 0 0" 
                  dur={isHovered ? "5s" : "25s"} 
                  repeatCount="indefinite" 
                />
              </circle>

              <polygon 
                points={createHexagon(35)} 
                fill={isHovered ? node.brandColor : "rgba(30, 41, 59, 0.6)"}
                stroke={isHovered ? "#fff" : node.brandColor} 
                strokeWidth={isHovered ? 2 : 1}
                filter="url(#neon-glow)"
                className="transition-colors duration-300"
              />

              <foreignObject x="-20" y="-20" width="40" height="40" style={{ pointerEvents: 'none' }}>
                <div className="w-full h-full flex items-center justify-center">
                  <Icon 
                    size={24} 
                    color={isHovered ? "#fff" : node.brandColor} 
                    className="transition-colors duration-300"
                  />
                </div>
              </foreignObject>

              <text 
                y="70" 
                textAnchor="middle" 
                fill={isHovered ? "#fff" : "#94a3b8"} 
                fontSize="12" 
                fontWeight="600"
                fontFamily="Jost"
                className="transition-colors duration-300"
                filter={isHovered ? "url(#neon-glow)" : ""}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      
      <style>{`
        @keyframes float {
          0% { transform: translateY(100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CyberPipeline;