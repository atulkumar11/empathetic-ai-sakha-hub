
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Rocket, ArrowUp, Award, Calendar } from "lucide-react";

interface Subject {
  name: string;
  progress: number;
  lastWeekProgress?: number;
  color?: string;
  syllabus?: {
    completed: number;
    total: number;
    chapters: string[];
  };
}

const subjects: Subject[] = [
  { 
    name: "Physics", 
    progress: 75, 
    lastWeekProgress: 68,
    color: "#3b82f6", 
    syllabus: {
      completed: 12,
      total: 16,
      chapters: [
        "Mechanics",
        "Thermodynamics",
        "Electromagnetism",
        "Optics"
      ]
    }
  },
  { 
    name: "Mathematics", 
    progress: 60, 
    lastWeekProgress: 55,
    color: "#8b5cf6", 
    syllabus: {
      completed: 8,
      total: 14,
      chapters: [
        "Algebra",
        "Calculus",
        "Trigonometry",
        "Coordinate Geometry"
      ]
    }
  },
  { 
    name: "Chemistry", 
    progress: 40, 
    lastWeekProgress: 35,
    color: "#10b981", 
    syllabus: {
      completed: 6,
      total: 15,
      chapters: [
        "Organic Chemistry",
        "Inorganic Chemistry",
        "Physical Chemistry"
      ]
    }
  },
  { 
    name: "Biology", 
    progress: 25, 
    lastWeekProgress: 20,
    color: "#f43f5e", 
    syllabus: {
      completed: 5,
      total: 20,
      chapters: [
        "Cell Biology",
        "Genetics",
        "Human Physiology",
        "Ecology"
      ]
    }
  }
];

