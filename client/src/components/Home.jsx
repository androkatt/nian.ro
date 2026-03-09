import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Portfolio from './Portfolio';
import Solutions from './Solutions';
import LatestArticles from './LatestArticles';
import Contact from './Contact';
import Footer from './Footer';
import InteractiveBackground from './InteractiveBackground';

const Home = () => {
    return (
        <>
            <InteractiveBackground />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Portfolio />
            <Solutions />
            <LatestArticles />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
