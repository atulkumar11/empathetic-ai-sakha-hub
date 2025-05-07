
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, BookOpen, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AllConceptCardsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [conceptCards, setConceptCards] = useState<any[]>([]);
  
  // Simulate fetching concept cards
  useEffect(() => {
    // In a real app, this would be an API call
    const mockConceptCards = [
      {
        id: 'c1',
        title: 'Newton\'s Laws of Motion',
        subject: 'Physics',
        tags: ['Mechanics', 'Motion', 'Forces'],
        difficulty: 'Medium',
        progress: 75,
        cardCount: 12,
        timeEstimate: 25,
        isRecommended: true,
      },
      {
        id: 'c2',
        title: 'Periodic Table & Elements',
        subject: 'Chemistry',
        tags: ['Inorganic', 'Elements'],
        difficulty: 'Easy',
        progress: 60,
        cardCount: 15,
        timeEstimate: 30,
        isRecommended: true,
      },
      {
        id: 'c3',
        title: 'Integration Techniques',
        subject: 'Mathematics',
        tags: ['Calculus', 'Integration'],
        difficulty: 'Hard',
        progress: 40,
        cardCount: 20,
        timeEstimate: 45,
        isRecommended: false,
      },
      {
        id: 'c4',
        title: 'Thermodynamics',
        subject: 'Physics',
        tags: ['Heat', 'Energy'],
        difficulty: 'Medium',
        progress: 30,
        cardCount: 10,
        timeEstimate: 20,
        isRecommended: false,
      },
      {
        id: 'c5',
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        tags: ['Organic', 'Reactions'],
        difficulty: 'Hard',
        progress: 20,
        cardCount: 25,
        timeEstimate: 50,
        isRecommended: false,
      },
      {
        id: 'c6',
        title: 'Differential Equations',
        subject: 'Mathematics',
        tags: ['Calculus', 'Differential'],
        difficulty: 'Hard',
        progress: 15,
        cardCount: 18,
        timeEstimate: 40,
        isRecommended: false,
      },
    ];
    
    // Filter based on active tab
    let filteredCards;
    if (activeTab === 'recommended') {
      filteredCards = mockConceptCards.filter(card => card.isRecommended);
    } else if (activeTab === 'week') {
      filteredCards = mockConceptCards.filter(card => card.progress < 70);
    } else if (activeTab === 'month') {
      filteredCards = mockConceptCards;
    } else { // today
      filteredCards = mockConceptCards.slice(0, 3);
    }
    
    setConceptCards(filteredCards);
  }, [activeTab]);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <SharedPageLayout
      title="All Concept Cards"
      subtitle="Master key concepts with our comprehensive learning cards"
      showQuickAccess={false}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/dashboard/student/concepts')}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Concept Cards
        </Button>
      </div>
      
      <div className="space-y-6">
        <Tabs 
          defaultValue="today" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="today">Today's Concepts</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Recommended Concepts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conceptCards.map(card => (
                <Card key={card.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-md">{card.title}</CardTitle>
                      <Badge className={getDifficultyColor(card.difficulty)}>{card.difficulty}</Badge>
                    </div>
                    <CardDescription>{card.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{card.cardCount} cards</span>
                      <span>{card.timeEstimate} min</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" 
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-right text-muted-foreground">
                      {card.progress}% complete
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      onClick={() => navigate(`/dashboard/student/concepts/${card.id}`)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="today">
            <h3 className="text-lg font-medium mb-4">Today's Recommended Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conceptCards.map(card => (
                <Card key={card.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-md">{card.title}</CardTitle>
                      <Badge className={getDifficultyColor(card.difficulty)}>{card.difficulty}</Badge>
                    </div>
                    <CardDescription>{card.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{card.cardCount} cards</span>
                      <span>{card.timeEstimate} min</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" 
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-right text-muted-foreground">
                      {card.progress}% complete
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      onClick={() => navigate(`/dashboard/student/concepts/${card.id}`)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="week">
            <h3 className="text-lg font-medium mb-4">This Week's Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conceptCards.map(card => (
                <Card key={card.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-md">{card.title}</CardTitle>
                      <Badge className={getDifficultyColor(card.difficulty)}>{card.difficulty}</Badge>
                    </div>
                    <CardDescription>{card.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{card.cardCount} cards</span>
                      <span>{card.timeEstimate} min</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" 
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-right text-muted-foreground">
                      {card.progress}% complete
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      onClick={() => navigate(`/dashboard/student/concepts/${card.id}`)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="month">
            <h3 className="text-lg font-medium mb-4">This Month's Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conceptCards.map(card => (
                <Card key={card.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-md">{card.title}</CardTitle>
                      <Badge className={getDifficultyColor(card.difficulty)}>{card.difficulty}</Badge>
                    </div>
                    <CardDescription>{card.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{card.cardCount} cards</span>
                      <span>{card.timeEstimate} min</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" 
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-right text-muted-foreground">
                      {card.progress}% complete
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      onClick={() => navigate(`/dashboard/student/concepts/${card.id}`)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default AllConceptCardsPage;