export default function ProgressCard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleViewDetails = (subject: Subject) => {
    setSelectedSubject(subject);
    setDialogOpen(true);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getProgressDiff = (current: number, last?: number) => {
    if (!last) return 0;
    return current - last;
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-1">
                Track your subject-wise progress
              </CardDescription>
            </div>
            <LineChart className="text-gray-400" size={20} />
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-6">
            {subjects.map((subject) => {
              const progressDiff = getProgressDiff(subject.progress, subject.lastWeekProgress);
              return (
                <div key={subject.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{subject.name}</h3>
                      {progressDiff > 0 && (
                        <div className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded-md flex items-center text-xs">
                          <ArrowUp size={12} className="mr-0.5" />
                          {progressDiff}%
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{subject.progress}% Complete</span>
                  </div>
                  <div className="relative w-full">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 ease-in-out"
                        style={{ 
                          width: `${subject.progress}%`,
                          backgroundColor: subject.color || "#3b82f6"  
                        }}
                      ></div>
                    </div>
                    <button 
                      className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-7 text-xs text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewDetails(subject)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700 flex items-center">
                <Award className="mr-2 text-amber-500" size={16} /> 
                <span>Achievements</span>
              </h3>
              <span className="text-xs text-gray-500">Last updated: Today</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-md border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Consistency</p>
                <p className="font-medium">5-day streak</p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Subjects</p>
                <p className="font-medium">4 active</p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Topics mastered</p>
                <p className="font-medium">24 topics</p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Tests completed</p>
                <p className="font-medium">18 tests</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button className="w-full gap-2" onClick={() => setDialogOpen(true)}>
            <Rocket size={16} />
            <span>View Detailed Analytics</span>
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedSubject ? `${selectedSubject.name} Progress` : 'Learning Analytics'}</DialogTitle>
            <DialogDescription>
              Detailed view of your learning progress and activity
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="tests">Tests & Quizzes</TabsTrigger>
              <TabsTrigger value="plan">Study Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Overall Progress</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {subjects.map(subject => (
                        <div key={subject.name} className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium"
                              style={{ backgroundColor: subject.color || "#3b82f6" }}
                            >
                              {subject.progress}%
                            </div>
                          </div>
                          <p className="text-sm mt-2">{subject.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Monthly Activity</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Study hours</span>
                        <span className="text-sm font-medium">32.5 hrs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Tests taken</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Topics completed</span>
                        <span className="text-sm font-medium">18</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Average score</span>
                        <span className="text-sm font-medium">76%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-500">Weekly Performance</h4>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Last 7 days</span>
                    </div>
                  </div>
                  
                  <div className="relative h-40 w-full mb-4 border-b border-l">
                    {/* Placeholder for chart - in a real app, use Recharts or similar */}
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                        <div key={day} className="flex flex-col items-center">
                          <div 
                            className="w-8 bg-blue-500 rounded-t"
                            style={{ 
                              height: `${Math.random() * 50 + 20}%`,
                              opacity: 0.7 + (i * 0.05)
                            }}
                          ></div>
                          <span className="text-xs mt-2">{day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="border rounded p-3 text-center bg-gray-50">
                      <p className="text-xs text-gray-500 mb-1">Focus time</p>
                      <p className="font-medium">4.2 hrs/day</p>
                    </div>
                    <div className="border rounded p-3 text-center bg-gray-50">
                      <p className="text-xs text-gray-500 mb-1">Consistency</p>
                      <p className="font-medium">92%</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="syllabus" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map(subject => (
                  <div key={subject.name} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">{subject.name}</h4>
                      <span className="text-sm">
                        {subject.syllabus?.completed}/{subject.syllabus?.total} chapters
                      </span>
                    </div>
                    
                    <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${(subject.syllabus?.completed || 0) / (subject.syllabus?.total || 1) * 100}%`,
                          backgroundColor: subject.color || "#3b82f6"  
                        }}
                      ></div>
                    </div>
                    
                    <div className="space-y-2">
                      {subject.syllabus?.chapters.map((chapter, index) => (
                        <div key={chapter} className="flex items-center gap-2 text-sm">
                          <div className={`w-3 h-3 rounded-full ${
                            index < (subject.syllabus?.completed || 0) ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span>{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tests" className="space-y-4 pt-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-4">Recent Test Results</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <h5 className="font-medium">Physics Mock Test</h5>
                      <p className="text-sm text-gray-500">Units 1-3 • 25 questions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">82%</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <h5 className="font-medium">Math Weekly Quiz</h5>
                      <p className="text-sm text-gray-500">Calculus • 15 questions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-amber-600">74%</p>
                      <p className="text-xs text-gray-500">4 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div>
                      <h5 className="font-medium">Chemistry Practice Test</h5>
                      <p className="text-sm text-gray-500">Organic Chemistry • 20 questions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">88%</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">Biology Unit Test</h5>
                      <p className="text-sm text-gray-500">Cell Biology • 30 questions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">65%</p>
                      <p className="text-xs text-gray-500">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="plan" className="space-y-4 pt-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">This Week's Study Plan</h4>
                  <Button variant="outline" size="sm">Update Plan</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-3 py-1">
                    <p className="font-medium">Monday</p>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm">Physics: Mechanics (2 hrs)</p>
                      <p className="text-sm">Math: Calculus Problems (1.5 hrs)</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-3 py-1">
                    <p className="font-medium">Tuesday</p>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm">Chemistry: Organic Chemistry (2 hrs)</p>
                      <p className="text-sm">Math: Practice Test (1 hr)</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <p className="font-medium">Wednesday</p>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm">Physics: Problem Solving (2 hrs)</p>
                      <p className="text-sm">Biology: Cell Biology (2 hrs)</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-3 py-1">
                    <p className="font-medium">Thursday</p>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm">Math: Coordinate Geometry (2 hrs)</p>
                      <p className="text-sm">Chemistry: Revision (1.5 hrs)</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <p className="font-medium">Friday</p>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm">Physics: Test (1 hr)</p>
                      <p className="text-sm">Biology: Genetics (2 hrs)</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-gray-500 pl-3 py-1">
                    <p className="font-medium">Weekend</p>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm">Revision for all subjects (4 hrs)</p>
                      <p className="text-sm">Practice tests (2 hrs)</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
