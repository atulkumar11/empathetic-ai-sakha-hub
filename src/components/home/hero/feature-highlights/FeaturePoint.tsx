
import React from 'react';
import { motion } from 'framer-motion';

export interface FeaturePointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
  index: number;
}

const FeaturePoint: React.FC<FeaturePointProps> = ({
  icon,
  title,
  description,
  color,
  delay,
  index
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        show: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 12
          }
        }
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 10
        }
      }}
      className="flex flex-col items-center text-center p-4 rounded-lg transition-all relative bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-purple-100/20 dark:border-purple-800/20 shadow-sm w-64 mx-auto"
    >
      <FeatureIcon icon={icon} color={color} delay={delay} />
      <h3 className="text-lg font-semibold mt-4 text-gray-800 dark:text-gray-100">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{description}</p>
    </motion.div>
  );
};

const FeatureIcon: React.FC<{ icon: React.ReactNode; color: string; delay: number }> = ({ 
  icon, color, delay 
}) => {
  const iconAnimation = {
    rotate: [0, -10, 10, -5, 0],
    scale: [1, 1.2, 1],
    transition: { 
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3
    }
  };

  return (
    <motion.div 
      whileHover={iconAnimation}
      animate={iconAnimation}
      className={`rounded-full bg-gradient-to-br ${color} p-3 flex-shrink-0 shadow-md`}
    >
      {icon}
      <motion.div 
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 0.5, 0], 
          scale: [0.8, 1.5, 1.8]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          repeatDelay: 1,
          delay: delay
        }}
        style={{ 
          background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
        }}
      />
    </motion.div>
  );
};

export default FeaturePoint;
