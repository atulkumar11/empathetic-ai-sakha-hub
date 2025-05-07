
import React from 'react';
import { Link } from "react-router-dom";

interface SakhaLogoWithTextProps {
  className?: string;
}

const SakhaLogoWithText: React.FC<SakhaLogoWithTextProps> = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="/lovable-uploads/fdc1cebd-e35f-4f08-a45b-e839964fd590.png"
        alt="Sakha AI"
        className="w-10 h-10"
      />
      <span className="font-display font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Sakha AI
      </span>
    </Link>
  );
};

export default SakhaLogoWithText;
