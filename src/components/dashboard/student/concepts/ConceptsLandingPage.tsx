
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Filter, Search, Clock, ChevronRight, ArrowRight } from "lucide-react";

// Sample data - in a real app, this would come from an API
const conceptData = [
  {
    id: '1',
    subject: 'Physics',
    topics: [
      { id: 'p1', title: 'Kinematics', difficulty: 'medium', progress: 65 },
      { id: 'p2', title: 'Newton\'s Laws of Motion', difficulty: 'hard', progress: 40 },
      { id: 'p3', title: 'Work, Energy and Power', difficulty: 'medium', progress: 25 }
    ]
  },
  {
    id: '2',
    subject: 'Chemistry',
    topics: [
      { id: 'c1', title: 'Chemical Bonding', difficulty: 'hard', progress: 30 },
      { id: 'c2', title: 'Periodic Table', difficulty: 'easy', progress: 80 },
      { id: 'c3', title: 'Organic Chemistry: Basics', difficulty: 'medium', progress: 55 }
    ]
  },
  {
    id: '3',
    subject: 'Mathematics',
    topics: [
      { id: 'm1', title: 'Calculus Integration', difficulty: 'hard', progress: 20 },
      { id: 'm2', title: 'Coordinate Geometry', difficulty: 'medium', progress: 75 },
      { id: 'm3', title: 'Probability', difficulty: 'easy', progress: 90 }
    ]
  }
];

const recentConcepts = [
  { id: 'r1', title: 'Electromagnetic Induction', subject: 'Physics', lastStudied: '2 days ago' },
  { id: 'r2', title: 'Chemical Equilibrium', subject: 'Chemistry', lastStudied: '3 days ago' },
  { id: 'r3', title: 'Differential Equations', subject: 'Mathematics', lastStudied: 'yesterday' }
];

const recommendedConcepts = [
  { id: 'rec1', title: 'Gravitation', subject: 'Physics', importance: 'High', difficultyLevel: 'Hard' },
  { id: 'rec2', title: 'Acids and Bases', subject: 'Chemistry', importance: 'Medium', difficultyLevel: 'Medium' },
  { id: 'rec3', title: 'Trigonometric Functions', subject: 'Mathematics', importance: 'High', difficultyLevel: 'Medium' }
];

// Difficulty color mapping
const difficultyColors = {
  easy: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  hard: 'bg-red-100 text-red-800 border-red-300',
};

const ConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleConceptCardClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Concept Cards</h1>
          <p className="text-gray-500 mt-1">Master key concepts and fundamentals</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search concepts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full md:w-[250px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Concepts</TabsTrigger>
          <TabsTrigger value="recent">Recently Studied</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="space-y-8">
            {conceptData.map((subject) => (
              <div key={subject.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{subject.subject}</h2>
                  <Button variant="ghost" className="text-sm flex items-center gap-1 text-blue-600">
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subject.topics.map((topic) => (
                    <Card 
                      key={topic.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleConceptCardClick(topic.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium">{topic.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-md ${difficultyColors[topic.difficulty as keyof typeof difficultyColors]}`}>
                            {topic.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${topic.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">{topic.progress}%</span>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full mt-4 text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50 group"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Study Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentConcepts.map((concept) => (
              <Card 
                key={concept.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleConceptCardClick(concept.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{concept.title}</h3>
                      <p className="text-sm text-gray-500">{concept.subject}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3 text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Last studied {concept.lastStudied}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50 group"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue Studying
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedConcepts.map((concept) => (
              <Card 
                key={concept.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleConceptCardClick(concept.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{concept.title}</h3>
                      <p className="text-sm text-gray-500">{concept.subject}</p>
                    </div>
                    <div>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                        {concept.importance}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3 justify-between">
                    <span className="text-sm text-gray-500">
                      Difficulty: {concept.difficultyLevel}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50 group"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptsLandingPage;
