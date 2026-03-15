const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'src/data/nian_logo.svg');
const outputPath = path.join(__dirname, 'src/components/LoaderLogo.jsx');

let svgContent = fs.readFileSync(inputPath, 'utf8');

// Strip XML declaration
svgContent = svgContent.replace(/<\?xml.*?\?>/g, '');

// Strip the absolute local image tag
svgContent = svgContent.replace(/<image.*?\/>/g, '');

// Strip the styles block
svgContent = svgContent.replace(/<style>[\s\S]*?<\/style>/g, '');

// Convert common SVG attributes to React CamelCase
svgContent = svgContent.replace(/xmlns:xlink/g, 'xmlnsXlink');
svgContent = svgContent.replace(/xlink:href/g, 'xlinkHref');
svgContent = svgContent.replace(/ class=\"[^\"]*\"/g, ''); // strip classes
svgContent = svgContent.replace(/style="([^"]*)"/g, (match, styleString) => {
    const styles = styleString.split(';').filter(s => s.trim()).map(s => {
        let [key, value] = s.split(':').map(str => str.trim());
        if (!key) return '';
        key = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return `${key}: '${value}'`;
    }).join(', ');
    return `style={{ ${styles} }}`;
});

const componentCode = `import React from 'react';

const LoaderLogo = ({ className }) => {
  return (
    <div className={className} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      ${svgContent.trim()}
    </div>
  );
};

export default LoaderLogo;`;

fs.writeFileSync(outputPath, componentCode);
console.log('Successfully generated LoaderLogo.jsx');
