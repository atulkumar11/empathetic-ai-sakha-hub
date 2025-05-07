
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  Play, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  PieChart,
  FileText, 
  BookOpen 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ExamDetailPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for the exam
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
      setExam({
        id: examId,
        title: 'JEE Advanced Physics Mock Test',
        subject: 'Physics',
        description: 'Comprehensive mock test covering mechanics, thermodynamics, electromagnetism, and modern physics topics for JEE Advanced preparation.',
        duration: 180, // minutes
        totalQuestions: 30,
        difficulty: 'Advanced',
        totalMarks: 90,
        attemptedCount: 2,
        bestScore: 76,
        lastScore: 69,
        lastAttemptDate: '2023-03-15',
        tags: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Modern Physics'],
        sections: [
          {
            name: 'Section A: Mechanics',
            questionCount: 10,
            correctAnswers: 7,
            incorrectAnswers: 2,
            unattempted: 1
          },
          {
            name: 'Section B: Thermodynamics',
            questionCount: 5,
            correctAnswers: 3,
            incorrectAnswers: 1,
            unattempted: 1
          },
          {
            name: 'Section C: Electromagnetism',
            questionCount: 10,
            correctAnswers: 6,
            incorrectAnswers: 3,
            unattempted: 1
          },
          {
            name: 'Section D: Modern Physics',
            questionCount: 5,
            correctAnswers: 4,
            incorrectAnswers: 1,
            unattempted: 0
          }
        ],
        topMistakes: [
          {
            question: 'A block of mass M is placed on a horizontal frictionless surface. A bullet of mass m strikes the block horizontally with velocity v and gets embedded in it. The final velocity of the system is:',
            correctAnswer: 'mv/(M+m)',
            yourAnswer: 'v',
            explanation: 'This is a perfectly inelastic collision. By conservation of momentum: mv = (M+m)V, where V is the final velocity. Solving for V: V = mv/(M+m)'
          },
          {
            question: 'A particle moves in a circle with a constant angular velocity. Which of the following statements is correct?',
            correctAnswer: 'The particle has a constant tangential velocity but varying acceleration.',
            yourAnswer: 'The particle has a constant tangential velocity and zero acceleration.',
            explanation: 'In circular motion with constant angular velocity, the tangential velocity is constant but there is a centripetal acceleration that is always directed toward the center of the circle.'
          },
          {
            question: 'The electric field inside a charged conducting sphere is:',
            correctAnswer: 'Zero',
            yourAnswer: 'Directly proportional to distance from center',
            explanation: 'The electric field inside a charged conductor is always zero in electrostatic conditions, regardless of the shape of the conductor.'
          }
        ],
        timeline: [
          { time: 30, questionsAnswered: 8 },
          { time: 60, questionsAnswered: 14 },
          { time: 90, questionsAnswered: 20 },
          { time: 120, questionsAnswered: 25 },
          { time: 150, questionsAnswered: 28 },
          { time: 180, questionsAnswered: 30 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [examId]);
  
  const handleStartExam = () => {
    // In a real app, this would navigate to an exam session
    navigate(`/dashboard/student/practice-exam/${examId}/session`);
    // For now, just show a console log
    console.log(`Starting exam: ${exam?.title}`);
  };
  
  if (loading) {
    return (
      <SharedPageLayout
        title="Loading Exam..."
        subtitle="Please wait while we prepare your practice test"
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (!exam) {
    return (
      <SharedPageLayout
        title="Exam Not Found"
        subtitle="The practice exam you're looking for doesn't exist or has been removed"
      >
        <Button 
          onClick={() => navigate('/dashboard/student/practice-exam')}
          className="mt-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Practice Exams
        </Button>
      </SharedPageLayout>
    );
  }

  // Calculate section stats
  const totalCorrect = exam.sections.reduce((acc: number, section: any) => acc + section.correctAnswers, 0);
  const totalIncorrect = exam.sections.reduce((acc: number, section: any) => acc + section.incorrectAnswers, 0);
  const totalUnattempted = exam.sections.reduce((acc: number, section: any) => acc + section.unattempted, 0);
  const accuracyPercentage = Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100);
  const completionPercentage = Math.round(((totalCorrect + totalIncorrect) / exam.totalQuestions) * 100);

  return (
    <SharedPageLayout
      title={exam.title}
      subtitle={`${exam.subject} • ${exam.totalQuestions} questions • ${exam.duration} mins`}
      showQuickAccess={false}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/dashboard/student/practice-exam')}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Practice Exams
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <CardTitle>{exam.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{exam.description}</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                {exam.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="text-2xl font-semibold mt-1">{exam.totalQuestions}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-2xl font-semibold mt-1">{exam.duration} min</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Marks</p>
                <p className="text-2xl font-semibold mt-1">{exam.totalMarks}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Best Score</p>
                <p className="text-2xl font-semibold mt-1">{exam.bestScore}%</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {exam.tags.map((tag: string, i: number) => (
                <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">{tag}</Badge>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Exam Sections</h3>
              <div className="space-y-4">
                {exam.sections.map((section: any, i: number) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{section.name}</h4>
                      <span className="text-sm text-muted-foreground">{section.questionCount} questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <span className="flex items-center text-green-600">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        {section.correctAnswers} correct
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {section.incorrectAnswers} incorrect
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-muted-foreground">
                        {section.unattempted} unattempted
                      </span>
                    </div>
                    <Progress 
                      value={(section.correctAnswers / section.questionCount) * 100}
                      className="h-2 mt-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 w-full md:w-auto"
              size="lg"
              onClick={handleStartExam}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Exam
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Accuracy</span>
                <span className="text-sm font-medium">{accuracyPercentage}%</span>
              </div>
              <Progress value={accuracyPercentage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Completion</span>
                <span className="text-sm font-medium">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Times Attempted</span>
                <span className="font-medium">{exam.attemptedCount}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Best Score</span>
                <span className="font-medium">{exam.bestScore}%</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Score</span>
                <span className="font-medium">{exam.lastScore}%</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Attempt</span>
                <span className="font-medium">{exam.lastAttemptDate}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Time</span>
                <span className="font-medium">154 min</span>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={() => setActiveTab('analysis')}
              >
                <BarChart3 className="h-4 w-4" />
                View Detailed Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mistakes">Top Mistakes</TabsTrigger>
          <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exam Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{exam.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-green-600">{totalCorrect}</div>
                  <p className="text-sm text-muted-foreground mt-1">Correct Answers</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-red-600">{totalIncorrect}</div>
                  <p className="text-sm text-muted-foreground mt-1">Incorrect Answers</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-yellow-600">{totalUnattempted}</div>
                  <p className="text-sm text-muted-foreground mt-1">Unattempted</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Time Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-lg font-medium">Average time per question</p>
                  <p className="text-4xl font-bold mt-2 text-blue-600">5.8 min</p>
                  <p className="text-sm text-muted-foreground mt-2">Ideal time: 4.5 min</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-lg font-medium">Your score</p>
                  <p className="text-4xl font-bold mt-2 text-purple-600">{exam.lastScore}%</p>
                  <p className="text-sm text-muted-foreground mt-2">Average score: 65%</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
              size="lg"
              onClick={handleStartExam}
            >
              <Play className="h-4 w-4 mr-2" />
              Start New Attempt
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="mistakes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Mistakes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {exam.topMistakes.map((mistake: any, i: number) => (
                  <div key={i} className="border rounded-lg p-6">
                    <h3 className="font-medium mb-4">Question {i+1}: {mistake.question}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">Your Answer:</p>
                        <p className="text-sm">{mistake.yourAnswer}</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">Correct Answer:</p>
                        <p className="text-sm">{mistake.correctAnswer}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Explanation:</p>
                      <p className="text-sm">{mistake.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                    Performance by Section
                  </h3>
                  <div className="space-y-4">
                    {exam.sections.map((section: any, i: number) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{section.name}</span>
                          <span className="text-sm font-medium">{Math.round((section.correctAnswers / section.questionCount) * 100)}%</span>
                        </div>
                        <Progress value={(section.correctAnswers / section.questionCount) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    Time Management
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Question Completion Timeline</span>
                    </div>
                    <div className="h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-lg relative">
                      {exam.timeline.map((point: any, i: number) => (
                        <div 
                          key={i} 
                          className="absolute bottom-0 bg-indigo-600 dark:bg-indigo-500 rounded-tl-sm rounded-tr-sm"
                          style={{
                            height: `${(point.questionsAnswered / exam.totalQuestions) * 100}%`, 
                            width: '8%',
                            left: `${(point.time / exam.duration) * 100 - 4}%`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 min</span>
                      <span>{exam.duration/2} min</span>
                      <span>{exam.duration} min</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => navigate('/dashboard/student/practice-exam')}
                  >
                    <FileText className="h-4 w-4" />
                    All Practice Tests
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2"
                    onClick={handleStartExam}
                  >
                    <Play className="h-4 w-4" />
                    Start New Attempt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default ExamDetailPage;
