
import React from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StressTestHeaderProps {
  title?: string;
}

const StressTestHeader: React.FC<StressTestHeaderProps> = ({ title = "Cognitive Stress Test" }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium flex items-center bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        <Clock className="mr-2 text-blue-500" size={20} />
        {title}
      </h3>
      <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">1 of 3</Badge>
    </div>
  );
};

export default StressTestHeader;
