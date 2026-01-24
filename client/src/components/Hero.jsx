import React, { useEffect, useState, useRef, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

const Hero = () => {
  const fgRef = useRef();

  // 1. Define Data: Nodes (Techs) & Links (Connections)
  const data = useMemo(() => {
    const techs = [
      { id: 'aws', name: 'AWS', color: '#FF9900' },
      { id: 'k8s', name: 'Kubernetes', color: '#326CE5' },
      { id: 'docker', name: 'Docker', color: '#2496ED' },
      { id: 'terraform', name: 'Terraform', color: '#7B42BC' },
      { id: 'ansible', name: 'Ansible', color: '#EE0000' },
      { id: 'jenkins', name: 'Jenkins', color: '#D24939' },
      { id: 'python', name: 'Python', color: '#3776AB' },
      { id: 'node', name: 'Node.js', color: '#339933' },
      { id: 'react', name: 'React', color: '#61DAFB' },
      { id: 'linux', name: 'Linux', color: '#FCC624' },
      { id: 'git', name: 'Git', color: '#F05032' },
      { id: 'prometheus', name: 'Prometheus', color: '#E6522C' },
      { id: 'grafana', name: 'Grafana', color: '#F46800' },
      { id: 'go', name: 'Go', color: '#00ADD8' },
      { id: 'bash', name: 'Bash', color: '#4EAA25' },
      { id: 'azure', name: 'Azure', color: '#0078D4' },
      { id: 'mongo', name: 'MongoDB', color: '#47A248' },
      { id: 'nginx', name: 'Nginx', color: '#009639' },
      { id: 'postgres', name: 'PostgreSQL', color: '#4169E1' },
      { id: 'openai', name: 'OpenAI', color: '#00A67E' }
    ];

    // Create random links to simulate a "network" or "molecule"
    const links = [];
    techs.forEach((tech, index) => {
      // Connect to 2-3 random other nodes
      const numLinks = Math.floor(Math.random() * 2) + 2; 
      for (let i = 0; i < numLinks; i++) {
        const targetIndex = Math.floor(Math.random() * techs.length);
        if (targetIndex !== index) {
          links.push({
            source: tech.id,
            target: techs[targetIndex].id
          });
        }
      }
    });

    return { nodes: techs, links };
  }, []);

  useEffect(() => {
    if (fgRef.current) {
      // Configure the force engine for a more "spread out" look
      fgRef.current.d3Force('charge').strength(-150);
      fgRef.current.d3Force('link').distance(50);
      
      // Built-in auto-rotation logic that allows mouse interaction
      let angle = 0;
      const distance = 250;
      const rotationLoop = () => {
        if (fgRef.current) {
          angle += 0.002;
          const x = distance * Math.sin(angle);
          const z = distance * Math.cos(angle);
          fgRef.current.cameraPosition({ x, z }, null, 100); // Smooth transition
        }
      };
      
      // We'll use a slower rotation and the graph's native controls
      fgRef.current.controls().autoRotate = true;
      fgRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  // 2. Load Images as Textures
  const [sprites, setSprites] = useState({});

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loadedSprites = {};
    
    data.nodes.forEach(node => {
      // Using simpleicons.org for reliable SVG logos
      const slug = node.name.toLowerCase().replace('.', 'dot').replace(/\s+/g, '');
      // Handle special cases for slugs
      let iconSlug = slug;
      if (slug === 'aws') iconSlug = 'amazonaws';
      if (slug === 'node.js') iconSlug = 'nodedotjs';
      if (slug === 'go') iconSlug = 'go';
      
      const url = `https://cdn.simpleicons.org/${iconSlug}/${node.color.replace('#', '')}`;
      
      loader.load(url, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        loadedSprites[node.id] = texture;
        // Trigger re-render when a texture loads
        setSprites(prev => ({ ...prev, [node.id]: texture }));
      });
    });
  }, [data]);

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

        <div className="hero-image-wrapper" style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <ForceGraph3D
              ref={fgRef}
              width={600}
              height={500}
              graphData={data}
              backgroundColor="rgba(0,0,0,0)" // Transparent
              showNavInfo={false}
              
              // Node Styling (Image + Text)
              nodeThreeObject={node => {
                const group = new THREE.Group();
                
                // 1. The Icon (Sprite)
                if (sprites[node.id]) {
                  const material = new THREE.SpriteMaterial({ map: sprites[node.id] });
                  const sprite = new THREE.Sprite(material);
                  sprite.scale.set(12, 12, 1);
                  group.add(sprite);
                } else {
                  // Fallback sphere if image loading
                  const mesh = new THREE.Mesh(
                    new THREE.SphereGeometry(5),
                    new THREE.MeshBasicMaterial({ color: node.color })
                  );
                  group.add(mesh);
                }

                // 2. The Text Label (Sprite for readability)
                // We use a canvas to draw text, then make it a texture
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = 256; 
                canvas.height = 64;
                context.font = 'Bold 24px Sans-Serif';
                context.fillStyle = 'rgba(255,255,255,0.8)';
                context.textAlign = 'center';
                context.fillText(node.name, 128, 40);
                
                const textTexture = new THREE.CanvasTexture(canvas);
                const textMaterial = new THREE.SpriteMaterial({ map: textTexture });
                const textSprite = new THREE.Sprite(textMaterial);
                textSprite.scale.set(30, 7.5, 1);
                textSprite.position.set(0, -10, 0); // Position below icon
                group.add(textSprite);

                return group;
              }}

              // Link Styling
              linkColor={() => '#ff0000'} // Red lines as requested
              linkWidth={1}
              linkOpacity={0.5}
              
              // Physics
              d3VelocityDecay={0.1} 
            />
        </div>
      </div>

      <a href="#about" className="mouse-icon" aria-label="Scroll Down">
        <div className="wheel"></div>
      </a>
    </section>
  );
};

export default Hero;