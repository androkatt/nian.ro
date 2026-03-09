import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import { ChevronLeft } from 'lucide-react';
import InteractiveBackground from './InteractiveBackground';
import Footer from './Footer';
import Markdown from 'markdown-to-jsx';

const ArticleView = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const article = articles.find(a => a.slug === slug);

    // Scroll to top on load or redirect to 404 if not found
    useEffect(() => {
        if (!article) {
            navigate('/404');
        } else {
            window.scrollTo(0, 0);
        }
    }, [article, navigate]);

    if (!article) return null;

    return (
        <>
            <InteractiveBackground />
            <div className="page-wrapper article-reader-page">
                <article className="container article-container">
                    <motion.div
                        className="article-header glass-panel"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link to="/articles" className="back-link">
                            <ChevronLeft size={16} /> All Articles
                        </Link>

                        <div className="article-meta-top">
                            <span className="tag highlight-tag">{article.category}</span>
                            <span className="date-time">{article.date} • {article.readTime}</span>
                        </div>

                        <h1 className="article-h1">{article.title}</h1>
                    </motion.div>

                    <motion.div
                        className="article-body glass-panel markdown-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Markdown>
                            {article.content}
                        </Markdown>
                    </motion.div>
                </article>
            </div>
            <Footer />
        </>
    );
};

export default ArticleView;
