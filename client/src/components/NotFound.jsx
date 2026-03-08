import React from 'react';
import { Link } from 'react-router-dom';
import WireframeWave from './WireframeWave';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <section className="error-page-section">
            <WireframeWave />
            <div className="container error-page-container">
                <motion.div
                    className="error-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="error-title">404</h1>
                    <p className="error-description">Whoops! This page seems to<br />have vanished into the cloud.</p>
                    <Link to="/" className="glass-btn">
                        Return Home
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default NotFound;
