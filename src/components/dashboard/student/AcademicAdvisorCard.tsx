
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Calendar, 
  Check, 
  Clock, 
  Compass, 
  GraduationCap, 
  Hourglass, 
  ListChecks, 
  Loader2, 
  PlusCircle, 
  Radio, 
  Star, 
  Target, 
  X 
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const AcademicAdvisorCard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("current");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [step, setStep] = useState(1);
  
  // Form state
  const [examGoal, setExamGoal] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [examDate, setExamDate] = useState("");
  const [studyStyle, setStudyStyle] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [allocatedHours, setAllocatedHours] = useState("2");
  
  // Arrays of predefined options
  const subjects = [
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "mathematics", label: "Mathematics" },
    { value: "biology", label: "Biology" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
    { value: "computer_science", label: "Computer Science" }
  ];
  
  const exams = [
    { value: "jee", label: "JEE Main" },
    { value: "jee_adv", label: "JEE Advanced" },
    { value: "neet", label: "NEET" },
    { value: "upsc", label: "UPSC" },
    { value: "cat", label: "CAT" },
    { value: "gate", label: "GATE" },
    { value: "gre", label: "GRE" },
    { value: "clat", label: "CLAT" }
  ];
  
  const studyStyles = [
    { value: "visual", label: "Visual (diagrams, charts)" },
    { value: "auditory", label: "Auditory (lectures, discussions)" },
    { value: "reading", label: "Reading and writing" },
    { value: "kinesthetic", label: "Kinesthetic (practical, hands-on)" }
  ];
  
  const timeSlots = [
    { value: "morning", label: "Early morning (5AM - 8AM)" },
    { value: "day", label: "Daytime (9AM - 4PM)" },
    { value: "evening", label: "Evening (5PM - 8PM)" },
    { value: "night", label: "Late night (9PM - 12AM)" }
  ];
  
  // Mock study plans
  const currentPlans = [
    {
      id: "plan1",
      title: "JEE Advanced Preparation",
      type: "Physics Focus",
      progress: 45,
      startDate: "2025-03-01",
      endDate: "2025-05-15",
      subjects: ["Physics", "Mathematics"],
      dailyHours: 3,
      isActive: true
    },
    {
      id: "plan2",
      title: "Chemistry Revision",
      type: "Organic Chemistry",
      progress: 20,
      startDate: "2025-04-01",
      endDate: "2025-04-30",
      subjects: ["Chemistry"],
      dailyHours: 2,
      isActive: true
    }
  ];
  
  const completedPlans = [
    {
      id: "plan3",
      title: "Mathematics Foundation",
      type: "Calculus Basics",
      progress: 100,
      startDate: "2025-01-15",
      endDate: "2025-02-28",
      subjects: ["Mathematics"],
      dailyHours: 2,
      isActive: false,
      grade: "A"
    }
  ];
  
  // Toggle strength in array
  const toggleStrength = (subject: string) => {
    if (strengths.includes(subject)) {
      setStrengths(strengths.filter(s => s !== subject));
    } else {
      setStrengths([...strengths, subject]);
    }
  };
  
  // Toggle weak subject in array
  const toggleWeakSubject = (subject: string) => {
    if (weakSubjects.includes(subject)) {
      setWeakSubjects(weakSubjects.filter(s => s !== subject));
    } else {
      setWeakSubjects([...weakSubjects, subject]);
    }
  };
  
  // Handle next step in the create plan flow
  const handleNextStep = () => {
    // Validation for each step
    if (step === 1 && !examGoal) {
      toast({
        title: "Missing Information",
        description: "Please select an exam goal to continue",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && strengths.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one strength subject",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 3 && weakSubjects.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one subject you need help with",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 4 && !examDate) {
      toast({
        title: "Missing Information",
        description: "Please select your exam date",
        variant: "destructive"
      });
      return;
    }
    
    setStep(step + 1);
  };
  
  // Handle previous step in the create plan flow
  const handlePrevStep = () => {
    setStep(Math.max(1, step - 1));
  };
  
  // Reset form state
  const resetForm = () => {
    setExamGoal("");
    setStrengths([]);
    setWeakSubjects([]);
    setExamDate("");
    setStudyStyle("");
    setPreferredTime("");
    setAllocatedHours("2");
    setStep(1);
  };
  
  // Open the create plan dialog
  const openCreatePlanDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };
  
  // Close the create plan dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  
  // Handle plan creation
  const handleCreatePlan = () => {
    if (!studyStyle || !preferredTime || !allocatedHours) {
      toast({
        title: "Missing Information",
        description: "Please complete all fields to create your study plan",
        variant: "destructive"
      });
      return;
    }
    
    setCreatingPlan(true);
    
    // Simulate API call
    setTimeout(() => {
      setCreatingPlan(false);
      setIsDialogOpen(false);
      
      toast({
        title: "Study Plan Created",
        description: "Your personalized study plan has been created successfully",
        variant: "default"
      });
      
      // You would typically fetch the updated list of plans from the API here
    }, 2000);
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Which exam are you preparing for?</Label>
              <p className="text-sm text-gray-500 mb-3">Select your target examination</p>
              
              <Select value={examGoal} onValueChange={setExamGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an exam" />
                </SelectTrigger>
                <SelectContent>
                  {exams.map(exam => (
                    <SelectItem key={exam.value} value={exam.value}>{exam.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">What are your strengths?</Label>
              <p className="text-sm text-gray-500 mb-3">Select subjects you're good at</p>
              
              <div className="grid grid-cols-2 gap-2">
                {subjects.map(subject => (
                  <Button
                    key={subject.value}
                    type="button"
                    variant={strengths.includes(subject.value) ? "default" : "outline"}
                    className={strengths.includes(subject.value) ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => toggleStrength(subject.value)}
                  >
                    {strengths.includes(subject.value) && <Check className="mr-1 h-4 w-4" />}
                    {subject.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">What subjects do you need help with?</Label>
              <p className="text-sm text-gray-500 mb-3">Select subjects you find challenging</p>
              
              <div className="grid grid-cols-2 gap-2">
                {subjects.map(subject => (
                  <Button
                    key={subject.value}
                    type="button"
                    variant={weakSubjects.includes(subject.value) ? "default" : "outline"}
                    className={weakSubjects.includes(subject.value) ? "bg-amber-600 hover:bg-amber-700" : ""}
                    onClick={() => toggleWeakSubject(subject.value)}
                  >
                    {weakSubjects.includes(subject.value) && <Check className="mr-1 h-4 w-4" />}
                    {subject.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">When is your exam?</Label>
              <p className="text-sm text-gray-500 mb-3">Select the date of your examination</p>
              
              <Input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">What's your preferred study style?</Label>
              <p className="text-sm text-gray-500 mb-3">Select how you learn best</p>
              
              <Select value={studyStyle} onValueChange={setStudyStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select study style" />
                </SelectTrigger>
                <SelectContent>
                  {studyStyles.map(style => (
                    <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-base font-medium">When do you prefer to study?</Label>
              <p className="text-sm text-gray-500 mb-3">Select your preferred time of day</p>
              
              <Select value={preferredTime} onValueChange={setPreferredTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(slot => (
                    <SelectItem key={slot.value} value={slot.value}>{slot.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-base font-medium">How many hours can you study daily?</Label>
              <p className="text-sm text-gray-500 mb-3">Select realistic hours you can commit</p>
              
              <Select value={allocatedHours} onValueChange={setAllocatedHours}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="5">5+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-blue-500" size={24} />
              <CardTitle>Academic Advisor</CardTitle>
            </div>
            <Button 
              onClick={openCreatePlanDialog}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Study Plan
            </Button>
          </div>
          <CardDescription>Manage your personalized study plans</CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">
                <Radio className="mr-2 h-4 w-4 text-blue-600" />
                Current Plans ({currentPlans.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                <Check className="mr-2 h-4 w-4 text-green-600" />
                Completed Plans ({completedPlans.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="mt-4 space-y-4">
              {currentPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{plan.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{plan.type}</p>
                    </div>
                    <Badge>{plan.isActive ? "Active" : "Paused"}</Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="text-gray-500" size={16} />
                      <span>Started: {plan.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="text-gray-500" size={16} />
                      <span>End: {plan.endDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="text-gray-500" size={16} />
                      <span>Subjects: {plan.subjects.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="text-gray-500" size={16} />
                      <span>{plan.dailyHours} hours/day</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                    <Button variant="outline" size="sm" className="flex-1">Adjust Plan</Button>
                  </div>
                </div>
              ))}
              
              {currentPlans.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <Compass className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 font-medium">No active study plans</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Create a new plan to get started</p>
                  <Button 
                    onClick={openCreatePlanDialog} 
                    variant="outline" 
                    className="mt-4"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Plan
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4 space-y-4">
              {completedPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm opacity-90"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{plan.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{plan.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={18} />
                      <span className="font-medium">{plan.grade}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion</span>
                      <span className="font-medium">{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="text-gray-500" size={16} />
                      <span>From: {plan.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="text-gray-500" size={16} />
                      <span>To: {plan.endDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="text-gray-500" size={16} />
                      <span>Subjects: {plan.subjects.join(", ")}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="summary">
                        <AccordionTrigger className="text-sm">View Summary</AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm space-y-2">
                            <p>Completed 24 study sessions over 45 days.</p>
                            <p>Completed 18 quizzes with an average score of 85%.</p>
                            <p>Mastered 35 concepts in {plan.subjects.join(" and ")}.</p>
                            <div className="flex justify-center mt-3">
                              <Button variant="outline" size="sm">
                                Download Detailed Report
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              ))}
              
              {completedPlans.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <Hourglass className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 font-medium">No completed study plans</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your completed plans will appear here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-1">
            <ListChecks size={16} />
            <span>Pro tip: Consistent daily study is better than occasional cramming</span>
          </div>
        </CardFooter>
      </Card>
      
      {/* Create Study Plan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Study Plan</DialogTitle>
            <DialogDescription>
              Step {step} of 5: {step === 1 ? "Select exam goal" : 
                step === 2 ? "Identify your strengths" :
                step === 3 ? "Areas needing improvement" :
                step === 4 ? "Set exam date" :
                "Study preferences"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
          
          {renderStepContent()}
          
          <DialogFooter className="flex justify-between mt-4">
            <div>
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                >
                  Back
                </Button>
              )}
            </div>
            <div>
              {step < 5 ? (
                <Button 
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleCreatePlan}
                  disabled={creatingPlan}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {creatingPlan ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Plan
                    </>
                  )}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AcademicAdvisorCard;
