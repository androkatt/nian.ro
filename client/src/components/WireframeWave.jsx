import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FlowingRibbonLines = () => {
    const linesRef = useRef();

    // Generate custom geometry with only parallel/horizontal lines (no vertical boundaries or diagonals)
    const { positions, colorArray, initialPositions, indices } = useMemo(() => {
        const widthSegments = 150;
        const heightSegments = 40; // Dense count of parallel flowing lines
        const width = 35;
        const height = 6;

        const count = (widthSegments + 1) * (heightSegments + 1);
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const init = new Float32Array(count * 3);
        const idx = [];

        // Gold: [0.83, 0.68, 0.21]
        // Green: [0.26, 0.72, 0.51]
        const colorGold = new THREE.Color(0.83, 0.68, 0.21);
        const colorGreen = new THREE.Color(0.26, 0.72, 0.51);

        for (let iy = 0; iy <= heightSegments; iy++) {
            const y = (iy * height / heightSegments) - (height / 2);
            for (let ix = 0; ix <= widthSegments; ix++) {
                const x = (ix * width / widthSegments) - (width / 2);

                const i = iy * (widthSegments + 1) + ix;
                const index3 = i * 3;

                pos[index3] = x;
                pos[index3 + 1] = y;
                pos[index3 + 2] = 0;

                init[index3] = x;
                init[index3 + 1] = y;
                init[index3 + 2] = 0;

                // Map X smoothly to gradient
                const mixRatio = (x + width / 2) / width;
                const mixedColor = colorGold.clone().lerp(colorGreen, mixRatio);

                col[index3] = mixedColor.r;
                col[index3 + 1] = mixedColor.g;
                col[index3 + 2] = mixedColor.b;

                // Generate index segments only along the X-axis (creating flowing longitudinal lines)
                if (ix < widthSegments) {
                    idx.push(i, i + 1);
                }
            }
        }

        return {
            positions: pos,
            colorArray: col,
            initialPositions: init,
            indices: new Uint16Array(idx)
        };
    }, []);

    useFrame(({ clock }) => {
        if (!linesRef.current) return;

        // Slowed down animation extensively ("close to a halt" = very slow floating movement)
        const t = clock.getElapsedTime() * 0.05;

        const geometry = linesRef.current.geometry;
        const pos = geometry.attributes.position.array;

        for (let i = 0; i < pos.length; i += 3) {
            const ix = initialPositions[i];
            const iy = initialPositions[i + 1];

            // Bending lines as if blown gracefully by slow wind
            const macroWave = Math.sin(ix * 0.2 - t) * 3.5;
            const twistX = Math.sin(ix * 0.4 - t * 1.5) * iy * 1.5;
            const twistY = Math.cos(ix * 0.3 + t) * iy * 1.2;

            pos[i] = ix + (Math.sin(iy + t) * 0.5); // Slight X drift
            pos[i + 1] = iy + twistY; // Arching bends
            pos[i + 2] = macroWave + twistX; // Z-depth folds
        }

        geometry.attributes.position.needsUpdate = true;
    });

    return (
        <lineSegments ref={linesRef} position={[0, -1, -6]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colorArray.length / 3}
                    array={colorArray}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    count={indices.length}
                    array={indices}
                    itemSize={1}
                />
            </bufferGeometry>
            <lineBasicMaterial
                vertexColors={true}
                transparent={true}
                opacity={0.85}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </lineSegments>
    );
};

const WireframeWave = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                {/* Soft fog to fade the ribbon gracefully into the dark background at the edges/depth */}
                <fog attach="fog" args={['#0a0a0c', 3, 15]} />
                <FlowingRibbonLines />
            </Canvas>
        </div>
    );
};

export default WireframeWave;
