
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight } from "lucide-react";

interface ConceptCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  progress?: number;
  relatedConcepts?: string[];
  onView?: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  id,
  title,
  description,
  subject,
  difficulty,
  completed = false,
  progress = 0,
  relatedConcepts = [],
  onView
}) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800 border-green-200',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'hard': 'bg-red-100 text-red-800 border-red-200'
  };

  const handleStudyClick = () => {
    // Navigate to concept landing page
    navigate(`/dashboard/student/concepts/landing`);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 overflow-hidden border-2 border-gray-100">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${difficultyColors[difficulty]} capitalize`}>
            {difficulty}
          </Badge>
          {completed && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              Completed
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg font-semibold mt-2">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {subject}
        </p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">
          {description}
        </p>
        
        {progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {relatedConcepts && relatedConcepts.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-1">Related Concepts:</p>
            <div className="flex flex-wrap gap-1">
              {relatedConcepts.map((concept, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="default" 
          className="w-full group"
          onClick={handleStudyClick}
        >
          <BookOpen className="mr-2 h-4 w-4" /> 
          Study
          <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConceptCard;
