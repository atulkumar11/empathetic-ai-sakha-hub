
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Check, 
  X, 
  Flag, 
  HelpCircle, 
  BookOpen, 
  Repeat, 
  FileText 
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'subjective';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  concept: {
    id: string;
    title: string;
  };
  subject: string;
  topic: string;
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: Question[];
}

interface ExamResult {
  examId: string;
  answers: Record<string, string>;
  flaggedQuestions: string[];
  doubtQuestions: string[];
  timeSpent: number;
  score?: number;
  submittedAt?: string;
}

const ExamReview = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);
  
  // Mock exam data - in a real app this would come from an API
  const mockExam: ExamData = {
    id: id || 'exam-001',
    title: 'Integration Techniques',
    subject: 'Mathematics',
    duration: 60,
    questions: Array(10).fill(null).map((_, i) => ({
      id: `q-${i}`,
      text: `Question ${i+1}: ${i % 2 === 0 ? 
        'What is the integral of x^2?' : 
        'Solve the following differential equation: dy/dx = 2x'}`,
      type: i % 3 === 0 ? 'subjective' : 'mcq',
      options: i % 3 === 0 ? undefined : [
        'Option A: Some answer here',
        'Option B: Another potential answer',
        'Option C: Yet another option',
        'Option D: Final possible answer'
      ],
      correctAnswer: i % 3 === 0 ? 'x^3/3 + C' : 'Option C: Yet another option',
      explanation: `The answer is ${i % 3 === 0 ? 'x^3/3 + C' : 'Option C'} because ${
        i % 3 === 0 ? 
          'when integrating x^n, you add 1 to the exponent and divide by the new exponent: ∫x^n dx = x^(n+1)/(n+1) + C' : 
          'of the specific properties related to this question'
      }`,
      concept: {
        id: `concept-${i % 4}`,
        title: ['Basic Integration', 'Differential Equations', 'Integration by Parts', 'Substitution Methods'][i % 4]
      },
      subject: 'Mathematics',
      topic: ['Calculus', 'Algebra', 'Trigonometry', 'Statistics'][i % 4]
    }))
  };
  
  // Load exam results from localStorage for demo purposes
  useEffect(() => {
    setExamData(mockExam);
    
    const savedResult = localStorage.getItem(`exam_result_${id}`);
    if (savedResult) {
      const parsedResult = JSON.parse(savedResult) as ExamResult;
      
      // Calculate score
      let correctCount = 0;
      Object.entries(parsedResult.answers).forEach(([questionId, answer]) => {
        const question = mockExam.questions.find(q => q.id === questionId);
        if (question && answer === question.correctAnswer) {
          correctCount++;
        }
      });
      
      const score = Math.round((correctCount / mockExam.questions.length) * 100);
      
      setResult({
        ...parsedResult,
        score,
        submittedAt: new Date().toISOString()
      });
    } else {
      // If no result exists, create a mock result
      const mockAnswers: Record<string, string> = {};
      const mockFlagged: string[] = [];
      const mockDoubts: string[] = [];
      
      mockExam.questions.forEach((q, i) => {
        // Simulate some correct and incorrect answers
        if (i % 3 !== 0) {
          mockAnswers[q.id] = i % 2 === 0 ? q.correctAnswer : q.options?.[0] || 'Wrong answer';
        }
        
        // Simulate some flagged and doubt questions
        if (i % 5 === 0) mockFlagged.push(q.id);
        if (i % 7 === 0) mockDoubts.push(q.id);
      });
      
      const correctCount = mockExam.questions.filter((q, i) => 
        i % 3 !== 0 && i % 2 === 0
      ).length;
      
      const score = Math.round((correctCount / mockExam.questions.length) * 100);
      
      setResult({
        examId: mockExam.id,
        answers: mockAnswers,
        flaggedQuestions: mockFlagged,
        doubtQuestions: mockDoubts,
        timeSpent: 2100, // 35 minutes in seconds
        score,
        submittedAt: new Date().toISOString()
      });
    }
  }, [id]);
  
  if (!examData || !result) {
    return <div className="container py-6">Loading...</div>;
  }
  
  // Calculate metrics
  const answeredQuestions = Object.keys(result.answers).length;
  const correctAnswers = examData.questions.filter(q => 
    result.answers[q.id] === q.correctAnswer
  ).length;
  const incorrectAnswers = answeredQuestions - correctAnswers;
  const unansweredQuestions = examData.questions.length - answeredQuestions;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Prepare data for charts
  const subjectPerformance = examData.questions.reduce((acc, q) => {
    const isCorrect = result.answers[q.id] === q.correctAnswer;
    if (!acc[q.subject]) {
      acc[q.subject] = { correct: 0, incorrect: 0, total: 0 };
    }
    if (result.answers[q.id]) {
      if (isCorrect) acc[q.subject].correct++;
      else acc[q.subject].incorrect++;
    }
    acc[q.subject].total++;
    return acc;
  }, {} as Record<string, { correct: number; incorrect: number; total: number }>);
  
  const topicPerformance = examData.questions.reduce((acc, q) => {
    const isCorrect = result.answers[q.id] === q.correctAnswer;
    if (!acc[q.topic]) {
      acc[q.topic] = { correct: 0, incorrect: 0, total: 0, name: q.topic };
    }
    if (result.answers[q.id]) {
      if (isCorrect) acc[q.topic].correct++;
      else acc[q.topic].incorrect++;
    }
    acc[q.topic].total++;
    return acc;
  }, {} as Record<string, { correct: number; incorrect: number; total: number; name: string }>);
  
  const topicChartData = Object.values(topicPerformance).map(topic => ({
    name: topic.name,
    score: topic.total > 0 ? Math.round((topic.correct / topic.total) * 100) : 0
  }));
  
  const pieData = [
    { name: 'Correct', value: correctAnswers, color: '#10b981' },
    { name: 'Incorrect', value: incorrectAnswers, color: '#ef4444' },
    { name: 'Unanswered', value: unansweredQuestions, color: '#6b7280' }
  ].filter(item => item.value > 0);
  
  // Identify weak areas (topics with < 60% correct)
  const weakAreas = Object.entries(topicPerformance)
    .filter(([_, data]) => (data.correct / data.total) < 0.6)
    .map(([topic, data]) => ({
      topic,
      score: Math.round((data.correct / data.total) * 100)
    }));
  
  return (
    <div className="container py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{examData.title} - Results</h1>
          <p className="text-muted-foreground">Completed {result.submittedAt ? new Date(result.submittedAt).toLocaleDateString() : 'recently'}</p>
        </div>
        
        <div className="mt-3 md:mt-0">
          <Link to={`/dashboard/student/practice-exam/${id}/start`}>
            <Button>
              <Repeat className="h-4 w-4 mr-2" />
              Retake Exam
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Score Card */}
      <Card className="mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-950 dark:to-indigo-950 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Your Performance</h2>
              <p className="text-muted-foreground">{examData.subject}</p>
            </div>
            
            <div className="mt-3 md:mt-0 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 text-center">
              <h3 className="text-sm text-muted-foreground">Score</h3>
              <p className="text-2xl font-bold">{result.score}%</p>
            </div>
          </div>
        </div>
        
        <CardContent className="py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Time Spent</p>
              <p className="font-medium">{formatTime(result.timeSpent)} / {examData.duration} min</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
              <p className="font-medium text-green-600">{correctAnswers} / {examData.questions.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Incorrect Answers</p>
              <p className="font-medium text-red-600">{incorrectAnswers}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unanswered</p>
              <p className="font-medium text-gray-600">{unansweredQuestions}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Analysis Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
          <TabsTrigger value="improvement">Improvement Plan</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Topic Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Topic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topicChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                  <h3 className="font-medium">Revise Weak Concepts</h3>
                  <p className="text-sm text-muted-foreground mt-2 mb-4">
                    Focus on improving areas where you scored below 60%
                  </p>
                  <Button variant="outline" className="w-full">View Weak Areas</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <FileText className="h-8 w-8 text-amber-500 mb-2" />
                  <h3 className="font-medium">Practice Flashcards</h3>
                  <p className="text-sm text-muted-foreground mt-2 mb-4">
                    Review key concepts with targeted flashcards
                  </p>
                  <Button variant="outline" className="w-full">Start Flashcards</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Repeat className="h-8 w-8 text-green-500 mb-2" />
                  <h3 className="font-medium">Retry Missed Questions</h3>
                  <p className="text-sm text-muted-foreground mt-2 mb-4">
                    Focus only on questions you got wrong
                  </p>
                  <Button variant="outline" className="w-full">Practice Missed Questions</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Questions Tab */}
        <TabsContent value="questions" className="space-y-6 mt-6">
          {examData.questions.map((question, index) => {
            const userAnswer = result.answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const isAnswered = userAnswer !== undefined;
            const isFlagged = result.flaggedQuestions.includes(question.id);
            const hasDoubt = result.doubtQuestions.includes(question.id);
            
            return (
              <Card key={question.id} className={`border-l-4 ${
                !isAnswered ? 'border-l-gray-500' :
                isCorrect ? 'border-l-green-500' : 'border-l-red-500'
              }`}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      Question {index + 1}
                      {!isAnswered && (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
                          Skipped
                        </Badge>
                      )}
                      {isAnswered && (
                        isCorrect ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" /> Correct
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800">
                            <X className="h-3 w-3 mr-1" /> Incorrect
                          </Badge>
                        )
                      )}
                      {isFlagged && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          <Flag className="h-3 w-3 mr-1" /> Flagged
                        </Badge>
                      )}
                      {hasDoubt && (
                        <Badge variant="outline" className="bg-purple-100 text-purple-800">
                          <HelpCircle className="h-3 w-3 mr-1" /> Had Doubt
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {question.subject} · {question.topic}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{question.text}</p>
                  
                  {question.type === 'mcq' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, i) => (
                        <div 
                          key={i} 
                          className={`p-3 rounded-md ${
                            option === question.correctAnswer ? 
                              'bg-green-50 border border-green-200 text-green-800' : 
                            option === userAnswer ? 
                              'bg-red-50 border border-red-200 text-red-800' : 
                              'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {option}
                          {option === question.correctAnswer && <span className="ml-2 text-green-600">✓ Correct Answer</span>}
                          {option === userAnswer && option !== question.correctAnswer && <span className="ml-2 text-red-600">✗ Your Answer</span>}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'subjective' && (
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <h4 className="font-medium mb-1">Correct Answer:</h4>
                        <p>{question.correctAnswer}</p>
                      </div>
                      
                      {userAnswer && (
                        <div className={`p-3 rounded-md ${
                          isCorrect ? 
                            'bg-green-50 border border-green-200 text-green-800' :
                            'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                          <h4 className="font-medium mb-1">Your Answer:</h4>
                          <p>{userAnswer}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-blue-800 flex items-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4" />
                      Explanation:
                    </h4>
                    <p className="text-blue-800">{question.explanation}</p>
                  </div>
                  
                  <div>
                    <Link to={`/dashboard/student/concepts/${question.concept.id}`}>
                      <Button variant="outline" size="sm">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Study "{question.concept.title}" Concept
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
        
        {/* Concepts Tab */}
        <TabsContent value="concepts" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from(new Set(examData.questions.map(q => q.concept.id))).map((conceptId) => {
              const concept = examData.questions.find(q => q.concept.id === conceptId)?.concept;
              const relatedQuestions = examData.questions.filter(q => q.concept.id === conceptId);
              const answeredQuestions = relatedQuestions.filter(q => result.answers[q.id]);
              const correctQuestions = relatedQuestions.filter(q => result.answers[q.id] === q.correctAnswer);
              const score = answeredQuestions.length > 0 
                ? Math.round((correctQuestions.length / answeredQuestions.length) * 100) 
                : 0;
              
              return (
                <Card key={conceptId}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{concept?.title}</span>
                      <Badge className={`${
                        score >= 80 ? 'bg-green-100 text-green-800' : 
                        score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {score}% Mastery
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={score} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Related Questions</p>
                        <p className="font-medium">{relatedQuestions.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Correct Answers</p>
                        <p className="font-medium">{correctQuestions.length} / {answeredQuestions.length}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {relatedQuestions.map((q, i) => {
                        const userAnswer = result.answers[q.id];
                        const isCorrect = userAnswer === q.correctAnswer;
                        const isAnswered = userAnswer !== undefined;
                        
                        return (
                          <div 
                            key={i}
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium ${
                              !isAnswered ? 'bg-gray-200 text-gray-800' :
                              isCorrect ? 'bg-green-200 text-green-800' : 
                              'bg-red-200 text-red-800'
                            }`}
                            title={`Question ${i + 1}: ${isAnswered ? (isCorrect ? 'Correct' : 'Incorrect') : 'Unanswered'}`}
                          >
                            {i + 1}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-between">
                      <Link to={`/dashboard/student/concepts/${conceptId}`}>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Study Concept
                        </Button>
                      </Link>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Practice Flashcards
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        {/* Improvement Tab */}
        <TabsContent value="improvement" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Improvement Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {weakAreas.length > 0 ? (
                <div>
                  <h3 className="font-medium mb-3">Areas to Focus On</h3>
                  <div className="space-y-4">
                    {weakAreas.map((area, i) => (
                      <div key={i} className="p-4 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-red-800">{area.topic}</h4>
                          <Badge variant="outline" className="bg-red-100 text-red-800">
                            {area.score}% Score
                          </Badge>
                        </div>
                        <p className="text-sm text-red-600 mt-1">
                          Review this topic thoroughly before your next exam.
                        </p>
                        <div className="mt-3">
                          <Button size="sm" variant="outline">
                            View Related Concepts
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="font-medium text-green-800 flex items-center gap-1">
                    <Check className="h-4 w-4" />
                    Great job! No weak areas detected.
                  </h3>
                  <p className="text-sm text-green-600 mt-1">
                    You're doing very well in all topics. Consider challenging yourself with more advanced material.
                  </p>
                </div>
              )}
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Recommended Study Plan</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-blue-800">Step 1: Concept Review</h4>
                    <p className="text-sm text-blue-600 mt-1 mb-3">
                      Start by refreshing your understanding of key concepts, especially in your weak areas.
                    </p>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-1" />
                      View Concept Map
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                    <h4 className="font-medium text-purple-800">Step 2: Targeted Practice</h4>
                    <p className="text-sm text-purple-600 mt-1 mb-3">
                      Practice with flashcards specifically created for your weak areas.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Start Flashcard Practice
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <h4 className="font-medium text-amber-800">Step 3: Retry Exam</h4>
                    <p className="text-sm text-amber-600 mt-1 mb-3">
                      After reviewing and practicing, retake the exam to measure your improvement.
                    </p>
                    <Link to={`/dashboard/student/practice-exam/${id}/start`}>
                      <Button variant="outline" size="sm">
                        <Repeat className="h-4 w-4 mr-1" />
                        Retake Exam
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamReview;
