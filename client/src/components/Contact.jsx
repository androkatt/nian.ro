import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-glass-section">
      <div className="contact-vanta-overlay"></div>

      <div className="container contact-glass-container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title glass-title">Let's Collaborate</h2>
          <p className="description pt-0">
            Open to discussing DevOps consultancy, cloud migration projects, or full-stack development.
          </p>
        </motion.div>

        <div className="glass-contact-grid">
          {/* Left Panel: Contact Info */}
          <motion.div
            className="glass-panel info-panel"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="glass-info-item">
              <i className="fa-regular fa-envelope glass-icon"></i>
              <div className="glass-info-text">
                <h5>Email</h5>
                <p>andrei@nian.ro</p>
              </div>
            </div>

            <div className="glass-info-item">
              <i className="fa-solid fa-phone glass-icon"></i>
              <div className="glass-info-text">
                <h5>Phone</h5>
                <p>+40 764 673 211</p>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Form */}
          <motion.div
            className="glass-panel form-panel"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-form">
              <div className="glass-input-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="glass-input-group">
                <label>Your Phone (Optional)</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="glass-input-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="glass-input-group">
                <label>How can I help you?</label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="glass-btn btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && <p className="text-green" style={{ marginTop: '15px', textAlign: 'center' }}>Message sent successfully!</p>}
              {status === 'error' && <p className="text-orange" style={{ marginTop: '15px', textAlign: 'center' }}>Failed to send message. Please try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;