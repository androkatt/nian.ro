import React, { useState } from 'react';

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
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header text-center">
          <h4 className="subtitle">Contact Me</h4>
          <h2 className="section-title">Let's Collaborate</h2>
          <p className="description mx-auto">
            Open to discussing DevOps consultancy, cloud migration projects, or full-stack development.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <div className="icon-circle bg-mint">
                <i className="fa-solid fa-envelope text-green"></i>
              </div>
              <div className="info-text">
                <h5>Email</h5>
                <p>andrei@nian.ro</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-circle bg-lavender">
                <i className="fa-solid fa-phone text-purple"></i>
              </div>
              <div className="info-text">
                <h5>Phone</h5>
                <p>+40 764 673 211</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-row">
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="Your Phone (Optional)" 
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <textarea 
                name="message" 
                rows="6" 
                placeholder="How can I help you?" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              
              <button type="submit" className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="text-green" style={{marginTop: '10px'}}>Message sent successfully!</p>}
              {status === 'error' && <p className="text-orange" style={{marginTop: '10px'}}>Failed to send message. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;