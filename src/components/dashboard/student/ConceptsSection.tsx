
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, BookOpen, Clock } from 'lucide-react';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';

const ConceptsSection = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  
  // Filter to show only today's concepts
  const todaysCards = conceptCards
    .filter(card => card.scheduledFor === 'today')
    .slice(0, 6); // Limit to 6 cards
  
  if (loading) {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-40 animate-pulse">
            <CardContent className="p-0 h-full">
              <div className="bg-gray-200 h-full rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }
  
  if (todaysCards.length === 0) {
    return (
      <Card className="col-span-full bg-gray-50">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No concept cards scheduled for today</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      {todaysCards.map((card) => (
        <Link key={card.id} to={`/dashboard/student/concepts/${card.id}`}>
          <Card className="h-full hover:shadow-md transition-shadow duration-200 overflow-hidden group border-l-4" style={{ borderLeftColor: getDifficultyColor(card.difficulty) }}>
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={card.completed ? "outline" : "default"} className="mb-2">
                  {card.completed ? "Completed" : "Pending"}
                </Badge>
                <Badge variant="outline" className={getDifficultyClass(card.difficulty)}>
                  {card.difficulty}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors duration-200">
                {card.title}
              </h3>
              
              <div className="mt-auto pt-2 space-y-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Book size={14} />
                  <span>{card.subject}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <BookOpen size={14} />
                  <span>{card.chapter}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{card.estimatedTime} min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};

// Helper functions
const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'hard': return '#ef4444';
    default: return '#6366f1';
  }
};

const getDifficultyClass = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-green-50 text-green-700 border-green-200';
    case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'hard': return 'bg-red-50 text-red-700 border-red-200';
    default: return '';
  }
};

export default ConceptsSection;
