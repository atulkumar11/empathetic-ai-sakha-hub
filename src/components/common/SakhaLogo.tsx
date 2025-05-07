
import React from 'react';

interface SakhaLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const SakhaLogo: React.FC<SakhaLogoProps> = ({ 
  className = "", 
  width = 120, 
  height = "auto" 
}) => {
  return (
    <img 
      src="/lovable-uploads/fdc1cebd-e35f-4f08-a45b-e839964fd590.png" 
      alt="Sakha Logo" 
      className={className} 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

export default SakhaLogo;
