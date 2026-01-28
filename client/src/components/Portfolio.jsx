import React, { useState, useEffect } from 'react';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [toolCount, setToolCount] = useState(null);
  const [displayCount, setDisplayCount] = useState(0);

  // Fetch tool count from tools.nian.ro sitemap or fallback
  useEffect(() => {
    const fetchToolCount = async () => {
      try {
        const response = await fetch('https://tools.nian.ro/sitemap.xml');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const urls = xmlDoc.getElementsByTagName("loc");
        
        const allUrls = Array.from(urls).map(el => el.textContent);
        
        // Revised Logic: Count ONLY /en/ tools
        // This avoids duplication and focuses on the primary content.
        const enTools = allUrls.filter(url => {
            const path = new URL(url).pathname;
            // Matches /en/something but NOT just /en or /en/
            return path.startsWith('/en/') && path.length > 4;
        });

        const uniqueCount = enTools.length;
        
        if (uniqueCount > 0) {
            setToolCount(uniqueCount);
        } else {
            setToolCount(69); // Updated fallback to your expected number
        }

      } catch (error) {
        console.warn("Could not auto-fetch tool count. Using fallback.", error);
        setToolCount(69); // Updated fallback to your expected number
      }
    };

    fetchToolCount();
  }, []);

  // Animation effect for the number
  useEffect(() => {
    if (toolCount === null) return;
    
    let start = 0;
    const end = toolCount;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayCount(end);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [toolCount]);

  const projects = [
    { id: 1, category: 'web', title: 'Nian Tools', type: 'Utility Hub', link: 'https://tools.nian.ro', tall: true, isSpecial: true },
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
              {project.isSpecial ? (
                <div 
                  className="item-inner" 
                  style={{
                    height: '100%',
                    background: 'linear-gradient(to bottom right, #1d4ed8, #4f46e5, #06b6d4)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2.5rem',
                    textAlign: 'center',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                    <div style={{ position: 'absolute', top: '10%', left: '10%', fontSize: '3rem', opacity: 0.1, fontWeight: 'bold' }}>{"{ }"}</div>
                    <div style={{ position: 'absolute', bottom: '15%', right: '15%', fontSize: '4rem', opacity: 0.1, fontWeight: 'bold' }}>{"</>"}</div>

                    <h3 style={{ 
                        fontSize: '2.2rem', 
                        fontWeight: '800', 
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.02em'
                    }}>
                        NIAN TOOLS
                    </h3>
                    
                    <div style={{
                        fontSize: '3.5rem',
                        fontWeight: '900',
                        margin: '1rem 0',
                        textShadow: '0 0 20px rgba(255,255,255,0.3)'
                    }}>
                        {displayCount}
                    </div>

                    <p style={{ 
                        fontSize: '1.1rem', 
                        marginBottom: '2rem',
                        maxWidth: '280px',
                        lineHeight: '1.4',
                        opacity: 0.9
                    }}>
                        Free developer tools, converters, and utilities built for efficiency.
                    </p>

                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: 'white',
                            color: '#1d4ed8',
                            border: 'none',
                            fontWeight: '800',
                            padding: '14px 35px',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            display: 'inline-block',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        Discover more
                    </a>
                </div>
              ) : (
                <a href={project.link || "#"} target={project.link ? "_blank" : "_self"} rel="noopener noreferrer" className="item-inner">
                  <img src={project.img} alt={project.title} />
                  <div className="portfolio-info">
                    <h4>{project.title}</h4>
                    <span>{project.type}</span>
                  </div>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;