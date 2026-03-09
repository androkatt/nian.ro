import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const LatestArticles = () => {
    const ref = useRef(null);
    const scrollRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    return (
        <section id="articles" className="articles-section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="title-wrapper">
                        <h2 className="section-title">Latest <span className="highlight">Articles</span></h2>
                        <div className="title-underline"></div>
                    </div>
                    <div className="carousel-controls">
                        <button className="carousel-btn" onClick={scrollLeft} aria-label="Scroll left">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="carousel-btn" onClick={scrollRight} aria-label="Scroll right">
                            <ChevronRight size={20} />
                        </button>
                        <Link to="/articles" className="view-all-btn">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="articles-carousel"
                    ref={scrollRef}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {articles.map((article) => (
                        <Link to={`/articles/${article.slug}`} key={article.id} className="article-card-link">
                            <div className="article-card glass-panel">
                                <div className="article-meta">
                                    <span className="article-category">{article.category}</span>
                                    <span className="article-readtime">{article.readTime}</span>
                                </div>
                                <h3 className="article-card-title">{article.title}</h3>
                                <p className="article-card-excerpt">{article.excerpt}</p>
                                <div className="article-footer">
                                    <span className="article-date">{article.date}</span>
                                    <span className="read-more">Read Article <ArrowRight size={14} /></span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default LatestArticles;
