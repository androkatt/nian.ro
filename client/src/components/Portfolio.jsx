import React, { useState } from 'react';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    { id: 1, category: 'web', title: 'Nian Tools', type: 'Utility Hub', img: 'https://placehold.co/600x800/1e293b/white?text=tools.nian.ro', link: 'https://tools.nian.ro', tall: true },
    { id: 2, category: 'web', title: 'Nian Tasks', type: 'Task Management', img: 'https://placehold.co/600x400/334155/white?text=tasks.nian.ro', link: 'https://tasks.nian.ro', tall: false },
    { id: 3, category: 'youtube', title: 'Tech Insights', type: 'YouTube Channel', img: 'https://placehold.co/600x800/ef4444/white?text=YouTube+Channel', link: 'https://www.youtube.com/@andreinicolae8305/videos', tall: true },
    { id: 4, category: 'cloud', title: 'Cloud Infrastructure', type: 'AWS & Kubernetes', img: 'https://placehold.co/600x800/0ea5e9/white?text=Infrastructure', tall: true },
    { id: 5, category: 'ai', title: 'AI Automation', type: 'Integration', img: 'https://placehold.co/600x400/8b5cf6/white?text=AI+Systems', tall: false },
    { id: 6, category: 'devops', title: 'DevOps Pipelines', type: 'CI/CD Workflow', img: 'https://placehold.co/600x400/10b981/white?text=DevOps', tall: false },
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
            A collection of projects spanning cloud infrastructure, web development, and AI integration.
          </p>
        </div>

        <div className="portfolio-filter">
          {['all', 'web', 'youtube', 'cloud', 'ai', 'devops'].map((cat) => (
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
              <a href={project.link || "#"} target={project.link ? "_blank" : "_self"} rel="noopener noreferrer" className="item-inner">
                <img src={project.img} alt={project.title} />
                <div className="portfolio-info">
                  <h4>{project.title}</h4>
                  <span>{project.type}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;