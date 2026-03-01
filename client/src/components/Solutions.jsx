import React from 'react';
import { motion } from 'framer-motion';

const Solutions = () => {
  return (
    <section id="service" className="service-section">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="subtitle">Solutions</h4>
          <h2 className="section-title">What I Deliver</h2>
          <p className="description mx-auto">
            Enterprise-grade solutions focusing on reliability, automation, and modern architecture.
          </p>
        </motion.div>

        <motion.div
          className="service-grid"
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
          <motion.div
            className="service-item tilt-card"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
            }}
          >
            <div className="service-icon-box color-1">
              <i className="fa-solid fa-server"></i>
            </div>
            <div className="service-content">
              <h4>Infrastructure Design</h4>
              <div className="price">Cloud & On-Prem</div>
              <p>Designing and deploying scalable AWS and Kubernetes architectures that ensure high availability and security.</p>
            </div>
          </motion.div>

          <motion.div
            className="service-item tilt-card"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
            }}
          >
            <div className="service-icon-box color-2">
              <i className="fa-solid fa-rocket"></i>
            </div>
            <div className="service-content">
              <h4>CI/CD Automation</h4>
              <div className="price">DevOps</div>
              <p>Building robust GitLab pipelines to automate testing and deployment, reducing time-to-market.</p>
            </div>
          </motion.div>

          <motion.div
            className="service-item tilt-card"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
            }}
          >
            <div className="service-icon-box color-3">
              <i className="fa-solid fa-brain"></i>
            </div>
            <div className="service-content">
              <h4>AI Integration</h4>
              <div className="price">Vertex AI</div>
              <p>Implementing Generative AI and LLM workflows to optimize business processes.</p>
            </div>
          </motion.div>

          <motion.div
            className="service-item tilt-card"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
            }}
          >
            <div className="service-icon-box color-4">
              <i className="fa-solid fa-laptop-code"></i>
            </div>
            <div className="service-content">
              <h4>Full-Stack Dev</h4>
              <div className="price">Node.js / PHP</div>
              <p>End-to-end development of web applications using modern frameworks and secure databases.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;