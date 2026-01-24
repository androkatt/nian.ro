import React from 'react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid">
        <div className="about-left">
          <div className="image-wrapper">
            <img src="https://dizme-vue.vercel.app/img/about/2.jpg" alt="About Me" className="about-main-img" />

            <div className="stats-card card-1">
              <div className="stats-number text-green">
                <span className="counter">18</span>+
              </div>
              <div className="stats-text">Years of<br />Professional Exp.</div>
            </div>

            <div className="stats-card card-2">
              <div className="stats-number text-purple">
                <span className="counter">30</span>+
              </div>
              <div className="stats-text">Projects<br />Delivered</div>
            </div>
          </div>
        </div>

        <div className="about-right">
          <h4 className="subtitle">About Me</h4>
          <h2 className="section-title">Bridging Code & Infrastructure</h2>
          <p className="description">
            Based in Craiova, I have evolved from a Graphic Design background into a full-fledged <strong>DevOps Engineer</strong>. This unique journey allows me to understand the entire product lifecycle—from visual concept to server deployment.
          </p>
          <p className="description">
            Currently managing cloud infrastructure for <strong>Pirelli Tyres Romania</strong>, I focus on stability, security, and automation. My passion lies in optimizing systems and integrating cutting-edge AI tools like Google Vertex to solve real-world business problems.
          </p>
          <div className="about-btn-wrapper">
            <a href="#contact" className="btn">Hire Me</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;