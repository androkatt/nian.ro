import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="skills-intro">
          <p className="subtitle">Expertise</p>
          <h2 className="section-title">Technical Stack</h2>
          <p className="description">
            My toolkit spans across infrastructure stability, code efficiency, and visual creativity. I focus on delivering end-to-end solutions.
          </p>
        </div>

        <div className="tech-stack-grid">
          <div className="tech-group">
            <h3 className="group-title text-orange">
              <i className="fa-solid fa-cloud"></i> DevOps & Cloud
            </h3>
            <div className="tags-container">
              <span className="tech-tag">AWS (EC2, RDS, Lambda)</span>
              <span className="tech-tag">Kubernetes (K8s)</span>
              <span className="tech-tag">Rancher</span>
              <span className="tech-tag">GitLab CI/CD</span>
              <span className="tech-tag">Linux Administration</span>
              <span className="tech-tag">Grafana</span>
              <span className="tech-tag">Icinga</span>
              <span className="tech-tag">Docker</span>
            </div>
          </div>

          <div className="tech-group">
            <h3 className="group-title text-green">
              <i className="fa-solid fa-code"></i> Development & AI
            </h3>
            <div className="tags-container">
              <span className="tech-tag">Node.js / Express</span>
              <span className="tech-tag">PHP (Backend)</span>
              <span className="tech-tag">JavaScript / React</span>
              <span className="tech-tag">SQL & MySQL</span>
              <span className="tech-tag">Google Vertex AI</span>
              <span className="tech-tag">LLM Integration</span>
              <span className="tech-tag">CMS Architecture</span>
            </div>
          </div>

          <div className="tech-group">
            <h3 className="group-title text-purple">
              <i className="fa-solid fa-pen-nib"></i> Creative Suite
            </h3>
            <div className="tags-container">
              <span className="tech-tag">Photoshop</span>
              <span className="tech-tag">Illustrator</span>
              <span className="tech-tag">Premiere Pro</span>
              <span className="tech-tag">After Effects</span>
              <span className="tech-tag">UI/UX Design</span>
              <span className="tech-tag">Video Editing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;