
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

const ReadinessScoreMeter = ({ score }: { score: number }) => {
  return (
    <div className="relative pt-4">
      <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="absolute left-0 right-0 -top-2 flex justify-between px-2 text-xs text-gray-500 dark:text-gray-400">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
      <motion.div 
        className="absolute text-lg font-bold"
        style={{ 
          left: `${score}%`, 
          transform: 'translateX(-50%)', 
          top: '20px' 
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {score}
      </motion.div>
    </div>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data = [
  { name: 'Concepts', value: 75 },
  { name: 'Practice Tests', value: 68 },
  { name: 'Flashcards', value: 82 },
  { name: 'Revision', value: 60 }
];

interface ExamReadinessScoreProps {
  overallScore: number;
  targetExam: string;
  daysUntilExam?: number;
}

const ExamReadinessScore: React.FC<ExamReadinessScoreProps> = ({ 
  overallScore = 72, 
  targetExam = "IIT-JEE",
  daysUntilExam = 85
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Exam Readiness Score</span>
          <motion.div 
            className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {targetExam}
          </motion.div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="mb-10">
          <motion.div 
            className={`text-center text-3xl font-bold mb-2 ${
              overallScore >= 80 ? 'text-green-600 dark:text-green-400' : 
              overallScore >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 
              'text-red-600 dark:text-red-400'
            }`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            {overallScore}/100
          </motion.div>
          
          {daysUntilExam && (
            <div className="text-center text-sm text-muted-foreground mb-4">
              {daysUntilExam} days until your exam
            </div>
          )}
          
          <ReadinessScoreMeter score={overallScore} />
        </div>
        
        <Button
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)} 
          className="w-full flex items-center justify-center gap-2"
        >
          {expanded ? 'Hide Details' : 'View Details'}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                Readiness by Category
                <Info className="h-4 w-4 text-muted-foreground" />
              </h4>
              
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="space-y-2">
                  {data.map((entry, index) => (
                    <div key={`ability-${index}`}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{entry.name}</span>
                        <span className="font-medium">{entry.value}%</span>
                      </div>
                      <Progress value={entry.value} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm">
                <h5 className="font-medium mb-2">Recommendations:</h5>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Focus more on Revision sessions</li>
                  <li>Increase Practice Test frequency</li>
                  <li>Keep up the good work with Flashcards!</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExamReadinessScore;
