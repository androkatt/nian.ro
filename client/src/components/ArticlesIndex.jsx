import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import InteractiveBackground from './InteractiveBackground';
import Footer from './Footer';

const ArticlesIndex = () => {
    return (
        <>
            <InteractiveBackground />
            <div className="page-wrapper articles-page">
                <div className="container">
                    <motion.div
                        className="articles-header"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link to="/" className="back-link">
                            <ChevronLeft size={16} /> Back to Home
                        </Link>
                        <h1 className="page-title">Thoughts & <span className="highlight">Insights</span></h1>
                        <p className="page-subtitle">Deep dives into the JavaScript ecosystem, Google Cloud architecture, and modern DevOps methodologies.</p>
                    </motion.div>

                    <div className="articles-grid">
                        {articles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                            >
                                <Link to={`/articles/${article.slug}`} className="article-card-link">
                                    <div className="article-card glass-panel large-card">
                                        <div className="article-meta">
                                            <span className="article-category">{article.category}</span>
                                            <span className="article-readtime">{article.readTime}</span>
                                        </div>
                                        <h2 className="article-card-title">{article.title}</h2>
                                        <p className="article-card-excerpt">{article.excerpt}</p>
                                        <div className="article-footer">
                                            <span className="article-date">{article.date}</span>
                                            <span className="read-more">Read Article <ArrowRight size={14} /></span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ArticlesIndex;
