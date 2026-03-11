import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import { ChevronLeft } from 'lucide-react';
import WireframeWave from './WireframeWave';
import Navbar from './Navbar';
import Footer from './Footer';
import Markdown from 'markdown-to-jsx';

const ArticleView = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const article = articles.find(a => a.slug === slug);

    // Scroll to top on load or redirect to 404 if not found
    useEffect(() => {
        if (article) { // Only scroll to top if article is found
            window.scrollTo(0, 0);
        }
        // The navigation to /404 is now handled by the conditional render below
    }, [article]); // Removed navigate from dependencies as it's not used for navigation here

    if (!article) {
        return (
            <>
                <WireframeWave />
                <Navbar />
                <div className="page-wrapper articles-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 100px)' }}>
                    <div className="text-center">
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff' }}>Article Not Found</h1>
                        <p style={{ fontSize: '1.2rem', color: '#ccc' }}>The article you are looking for does not exist.</p>
                        <Link to="/articles" className="btn btn-primary mt-4">Go to Articles</Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <WireframeWave />
            <Navbar />
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
