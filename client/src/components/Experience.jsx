import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="subtitle">Resume</h4>
          <h2 className="section-title">Professional Journey</h2>
          <p className="description mx-auto">
            Evolution from DTP and Graphic Design to Full-Stack Development, now specializing in Cloud Infrastructure and DevOps.
          </p>
        </motion.div>

        <div className="resume-grid">
          <motion.div
            className="resume-column"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.h3 className="resume-title" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <i className="fa-solid fa-briefcase"></i> Experience
            </motion.h3>

            <motion.div className="resume-item" variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
              <span className="resume-date">Jun 2014 - Present</span>
              <h4 className="resume-role">Cloud App Management / DevOps</h4>
              <h5 className="resume-place">Pirelli Tyres Romania</h5>
              <p>
                <strong>Infrastructure:</strong> Managing AWS (EC2, RDS, Lambda, CloudFront, Route53) and Kubernetes clusters via Rancher.<br />
                <strong>DevOps:</strong> GitLab Administrator (CI/CD pipelines, runners). Monitoring with Grafana & Icinga.<br />
                <strong>Dev & AI:</strong> Developing PHP/JS apps and utilizing Google Vertex AI agents.<br />
                <strong>Web Design:</strong> Designed digital assets for corporate portals.
              </p>
            </motion.div>

            <motion.div className="resume-item" variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
              <span className="resume-date">Feb 2011 - Apr 2011</span>
              <h4 className="resume-role">DTP Operator</h4>
              <h5 className="resume-place">Media-Concept</h5>
              <p>Pre-press preparation, layout modification, and supervision of printing processes using Adobe Suite.</p>
            </motion.div>

            <motion.div className="resume-item" variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
              <span className="resume-date">Nov 2007 - Feb 2011</span>
              <h4 className="resume-role">DTP Designer</h4>
              <h5 className="resume-place">SITECH</h5>
              <p>Book and brochure design, technical layout, and large format printing supervision.</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="resume-column"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.3 }
              }
            }}
          >
            <motion.h3 className="resume-title" variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
              <i className="fa-solid fa-graduation-cap"></i> Education
            </motion.h3>

            <motion.div className="resume-item" variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
              <span className="resume-date">2013 - 2015</span>
              <h4 className="resume-role">Master's Degree</h4>
              <h5 className="resume-place">University of Craiova</h5>
              <p>Artificial Intelligence. Advanced algorithms and data processing.</p>
            </motion.div>

            <motion.div className="resume-item" variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
              <span className="resume-date">2008 - 2011</span>
              <h4 className="resume-role">Bachelor's Degree</h4>
              <h5 className="resume-place">University of Craiova</h5>
              <p>Computer Science. Fundamentals of software engineering and databases.</p>
            </motion.div>

            <motion.div className="resume-item" variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
              <span className="resume-date">Certifications</span>
              <h4 className="resume-role">Professional Skills</h4>
              <h5 className="resume-place">Accredited</h5>
              <p>
                <strong>ITIL V3 Foundation</strong><br />
                <strong>Languages:</strong> English, Italian, Romanian.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;