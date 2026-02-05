import React, { useState, useEffect } from 'react';
import youtubeImg from '../img/youtube.jpg';
import aiImg from '../img/AI_SYSTEM.jpg';
import infraImg from '../img/infra.jpeg';
import devopsImg from '../img/devops.png';

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
    { 
      id: 1, 
      category: 'web', 
      title: 'Nian Tools', 
      type: 'Utility Hub', 
      link: 'https://tools.nian.ro', 
      isSpecial: true,
      bgGradient: 'linear-gradient(to bottom right, #1d4ed8, #4f46e5, #06b6d4)',
      borderColor: '#333' 
    },
    {
      id: 2,
      category: 'web',
      title: 'Nian Tasks',
      type: 'Task Management',
      link: 'https://tasks.nian.ro',
      isSpecial: true,
      isTask: true,
      bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      borderColor: '#1e293b'
    },
    { id: 3, category: 'youtube', title: 'Tech Insights', type: 'YouTube Channel', img: youtubeImg, link: 'https://www.youtube.com/@andreinicolae8305/videos' },
    { id: 4, category: 'cloud', title: 'Cloud Infrastructure', type: 'AWS & Kubernetes', img: infraImg, link: '#' },
    { id: 5, category: 'ai', title: 'AI Automation', type: 'Integration', img: aiImg, link: '#' },
    { id: 6, category: 'devops', title: 'DevOps Pipelines', type: 'CI/CD Workflow', img: devopsImg, link: '#' },
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
            Selected projects showcasing cloud architecture, full-stack development, and automation.
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
          {projects.map((project) => {
            const isComingSoon = [4, 5, 6].includes(project.id);
            const isClickable = (project.isSpecial || project.id === 3) && !isComingSoon;
            const Wrapper = isClickable ? 'a' : 'div';

            return (
              <div
                key={project.id}
                className={`portfolio-item ${filter === 'all' || filter === project.category ? 'show' : 'hide'}`}
                style={{ display: (filter === 'all' || filter === project.category) ? 'block' : 'none' }}
              >
                {project.isSpecial || project.id === 3 || isComingSoon ? (
                  <Wrapper
                    href={isClickable ? project.link : undefined}
                    target={isClickable ? "_blank" : undefined}
                    rel={isClickable ? "noopener noreferrer" : undefined}
                    className="item-inner"
                    style={{
                      minHeight: '420px',
                      background: project.isSpecial ? project.bgGradient : `url(${project.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: `1px solid ${project.borderColor || 'rgba(255,255,255,0.1)'}`,
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '3rem 2rem',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      cursor: isClickable ? 'pointer' : 'default'
                    }}
                  >
                    {/* Dark Overlay for Coming Soon */}
                    {isComingSoon && (
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.20)',
                        zIndex: 1
                      }} />
                    )}

                    {project.isSpecial && (
                      <>
                        {/* Background Decoration */}
                        <div style={{ pointerEvents: 'none', position: 'absolute', top: '-10%', left: '-10%', fontSize: '8rem', opacity: 0.1, fontWeight: '800', fontFamily: 'Inter' }}>
                          {project.isTask ? 'N' : '{}'}
                        </div>
                        <div style={{ pointerEvents: 'none', position: 'absolute', bottom: '-10%', right: '-10%', fontSize: '8rem', opacity: 0.1, fontWeight: '800', fontFamily: 'Inter' }}>
                          {project.isTask ? '</>' : '</>'}
                        </div>
                      </>
                    )}

                    {/* Top Content Group */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                      {project.id === 3 && (
                        <h3 style={{
                          fontSize: '1.8rem',
                          fontWeight: '800',
                          letterSpacing: '-0.02em',
                          marginBottom: '0.5rem',
                          color: '#fff',
                          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                        }}>
                          Video Portofolio
                        </h3>
                      )}

                      {project.isSpecial && (
                        <>
                          <h3 style={{
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            marginBottom: '0.5rem',
                            color: '#fff'
                          }}>
                            {project.isTask ? '' : 'Various Tools'}
                          </h3>

                          {project.isTask ? (
                            <div style={{
                              fontSize: '2.5rem',
                              fontWeight: '900',
                              margin: '0.5rem 0 1.5rem 0',
                              lineHeight: '1',
                              color: '#fff',
                              textShadow: '0 0 20px rgba(255,255,255,0.4)'
                            }}>
                              TASK MANAGER
                            </div>
                          ) : (
                            <div style={{
                              fontSize: '4rem',
                              fontWeight: '800',
                              margin: '0 0 1rem 0',
                              lineHeight: '1',
                              color: '#fff',
                              textShadow: '0 0 20px rgba(255,255,255,0.4)'
                            }}>
                              {displayCount}
                            </div>
                          )}

                          <p style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '2rem',
                            maxWidth: '260px',
                            lineHeight: '1.5'
                          }}>
                            {project.isTask 
                              ? 'Streamline your workflow with intelligent task tracking.' 
                              : 'Free developer tools, converters, and utilities built for efficiency.'}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Bottom Button Group - Margin Top Auto pushes it down */}
                    <div
                      style={{
                        marginTop: 'auto',
                        backgroundColor: isComingSoon ? '#666' : '#fff',
                        color: isComingSoon ? '#fff' : (project.isTask ? '#2563eb' : (project.id === 3 ? '#ef4444' : (project.id === 4 ? '#0ea5e9' : (project.id === 5 ? '#8b5cf6' : (project.id === 6 ? '#10b981' : '#1d4ed8'))))),
                        border: 'none',
                        fontWeight: '700',
                        padding: '14px 35px',
                        borderRadius: '50px',
                        cursor: isClickable ? 'pointer' : 'default',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        fontSize: '1rem',
                        display: 'inline-block',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                        position: 'relative',
                        zIndex: 2,
                        opacity: isComingSoon ? 0.9 : 1
                      }}
                      onMouseOver={(e) => {
                        if (isClickable) {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 15px 25px rgba(0,0,0,0.3)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (isClickable) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                        }
                      }}
                    >
                      {isComingSoon ? 'Coming soon' : 'Discover more'}
                    </div>
                  </Wrapper>
                ) : (
                  <a href={project.link || "#"} target={project.link ? "_blank" : "_self"} rel="noopener noreferrer" className="item-inner">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      style={{ 
                        borderRadius: '12px',
                        width: '100%',
                        height: '420px',
                        objectFit: 'cover',
                        display: 'block'
                      }} 
                    />
                    <div className="portfolio-info">
                      <h4>{project.title}</h4>
                      <span>{project.type}</span>
                    </div>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;