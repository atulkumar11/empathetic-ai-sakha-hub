
import React from 'react';
import { Check } from 'lucide-react';

interface ProficiencySelectorProps {
  isSelected: boolean;
  onClick: () => void;
  label: string;
  variant: 'weak' | 'moderate' | 'strong';
}

const ProficiencySelector: React.FC<ProficiencySelectorProps> = ({
  isSelected,
  onClick,
  label,
  variant
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'weak':
        return isSelected 
          ? 'bg-red-500 text-white shadow-sm' 
          : 'hover:bg-red-100 dark:hover:bg-red-900/20';
      case 'moderate':
        return isSelected 
          ? 'bg-yellow-500 text-white shadow-sm' 
          : 'hover:bg-yellow-100 dark:hover:bg-yellow-900/20';
      case 'strong':
        return isSelected 
          ? 'bg-green-500 text-white shadow-sm' 
          : 'hover:bg-green-100 dark:hover:bg-green-900/20';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`flex-1 flex items-center justify-center rounded-lg py-2 cursor-pointer transition-all ${getVariantStyles()}`}
    >
      <div className="flex flex-col items-center">
        {isSelected && (
          <Check className="h-4 w-4 mb-1" />
        )}
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
};

export default ProficiencySelector;
