import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// SpotlightCard removed in favor of standard glass-panels


const Skills = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger effect for children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container relative z-10">
        <motion.div
          className="skills-intro"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="subtitle" style={{ color: 'var(--glow-olive)' }}>Expertise</p>
          <h2 className="section-title" style={{ fontWeight: '800', letterSpacing: '-0.02em', color: 'white' }}>Technical Stack</h2>
          <p className="description" style={{ fontWeight: '300' }}>
            My toolkit spans across infrastructure stability, code efficiency, and visual creativity. I focus on delivering end-to-end solutions.
          </p>
        </motion.div>

        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* DevOps & Cloud - Large Card spanning 2 columns on desktop */}
          <motion.div variants={itemVariants} className="bento-devops">
            <div className="tech-group glass-panel" style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 className="group-title" style={{ color: 'var(--glow-olive)', fontWeight: '600' }}>
                <i className="fa-solid fa-cloud"></i> DevOps & Cloud Architecture
              </h3>
              <p className="group-description" style={{ fontWeight: '300', color: 'var(--text-muted)' }}>
                Building scalable and resilient infrastructure to ensure high availability and robust performance.
              </p>
              <div className="tags-container">
                {['AWS (EC2, RDS, Lambda)', 'Kubernetes (K8s)', 'Rancher', 'GitLab CI/CD', 'Linux Administration', 'Grafana', 'Icinga', 'Docker'].map((tag, idx) => (
                  <motion.span key={idx} variants={tagVariants} className="tech-tag tag-olive">
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Development & AI */}
          <motion.div variants={itemVariants} className="bento-dev">
            <div className="tech-group glass-panel" style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 className="group-title" style={{ color: 'var(--glow-teal)', fontWeight: '600' }}>
                <i className="fa-solid fa-code"></i> Engineering & AI
              </h3>
              <p className="group-description" style={{ fontWeight: '300', color: 'var(--text-muted)' }}>
                Crafting efficient backend APIs and integrating advanced LLM capabilities.
              </p>
              <div className="tags-container">
                {['Node.js / Express', 'PHP (Backend)', 'JavaScript / React', 'SQL & MySQL', 'Google Vertex AI', 'LLM Integration', 'CMS Architecture'].map((tag, idx) => (
                  <motion.span key={idx} variants={tagVariants} className="tech-tag tag-teal">
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Creative Suite */}
          <motion.div variants={itemVariants} className="bento-creative">
            <div className="tech-group glass-panel" style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 className="group-title" style={{ color: 'var(--glow-gold)', fontWeight: '600' }}>
                <i className="fa-solid fa-pen-nib"></i> Creative & UI/UX
              </h3>
              <p className="group-description" style={{ fontWeight: '300', color: 'var(--text-muted)' }}>
                Designing impactful visual experiences and intuitive user interfaces.
              </p>
              <div className="tags-container">
                {['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'Figma', 'UI/UX Design', 'Video Editing'].map((tag, idx) => (
                  <motion.span key={idx} variants={tagVariants} className="tech-tag tag-gold">
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;