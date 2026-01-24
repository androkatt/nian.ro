import React, { useEffect, useRef } from 'react';
import TagCloud from 'TagCloud';

const Hero = () => {
  const containerRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const texts = [
      'AWS', 'Kubernetes', 'Docker', 'Terraform', 
      'Ansible', 'Jenkins', 'Python', 'Node.js', 
      'React', 'Linux', 'Git', 'CI/CD', 
      'Prometheus', 'Grafana', 'Go', 'Bash',
      'Azure', 'SQL', 'NoSQL', 'Nginx'
    ];

    const options = {
      radius: 300,
      maxSpeed: 'fast',
      initSpeed: 'normal',
      direction: 135,
      keep: true,
      useContainerInlineStyles: false
    };

    if (containerRef.current) {
      TagCloud(containerRef.current, texts, options);
      initializedRef.current = true;
    }

    // Cleanup isn't straightforward with this library instance, 
    // but the ref check prevents double-mounting.
  }, []);

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

        <div className="hero-image-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span className="tagcloud-wrap" ref={containerRef}></span>
        </div>
      </div>

      <a href="#about" className="mouse-icon" aria-label="Scroll Down">
        <div className="wheel"></div>
      </a>
    </section>
  );
};

export default Hero;