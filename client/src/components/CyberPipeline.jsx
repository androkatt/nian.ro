import React, { useState } from 'react';
import {
  Github,
  Container,
  Globe,
  ShieldCheck,
  Network,
  ShipWheel,
  Box
} from 'lucide-react';

// Clean, minimal nodes arranged in an intuitive Y-convergence into Kubernetes
const NODES = [
  // Left Branch: Code Push -> Build
  {
    id: 'github',
    label: 'Git Push',
    sub: 'GitHub Repo',
    icon: Github,
    x: 155,
    y: 120,
    color: '#d4af37', // Gold
    detail: 'Source code commit triggers automated GitOps workflow'
  },
  {
    id: 'docker',
    label: 'CI & Docker',
    sub: 'Build & Registry',
    icon: Container,
    x: 155,
    y: 290,
    color: '#8ea072', // Olive
    detail: 'Automated tests, container build & AWS ECR image push'
  },

  // Right Branch: User Traffic -> CDN -> WAF -> Load Balancer
  {
    id: 'cdn',
    label: 'Global CDN',
    sub: 'Edge Cache',
    icon: Globe,
    x: 445,
    y: 120,
    color: '#38bdf8', // Sky
    detail: 'Low-latency global edge delivery & static caching'
  },
  {
    id: 'waf',
    label: 'WAF Firewall',
    sub: 'DDoS & Security',
    icon: ShieldCheck,
    x: 445,
    y: 250,
    color: '#10b981', // Emerald
    detail: 'Filters malicious traffic & blocks SQLi / DDoS at the edge'
  },
  {
    id: 'alb',
    label: 'Load Balancer',
    sub: 'Ingress Routing',
    icon: Network,
    x: 445,
    y: 380,
    color: '#38968f', // Teal
    detail: 'SSL termination & multi-zone traffic distribution'
  },

  // Center Convergence: Kubernetes Cluster
  {
    id: 'k8s',
    label: 'Kubernetes',
    sub: 'AWS EKS Cluster',
    icon: ShipWheel,
    x: 300,
    y: 515,
    color: '#3b82f6', // Blue
    isMain: true,
    detail: 'Zero-downtime rolling updates & auto-scaled production pods'
  }
];

// 3 Minimal Pod Nodes at the bottom
const PODS = [
  { id: 'pod1', label: 'Pod 01', x: 160, y: 660 },
  { id: 'pod2', label: 'Pod 02', x: 300, y: 660 },
  { id: 'pod3', label: 'Pod 03', x: 440, y: 660 }
];

// Smooth cubic bezier paths
const PATHS = [
  // Left CI/CD Stream (Gold/Olive)
  { id: 'c-git-doc', d: 'M 155 162 L 155 248', color: '#d4af37', dur: '2.8s' },
  { id: 'c-doc-k8s', d: 'M 155 332 C 155 435, 255 445, 272 478', color: '#8ea072', dur: '3.2s' },

  // Right Traffic Stream (Cyan/Teal)
  { id: 'c-usr-cdn', d: 'M 445 38 L 445 78', color: '#38bdf8', dur: '1.8s' },
  { id: 'c-cdn-waf', d: 'M 445 162 L 445 208', color: '#38bdf8', dur: '2.2s' },
  { id: 'c-waf-alb', d: 'M 445 292 L 445 338', color: '#10b981', dur: '2.4s' },
  { id: 'c-alb-k8s', d: 'M 445 422 C 445 475, 345 465, 328 478', color: '#38968f', dur: '2.6s' },

  // K8s to Pods Fan-out
  { id: 'c-k8s-p1', d: 'M 275 552 C 235 595, 160 595, 160 632', color: '#3b82f6', dur: '2.5s' },
  { id: 'c-k8s-p2', d: 'M 300 560 L 300 632', color: '#3b82f6', dur: '2.2s' },
  { id: 'c-k8s-p3', d: 'M 325 552 C 365 595, 440 595, 440 632', color: '#3b82f6', dur: '2.7s' }
];

const hexPoints = (r) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

