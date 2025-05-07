
import React from 'react';
import { getCognitiveTestSets } from '../../test-questions/stressTestQuestions';

interface CognitiveSetSelectorProps {
  selectedExam: string;
  selectedCognitiveSet: number;
  setSelectedCognitiveSet: (set: number) => void;
}

const CognitiveSetSelector: React.FC<CognitiveSetSelectorProps> = ({
  selectedExam, 
  selectedCognitiveSet,
  setSelectedCognitiveSet
}) => {
  // Get cognitive test sets for the selected exam
  const cognitiveTestSets = getCognitiveTestSets(selectedExam);
  
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Select Cognitive Test Set:</h3>
      <div className="flex gap-2">
        {cognitiveTestSets.map(setNum => (
          <button
            key={setNum}
            className={`px-3 py-1 text-sm rounded-md ${
              selectedCognitiveSet === setNum 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setSelectedCognitiveSet(setNum)}
          >
            Set {setNum}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Each set focuses on different cognitive skills relevant to {selectedExam}.
      </p>
    </div>
  );
};

export default CognitiveSetSelector;
