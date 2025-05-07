
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import { 
  ChevronLeft, Book, BookOpen, Clock, Calendar, BookmarkPlus, Bookmark, 
  PenLine, Globe, Brain, BarChart2, RotateCw, Timer, Star, AlertCircle, 
  ArrowRight, Layers
} from 'lucide-react';
import { ConceptsPageLayout } from './ConceptsPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

// Import the Lightbulb icon from lucide-react
import { LucideIcon } from 'lucide-react';

// Create a Lightbulb icon component since it's not available in lucide-react by default
const Lightbulb: LucideIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="9" y1="18" x2="15" y2="18"></line>
      <line x1="10" y1="22" x2="14" y2="22"></line>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
    </svg>
  );
};

export const ConceptCardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { conceptCard, loading } = useConceptCardDetails(id || '');
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);

  // Function to navigate to the concept study page
  const handleStudyClick = () => {
    navigate(`/dashboard/student/concepts/${id}/study`);
    toast({
      title: "Loading study materials",
      description: "Preparing your personalized learning experience",
    });
  };

  // Function to mark concept as completed
  const handleMarkCompleted = () => {
    // In a real app, this would make an API call to update the status
    toast({
      title: "Concept marked as completed",
      description: "Your progress has been updated",
    });
  };

  // Function to toggle bookmark
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: isBookmarked ? 
        "This concept has been removed from your bookmarks" : 
        "You can find this concept in your bookmarks",
    });
  };

  // Function to save note
  const handleSaveNote = () => {
    setIsEditingNote(false);
    toast({
      title: "Note saved",
      description: "Your note has been saved to this concept",
    });
  };

  if (loading) {
    return (
      <ConceptsPageLayout>
        <div className="space-y-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </ConceptsPageLayout>
    );
  }

  if (!conceptCard) {
    return (
      <ConceptsPageLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Concept Card Not Found</h2>
          <p className="text-gray-600 mb-6">The concept card you're looking for doesn't exist or has been removed.</p>
          <Link to="/dashboard/student/concepts">
            <Button variant="outline">Go Back to Concepts</Button>
          </Link>
        </div>
      </ConceptsPageLayout>
    );
  }

  const getDifficultyClass = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };

  return (
    <ConceptsPageLayout>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/student/concepts')}
          className="group mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to All Concepts
        </Button>
        
        {/* Concept card header with bookmark option */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Book className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">{conceptCard.title}</h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="outline">{conceptCard.subject}</Badge>
                <Badge variant="outline">{conceptCard.chapter}</Badge>
                <Badge variant="outline" className={getDifficultyClass(conceptCard.difficulty)}>
                  {conceptCard.difficulty}
                </Badge>
                <Badge variant={conceptCard.completed ? "outline" : "default"}>
                  {conceptCard.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleToggleBookmark}
              className={isBookmarked ? "text-yellow-500 border-yellow-200" : ""}
            >
              {isBookmarked ? 
                <Bookmark className="h-5 w-5 fill-yellow-500" /> : 
                <BookmarkPlus className="h-5 w-5" />
              }
            </Button>
            
            {!conceptCard.completed && (
              <Button variant="default" onClick={handleMarkCompleted}>
                Mark as Completed
              </Button>
            )}
          </div>
        </div>
        
        {/* Concept card content */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg font-medium text-gray-700 mb-6">{conceptCard.description}</p>
              <div className="mt-8">{conceptCard.content}</div>
              
              {/* Real-world Applications section */}
              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-blue-800">
                  <Globe className="mr-2 h-5 w-5 text-blue-600" />
                  Real-world Applications
                </h3>
                <p className="text-blue-700 mb-4">
                  This concept is commonly applied in various real-world scenarios:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded shadow-sm border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-1">Technology</h4>
                    <p className="text-sm">Used in smartphone accelerometers to detect orientation changes</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-1">Medicine</h4>
                    <p className="text-sm">Applied in medical imaging equipment for precise movement control</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-1">Transportation</h4>
                    <p className="text-sm">Critical in vehicle safety systems and aircraft design</p>
                  </div>
                </div>
              </div>

              {/* Examples section */}
              {conceptCard.examples && conceptCard.examples.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Examples</h3>
                  <ul className="space-y-2">
                    {conceptCard.examples.map((example, index) => (
                      <li key={index} className="bg-blue-50 p-3 rounded-md">{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Common mistakes section */}
              {conceptCard.commonMistakes && conceptCard.commonMistakes.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Common Mistakes to Avoid</h3>
                  <ul className="space-y-2">
                    {conceptCard.commonMistakes.map((mistake, index) => (
                      <li key={index} className="bg-red-50 p-3 rounded-md">{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Exam relevance section */}
              {conceptCard.examRelevance && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Exam Relevance</h3>
                  <div className="bg-purple-50 p-4 rounded-md">
                    {conceptCard.examRelevance}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Concept Analysis Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center text-blue-800">
              <Brain className="mr-2 h-5 w-5 text-blue-600" />
              Learning Progress & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-gray-700 flex items-center">
                  <BarChart2 className="mr-1 h-4 w-4 text-blue-600" />
                  Performance Overview
                </h4>
                <div className="space-y-3 bg-white p-3 rounded-md shadow-sm">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Concept Mastery Score</span>
                      <span className="font-medium">{conceptCard.recallAccuracy || 65}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${conceptCard.recallAccuracy || 65}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1 text-gray-600">Based on quiz results and practice exercises</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy Rate</span>
                      <span className="font-medium">{conceptCard.quizScore || 72}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${conceptCard.quizScore || 72}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1 text-gray-600">First-attempt correct answers</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-gray-700 flex items-center">
                  <Timer className="mr-1 h-4 w-4 text-amber-600" />
                  Time & Recall
                </h4>
                <div className="space-y-3 bg-white p-3 rounded-md shadow-sm">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-600">First Studied</span>
                      <span className="font-medium">2 weeks ago</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Last Reviewed</span>
                      <span className="font-medium">Yesterday</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Avg. Time per Section</span>
                      <span className="font-medium">4.5 minutes</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Total Time Spent</span>
                      <span className="font-medium">45 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium mb-2 text-gray-700 flex items-center">
                  <RotateCw className="mr-1 h-4 w-4 text-indigo-600" />
                  Recall & Retention Tracking
                </h4>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div className="flex items-center mb-2 md:mb-0">
                      <span className="text-sm font-medium mr-2">Retention Score:</span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">78% Excellent</span>
                    </div>
                    <div className="flex items-center text-sm text-indigo-700">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Next scheduled review: Tomorrow</span>
                    </div>
                  </div>
                  <div className="relative pt-2">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div className="bg-blue-500 h-full w-2/12 rounded-l"></div>
                      <div className="bg-blue-300 h-full w-5/12"></div>
                      <div className="bg-blue-500 h-full w-3/12"></div>
                      <div className="bg-gray-300 h-full w-2/12 rounded-r"></div>
                    </div>
                    <div className="absolute -top-1 left-[16.6%]">
                      <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
                    </div>
                    <div className="absolute -top-1 left-[50%]">
                      <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
                    </div>
                    <div className="absolute -top-1 left-[83.3%]">
                      <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>First study<br/>2 weeks ago</span>
                    <span>Review #2<br/>1 week ago</span>
                    <span>Review #3<br/>3 days ago</span>
                    <span>Next review<br/>Tomorrow</span>
                  </div>
                  <div className="mt-3 text-sm">
                    <div className="flex items-center text-amber-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>Spaced repetition: Your recall success is improving with each review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-200">
              <h4 className="font-medium mb-3 text-gray-700 flex items-center">
                <Lightbulb className="mr-1 h-4 w-4 text-amber-500" />
                Smart Feedback & Recommendations
              </h4>
              <div className="bg-amber-50 p-3 rounded-md mb-3">
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-amber-500 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Based on your learning patterns, focus more time on the "Third Law Applications" section where your recall accuracy is lower.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <Button variant="outline" className="justify-start bg-white">
                  <Brain className="mr-2 h-4 w-4 text-violet-500" />
                  <div className="text-left">
                    <span className="block text-sm">Suggested Next</span>
                    <span className="block text-xs text-muted-foreground">Conservation of Momentum</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start bg-white">
                  <BookOpen className="mr-2 h-4 w-4 text-blue-500" />
                  <div className="text-left">
                    <span className="block text-sm">Practice Quiz</span>
                    <span className="block text-xs text-muted-foreground">Test your understanding</span>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Notes Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <PenLine className="mr-2 h-4 w-4" />
              Your Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditingNote ? (
              <div className="space-y-2">
                <Textarea 
                  placeholder="Add your personal notes about this concept..."
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditingNote(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveNote}>
                    Save Note
                  </Button>
                </div>
              </div>
            ) : userNote ? (
              <div>
                <div className="bg-muted/30 rounded-md p-3 text-sm mb-3 prose max-w-none">
                  {userNote}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setIsEditingNote(true)}
                >
                  <PenLine className="h-4 w-4 mr-2" />
                  Edit Note
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <PenLine className="h-16 w-16 mx-auto mb-3 text-muted-foreground opacity-30" />
                <p className="text-muted-foreground mb-4">You haven't added any notes yet</p>
                <Button onClick={() => setIsEditingNote(true)}>
                  <PenLine className="h-4 w-4 mr-2" />
                  Add Notes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Study Button - Enhanced UI */}
        <div className="flex justify-center mt-6">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            onClick={handleStudyClick}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            {conceptCard?.completed ? "Review Again" : "Start Learning"}
          </Button>
        </div>
          
        {/* Related concepts with smarter recommendations */}
        {conceptCard.relatedConcepts && conceptCard.relatedConcepts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
              <Layers className="mr-2 h-5 w-5 text-blue-600" />
              Recommended Related Concepts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {conceptCard.relatedConcepts.map((relatedId, index) => {
                // In a real app, we'd fetch actual related concept data
                const conceptMatchLevel = index === 0 ? "Strong" : index === 1 ? "Medium" : "Basic";
                const conceptMatchClass = index === 0 ? 
                  "bg-green-50 border-green-200 text-green-800" : 
                  index === 1 ? "bg-blue-50 border-blue-200 text-blue-800" : 
                  "bg-purple-50 border-purple-200 text-purple-800";
                
                return (
                  <Card key={relatedId} className="hover:shadow-md transition-shadow border-l-4 border-blue-500">
                    <CardContent className="p-4">
                      <Badge className={`mb-2 ${conceptMatchClass}`}>{conceptMatchLevel} connection</Badge>
                      <h4 className="font-medium mb-2">Related Concept #{relatedId}</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {index === 0 ? 
                          "Strongly related - explores direct applications of current concept" :
                          index === 1 ? 
                          "Builds upon principles covered in this concept" :
                          "Complementary topic that enhances understanding"
                        }
                      </p>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                        onClick={() => navigate(`/dashboard/student/concepts/card/${relatedId}`)}
                      >
                        <span>Explore Concept</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ConceptsPageLayout>
  );
};
