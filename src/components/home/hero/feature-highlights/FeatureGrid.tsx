
import React from 'react';
import { motion } from 'framer-motion';
import FeaturePoint from './FeaturePoint';
import { featurePoints } from './featureData';
import { containerVariants } from './animationVariants';

const FeatureGrid: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
    >
      {featurePoints.map((point, index) => (
        <FeaturePoint
          key={index}
          icon={point.icon}
          title={point.title}
          description={point.description}
          color={point.color}
          delay={point.delay}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default FeatureGrid;
