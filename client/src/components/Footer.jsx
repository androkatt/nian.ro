import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: '20px 0', alignItems: 'center' }}>
        <p>&copy; {year} Nicolae Andrei-Gabriel.</p>
        <div style={{ fontSize: '0.9em' }}>
          <a href="https://tools.nian.ro/privacy-policy" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;