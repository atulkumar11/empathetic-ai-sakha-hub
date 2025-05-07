
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { ConfidenceMapping } from '../types';

interface ConfidenceMappingProps {
  confidenceMappings: ConfidenceMapping[];
  examType?: string; // Added this prop
}

const ConfidenceMappingSection: React.FC<ConfidenceMappingProps> = ({ 
  confidenceMappings,
  examType 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-800/50 p-5 shadow-md"
    >
      <h4 className="flex items-center text-blue-700 dark:text-blue-400 font-medium mb-4">
        <div className="p-2 mr-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        {examType ? `${examType} Confidence Mapping` : 'Confidence Mapping'}
      </h4>
      
      <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
        This mapping shows how your perceived knowledge (confidence) aligns with your actual performance (accuracy).
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-50 dark:bg-blue-900/20">
              <th className="p-2 text-left">Topic</th>
              <th className="p-2 text-center">Confidence</th>
              <th className="p-2 text-center">Accuracy</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {confidenceMappings.map((mapping, index) => (
              <tr key={index} className="border-b border-blue-100 dark:border-blue-800/30">
                <td className="p-2">{mapping.topic}</td>
                <td className="p-2 text-center">{mapping.confidence}%</td>
                <td className="p-2 text-center">{mapping.accuracy}%</td>
                <td className="p-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    mapping.status === 'overconfident' 
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' 
                      : mapping.status === 'aligned'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                  }`}>
                    {mapping.status === 'overconfident' && 'Overconfident ❗️'}
                    {mapping.status === 'aligned' && 'Aligned ✅'}
                    {mapping.status === 'underconfident' && 'Underconfident 🤯'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ConfidenceMappingSection;
