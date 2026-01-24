import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Hero = () => {
  const mountRef = useRef(null);

  const techs = useMemo(() => [
    { name: 'AWS', color: 'FF9900' }, { name: 'Kubernetes', color: '326CE5' },
    { name: 'Docker', color: '2496ED' }, { name: 'Terraform', color: '7B42BC' },
    { name: 'Ansible', color: 'EE0000' }, { name: 'Jenkins', color: 'D24939' },
    { name: 'Python', color: '3776AB' }, { name: 'Node.js', color: '339933' },
    { name: 'React', color: '61DAFB' }, { name: 'Linux', color: 'FCC624' },
    { name: 'Git', color: 'F05032' }, { name: 'Prometheus', color: 'E6522C' },
    { name: 'Grafana', color: 'F46800' }, { name: 'Go', color: '00ADD8' },
    { name: 'Bash', color: '4EAA25' }, { name: 'Azure', color: '0078D4' },
    { name: 'MongoDB', color: '47A248' }, { name: 'Nginx', color: '009639' },
    { name: 'PostgreSQL', color: '4169E1' }, { name: 'OpenAI', color: '00A67E' }
  ], []);

  useEffect(() => {
    if (!mountRef.current) return;
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls for manual interaction and inertia
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;

    const group = new THREE.Group();
    scene.add(group);

    const nodes = [];
    const loader = new THREE.TextureLoader();

    // Create Nodes in two layers as per instructions.txt
    techs.forEach((tech, i) => {
      // Half on outer surface (Radius 12), half in inner depth (Radius 6)
      const radius = i < 10 ? 12 : 6; 
      const phi = Math.acos(-1 + (2 * i) / techs.length);
      const theta = Math.sqrt(techs.length * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, y, z);

      // Icon Sprite (High quality logos from simpleicons)
      const slug = tech.name.toLowerCase().replace('.', 'dot').replace(/\s+/g, '');
      const iconUrl = `https://cdn.simpleicons.org/${slug === 'aws' ? 'amazonaws' : slug}/${tech.color}`;
      
      loader.load(iconUrl, (texture) => {
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(3, 3, 1);
        nodeGroup.add(sprite);
      });

      // Label Underneath (Canvas Texture)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 128; canvas.height = 32;
      ctx.font = 'Bold 16px Jost';
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.textAlign = 'center';
      ctx.fillText(tech.name, 64, 20);
      const textTex = new THREE.CanvasTexture(canvas);
      const textMat = new THREE.SpriteMaterial({ map: textTex });
      const textSprite = new THREE.Sprite(textMat);
      textSprite.scale.set(4, 1, 1);
      textSprite.position.y = -2.2;
      nodeGroup.add(textSprite);

      group.add(nodeGroup);
      nodes.push({ group: nodeGroup, pos: new THREE.Vector3(x, y, z) });
    });

    // Create Thick Red Lines connecting to 3 nearest neighbors
    const lineGroup = new THREE.Group();
    group.add(lineGroup);

    nodes.forEach((node, i) => {
      const distances = nodes
        .map((target, j) => ({ index: j, dist: node.pos.distanceTo(target.pos) }))
        .filter(d => d.index !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3); // 3 nearest neighbors

      distances.forEach(neighbor => {
        const target = nodes[neighbor.index];
        const direction = new THREE.Vector3().subVectors(target.pos, node.pos);
        const length = direction.length();
        
        // Use thin cylinders to represent "thick lines" in 3D space
        const geometry = new THREE.CylinderGeometry(0.04, 0.04, length, 6);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.3 });
        const cylinder = new THREE.Mesh(geometry, material);

        cylinder.position.copy(node.pos).add(direction.clone().multiplyScalar(0.5));
        cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
        
        lineGroup.add(cylinder);
      });
    });

    // Raycaster for hover effect
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Hover Scaling Logic
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(group.children, true);
      
      // Reset all scales
      nodes.forEach(n => {
        n.group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      });

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while(obj.parent && obj.parent !== group) obj = obj.parent;
        obj.scale.lerp(new THREE.Vector3(1.4, 1.4, 1.4), 0.2);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [techs]);

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

        <div className="hero-image-wrapper" ref={mountRef} style={{ height: '500px', cursor: 'grab', position: 'relative' }}>
          {/* 3D Scene renders here */}
        </div>
      </div>

      <a href="#about" className="mouse-icon" aria-label="Scroll Down">
        <div className="wheel"></div>
      </a>
    </section>
  );
};

export default Hero;