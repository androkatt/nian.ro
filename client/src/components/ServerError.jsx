import React from 'react';
import { useNavigate } from 'react-router-dom';
import WireframeWave from './WireframeWave';
import { motion } from 'framer-motion';

const ServerError = () => {
    const navigate = useNavigate();

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
                    <h1 className="error-title-md">500 Server Error</h1>
                    <p className="error-description">Our servers are currently under maintenance or facing a heavy load.<br />Please try again in a few moments.</p>
                    <div className="error-actions">
                        <button onClick={() => window.location.reload()} className="glass-btn">
                            Refresh Page
                        </button>
                        <button onClick={() => navigate(-1)} className="glass-btn">
                            Go Back
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServerError;
