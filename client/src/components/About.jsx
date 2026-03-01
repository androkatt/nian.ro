import React from 'react';
import { motion } from 'framer-motion';
import CyberPipeline from './CyberPipeline';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid">
        <motion.div
          className="about-left"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 
            Container for the Cyber Pipeline.
            Ensures it takes full width available and maintains aspect ratio.
          */}
          <div className="image-wrapper" style={{ width: '100%', height: 'auto', minHeight: '600px' }}>
            <CyberPipeline />
          </div>
        </motion.div>

        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default About;