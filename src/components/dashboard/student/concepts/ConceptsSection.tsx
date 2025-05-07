
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, Clock, BarChart3, ArrowUpDown, Plus, Eye } from 'lucide-react';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';

const ConceptsSection = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  
  // Filter to show only today's concepts
  const todaysCards = conceptCards
    .filter(card => card.scheduledFor === 'today')
    .slice(0, 6); // Limit to 6 cards
  
  // Actions
  const handlePrioritize = () => {
    // Logic to sort/filter by exam importance and relevance
    console.log("Prioritizing cards by exam importance");
  };
  
  const handleAnalytics = () => {
    // Logic to show analytics modal or navigate to analytics page
    console.log("Showing analytics for concept cards");
  };
  
  const handleCreateConcept = () => {
    // Logic to check subscription and show create concept form
    console.log("Creating new concept card");
  };
  
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
  
  return (
    <div className="space-y-6">
      {/* Section header with actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Today's Concept Cards</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handlePrioritize}>
            <ArrowUpDown className="mr-1 h-4 w-4" />
            Prioritize
          </Button>
          <Button variant="outline" size="sm" onClick={handleAnalytics}>
            <BarChart3 className="mr-1 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="outline" size="sm" className="bg-gradient-to-r from-sky-400/80 to-violet-400/80 text-white hover:from-sky-500 hover:to-violet-500" onClick={handleCreateConcept}>
            <Plus className="mr-1 h-4 w-4" />
            Create Concept
          </Button>
          <Link to="/dashboard/student/concepts/all">
            <Button variant="default" size="sm">
              <Eye className="mr-1 h-4 w-4" />
              View All
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todaysCards.length === 0 ? (
          <Card className="col-span-full bg-gray-50">
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No concept cards scheduled for today</p>
            </CardContent>
          </Card>
        ) : (
          todaysCards.map((card) => (
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
          ))
        )}
      </div>
    </div>
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
