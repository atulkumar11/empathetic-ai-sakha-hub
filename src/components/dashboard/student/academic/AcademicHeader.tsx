
import React from 'react';
import { GraduationCap } from 'lucide-react';

interface AcademicHeaderProps {
  examGoal?: string;
}

const AcademicHeader: React.FC<AcademicHeaderProps> = ({ examGoal }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <GraduationCap className="h-8 w-8 text-indigo-600" />
        Academic Advisor
      </h1>
      <p className="text-gray-500 mt-1">
        Your personalized study plans and academic progress tracking
        {examGoal && ` for ${examGoal}`}
      </p>
    </div>
  );
};

export default AcademicHeader;
