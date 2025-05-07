
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowLeft, Clock, Radio, RadioIcon, Timer } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock exam data
const mockExamDetails = {
  id: 1,
  title: "Physics Mock Test #1",
  subject: "Physics",
  topics: ["Mechanics", "Optics", "Waves"],
  questionCount: 30,
  timeLimit: 60,
  difficulty: "medium",
  instructions: [
    "Read each question carefully before answering.",
    "Each question has only one correct answer.",
    "There is no negative marking for wrong answers.",
    "You can mark questions for review and return to them later.",
    "The exam will be automatically submitted when the time limit is reached."
  ],
  questions: [
    {
      id: 1,
      question: "A body of mass m is thrown vertically upward with an initial velocity v. The work done by the gravitational force during the ascent of the body is:",
      options: [
        "mgv",
        "-mgv",
        "mgv²/2",
        "-mgv²/2"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "When a ray of light passes from a denser to a rarer medium, which of the following changes?",
      options: [
        "Frequency",
        "Wavelength",
        "Speed",
        "Both wavelength and speed"
      ],
      correctAnswer: 3
    },
    {
      id: 3,
      question: "The principle of superposition of waves is applicable to:",
      options: [
        "Only mechanical waves",
        "Only electromagnetic waves",
        "Both mechanical and electromagnetic waves",
        "Neither mechanical nor electromagnetic waves"
      ],
      correctAnswer: 2
    }
    // More questions would be here in a real app
  ]
};

const ExamStartPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  
  const exam = mockExamDetails; // In a real app, fetch exam by ID
  
  const handleBackToDashboard = () => {
    navigate('/dashboard/student/practice-exam');
  };
  
  const handleStartExam = () => {
    setExamStarted(true);
    // Start timer in a real app
  };
  
  const handleSelectAnswer = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleMarkForReview = () => {
    if (markedForReview.includes(currentQuestion)) {
      setMarkedForReview(markedForReview.filter(q => q !== currentQuestion));
    } else {
      setMarkedForReview([...markedForReview, currentQuestion]);
    }
  };
  
  const handleSubmitExam = () => {
    toast({
      title: "Exam Submitted",
      description: "Your answers have been recorded and are being processed.",
    });
    navigate(`/dashboard/student/exams/${id}/review`);
  };
  
  const isMarkedForReview = markedForReview.includes(currentQuestion);
  const isAnswered = answers[currentQuestion] !== undefined;
  
  return (
    <SharedPageLayout
      title={exam.title}
      subtitle={`${exam.subject} • ${exam.questionCount} questions • ${exam.timeLimit} minutes`}
      showQuickAccess={false}
    >
      {!examStarted ? (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-2 flex items-center gap-1"
                  onClick={handleBackToDashboard}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Exams</span>
                </Button>
                <CardTitle>{exam.title}</CardTitle>
                <CardDescription className="mt-1 flex flex-wrap gap-2">
                  {exam.topics.map((topic, index) => (
                    <Badge key={index} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </CardDescription>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{exam.timeLimit} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={exam.difficulty === "hard" ? "destructive" : exam.difficulty === "medium" ? "default" : "outline"}>
                    {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)} Difficulty
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Exam Instructions</h3>
                <ul className="space-y-2 list-disc pl-5">
                  {exam.instructions.map((instruction, index) => (
                    <li key={index} className="text-muted-foreground">{instruction}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  <h4 className="font-medium">Important Note</h4>
                </div>
                <p className="mt-1 text-sm text-yellow-700">
                  Once you start the exam, the timer cannot be paused. Make sure you have sufficient time to complete the exam.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" onClick={handleStartExam}>
              Start Exam Now
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm py-2 px-4 z-10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium">{exam.title}</span>
              <Badge variant="outline">Question {currentQuestion + 1}/{exam.questions.length}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-500" />
              <span className="font-medium">59:32</span> {/* This would be a real timer in a production app */}
            </div>
          </div>
          
          <div className="pt-14">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {currentQuestion + 1}
                  {isMarkedForReview && (
                    <Badge className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200">Marked for Review</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{exam.questions[currentQuestion].question}</p>
                
                <RadioGroup 
                  value={answers[currentQuestion]?.toString()} 
                  onValueChange={(value) => handleSelectAnswer(parseInt(value))}
                >
                  {exam.questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleMarkForReview}
                  >
                    {isMarkedForReview ? "Unmark for Review" : "Mark for Review"}
                  </Button>
                </div>
                <div className="flex gap-2">
                  {currentQuestion < exam.questions.length - 1 ? (
                    <Button onClick={handleNextQuestion}>Next</Button>
                  ) : (
                    <Button onClick={handleSubmitExam}>Submit Exam</Button>
                  )}
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {exam.questions.map((_, index) => (
                    <Button 
                      key={index}
                      variant={answers[index] !== undefined ? "default" : "outline"}
                      size="sm"
                      className={`w-10 h-10 p-0 ${
                        markedForReview.includes(index) ? "ring-2 ring-yellow-500" : ""
                      } ${
                        currentQuestion === index ? "border-2 border-black" : ""
                      }`}
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border rounded"></div>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-yellow-500 ring-2 ring-yellow-500 rounded"></div>
                    <span>Marked for Review</span>
                  </div>
                </div>
                <Button 
                  variant="destructive"
                  onClick={handleSubmitExam}
                >
                  Submit Exam
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </SharedPageLayout>
  );
};

export default ExamStartPage;
