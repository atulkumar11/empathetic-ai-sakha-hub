
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check, Clock, Star, Flag, ArrowLeft, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const allConceptCards = [
  {
    id: 1,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    status: "in-progress",
    difficulty: "medium",
    timeEstimate: 20,
    mastery: 65,
    priority: 1,
    cardCount: 15,
    isRecommended: true
  },
  {
    id: 2,
    title: "Chemical Bonding",
    subject: "Chemistry",
    chapter: "Chemical Bonds",
    status: "not-started",
    difficulty: "hard",
    timeEstimate: 30,
    mastery: 0,
    priority: 2,
    cardCount: 22,
    isRecommended: false
  },
  {
    id: 3,
    title: "Quadratic Equations",
    subject: "Mathematics",
    chapter: "Algebra",
    status: "completed",
    difficulty: "medium",
    timeEstimate: 25,
    mastery: 90,
    priority: 0,
    cardCount: 18,
    isRecommended: true
  },
  // More cards with different subjects and topics for all concepts view
  {
    id: 4,
    title: "Cell Structure and Function",
    subject: "Biology",
    chapter: "Cell Biology",
    status: "in-progress",
    difficulty: "medium",
    timeEstimate: 25,
    mastery: 45,
    priority: 2,
    cardCount: 20,
    isRecommended: false
  },
  {
    id: 5,
    title: "Acid-Base Reactions",
    subject: "Chemistry",
    chapter: "Equilibrium",
    status: "not-started",
    difficulty: "hard",
    timeEstimate: 35,
    mastery: 0,
    priority: 3,
    cardCount: 25,
    isRecommended: false
  },
  {
    id: 6,
    title: "Derivatives and Integration",
    subject: "Mathematics",
    chapter: "Calculus",
    status: "completed",
    difficulty: "hard",
    timeEstimate: 40,
    mastery: 85,
    priority: 0,
    cardCount: 30,
    isRecommended: true
  },
  {
    id: 7,
    title: "Periodic Table",
    subject: "Chemistry",
    chapter: "Elements",
    status: "completed",
    difficulty: "easy",
    timeEstimate: 15,
    mastery: 95,
    priority: 1,
    cardCount: 12,
    isRecommended: false
  },
  {
    id: 8,
    title: "Wave Optics",
    subject: "Physics",
    chapter: "Optics",
    status: "not-started",
    difficulty: "hard",
    timeEstimate: 45,
    mastery: 0,
    priority: 2,
    cardCount: 28,
    isRecommended: true
  },
];

// Get status badge color and text
const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
      return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Check, text: "Completed" };
    case "in-progress":
      return { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock, text: "In Progress" };
    case "not-started":
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Not Started" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Unknown" };
  }
};

// Get difficulty badge color and text
const getDifficultyInfo = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return { color: "bg-green-100 text-green-800 border-green-200", text: "Easy" };
    case "medium":
      return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Medium" };
    case "hard":
      return { color: "bg-red-100 text-red-800 border-red-200", text: "Hard" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Unknown" };
  }
};

interface ConceptCardProps {
  concept: typeof allConceptCards[0];
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  const statusInfo = getStatusInfo(concept.status);
  const difficultyInfo = getDifficultyInfo(concept.difficulty);
  const StatusIcon = statusInfo.icon;
  const navigate = useNavigate();

  const handleOpenConceptCard = () => {
    navigate(`/dashboard/student/concepts/${concept.id}`);
  };

  return (
    <Card className="h-full flex flex-col transform hover:scale-[1.01] transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{concept.title}</CardTitle>
          {concept.isRecommended && (
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
              <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription className="flex flex-wrap gap-2 mt-1">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {concept.subject}
          </Badge>
          <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
            {concept.chapter}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className={statusInfo.color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.text}
          </Badge>
          <Badge variant="outline" className={difficultyInfo.color}>
            {difficultyInfo.text}
          </Badge>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Mastery</span>
            <span>{concept.mastery}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                concept.mastery >= 80 
                  ? "bg-emerald-500" 
                  : concept.mastery >= 40 
                    ? "bg-yellow-500" 
                    : "bg-red-500"
              }`} 
              style={{ width: `${concept.mastery}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{concept.timeEstimate} min</span>
          <span className="mx-2">•</span>
          <BookOpen className="h-4 w-4" />
          <span>{concept.cardCount} cards</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          onClick={handleOpenConceptCard}
        >
          {concept.status === "completed" 
            ? "Review Again" 
            : concept.status === "in-progress" 
              ? "Continue Learning" 
              : "Start Learning"
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

const ConceptsAllPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const navigate = useNavigate();

  const filteredConcepts = allConceptCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         card.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || card.subject.toLowerCase() === subjectFilter.toLowerCase();
    return matchesSearch && matchesSubject;
  });

  const handleBackToSection = () => {
    navigate('/dashboard/student/concepts');
  };

  // Extract unique subjects for filter
  const subjects = Array.from(new Set(allConceptCards.map(card => card.subject)));

  return (
    <SharedPageLayout
      title="All Concept Cards"
      subtitle="Browse all your concept cards"
    >
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 flex items-center gap-1"
          onClick={handleBackToSection}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Concepts</span>
        </Button>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {filteredConcepts.map(concept => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ConceptCard concept={concept} />
            </motion.div>
          ))}
        </motion.div>

        {filteredConcepts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg font-medium">No concept cards found</p>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </SharedPageLayout>
  );
};

export default ConceptsAllPage;