const CyberPipeline = () => {
  const [hovered, setHovered] = useState(null);
  const activeNode = NODES.find((n) => n.id === hovered);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg
        viewBox="0 0 600 720"
        style={{ width: '100%', maxWidth: '580px', height: 'auto', overflow: 'visible' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Minimal Stream Headers at Top */}
        <text
          x="155"
          y="55"
          textAnchor="middle"
          fill="#d4af37"
          fontSize="10"
          fontWeight="600"
          fontFamily="'Inter', sans-serif"
          letterSpacing="2px"
          opacity="0.8"
        >
          CODE DEPLOY
        </text>

        <text
          x="445"
          y="26"
          textAnchor="middle"
          fill="#38bdf8"
          fontSize="10"
          fontWeight="600"
          fontFamily="'Inter', sans-serif"
          letterSpacing="2px"
          opacity="0.85"
        >
          USER TRAFFIC
        </text>

        {/* Subtle Blocked Threat Animation at WAF */}
        <g>
          <circle r="2.8" fill="#ef4444" filter="url(#softGlow)">
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              path="M 462 165 L 462 212 L 502 196"
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0"
              keyTimes="0;0.65;1"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Smooth Glowing Connection Lines */}
        {PATHS.map((p) => (
          <g key={p.id}>
            {/* Subtle base rail */}
            <path
              d={p.d}
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Soft colored guide */}
            <path
              d={p.d}
              fill="none"
              stroke={p.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.35"
            />
            {/* Flowing light pulse */}
            <circle r="3" fill="#ffffff" filter="url(#softGlow)">
              <animateMotion dur={p.dur} repeatCount="indefinite" path={p.d} />
            </circle>
          </g>
        ))}

        {/* Minimal Kubernetes Pod Nodes at Bottom */}
        {PODS.map((pod) => (
          <g key={pod.id} transform={`translate(${pod.x}, ${pod.y})`}>
            <polygon
              points={hexPoints(20)}
              fill="rgba(15, 18, 26, 0.85)"
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="1.2"
            />
            <g transform="translate(-8, -8)" style={{ pointerEvents: 'none' }}>
              <Box width={16} height={16} color="#60a5fa" strokeWidth={1.6} />
            </g>
            <text
              y="34"
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.6)"
              fontSize="10"
              fontWeight="500"
              fontFamily="'Inter', sans-serif"
            >
              {pod.label}
            </text>
          </g>
        ))}

        {/* Main Architecture Hexagon Nodes */}
        {NODES.map((node) => {
          const isHovered = hovered === node.id;
          const Icon = node.icon;
          const hexRadius = node.isMain ? 40 : 34;

          // Position text cleanly to the left for left branch, right for right branch, and beside K8s
          const labelX = node.isMain ? 0 : node.x < 300 ? -48 : 48;
          const labelY = node.isMain ? -54 : -3;
          const anchor = node.isMain ? 'middle' : node.x < 300 ? 'end' : 'start';

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Delicate Outer Orbit Ring */}
              <circle
                r={hexRadius + 9}
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                strokeDasharray="10 18"
                opacity={isHovered ? 0.75 : 0.22}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  dur={isHovered ? '6s' : '22s'}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Glass Hexagon */}
              <polygon
                points={hexPoints(hexRadius)}
                fill={isHovered ? 'rgba(24, 28, 38, 0.95)' : 'rgba(13, 15, 22, 0.85)'}
                stroke={isHovered ? '#ffffff' : node.color}
                strokeWidth={isHovered ? '2' : '1.5'}
                filter="url(#softGlow)"
              />

              {/* Icon */}
              <g
                transform={`translate(${node.isMain ? -15 : -13}, ${node.isMain ? -15 : -13})`}
                style={{ pointerEvents: 'none' }}
              >
                <Icon
                  width={node.isMain ? 30 : 26}
                  height={node.isMain ? 30 : 26}
                  color={isHovered ? '#ffffff' : node.color}
                  strokeWidth={1.6}
                />
              </g>

              {/* Clean Minimal Label */}
              <g transform={`translate(${labelX}, ${labelY})`} style={{ pointerEvents: 'none' }}>
                <text
                  x="0"
                  y="0"
                  textAnchor={anchor}
                  fill={isHovered ? '#ffffff' : '#e2e8f0'}
                  fontSize="12.5"
                  fontWeight="600"
                  fontFamily="'Inter', sans-serif"
                >
                  {node.label}
                </text>
                <text
                  x="0"
                  y="15"
                  textAnchor={anchor}
                  fill="rgba(255, 255, 255, 0.45)"
                  fontSize="10"
                  fontWeight="400"
                  fontFamily="'Inter', sans-serif"
                >
                  {node.sub}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Subtle Single-Line Tooltip Pill on Hover */}
      {activeNode && (
        <div
          style={{
            position: 'absolute',
            bottom: '4px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '7px 18px',
            borderRadius: '999px',
            background: 'rgba(14, 16, 22, 0.9)',
            border: `1px solid ${activeNode.color}66`,
            backdropFilter: 'blur(8px)',
            fontSize: '11.5px',
            color: '#e2e8f0',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
          }}
        >
          <strong style={{ color: activeNode.color }}>{activeNode.label}:</strong>{' '}
          {activeNode.detail}
        </div>
      )}
    </div>
  );
};

export default CyberPipeline;
