
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, BookOpen, Clock, CheckCircle, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { Subject, StudyPlanSubject } from '@/types/user/studyPlan';

interface StudyPlanBreakdownProps {
  subjects: StudyPlanSubject[];
  examDate?: string;
  examName?: string;
  weeklyHours?: number;
}

interface TimeAllocationProps {
  subjects: StudyPlanSubject[];
  weeklyHours?: number;
}

const TimeAllocation: React.FC<TimeAllocationProps> = ({ subjects, weeklyHours = 35 }) => {
  // Calculate percentages and hours per subject based on priority
  const totalSubjects = subjects.length;
  const totalHours = weeklyHours || 35;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary" />
          Weekly Time Allocation
        </CardTitle>
        <CardDescription>
          Recommended study hours per subject: {totalHours} hours total per week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: subject.color || '#8B5CF6' }}></div>
                  <span className="font-medium">{subject.name}</span>
                </div>
                <span className="text-sm font-medium">{subject.hoursPerWeek} hours per week</span>
              </div>
              <Progress value={(subject.hoursPerWeek / totalHours) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Recommended daily: {Math.round((subject.hoursPerWeek / 7) * 10) / 10} hrs</span>
                <span>{Math.round((subject.hoursPerWeek / totalHours) * 100)}% of total time</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start border-t pt-4">
        <p className="text-sm text-muted-foreground mb-2">
          Time allocation is based on subject priority, your proficiency level, and exam weightage.
        </p>
        <Button variant="outline" size="sm">
          <Clock className="h-4 w-4 mr-2" />
          Adjust Time Allocation
        </Button>
      </CardFooter>
    </Card>
  );
};

interface SubjectTopicsProps {
  subjects: StudyPlanSubject[];
}

const SubjectTopics: React.FC<SubjectTopicsProps> = ({ subjects }) => {
  const [activeSubject, setActiveSubject] = useState<string>(subjects[0]?.id || '');
  
  const activeSubjectData = subjects.find(s => s.id === activeSubject);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          Topics to Cover
        </CardTitle>
        <CardDescription>
          Detailed breakdown of topics by subject
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex h-[500px]">
          {/* Subject Sidebar */}
          <div className="w-1/3 border-r">
            <ScrollArea className="h-[500px]">
              <div className="p-2">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className={`p-3 mb-1 rounded-md cursor-pointer flex items-center ${
                      activeSubject === subject.id ? 'bg-accent' : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setActiveSubject(subject.id)}
                  >
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: subject.color || '#8B5CF6' }}></div>
                    <div>
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {subject.topics?.length || 0} topics
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Topics List */}
          <div className="flex-1">
            <ScrollArea className="h-[500px]">
              {activeSubjectData?.topics && activeSubjectData.topics.length > 0 ? (
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">{activeSubjectData.name} Topics</h3>
                  <div className="space-y-3">
                    {activeSubjectData.topics.map((topic, i) => (
                      <div key={topic.id} className="flex items-center p-2 border rounded-md">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{topic.name}</div>
                          <div className="flex items-center mt-1">
                            <Badge variant={topic.difficulty === 'easy' ? 'outline' : topic.difficulty === 'medium' ? 'secondary' : 'destructive'} className="text-xs mr-2">
                              {topic.difficulty}
                            </Badge>
                            <span className={`text-xs ${
                              topic.status === 'completed' ? 'text-green-500' :
                              topic.status === 'in-progress' ? 'text-amber-500' :
                              'text-muted-foreground'
                            }`}>
                              {topic.status || 'pending'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-2">
                          {topic.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Button variant="ghost" size="sm">Start</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-muted-foreground mb-2">No topics available</div>
                    <Button variant="outline" size="sm">Add Topics</Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface TimelineProps {
  examDate?: string;
  examName?: string;
}

const Timeline: React.FC<TimelineProps> = ({ examDate = '2023-12-15', examName = 'JEE Advanced' }) => {
  const today = new Date();
  const exam = new Date(examDate);
  const daysUntilExam = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const weeksUntilExam = Math.ceil(daysUntilExam / 7);
  
  // Generate milestones (simplified approach)
  const milestones = [
    { 
      title: "Complete Core Physics Topics", 
      date: new Date(today.getTime() + (daysUntilExam * 0.25) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      percentage: 25
    },
    { 
      title: "Complete Core Chemistry Topics", 
      date: new Date(today.getTime() + (daysUntilExam * 0.5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      percentage: 50
    },
    { 
      title: "Complete Core Maths Topics", 
      date: new Date(today.getTime() + (daysUntilExam * 0.75) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      percentage: 75
    },
    { 
      title: examName, 
      date: examDate,
      completed: false,
      percentage: 100,
      isExam: true
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
          Exam Preparation Timeline
        </CardTitle>
        <CardDescription>
          {daysUntilExam} days remaining until {examName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Progress value={(1 - daysUntilExam / 180) * 100} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Start</span>
            <span>Today ({Math.round((1 - daysUntilExam / 180) * 100)}%)</span>
            <span>{examName}</span>
          </div>
        </div>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-border before:-z-10">
          {milestones.map((milestone, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                milestone.completed ? 'bg-green-100 text-green-700' : 
                milestone.isExam ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {milestone.completed ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span>{milestone.percentage}%</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <h4 className={`font-medium ${milestone.isExam ? 'text-primary' : ''}`}>{milestone.title}</h4>
                  <span className="text-xs text-muted-foreground">{milestone.date}</span>
                </div>
                {milestone.isExam ? (
                  <p className="text-sm text-muted-foreground mt-1">
                    {weeksUntilExam} weeks to prepare for your exam
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    Target completion milestone
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full">
          <Calendar className="h-4 w-4 mr-2" />
          View Detailed Timeline
        </Button>
      </CardFooter>
    </Card>
  );
};

export const StudyPlanBreakdown: React.FC<StudyPlanBreakdownProps> = ({
  subjects,
  examDate,
  examName,
  weeklyHours
}) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="time-allocation" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="time-allocation">Time Allocation</TabsTrigger>
          <TabsTrigger value="topics">Topics Breakdown</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="time-allocation" className="mt-4">
          <TimeAllocation subjects={subjects} weeklyHours={weeklyHours} />
        </TabsContent>
        
        <TabsContent value="topics" className="mt-4">
          <SubjectTopics subjects={subjects} />
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-4">
          <Timeline examDate={examDate} examName={examName} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
