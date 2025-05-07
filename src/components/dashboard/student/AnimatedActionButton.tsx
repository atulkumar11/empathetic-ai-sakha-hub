
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AnimatedActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  path: string;
  isPrimary?: boolean;
}

export const AnimatedActionButton: React.FC<AnimatedActionButtonProps> = ({
  icon,
  label,
  description,
  path,
  isPrimary = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={path}
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`relative overflow-hidden rounded-lg ${
          isPrimary 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
        } px-4 py-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow`}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Background animation */}
        {isPrimary && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0"
            animate={{ opacity: isHovered ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Icon with pulse animation */}
        <motion.div 
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isPrimary 
              ? 'bg-white/20' 
              : 'bg-blue-100 dark:bg-blue-900/30'
          }`}
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.8,
            repeat: isHovered ? Infinity : 0,
            repeatType: "loop"
          }}
        >
          {icon}
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <h3 className={`font-medium ${isPrimary ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
              {label}
            </h3>
            {isPrimary && (
              <motion.div
                animate={{ 
                  rotate: isHovered ? [0, 15, -15, 0] : 0,
                  scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles size={16} className="text-yellow-300" />
              </motion.div>
            )}
          </div>
          {description && (
            <p className={`text-sm ${isPrimary ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
              {description}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default AnimatedActionButton;
