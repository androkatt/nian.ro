import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Spotlight Card Component for the interactive hover effect
const SpotlightCard = ({ children, className = '', glowColor = 'rgba(247, 80, 35, 0.4)' }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div
        className="spotlight-effect pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="spotlight-content">{children}</div>
    </motion.div>
  );
};

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
      {/* Background glowing orbs */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <div className="container relative z-10">
        <motion.div
          className="skills-intro"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="subtitle">Expertise</p>
          <h2 className="section-title">Technical Stack</h2>
          <p className="description">
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
            <SpotlightCard className="tech-group" glowColor="rgba(247, 80, 35, 0.15)">
              <h3 className="group-title text-orange">
                <i className="fa-solid fa-cloud"></i> DevOps & Cloud Architecture
              </h3>
              <p className="group-description">
                Building scalable and resilient infrastructure to ensure high availability and robust performance.
              </p>
              <div className="tags-container">
                {['AWS (EC2, RDS, Lambda)', 'Kubernetes (K8s)', 'Rancher', 'GitLab CI/CD', 'Linux Administration', 'Grafana', 'Icinga', 'Docker'].map((tag, idx) => (
                  <motion.span key={idx} variants={tagVariants} className="tech-tag tag-orange">
                    {tag}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Development & AI */}
          <motion.div variants={itemVariants} className="bento-dev">
            <SpotlightCard className="tech-group h-full" glowColor="rgba(67, 184, 131, 0.15)">
              <h3 className="group-title text-green">
                <i className="fa-solid fa-code"></i> Engineering & AI
              </h3>
              <p className="group-description">
                Crafting efficient backend APIs and integrating advanced LLM capabilities.
              </p>
              <div className="tags-container">
                {['Node.js / Express', 'PHP (Backend)', 'JavaScript / React', 'SQL & MySQL', 'Google Vertex AI', 'LLM Integration', 'CMS Architecture'].map((tag, idx) => (
                  <motion.span key={idx} variants={tagVariants} className="tech-tag tag-green">
                    {tag}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Creative Suite */}
          <motion.div variants={itemVariants} className="bento-creative">
            <SpotlightCard className="tech-group" glowColor="rgba(110, 87, 224, 0.15)">
              <h3 className="group-title text-purple">
                <i className="fa-solid fa-pen-nib"></i> Creative & UI/UX
              </h3>
              <p className="group-description">
                Designing impactful visual experiences and intuitive user interfaces.
              </p>
              <div className="tags-container">
                {['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'Figma', 'UI/UX Design', 'Video Editing'].map((tag, idx) => (
                  <motion.span key={idx} variants={tagVariants} className="tech-tag tag-purple">
                    {tag}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;