import React, { useMemo, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Tech Data
const techs = [
  { name: 'AWS', color: 'FF9900', slug: 'amazonaws' },
  { name: 'Kubernetes', color: '326CE5', slug: 'kubernetes' },
  { name: 'Docker', color: '2496ED', slug: 'docker' },
  { name: 'Terraform', color: '7B42BC', slug: 'terraform' },
  { name: 'Ansible', color: 'EE0000', slug: 'ansible' },
  { name: 'Jenkins', color: 'D24939', slug: 'jenkins' },
  { name: 'Python', color: '3776AB', slug: 'python' },
  { name: 'Node.js', color: '339933', slug: 'nodedotjs' },
  { name: 'React', color: '61DAFB', slug: 'react' },
  { name: 'Linux', color: 'FCC624', slug: 'linux' },
  { name: 'Git', color: 'F05032', slug: 'git' },
  { name: 'Prometheus', color: 'E6522C', slug: 'prometheus' },
  { name: 'Grafana', color: 'F46800', slug: 'grafana' },
  { name: 'Go', color: '00ADD8', slug: 'go' },
  { name: 'Bash', color: '4EAA25', slug: 'gnubash' },
  { name: 'Azure', color: '0078D4', slug: 'azure' }, // Reverted to 'azure' per search
  { name: 'MongoDB', color: '47A248', slug: 'mongodb' },
  { name: 'Nginx', color: '009639', slug: 'nginx' },
  { name: 'PostgreSQL', color: '4169E1', slug: 'postgresql' },
  { name: 'OpenAI', color: '00A67E', slug: 'openai' }
];

const SkillNode = ({ position, tech }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Use unpkg as a reliable CDN for the raw SVGs
  // Note: SVG color will be original (black/white usually) unless we use a filter, 
  // but for reliability let's stick to the base icon. 
  // To colorize, we can use a CSS filter or just accept the brand default.
  // Actually, simpleicons.org allows coloring. Let's try one more fallback logic:
  // 1. Try simpleicons.org (colored)
  // 2. Fallback to text
  
  // Since user reported 404s specifically on cdn.simpleicons.org for these slugs,
  // let's try a direct SVG fetch logic or just robustly handle the error.
  
  const iconUrl = `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`;
  
  return (
    <group position={position}>
      <Html transform sprite distancelimit={20}>
        <div
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${hovered ? 1.5 : 1})`,
            transition: 'transform 0.2s ease',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            background: `rgba(255, 255, 255, 0.1)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)',
            border: `2px solid #${tech.color}`,
            boxShadow: hovered ? `0 0 15px #${tech.color}` : 'none'
          }}>
            {!imgError ? (
              <img 
                src={iconUrl} 
                alt={tech.name}
                style={{ width: '32px', height: '32px' }}
                onError={(e) => {
                  // Final safety net: if CDN fails, show text.
                  // This prevents the "broken image" icon.
                  setImgError(true);
                  e.target.style.display = 'none'; 
                }}
              />
            ) : (
              <span style={{ 
                color: '#' + tech.color, 
                fontWeight: 'bold', 
                fontSize: '18px' 
              }}>
                {tech.name.substring(0, 2)}
              </span>
            )}
          </div>
          <div style={{
            marginTop: '4px',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Jost, sans-serif',
            textShadow: '0 1px 2px black',
            opacity: 0.9
          }}>
            {tech.name}
          </div>
        </div>
      </Html>
    </group>
  );
};

// Reusable Pipe Geometry
const Pipe = ({ start, end }) => {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  
  const position = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  return (
    <mesh position={position} quaternion={quaternion}>
      {/* Thinner radius (0.02) and Green color for "glowing" effect */}
      <cylinderGeometry args={[0.02, 0.02, length, 8]} />
      <meshBasicMaterial color="#43b883" transparent opacity={0.5} />
    </mesh>
  );
};

const Connections = ({ nodes }) => {
  const connections = useMemo(() => {
    const links = [];
    const existingPairs = new Set();

    const addLink = (n1, n2) => {
      // Create unique ID for pair to avoid duplicates
      const id = [n1.index, n2.index].sort().join('-');
      if (!existingPairs.has(id)) {
        existingPairs.add(id);
        links.push({ id, start: n1.pos, end: n2.pos });
      }
    };

    // 1. Standard Nearest Neighbor Connections
    nodes.forEach((node, i) => {
      const neighbors = nodes
        .map((target, j) => ({
          index: j,
          dist: new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...target.pos)),
          pos: target.pos
        }))
        .filter(n => n.index !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3);

      neighbors.forEach(neighbor => {
        addLink({ index: i, pos: node.pos }, neighbor);
      });
    });

    // 2. Specific Forced Connections (User Requested)
    const specificPairs = [
      ['Grafana', 'Linux'],
      ['Prometheus', 'React'],
      ['Git', 'Node.js']
    ];

    specificPairs.forEach(([name1, name2]) => {
      const n1 = nodes.find(n => n.tech.name === name1);
      const n2 = nodes.find(n => n.tech.name === name2);
      
      if (n1 && n2) {
        const idx1 = nodes.indexOf(n1);
        const idx2 = nodes.indexOf(n2);
        addLink(
          { index: idx1, pos: n1.pos },
          { index: idx2, pos: n2.pos }
        );
      }
    });

    return links;
  }, [nodes]);

  return (
    <>
      {connections.map((link) => (
        <Pipe key={link.id} start={link.start} end={link.end} />
      ))}
    </>
  );
};

const Scene = () => {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    const tempNodes = [];
    const count = techs.length;
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Reduced radius to 8
      const r = 8;
      tempNodes.push({
        tech: techs[i],
        pos: [x * r, y * r, z * r]
      });
    }
    return tempNodes;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" distance={20} />
      {nodes.map((node, i) => (
        <SkillNode key={i} position={node.pos} tech={node.tech} />
      ))}
      <Connections nodes={nodes} />
    </group>
  );
};

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <h3 className="hello-text">Hello, I'm</h3>
          <h1 className="hero-name">Nicolae Andrei</h1>
          <h4 className="hero-tagline">
            Cloud <span className="text-green">Infrastructure Architect</span> & <span className="text-purple">DevOps Engineer</span>
          </h4>
          <p className="description">
            I architect scalable cloud environments and automate complex workflows. With over a decade of experience, I merge software development with robust infrastructure using <strong>AWS, Kubernetes, and AI</strong> technologies.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn">Get in Touch</a>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/nicolae-andrei/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://github.com/androkatt" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
            </div>
          </div>
        </div>

        {/* Width 600px, Hidden on mobile */}
        <div className="hero-image-wrapper hidden-mobile" style={{ height: '600px', width: '600px', position: 'relative', zIndex: 1 }}>
          <Canvas camera={{ position: [0, 0, 22], fov: 50 }}>
            <OrbitControls 
              enableZoom={false} 
              autoRotate={true} 
              autoRotateSpeed={0.8}
              enableDamping={true}
            />
            <ambientLight intensity={0.5} />
            <Scene />
          </Canvas>
        </div>
      </div>

      <a href="#about" className="mouse-icon" aria-label="Scroll Down">
        <div className="wheel"></div>
      </a>
    </section>
  );
};

export default Hero;