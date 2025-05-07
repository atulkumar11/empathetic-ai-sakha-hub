
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Book, Search, Brain, Clock, Calendar, ChevronRight, Tag, BarChart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  description: string;
  cardCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeEstimate: number;
  tags: string[];
  masteredCards: number;
  lastReviewed?: string;
  dueDate?: string;
  isRecommended?: boolean;
  accuracy?: number;
}

const FlashcardsLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for flashcard decks
  const flashcardDecks: FlashcardDeck[] = [
    {
      id: 'deck-1',
      title: "Physics Formulas",
      subject: "Physics",
      chapter: "Mechanics",
      description: "Core formulas and equations for mechanics problems",
      cardCount: 25,
      difficulty: "Medium",
      timeEstimate: 20,
      tags: ["Mechanics", "Formulas", "Equations"],
      masteredCards: 12,
      lastReviewed: "yesterday",
      dueDate: "today",
      isRecommended: true,
      accuracy: 72
    },
    {
      id: 'deck-2',
      title: "Periodic Table Elements",
      subject: "Chemistry",
      chapter: "Elements",
      description: "Learn properties and facts about periodic table elements",
      cardCount: 30,
      difficulty: "Medium",
      timeEstimate: 25,
      tags: ["Elements", "Properties", "Periodic Table"],
      masteredCards: 20,
      lastReviewed: "3 days ago",
      dueDate: "today",
      accuracy: 85
    },
    {
      id: 'deck-3',
      title: "Calculus Definitions",
      subject: "Mathematics",
      chapter: "Calculus",
      description: "Key definitions and theorems in calculus",
      cardCount: 15,
      difficulty: "Hard",
      timeEstimate: 15,
      tags: ["Calculus", "Definitions", "Theorems"],
      masteredCards: 5,
      lastReviewed: "5 days ago",
      dueDate: "tomorrow",
      isRecommended: true,
      accuracy: 64
    },
    {
      id: 'deck-4',
      title: "Biology Cell Functions",
      subject: "Biology",
      chapter: "Cell Biology",
      description: "Flashcards on cell structures and their functions",
      cardCount: 20,
      difficulty: "Easy",
      timeEstimate: 18,
      tags: ["Cells", "Organelles", "Functions"],
      masteredCards: 20,
      lastReviewed: "1 week ago",
      accuracy: 100
    },
    {
      id: 'deck-5',
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      chapter: "Organic Chemistry",
      description: "Key organic chemistry reaction mechanisms",
      cardCount: 35,
      difficulty: "Hard",
      timeEstimate: 30,
      tags: ["Organic", "Reactions", "Mechanisms"],
      masteredCards: 14,
      lastReviewed: "2 days ago",
      accuracy: 68
    },
    {
      id: 'deck-6',
      title: "Physics Laws",
      subject: "Physics",
      chapter: "Modern Physics",
      description: "Fundamental laws of physics with their applications",
      cardCount: 18,
      difficulty: "Medium",
      timeEstimate: 15,
      tags: ["Laws", "Applications", "Modern Physics"],
      masteredCards: 0,
      accuracy: 0
    }
  ];

  // Filter decks based on tab and search
  const getFilteredDecks = () => {
    let filtered = flashcardDecks;
    
    // Filter by tab
    if (activeTab === 'due-today') {
      filtered = filtered.filter(deck => deck.dueDate === 'today');
    } else if (activeTab === 'mastered') {
      filtered = filtered.filter(deck => deck.masteredCards === deck.cardCount && deck.cardCount > 0);
    } else if (activeTab === 'in-progress') {
      filtered = filtered.filter(deck => deck.masteredCards > 0 && deck.masteredCards < deck.cardCount);
    } else if (activeTab === 'not-started') {
      filtered = filtered.filter(deck => deck.masteredCards === 0);
    } else if (activeTab === 'recommended') {
      filtered = filtered.filter(deck => deck.isRecommended);
    } else if (activeTab !== 'all') {
      // Filter by subject
      filtered = filtered.filter(deck => deck.subject.toLowerCase() === activeTab);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(deck => 
        deck.title.toLowerCase().includes(query) || 
        deck.subject.toLowerCase().includes(query) ||
        deck.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const filteredDecks = getFilteredDecks();
  
  // Get list of unique subjects
  const subjects = Array.from(new Set(flashcardDecks.map(deck => deck.subject.toLowerCase())));
  
  // Handle card click to navigate to flashcard interactive page
  const handleDeckClick = (deckId: string) => {
    navigate(`/dashboard/student/flashcards/${deckId}/interactive`);
  };

  // Difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Get mastery status
  const getMasteryStatus = (deck: FlashcardDeck) => {
    if (deck.masteredCards === 0) return { label: 'Not Started', color: 'text-gray-500' };
    if (deck.masteredCards === deck.cardCount) return { label: 'Mastered', color: 'text-green-600' };
    
    const percentage = (deck.masteredCards / deck.cardCount) * 100;
    if (percentage < 30) return { label: 'Just Started', color: 'text-blue-600' };
    if (percentage < 70) return { label: 'Learning', color: 'text-amber-600' };
    return { label: 'Almost Mastered', color: 'text-emerald-600' };
  };

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Reinforce your memory with smart, adaptive flashcards"
    >
      <div className="space-y-6">
        {/* Search and filter bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search flashcards by title, subject, or tag..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>

        {/* Tabs for filtering */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start">
            <TabsTrigger value="all">All Decks</TabsTrigger>
            <TabsTrigger value="due-today">Due Today</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="not-started">Not Started</TabsTrigger>
            <TabsTrigger value="mastered">Mastered</TabsTrigger>
            {subjects.map(subject => (
              <TabsTrigger key={subject} value={subject} className="capitalize">
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDecks.map(deck => {
                const masteryStatus = getMasteryStatus(deck);
                const masteryPercentage = deck.cardCount > 0 ? Math.round((deck.masteredCards / deck.cardCount) * 100) : 0;
                
                return (
                  <Card 
                    key={deck.id}
                    className={`cursor-pointer transition-all hover:shadow-md overflow-hidden border-l-4 ${
                      masteryPercentage === 100 
                        ? 'border-l-green-500' 
                        : masteryPercentage > 0 
                          ? 'border-l-blue-500' 
                          : deck.isRecommended 
                            ? 'border-l-violet-500' 
                            : 'border-l-gray-300'
                    }`}
                    onClick={() => handleDeckClick(deck.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline" className={getDifficultyColor(deck.difficulty)}>
                          {deck.difficulty}
                        </Badge>
                        {deck.dueDate === 'today' && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            Due Today
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{deck.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <div className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {deck.description}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {deck.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Book className="h-4 w-4 mr-1" />
                          <span>{deck.subject}</span>
                        </div>
                        <div className="flex items-center">
                          <Brain className="h-4 w-4 mr-1" />
                          <span>{deck.cardCount} cards</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>~{deck.timeEstimate} min</span>
                        </div>
                        {deck.accuracy > 0 && (
                          <div className="flex items-center">
                            <BarChart className="h-4 w-4 mr-1" />
                            <span>{deck.accuracy}% accuracy</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={masteryStatus.color}>{masteryStatus.label}</span>
                          <span>{deck.masteredCards}/{deck.cardCount} cards</span>
                        </div>
                        <Progress value={masteryPercentage} className="h-1.5" />
                      </div>
                      
                      {deck.lastReviewed && (
                        <div className="mt-2 text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Last reviewed: {deck.lastReviewed}</span>
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        {masteryPercentage === 100 
                          ? 'Review Again' 
                          : masteryPercentage > 0 
                            ? 'Continue Learning' 
                            : 'Start Learning'
                        }
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
            
            {filteredDecks.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-20" />
                <h3 className="text-lg font-medium mb-1">No flashcard decks found</h3>
                <p>Try adjusting your filter or search criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsLandingPage;
