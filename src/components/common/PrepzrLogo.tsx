
import React from 'react';
import { Link } from 'react-router-dom';

interface PrepzrLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  showText?: boolean;
}

const PrepzrLogo: React.FC<PrepzrLogoProps> = ({ 
  className = "", 
  width = 240, 
  height = "auto",
  showText = true
}) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png" 
        alt="PREPZR Logo" 
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          objectFit: 'contain'
        }}
      />
    </Link>
  );
};

export default PrepzrLogo;
