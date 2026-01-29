import React, { useState } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Andrei is a rare breed of engineer who understands both the infrastructure requirements and the development needs. His work on our Kubernetes migration was flawless.",
      name: "Mike T.",
      role: "Project Manager",
      img: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      quote: "Working with him transformed our CI/CD pipelines. We went from weekly deployments to shipping features daily with zero downtime.",
      name: "Sarah Jenkins",
      role: "CTO, CloudScale",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The monitoring solutions he implemented gave us visibility we never knew we needed. He's a true expert in the DevOps space.",
      name: "David Chen",
      role: "Lead Developer",
      img: "https://randomuser.me/api/portraits/men/85.jpg"
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container relative-wrapper">
        <div className="section-header text-center">
          <h4 className="subtitle">Testimonials</h4>
          <h2 className="section-title">Recommendations</h2>
          <p className="description mx-auto">
            Feedback from colleagues and clients.
          </p>
        </div>

        <div className="map-avatars">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" className="avatar-small p-1" alt="Client" />
          <img src="https://randomuser.me/api/portraits/men/32.jpg" className="avatar-small p-2" alt="Client" />
          <img src="https://randomuser.me/api/portraits/women/68.jpg" className="avatar-small p-3" alt="Client" />
          <img src="https://randomuser.me/api/portraits/men/85.jpg" className="avatar-small p-4" alt="Client" />
          <img src="https://randomuser.me/api/portraits/women/90.jpg" className="avatar-small p-5" alt="Client" />
          <div className="circle-shape s-1"></div>
          <div className="circle-shape s-2"></div>
          <div className="circle-shape s-3"></div>
        </div>

        <div className="testimonial-content">
          <div className="quote-icon">
            <i className="fa-solid fa-quote-right"></i>
          </div>

          <p className="client-quote" id="quote-text">
            "{testimonials[currentIndex].quote}"
          </p>

          <div className="client-info">
            <img src={testimonials[currentIndex].img} id="client-img" alt={testimonials[currentIndex].name} />
            <div className="client-details">
              <h5 id="client-name">{testimonials[currentIndex].name}</h5>
              <span id="client-role">{testimonials[currentIndex].role}</span>
            </div>
          </div>

          <div className="slider-arrows">
            <div className="arrow prev" onClick={handlePrev}><i className="fa-solid fa-angle-left"></i></div>
            <div className="arrow next" onClick={handleNext}><i className="fa-solid fa-angle-right"></i></div>
          </div>
        </div>

        <div className="testi-dots">
          {testimonials.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${currentIndex === index ? 'active' : ''}`} 
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;