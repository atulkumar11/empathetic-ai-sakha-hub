
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Video, CheckCircle, MessageSquare, Star, ArrowLeft } from "lucide-react";

// Mock concept data for demonstration
const mockConcept = {
  id: "c1",
  title: "Newton's Laws of Motion",
  subject: "Physics",
  difficulty: "medium",
  importance: "high",
  masteryLevel: 65,
  description: "Understanding the fundamental laws that describe the relationship between forces acting on a body and its motion due to those forces.",
  explanations: [
    {
      title: "First Law (Law of Inertia)",
      content: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.",
      examples: [
        "A book resting on a table remains at rest until someone moves it.",
        "Passengers in a car tend to continue moving forward when the car suddenly stops."
      ]
    },
    {
      title: "Second Law (F = ma)",
      content: "The acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass.",
      examples: [
        "A heavier shopping cart requires more force to accelerate at the same rate as a lighter one.",
        "Rockets need powerful engines to achieve significant acceleration due to their large mass."
      ]
    },
    {
      title: "Third Law (Action-Reaction)",
      content: "For every action, there is an equal and opposite reaction.",
      examples: [
        "When you push against a wall, the wall pushes back against you with equal force.",
        "The thrust from a rocket engine propels the rocket forward as gases are expelled backward."
      ]
    }
  ],
  videos: [
    {
      id: "v1",
      title: "Introduction to Newton's Laws",
      duration: "8:45",
      thumbnail: "https://example.com/newton-thumbnail.jpg"
    },
    {
      id: "v2",
      title: "Real-world Applications of Newton's Laws",
      duration: "12:30",
      thumbnail: "https://example.com/newton-applications.jpg"
    }
  ],
  quizzes: [
    {
      id: "q1",
      title: "Basic Understanding Quiz",
      questions: 10,
      difficulty: "easy"
    },
    {
      id: "q2",
      title: "Advanced Applications Quiz",
      questions: 15,
      difficulty: "hard"
    }
  ],
  relatedConcepts: [
    {
      id: "rc1",
      title: "Forces and Free-body Diagrams"
    },
    {
      id: "rc2",
      title: "Momentum and Impulse"
    },
    {
      id: "rc3",
      title: "Circular Motion"
    }
  ]
};

const ConceptStudyPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("explanation");
  const concept = mockConcept; // In a real app, fetch concept by conceptId
  
  // Calculate mastery level color
  const getMasteryColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Calculate difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Calculate importance badge color
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-blue-100 text-blue-800 border-blue-200";
      case "low": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={concept.subject}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Header Card with Concept Overview */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <CardTitle>{concept.title}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge className={getDifficultyColor(concept.difficulty)}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
                </Badge>
                <Badge className={getImportanceColor(concept.importance)}>
                  {concept.importance.charAt(0).toUpperCase() + concept.importance.slice(1)} Importance
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{concept.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Mastery Level</span>
                <span className="text-sm font-medium">{concept.masteryLevel}%</span>
              </div>
              <Progress value={concept.masteryLevel} className={`h-2 ${getMasteryColor(concept.masteryLevel)}`} />
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                Study Now
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Video className="h-3.5 w-3.5" />
                Watch Videos
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                Take Quiz
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                Ask AI Tutor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>
          
          {/* Explanation Tab */}
          <TabsContent value="explanation" className="space-y-4">
            {concept.explanations.map((explanation, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle className="text-lg">{explanation.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">{explanation.content}</p>
                  
                  <div className="bg-muted p-3 rounded-md">
                    <h4 className="font-medium text-sm mb-2">Examples:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {explanation.examples.map((example, i) => (
                        <li key={i} className="text-sm">{example}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 dark:bg-gray-900/30 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Study More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.videos.map(video => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative">
                  {/* Video thumbnail would go here */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="default" size="icon" className="h-12 w-12 rounded-full">
                      <Video className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{video.title}</h3>
                    <Badge variant="outline">{video.duration}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.quizzes.map(quiz => (
              <Card key={quiz.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">{quiz.questions} questions</p>
                    </div>
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full">Start Quiz</Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          {/* Related Concepts Tab */}
          <TabsContent value="related" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Related Concepts</h3>
                <div className="space-y-3">
                  {concept.relatedConcepts.map(related => (
                    <div key={related.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900/20 rounded-md transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-amber-500" />
                        <span>{related.title}</span>
                      </div>
                      <ArrowLeft className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptStudyPage;
