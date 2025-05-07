
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import MainLayout from '@/components/layouts/MainLayout';
import {
  ArrowLeft, BookOpen, Book, Clock, Tag, MessageSquare, Volume, Volume2,
  VolumeX, Loader2, Brain, AlertTriangle, CheckCircle2, Lightbulb,
  TrendingUp, Activity, FileText, PenTool, ChevronRight, Star,
  Medal, BarChart, Users, Calendar, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  const [detailLevel, setDetailLevel] = useState<'basic' | 'detailed' | 'simplified' | 'advanced'>('basic');
  const [isReading, setIsReading] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setIsSpeechSupported(true);
    }

    // Stop speech when component unmounts
    return () => {
      if (speechSynthesisRef.current && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!isSpeechSupported) {
      toast({
        title: "Speech synthesis not supported",
        description: "Your browser doesn't support the speech synthesis API.",
        variant: "destructive"
      });
      return;
    }

    if (isReading) {
      // Stop reading
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsReading(false);
      }
    } else {
      // Start reading
      if (!conceptCard) return;

      // Get text based on active tab
      let textToRead = "";
      const activeTab = document.querySelector('[role="tabpanel"]:not([hidden])');
      
      if (activeTab) {
        textToRead = activeTab.textContent || "";
      } else {
        textToRead = `${conceptCard.title}. ${getContentByDetailLevel(detailLevel)}`;
      }

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // Slightly slower than default
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => {
        setIsReading(false);
        toast({
          title: "Error occurred",
          description: "There was a problem with the speech synthesis.",
          variant: "destructive"
        });
      };
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  // Navigate to study page
  const handleStudyClick = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/study`);
    toast({
      title: "Loading study materials",
      description: "Preparing your personalized learning experience",
    });
  };

  // Helper function to get content based on detail level
  const getContentByDetailLevel = (level: string) => {
    if (!conceptCard?.content) return "";
    switch (level) {
      case 'basic':
        return conceptCard.content.split('.').slice(0, 2).join('.') + '.';
      case 'detailed':
        return conceptCard.content;
      case 'simplified':
        return `Simplified explanation: ${conceptCard.content.split('.').slice(0, 1).join('.')}. This is the core idea.`;
      case 'advanced':
        return `Advanced explanation: ${conceptCard.content}. Additionally, this concept extends to more complex scenarios and has numerous applications in the field.`;
      default:
        return conceptCard.content;
    }
  };

  // Mock related content data
  const relatedFlashcards = [
    {
      id: 'flash-1',
      title: "Newton's First Law",
      subject: "Physics",
      difficulty: "Medium",
    },
    {
      id: 'flash-2',
      title: "Force and Acceleration",
      subject: "Physics",
      difficulty: "Hard",
    }
  ];

  const relatedExams = [
    {
      id: 'exam-1',
      title: "Physics Mechanics Quiz",
      questions: 15,
      estimatedTime: 30,
      difficulty: "Medium",
    }
  ];

  // Get learning timeline data
  const getLearningTimelineData = () => {
    if (!conceptCard) return [];
    
    return [
      {
        date: "2 weeks ago",
        event: "First studied",
        progress: 10,
      },
      {
        date: "10 days ago",
        event: "Quiz attempt",
        progress: 35,
      },
      {
        date: "1 week ago",
        event: "Practice session",
        progress: 55,
      },
      {
        date: "Yesterday",
        event: "Review session",
        progress: 75,
      }
    ];
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!conceptCard) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center h-64">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h1 className="text-xl font-semibold mb-2">Concept not found</h1>
            <p className="text-gray-600 mb-4">The concept you're looking for doesn't exist or has been removed.</p>
            <Link to="/dashboard/student/concepts">
              <Button>Back to all concepts</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="space-y-6">
          {/* Navigation */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <Link to="/dashboard/student/concepts" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-1">
                <ArrowLeft size={16} className="mr-1" /> Back to all concepts
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{conceptCard.title}</h1>
                <Badge 
                  variant={conceptCard.completed ? "outline" : "default"}
                  className="ml-2"
                >
                  {conceptCard.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className={isReading ? "bg-blue-50" : ""}
                onClick={toggleSpeech}
              >
                {isReading ? (
                  <>
                    <VolumeX className="mr-1 h-4 w-4" /> Stop Reading
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-1 h-4 w-4" /> Read Aloud
                  </>
                )}
              </Button>
              
              <Button 
                variant="default"
                size="sm" 
                onClick={() => {
                  toast({
                    title: "Concept marked as completed",
                    description: "Your progress has been updated!",
                  });
                }}
              >
                {conceptCard.completed ? (
                  <>
                    <CheckCircle2 className="mr-1 h-4 w-4" /> Completed
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-1 h-4 w-4" /> Mark as Complete
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Hero Card with Main Metrics and Study Button */}
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="p-6 md:p-8 grid md:grid-cols-4 gap-6">
              <div className="md:col-span-3 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {conceptCard.subject}
                  </Badge>
                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                    {conceptCard.chapter}
                  </Badge>
                  <Badge className={
                    conceptCard.difficulty?.toLowerCase() === 'easy' ? "bg-green-100 text-green-800 border-green-200" :
                    conceptCard.difficulty?.toLowerCase() === 'medium' ? "bg-amber-100 text-amber-800 border-amber-200" :
                    "bg-red-100 text-red-800 border-red-200"
                  }>
                    {conceptCard.difficulty} Difficulty
                  </Badge>
                </div>

                <p className="text-lg text-gray-700 dark:text-gray-300">{conceptCard.description}</p>

                <div className="flex flex-wrap gap-3 mt-2">
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">~{conceptCard.estimatedTime || 20} mins</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">High exam relevance</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm">
                    <Activity className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Foundation concept</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                    onClick={handleStudyClick}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Study Now
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Ask AI Tutor
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                  Learning Stats
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Mastery Level</span>
                      <span className="text-sm font-medium">{conceptCard.recallAccuracy || 65}%</span>
                    </div>
                    <Progress value={conceptCard.recallAccuracy || 65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Quiz Performance</span>
                      <span className="text-sm font-medium">{conceptCard.quizScore || 72}%</span>
                    </div>
                    <Progress value={conceptCard.quizScore || 72} className="h-2 bg-gray-200 [&>*]:bg-purple-500" />
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Last studied: Yesterday</span>
                      <span>Study streak: 4 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="explanation" className="mt-8">
            <TabsList className="grid w-full grid-cols-4 rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
              <TabsTrigger value="explanation" className="rounded-lg">Explanation</TabsTrigger>
              <TabsTrigger value="examples" className="rounded-lg">Examples</TabsTrigger>
              <TabsTrigger value="mistakes" className="rounded-lg">Common Mistakes</TabsTrigger>
              <TabsTrigger value="exam-relevance" className="rounded-lg">Exam Relevance</TabsTrigger>
            </TabsList>
            
            {/* Explanation Tab */}
            <TabsContent value="explanation" className="mt-4">
              <Card>
                <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Explanation</CardTitle>
                    <Tabs value={detailLevel} onValueChange={(v) => setDetailLevel(v as any)}>
                      <TabsList className="bg-gray-100 dark:bg-gray-800">
                        <TabsTrigger value="basic" className="text-xs">Basic</TabsTrigger>
                        <TabsTrigger value="detailed" className="text-xs">Detailed</TabsTrigger>
                        <TabsTrigger value="simplified" className="text-xs">Simplified</TabsTrigger>
                        <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{getContentByDetailLevel(detailLevel)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Real World Examples Tab */}
            <TabsContent value="examples" className="mt-4">
              <Card>
                <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardTitle className="text-xl">Real World Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert">
                    {conceptCard.examples && conceptCard.examples.length > 0 ? (
                      <ul className="space-y-4">
                        {conceptCard.examples.map((example, index) => (
                          <li key={index} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50">
                            <div className="flex gap-3">
                              <div className="bg-blue-100 dark:bg-blue-800 p-2 h-8 w-8 rounded-full flex items-center justify-center">
                                <span className="font-medium text-blue-700 dark:text-blue-300">{index + 1}</span>
                              </div>
                              <p>{example}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center py-6">No examples available for this concept.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Common Mistakes Tab */}
            <TabsContent value="mistakes" className="mt-4">
              <Card>
                <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardTitle className="text-xl">Common Mistakes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert">
                    {conceptCard.commonMistakes && conceptCard.commonMistakes.length > 0 ? (
                      <ul className="space-y-4">
                        {conceptCard.commonMistakes.map((mistake, index) => (
                          <li key={index} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/50">
                            <div className="flex gap-3">
                              <div className="bg-red-100 dark:bg-red-800 p-2 h-8 w-8 rounded-full flex items-center justify-center">
                                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-300" />
                              </div>
                              <p>{mistake}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center py-6">No common mistakes listed for this concept.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Exam Relevance Tab */}
            <TabsContent value="exam-relevance" className="mt-4">
              <Card>
                <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <CardTitle className="text-xl">Exam Relevance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert">
                    {conceptCard.examRelevance ? (
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900/50">
                        <div className="flex gap-3">
                          <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                            <Brain className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                          </div>
                          <p>{conceptCard.examRelevance}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-6">No exam relevance information available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Concept Mastery Analysis */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-blue-600" />
              Concept Mastery Analysis
            </h2>
            <Card className="overflow-hidden border shadow-md">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Recall Accuracy</h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-1">
                      <div className="bg-green-500 h-4 rounded-full" style={{ width: `${conceptCard.recallAccuracy || 65}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Last tested: 3 days ago</span>
                      <span>{conceptCard.recallAccuracy || 65}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Quiz Performance</h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-1">
                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${conceptCard.quizScore || 72}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Questions attempted: 15</span>
                      <span>{conceptCard.quizScore || 72}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Learning Journey Timeline</h3>
                <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border p-4 mb-4">
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-full flex items-center">
                      <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    
                    <div className="relative z-10 flex justify-between">
                      {getLearningTimelineData().map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${
                            index === getLearningTimelineData().length - 1 
                              ? 'bg-green-500 ring-4 ring-green-100 dark:ring-green-900/20' 
                              : 'bg-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/20'
                          }`}></div>
                          <div className="mt-2 text-center">
                            <p className="text-xs font-medium">{item.event}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border p-4">
                  <h3 className="font-medium flex items-center mb-2 text-gray-700 dark:text-gray-300">
                    <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                    AI Learning Insights
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This concept appears to be well-understood, but periodic review is recommended to maintain recall accuracy. 
                    Your quiz performance shows strong comprehension with room for improvement in application questions.
                    We suggest revisiting this concept in 3 days to maintain optimal retention.
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Related Content Grid: Flashcards, Exams, and Related Concepts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Related Flashcards Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  Related Flashcards
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                {relatedFlashcards.length > 0 ? (
                  <div className="space-y-3">
                    {relatedFlashcards.map((flashcard) => (
                      <div 
                        key={flashcard.id} 
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg border hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer transition-colors"
                        onClick={() => navigate(`/dashboard/student/flashcards/${flashcard.id}/interactive`)}
                      >
                        <h4 className="font-medium">{flashcard.title}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline">{flashcard.subject}</Badge>
                          <Badge className={
                            flashcard.difficulty === 'Easy' ? "bg-green-100 text-green-800 border-green-200" :
                            flashcard.difficulty === 'Medium' ? "bg-amber-100 text-amber-800 border-amber-200" :
                            "bg-red-100 text-red-800 border-red-200"
                          }>
                            {flashcard.difficulty}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-6">No related flashcards available.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/dashboard/student/flashcards')}
                >
                  View All Flashcards
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Related Practice Exams Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PenTool className="mr-2 h-5 w-5 text-purple-600" />
                  Practice Exams
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                {relatedExams.length > 0 ? (
                  <div className="space-y-3">
                    {relatedExams.map((exam) => (
                      <div 
                        key={exam.id} 
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg border hover:border-purple-200 dark:hover:border-purple-800 cursor-pointer transition-colors"
                        onClick={() => navigate(`/dashboard/student/practice-exam/${exam.id}/start`)}
                      >
                        <h4 className="font-medium">{exam.title}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{exam.estimatedTime} min • {exam.questions} questions</span>
                          </div>
                          <Badge className={
                            exam.difficulty === 'Easy' ? "bg-green-100 text-green-800 border-green-200" :
                            exam.difficulty === 'Medium' ? "bg-amber-100 text-amber-800 border-amber-200" :
                            "bg-red-100 text-red-800 border-red-200"
                          }>
                            {exam.difficulty}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-6">No related practice exams available.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/dashboard/student/practice-exam')}
                >
                  View All Practice Exams
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Related Concepts Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-green-600" />
                  Related Concepts
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                {conceptCard.relatedConcepts && conceptCard.relatedConcepts.length > 0 ? (
                  <div className="space-y-3">
                    {conceptCard.relatedConcepts.map((relatedId) => (
                      <div 
                        key={relatedId} 
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg border hover:border-green-200 dark:hover:border-green-800 cursor-pointer transition-colors"
                        onClick={() => navigate(`/dashboard/student/concepts/card/${relatedId}`)}
                      >
                        <h4 className="font-medium">
                          {relatedId === 'c1' ? "Newton's Third Law of Motion" : 
                           relatedId === 'c4' ? "Integration by Parts" : 
                           relatedId === 'c7' ? "Organic Chemistry Nomenclature" : 
                           `Related Concept ${relatedId}`}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline">
                            {relatedId.includes('c1') ? "Physics" : 
                             relatedId.includes('c4') ? "Mathematics" : 
                             relatedId.includes('c7') ? "Chemistry" : 
                             "Subject"}
                          </Badge>
                          <div className="flex text-xs text-gray-500">
                            <GraduationCap className="h-3.5 w-3.5 mr-1" />
                            <span>Foundation</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-6">No related concepts available.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/dashboard/student/concepts')}
                >
                  Explore More Concepts
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Learn More CTA */}
          <div className="mt-8">
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Master this concept completely</h3>
                    <p className="opacity-90">Practice with interactive exercises and receive personalized guidance</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      onClick={handleStudyClick}
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      Study Now
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-transparent text-white hover:text-indigo-600"
                      onClick={() => navigate('/dashboard/student/tutor')}
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Ask Tutor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConceptCardDetailPage;
