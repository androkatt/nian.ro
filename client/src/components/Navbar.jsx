import React, { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-wrapper">
        <a href="#" className="logo">
          <span className="logo-icon">N</span>
          Ni<span className="text-orange">AN</span>
        </a>

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`} style={mobileMenuOpen ? {display: 'flex', flexDirection: 'column', position: 'absolute', top: '100%', left: 0, width: '100%', background: 'var(--nav-bg)', padding: '20px'} : {}}>
          <a href="#home" className="active" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#resume" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
          <a href="#service" onClick={() => setMobileMenuOpen(false)}>Solutions</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>

        {/* <div className="nav-btn">
          <a href="/cv.pdf" className="btn-download" download aria-label="Download CV PDF">Download CV</a>
        </div> */}

        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;