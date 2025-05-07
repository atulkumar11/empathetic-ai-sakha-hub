
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Clock, Search, Star, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

// Mock flashcard decks for demonstration
const mockFlashcardDecks = [
  {
    id: "1",
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    cardsCount: 45,
    mastered: 18,
    lastPracticed: "2023-10-25T14:30:00Z",
    difficulty: "hard",
    tags: ["Chemistry", "Reactions", "Organic"]
  },
  {
    id: "2",
    title: "Physics Formulas",
    subject: "Physics",
    cardsCount: 30,
    mastered: 25,
    lastPracticed: "2023-10-27T09:15:00Z",
    difficulty: "medium",
    tags: ["Physics", "Formulas", "Mechanics"]
  },
  {
    id: "3",
    title: "Cell Biology Terms",
    subject: "Biology",
    cardsCount: 40,
    mastered: 12,
    lastPracticed: "2023-10-20T16:45:00Z",
    difficulty: "medium",
    tags: ["Biology", "Cells", "Terminology"]
  },
  {
    id: "4",
    title: "Calculus Concepts",
    subject: "Mathematics",
    cardsCount: 35,
    mastered: 15,
    lastPracticed: "2023-10-24T10:30:00Z",
    difficulty: "hard",
    tags: ["Mathematics", "Calculus", "Integration"]
  },
  {
    id: "5",
    title: "English Literature Authors",
    subject: "English",
    cardsCount: 25,
    mastered: 22,
    lastPracticed: "2023-10-28T13:00:00Z",
    difficulty: "easy",
    tags: ["English", "Literature", "Authors"]
  },
  {
    id: "6",
    title: "World History Dates",
    subject: "History",
    cardsCount: 50,
    mastered: 28,
    lastPracticed: "2023-10-26T15:20:00Z",
    difficulty: "medium",
    tags: ["History", "Dates", "World Events"]
  }
];

const FlashcardsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Filter flashcards based on search query
  const filteredDecks = searchQuery
    ? mockFlashcardDecks.filter(deck => 
        deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : mockFlashcardDecks;
  
  // Calculate mastery percentage
  const calculateMasteryPercentage = (mastered: number, total: number) => {
    return Math.round((mastered / total) * 100);
  };
  
  // Format last practiced date
  const formatLastPracticed = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };
  
  // Get color for difficulty badge
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Get color for mastery progress
  const getMasteryColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Handle navigate to flashcard details
  const handleOpenDeck = (id: string) => {
    navigate(`/dashboard/student/flashcards/${id}`);
  };

  return (
    <SharedPageLayout 
      title="Flashcards" 
      subtitle="Review and master key concepts using spaced repetition"
    >
      <div className="space-y-6">
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search flashcards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Button className="whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Create Flashcards
          </Button>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Decks</p>
                  <p className="text-3xl font-bold">{mockFlashcardDecks.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cards</p>
                  <p className="text-3xl font-bold">
                    {mockFlashcardDecks.reduce((acc, deck) => acc + deck.cardsCount, 0)}
                  </p>
                </div>
                <Star className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Mastered Cards</p>
                  <p className="text-3xl font-bold">
                    {mockFlashcardDecks.reduce((acc, deck) => acc + deck.mastered, 0)}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Flashcard decks grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredDecks.map(deck => {
            const masteryPercentage = calculateMasteryPercentage(deck.mastered, deck.cardsCount);
            
            return (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className={`pb-4 border-b border-${deck.subject.toLowerCase()}-100`}>
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{deck.title}</CardTitle>
                      <Badge className={getDifficultyColor(deck.difficulty)}>
                        {deck.difficulty.charAt(0).toUpperCase() + deck.difficulty.slice(1)}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {deck.subject}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="py-4 flex-grow">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Cards</p>
                        <p className="font-medium">{deck.cardsCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mastered</p>
                        <p className="font-medium">{deck.mastered}</p>
                      </div>
                      <div className="col-span-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Mastery</span>
                          <span>{masteryPercentage}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getMasteryColor(masteryPercentage)}`} 
                            style={{ width: `${masteryPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Last practiced: {formatLastPracticed(deck.lastPracticed)}</span>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      {deck.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0 border-t">
                    <Button 
                      className="w-full" 
                      variant="default"
                      onClick={() => handleOpenDeck(deck.id)}
                    >
                      Study Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsPage;
