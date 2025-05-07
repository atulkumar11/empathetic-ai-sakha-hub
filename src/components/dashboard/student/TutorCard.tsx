
import { useState } from "react";
import { Book, MessageSquare, ThumbsUp, ThumbsDown, Clock, Send, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface Answer {
  id: string;
  question: string;
  answer: string;
  format: "text" | "video" | "step-by-step";
  videoUrl?: string;
  feedbackGiven?: "helpful" | "not-helpful";
  timestamp: string;
}

export default function TutorCard() {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("physics");
  const [isLoading, setIsLoading] = useState(false);
  const [preferredFormat, setPreferredFormat] = useState<"text" | "video" | "step-by-step">("text");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { toast } = useToast();

  const handleAskQuestion = () => {
    if (!question.trim()) {
      toast({
        title: "Empty Question",
        description: "Please enter a question to ask the tutor.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate AI response delay
    setTimeout(() => {
      const newAnswer: Answer = {
        id: Date.now().toString(),
        question,
        answer: generateMockAnswer(subject, question, preferredFormat),
        format: preferredFormat,
        videoUrl: preferredFormat === "video" ? "https://example.com/mock-video" : undefined,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setAnswers(prev => [newAnswer, ...prev]);
      setQuestion("");
      setIsLoading(false);
      toast({
        title: "Question Answered",
        description: "Your tutor has provided an answer.",
      });
    }, 1500);
  };

  const generateMockAnswer = (subject: string, question: string, format: string) => {
    // Simple mock answers based on subject
    const baseAnswers = {
      physics: `For your question about "${question}", the physics principles involved are related to Newton's laws of motion. According to Newton's second law, force equals mass times acceleration (F=ma). This principle helps us understand how objects behave when forces are applied to them.`,
      chemistry: `Regarding your question on "${question}", this involves chemical reactions where electrons are transferred between atoms. When this happens, it creates ionic bonds which have different properties than covalent bonds.`,
      mathematics: `To solve "${question}", we need to apply algebraic principles. First, isolate the variables on one side of the equation, then solve step by step, ensuring each transformation maintains the equality.`,
      biology: `For your question about "${question}", this biological process is part of cellular respiration, which is how cells convert nutrients into energy. The mitochondria plays a key role in this process.`,
    };
    
    let answer = baseAnswers[subject as keyof typeof baseAnswers] || 
      `I'd be happy to help with your question: "${question}". Let me explain this concept in a simple way...`;
      
    // If format is step-by-step, add numbered steps
    if (format === "step-by-step") {
      answer = `Let me break down the answer to "${question}" into clear steps:\n\n` +
        `1. First, understand the core principle involved.\n` +
        `2. Identify the key variables and their relationships.\n` +
        `3. Apply the relevant formulas or methods.\n` +
        `4. Work through the calculations methodically.\n` +
        `5. Verify your answer makes sense in the given context.`;
    }
    
    return answer;
  };

  const handleFeedback = (answerId: string, feedback: "helpful" | "not-helpful") => {
    setAnswers(prev => prev.map(answer => 
      answer.id === answerId 
        ? { ...answer, feedbackGiven: feedback }
        : answer
    ));
    
    toast({
      title: feedback === "helpful" ? "Thank you for your feedback!" : "We'll improve our answer",
      description: feedback === "helpful" 
        ? "We're glad this answer was helpful" 
        : "We'll use your feedback to provide better answers in the future"
    });
  };

  const subjects = [
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "mathematics", label: "Mathematics" },
    { value: "biology", label: "Biology" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
    { value: "literature", label: "Literature" },
    { value: "computer-science", label: "Computer Science" },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-indigo-100 dark:border-indigo-900/30 shadow-md">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-blue-600">
                <AvatarImage src="/lovable-uploads/6bd65589-a748-4b63-a28b-12521c233a7e.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">24/7 AI Tutor</CardTitle>
            </div>
            <Badge variant="outline" className="bg-indigo-100/50 text-indigo-700 border-indigo-200">
              Always Available
            </Badge>
          </div>
          <CardDescription>
            Ask any academic question for instant help
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto p-4">
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Subject</label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.value} value={subject.value}>
                            {subject.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Answer Format</label>
                  <div className="flex space-x-2">
                    <Button 
                      variant={preferredFormat === "text" ? "default" : "outline"}
                      size="sm"
                      className={`flex-1 ${preferredFormat === "text" ? "bg-indigo-600" : ""}`}
                      onClick={() => setPreferredFormat("text")}
                    >
                      Text
                    </Button>
                    <Button 
                      variant={preferredFormat === "step-by-step" ? "default" : "outline"}
                      size="sm"
                      className={`flex-1 ${preferredFormat === "step-by-step" ? "bg-indigo-600" : ""}`}
                      onClick={() => setPreferredFormat("step-by-step")}
                    >
                      Step by Step
                    </Button>
                    <Button 
                      variant={preferredFormat === "video" ? "default" : "outline"}
                      size="sm"
                      className={`flex-1 ${preferredFormat === "video" ? "bg-indigo-600" : ""}`}
                      onClick={() => setPreferredFormat("video")}
                    >
                      Video
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <Textarea
                  placeholder="Type your question here... (e.g., How do I solve quadratic equations?)"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  className="resize-none border-indigo-200 focus:border-indigo-300"
                />
                <Button 
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                  onClick={handleAskQuestion}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Ask Question
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
            
            {answers.length > 0 && (
              <motion.div 
                className="space-y-4 pt-4 border-t border-border"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Your Answers</h3>
                  {answers.length > 1 && (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <ChevronLeft size={16} />
                      </Button>
                      <span className="text-sm text-gray-500">
                        {1}/{answers.length}
                      </span>
                      <Button variant="ghost" size="sm">
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {answers.map((answer) => (
                    <motion.div 
                      key={answer.id} 
                      className="border rounded-lg overflow-hidden shadow-sm"
                      variants={itemVariants}
                    >
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <div className="text-sm font-medium">
                          {answer.question}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={12} />
                          {answer.timestamp}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-900">
                        <div className="prose dark:prose-invert text-card-foreground max-w-none">
                          {answer.format === "text" || answer.format === "step-by-step" ? (
                            <div className="whitespace-pre-line">
                              {answer.answer.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                              ))}
                            </div>
                          ) : (
                            <div className="aspect-video bg-muted rounded flex items-center justify-center">
                              <div className="text-center">
                                <Book className="mx-auto mb-2" />
                                <p>Video explanation would appear here</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Was this answer helpful?
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className={answer.feedbackGiven === "helpful" ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" : ""}
                              onClick={() => handleFeedback(answer.id, "helpful")}
                              disabled={answer.feedbackGiven !== undefined}
                            >
                              <ThumbsUp size={16} className="mr-1" /> 
                              Helpful
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className={answer.feedbackGiven === "not-helpful" ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" : ""}
                              onClick={() => handleFeedback(answer.id, "not-helpful")}
                              disabled={answer.feedbackGiven !== undefined}
                            >
                              <ThumbsDown size={16} className="mr-1" /> 
                              Not helpful
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
