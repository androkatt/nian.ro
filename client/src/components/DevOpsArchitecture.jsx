import React, { useState } from 'react';
import { GitBranch, Settings, Box, Hexagon, Cloud } from 'lucide-react';

const DevOpsArchitecture = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // 1. Node Configurations (Isometric/Waterfall Layout)
  const nodes = [
    { 
      id: 'github', 
      label: 'GitHub', 
      icon: GitBranch, 
      x: 100, y: 80, 
      color: '#ffffff', // White for contrast on dark
      brandColor: '#F05032',
      tooltip: 'Source Control • PR Reviews • Versioning'
    },
    { 
      id: 'jenkins', 
      label: 'Jenkins', 
      icon: Settings, 
      x: 250, y: 220, 
      color: '#D24939',
      brandColor: '#D24939',
      tooltip: 'CI Pipeline • Automated Testing • Building'
    },
    { 
      id: 'docker', 
      label: 'Docker', 
      icon: Box, 
      x: 400, y: 320, 
      color: '#2496ED',
      brandColor: '#2496ED',
      tooltip: 'Containerization • Registry • Microservices'
    },
    { 
      id: 'k8s', 
      label: 'Kubernetes', 
      icon: Hexagon, 
      x: 600, y: 220, 
      color: '#326CE5',
      brandColor: '#326CE5',
      tooltip: 'Orchestration • EKS Cluster • Auto-scaling'
    },
    { 
      id: 'aws', 
      label: 'AWS', 
      icon: Cloud, 
      x: 700, y: 450, 
      color: '#FF9900',
      brandColor: '#FF9900',
      tooltip: 'Cloud Infra • IAM • Networking • Storage'
    }
  ];

  // 2. Bezier Paths (S-Curves)
  const connections = [
    { from: 'github', to: 'jenkins', path: 'M 100 110 C 100 180, 250 150, 250 190' },
    { from: 'jenkins', to: 'docker', path: 'M 250 250 C 250 300, 400 270, 400 290' },
    { from: 'docker', to: 'k8s', path: 'M 430 320 C 500 320, 500 250, 570 250' }, 
    { from: 'k8s', to: 'aws', path: 'M 600 250 C 600 350, 700 350, 700 420' }
  ];

  return (
    // Removed padding, added w-full h-full explicitly
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg 
        viewBox="0 0 800 550" 
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        preserveAspectRatio="xMidYMid meet" // Ensures it scales while keeping aspect ratio
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
          </linearGradient>

          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="6" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {connections.map((conn, i) => {
            const isFocus = hoveredNode 
                ? (conn.from === hoveredNode || conn.to === hoveredNode) 
                : true;
            
            return (
                <g key={i} style={{ opacity: isFocus ? 1 : 0.2, transition: 'opacity 0.4s ease' }}>
                    <path 
                        d={conn.path} 
                        fill="none" 
                        stroke={isFocus && hoveredNode ? "#ffffff" : "url(#neonGradient)"}
                        strokeWidth="2" 
                        strokeLinecap="round"
                        filter="url(#neonGlow)"
                    />
                    <circle r="3" fill="#ffffff">
                        <animateMotion 
                            dur="3s" 
                            repeatCount="indefinite" 
                            path={conn.path} 
                            keyPoints="0;1" 
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>
                    <circle r="2" fill="#ffffff" opacity="0.6">
                        <animateMotion 
                            dur="3s" 
                            begin="0.1s"
                            repeatCount="indefinite" 
                            path={conn.path}
                            keyPoints="0;1" 
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>
                     <circle r="1" fill="#ffffff" opacity="0.3">
                        <animateMotion 
                            dur="3s" 
                            begin="0.2s"
                            repeatCount="indefinite" 
                            path={conn.path}
                            keyPoints="0;1" 
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>
                </g>
            );
        })}

        {nodes.map((node) => {
          const Icon = node.icon;
          const isHovered = hoveredNode === node.id;
          
          return (
            <g 
              key={node.id} 
              transform={`translate(${node.x}, ${node.y})`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              <g style={{ 
                  animation: !isHovered ? 'breathe 4s ease-in-out infinite' : 'none',
                  transformBox: 'fill-box',
                  transformOrigin: 'center'
              }}>
                <circle 
                  r={isHovered ? 40 : 32} 
                  fill="#1a1c23" 
                  stroke={isHovered ? node.brandColor : "#374151"}
                  strokeWidth={isHovered ? 3 : 1}
                  filter={isHovered ? "url(#neonGlow)" : ""}
                  style={{ transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                />
                <foreignObject x={isHovered ? -20 : -16} y={isHovered ? -20 : -16} width={isHovered ? 40 : 32} height={isHovered ? 40 : 32}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <Icon 
                      size={isHovered ? 32 : 24} 
                      color={isHovered ? node.brandColor : "#9ca3af"} 
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  </div>
                </foreignObject>
              </g>

              <text
                y={isHovered ? 65 : 55}
                textAnchor="middle"
                fill={isHovered ? "#ffffff" : "#9ca3af"}
                fontSize="14"
                fontWeight="600"
                style={{ 
                    fontFamily: 'Jost, sans-serif', 
                    transition: 'all 0.3s ease',
                    textShadow: isHovered ? `0 0 10px ${node.brandColor}` : 'none'
                }}
              >
                {node.label}
              </text>

              <g 
                opacity={isHovered ? 1 : 0} 
                transform="translate(50, -30)" 
                style={{ transition: 'opacity 0.4s ease, transform 0.4s ease', pointerEvents: 'none' }}
              >
                {isHovered && (
                  <>
                    <rect 
                      x="0" 
                      y="0" 
                      width="200" 
                      height="60" 
                      rx="8" 
                      fill="rgba(30, 30, 30, 0.8)" 
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      style={{ backdropFilter: 'blur(10px)' }}
                    />
                    <text x="15" y="25" fill={node.brandColor} fontSize="13" fontWeight="700" style={{ fontFamily: 'Jost, sans-serif' }}>
                        {node.label}
                    </text>
                    <text x="15" y="45" fill="#e5e7eb" fontSize="11" fontWeight="400" style={{ fontFamily: 'Jost, sans-serif' }}>
                        {node.tooltip}
                    </text>
                    <path d="M -10 30 L 0 30" stroke={node.brandColor} strokeWidth="1" />
                    <circle cx="-10" cy="30" r="2" fill={node.brandColor} />
                  </>
                )}
              </g>
            </g>
          );
        })}
        
        <style>
          {`
            @keyframes breathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `}
        </style>
      </svg>
    </div>
  );
};

export default DevOpsArchitecture;