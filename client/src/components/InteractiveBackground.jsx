import React, { useEffect, useState } from 'react';

const InteractiveBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Use requestAnimationFrame for smooth, non-blocking performance
            requestAnimationFrame(() => {
                setMousePosition({
                    x: e.clientX,
                    y: e.clientY
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="interactive-bg-wrapper">
            <div
                className="interactive-glow"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`
                }}
            />
        </div>
    );
};

export default InteractiveBackground;
