import React from 'react';

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
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img src="https://dizme-vue.vercel.app/img/slider/avatar.png" alt="Nicolae Andrei Avatar" className="hero-avatar" />

          <div className="floater icon-infra">
            <i className="fa-solid fa-server"></i>
          </div>

          <div className="floater icon-dev">
            <i className="fa-solid fa-code"></i>
          </div>

          <div className="floater icon-design">
            <i className="fa-solid fa-cloud"></i>
          </div>
        </div>
      </div>

      <a href="#about" className="mouse-icon" aria-label="Scroll Down">
        <div className="wheel"></div>
      </a>
    </section>
  );
};

export default Hero;