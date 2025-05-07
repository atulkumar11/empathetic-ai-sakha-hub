
import React from 'react';
import { Brain } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';

interface ConceptLoaderProps {
  subject?: string;
}

const ConceptLoader: React.FC<ConceptLoaderProps> = ({ subject }) => {
  return (
    <div className="space-y-4">
      <div className="h-40 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center border-2 border-pink-100 dark:border-pink-800">
        <div className="text-center">
          <Brain className="mx-auto mb-2 animate-pulse text-pink-500" size={40} />
          <p className="text-sm font-medium">
            {subject ? `Preparing your ${subject} concept test...` : 'Preparing your concept test...'}
          </p>
        </div>
      </div>
      <CustomProgress value={40} className="h-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
      <p className="text-xs text-center text-muted-foreground">
        {subject 
          ? `Please wait while we load your ${subject} questions`
          : 'Please wait while we load your concept test'
        }
      </p>
    </div>
  );
};

export default ConceptLoader;
