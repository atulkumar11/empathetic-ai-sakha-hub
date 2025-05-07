
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Check, Clock, Star, Flag, Brain, BarChart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock data
const conceptCards = [
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
  }
];

// Filter concepts by time period
const filterConceptsByTimePeriod = (period: string) => {
  switch (period) {
    case "today":
      return conceptCards.filter(card => card.priority <= 2);
    case "week":
      return conceptCards.filter(card => card.priority <= 3);
    case "month":
      return conceptCards;
    default:
      return conceptCards;
  }
};

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
  concept: typeof conceptCards[0];
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

const ConceptCardsSection = () => {
  const [timePeriod, setTimePeriod] = useState("today");
  const [activeSubject, setActiveSubject] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [conceptForm, setConceptForm] = useState({
    subject: "physics",
    topic: "",
    title: "",
    description: "",
    difficulty: "medium",
    tags: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredConcepts = filterConceptsByTimePeriod(timePeriod);

  const handleViewAllConcepts = () => {
    navigate('/dashboard/student/concepts-all');
  };

  const handlePrioritize = () => {
    toast({
      title: "Concepts prioritized",
      description: "Your concept cards have been sorted by exam importance and relevance.",
    });
  };

  const handleAnalytics = () => {
    toast({
      title: "Concept Analytics",
      description: "Analyzing your concept card progress and completion patterns.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setConceptForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setConceptForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateConcept = () => {
    // Validation
    if (!conceptForm.title.trim() || !conceptForm.topic.trim() || !conceptForm.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send the data to the backend
    setShowCreateDialog(false);
    toast({
      title: "Concept Card Created",
      description: "Your new concept card has been added to your study plan.",
    });

    // Reset form
    setConceptForm({
      subject: "physics",
      topic: "",
      title: "",
      description: "",
      difficulty: "medium",
      tags: ""
    });
  };
  
  return (
    <motion.div 
      key="concepts"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="space-y-4">
        <Tabs defaultValue="today" value={timePeriod} onValueChange={setTimePeriod} className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="today" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                Today
              </TabsTrigger>
              <TabsTrigger value="week" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                This Week
              </TabsTrigger>
              <TabsTrigger value="month" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                This Month
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleViewAllConcepts}>
                <BookOpen className="h-4 w-4" />
                <span>View All</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handlePrioritize}>
                <Flag className="h-4 w-4" />
                <span className="hidden sm:inline">Prioritize</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleAnalytics}>
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </Button>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Create Concept</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Concept Card</DialogTitle>
                    <DialogDescription>
                      Generate a new concept card for your study plan.
                      <Badge className="ml-2 bg-violet-100 text-violet-800 border-violet-200">PRO</Badge>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select 
                        value={conceptForm.subject} 
                        onValueChange={(value) => handleSelectChange("subject", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic</Label>
                      <Input 
                        id="topic" 
                        placeholder="Enter topic"
                        value={conceptForm.topic}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Concept Title</Label>
                      <Input 
                        id="title" 
                        placeholder="Enter concept title"
                        value={conceptForm.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Enter concept description"
                        value={conceptForm.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select 
                        value={conceptForm.difficulty} 
                        onValueChange={(value) => handleSelectChange("difficulty", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input 
                        id="tags" 
                        placeholder="e.g., important, exam, revision"
                        value={conceptForm.tags}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateConcept}>Create Concept</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <TabsContent value="today" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConcepts.map(concept => (
                <ConceptCard key={concept.id} concept={concept} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConcepts.map(concept => (
                <ConceptCard key={concept.id} concept={concept} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConcepts.map(concept => (
                <ConceptCard key={concept.id} concept={concept} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ConceptCardsSection;
