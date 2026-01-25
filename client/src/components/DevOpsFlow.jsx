import React, { useState } from 'react';
import { GitBranch, Settings, Box, Hexagon, Cloud } from 'lucide-react';

const DevOpsFlow = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    { id: 'source', label: 'Commit', icon: GitBranch, color: '#F05032', tooltip: 'Source Code Management (GitHub)' },
    { id: 'ci', label: 'Build', icon: Settings, color: '#D24939', tooltip: 'Continuous Integration (Jenkins)' },
    { id: 'package', label: 'Containerize', icon: Box, color: '#2496ED', tooltip: 'Docker Packaging' },
    { id: 'orchestrate', label: 'Deploy', icon: Hexagon, color: '#326CE5', tooltip: 'Kubernetes Orchestration' },
    { id: 'infra', label: 'Production', icon: Cloud, color: '#FF9900', tooltip: 'Cloud Infrastructure (AWS)' }
  ];

  const getNodeX = (index) => 100 + index * 150;
  const centerY = 120; // Centered vertically in 240 height

  return (
    <div style={{ width: '100%', height: 'auto', display: 'block' }}>
      <svg 
        viewBox="0 0 800 240" 
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection Path */}
        <path
          d={`M ${getNodeX(0)} ${centerY} L ${getNodeX(4)} ${centerY}`}
          stroke="url(#flowGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Animated Packets */}
        <circle r="4" fill="#3b82f6" filter="url(#glow)">
          <animateMotion 
            dur={hoveredNode ? "6s" : "2s"} 
            repeatCount="indefinite"
            path={`M ${getNodeX(0)} ${centerY} L ${getNodeX(4)} ${centerY}`}
          />
        </circle>
        
        <circle r="4" fill="#8b5cf6" filter="url(#glow)">
          <animateMotion 
            dur={hoveredNode ? "6s" : "2s"}
            begin="1s"
            repeatCount="indefinite"
            path={`M ${getNodeX(0)} ${centerY} L ${getNodeX(4)} ${centerY}`}
          />
        </circle>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const x = getNodeX(index);
          const Icon = node.icon;
          const isHovered = hoveredNode === node.id;

          return (
            <g 
              key={node.id}
              transform={`translate(${x}, ${centerY})`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Node Background */}
              <circle 
                r="30" 
                fill="#1e1e1e" 
                stroke={isHovered ? node.color : '#4b5563'} 
                strokeWidth={isHovered ? 3 : 2}
                filter={isHovered ? "url(#glow)" : ""}
                style={{ transition: 'all 0.3s ease' }}
              />

              {/* Icon Container */}
              <foreignObject x="-15" y="-15" width="30" height="30">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '100%', 
                  height: '100%' 
                }}>
                  <Icon 
                    size={20} 
                    color={isHovered ? node.color : '#9ca3af'} 
                    style={{ transition: 'color 0.3s ease' }}
                  />
                </div>
              </foreignObject>

              {/* Label */}
              <text
                y="50"
                textAnchor="middle"
                fill={isHovered ? node.color : '#9ca3af'}
                fontSize="14"
                fontWeight="600"
                style={{ fontFamily: 'Jost, sans-serif', transition: 'fill 0.3s ease' }}
              >
                {node.label}
              </text>

              {/* Tooltip */}
              <g 
                transform={`translate(0, -60)`} 
                opacity={isHovered ? 1 : 0} 
                style={{ transition: 'opacity 0.3s ease', pointerEvents: 'none' }}
              >
                {isHovered && (
                  <>
                    <rect 
                      x="-75" 
                      y="-15" 
                      width="150" 
                      height="30" 
                      rx="6" 
                      fill="#2b2d33" 
                      stroke={node.color} 
                      strokeWidth="1"
                    />
                    <text
                      y="5"
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="12"
                      fontWeight="500"
                      style={{ fontFamily: 'Jost, sans-serif' }}
                    >
                      {node.tooltip}
                    </text>
                    <path d="M -5 15 L 0 20 L 5 15 Z" fill={node.color} />
                  </>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DevOpsFlow;