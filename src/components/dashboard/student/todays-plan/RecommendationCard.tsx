
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Recommendation {
  id: string;
  type: 'concept' | 'flashcard' | 'practice-exam';
  title: string;
  description: string;
  reason: string;
}

interface RecommendationCardProps {
  recommendations: Recommendation[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations = [] }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'concept':
        return { label: 'Concept', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' };
      case 'flashcard':
        return { label: 'Flashcard', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' };
      case 'practice-exam':
        return { label: 'Practice Exam', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' };
      default:
        return { label: 'Content', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' };
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recommended for You</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.slice(0, 3).map((rec) => {
          const { label, color } = getTypeLabel(rec.type);
          
          return (
            <div key={rec.id} className="flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <Badge className={color}>
                  {label}
                </Badge>
              </div>
              <div className="text-xs italic text-gray-500 dark:text-gray-400">
                Why: {rec.reason}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-fit text-primary hover:text-primary px-0"
              >
                Start now <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
