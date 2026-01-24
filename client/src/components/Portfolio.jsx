import React, { useState } from 'react';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    { id: 1, category: 'youtube', title: 'Red Diamond', type: 'Youtube', img: 'https://dizme-vue.vercel.app/img/portfolio/1.jpg', tall: true },
    { id: 2, category: 'vimeo', title: 'Ave Bottle', type: 'Vimeo', img: 'https://dizme-vue.vercel.app/img/portfolio/2.jpg', tall: false },
    { id: 3, category: 'soundcloud', title: 'Flower Head', type: 'Soundcloud', img: 'https://dizme-vue.vercel.app/img/portfolio/3.jpg', tall: true },
    { id: 4, category: 'detail', title: 'Crystal Face', type: 'Detail', img: 'https://dizme-vue.vercel.app/img/portfolio/4.jpg', tall: true },
    { id: 5, category: 'popup', title: 'Blue Sphere', type: 'Popup', img: 'https://dizme-vue.vercel.app/img/portfolio/5.jpg', tall: false },
    { id: 6, category: 'youtube', title: 'Purple Swirl', type: 'Youtube', img: 'https://dizme-vue.vercel.app/img/portfolio/6.jpg', tall: false },
  ];

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="section-header text-center">
          <h4 className="subtitle">Portfolio</h4>
          <h2 className="section-title">My Works</h2>
          <p className="description mx-auto">
            A collection of projects spanning web development, design, and infrastructure.
          </p>
        </div>

        <div className="portfolio-filter">
          {['all', 'youtube', 'vimeo', 'soundcloud', 'popup', 'detail'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => handleFilterChange(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`portfolio-item ${project.tall ? 'tall' : ''} ${filter === 'all' || filter === project.category ? 'show' : 'hide'}`}
            >
              <div className="item-inner">
                <img src={project.img} alt={project.title} />
                <div className="portfolio-info">
                  <h4>{project.title}</h4>
                  <span>{project.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;