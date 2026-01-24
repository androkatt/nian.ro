import React from 'react';

const Experience = () => {
  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <div className="section-header text-center">
          <h4 className="subtitle">Resume</h4>
          <h2 className="section-title">Professional Journey</h2>
          <p className="description mx-auto">
            Evolution from DTP and Graphic Design to Full-Stack Development, now specializing in Cloud Infrastructure and DevOps.
          </p>
        </div>

        <div className="resume-grid">
          <div className="resume-column">
            <h3 className="resume-title"><i className="fa-solid fa-briefcase"></i> Experience</h3>

            <div className="resume-item">
              <span className="resume-date">Jun 2014 - Present</span>
              <h4 className="resume-role">Cloud App Management / DevOps</h4>
              <h5 className="resume-place">Pirelli Tyres Romania</h5>
              <p>
                <strong>Infrastructure:</strong> Managing AWS (EC2, RDS, Lambda, CloudFront, Route53) and Kubernetes clusters via Rancher.<br />
                <strong>DevOps:</strong> GitLab Administrator (CI/CD pipelines, runners). Monitoring with Grafana & Icinga.<br />
                <strong>Dev & AI:</strong> Developing PHP/JS apps and utilizing Google Vertex AI agents.<br />
                <strong>Web Design:</strong> Designed digital assets for corporate portals.
              </p>
            </div>

            <div className="resume-item">
              <span className="resume-date">Feb 2011 - Apr 2011</span>
              <h4 className="resume-role">DTP Operator</h4>
              <h5 className="resume-place">Media-Concept</h5>
              <p>Pre-press preparation, layout modification, and supervision of printing processes using Adobe Suite.</p>
            </div>

            <div className="resume-item">
              <span className="resume-date">Nov 2007 - Feb 2011</span>
              <h4 className="resume-role">DTP Designer</h4>
              <h5 className="resume-place">SITECH</h5>
              <p>Book and brochure design, technical layout, and large format printing supervision.</p>
            </div>
          </div>

          <div className="resume-column">
            <h3 className="resume-title"><i className="fa-solid fa-graduation-cap"></i> Education</h3>

            <div className="resume-item">
              <span className="resume-date">2013 - 2015</span>
              <h4 className="resume-role">Master's Degree</h4>
              <h5 className="resume-place">University of Craiova</h5>
              <p>Artificial Intelligence. Advanced algorithms and data processing.</p>
            </div>

            <div className="resume-item">
              <span className="resume-date">2008 - 2011</span>
              <h4 className="resume-role">Bachelor's Degree</h4>
              <h5 className="resume-place">University of Craiova</h5>
              <p>Computer Science. Fundamentals of software engineering and databases.</p>
            </div>

            <div className="resume-item">
              <span className="resume-date">Certifications</span>
              <h4 className="resume-role">Professional Skills</h4>
              <h5 className="resume-place">Accredited</h5>
              <p>
                <strong>ITIL V3 Foundation</strong><br />
                <strong>Languages:</strong> English, Italian, Romanian.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;