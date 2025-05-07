
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CalendarIcon, Clock, BookOpen, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SharedPageLayout } from '../SharedPageLayout';
import { Link } from 'react-router-dom';

const StudyPlanView = () => {
  const [activeTab, setActiveTab] = React.useState('daily');

  // Mock data
  const examName = "NEET 2024";
  const daysRemaining = 120;
  const overallProgress = 35;
  
  const dailyTasks = [
    { id: 1, subject: 'Physics', topic: 'Thermodynamics', type: 'concept', status: 'completed', timeEstimate: '45 min', importance: 'high' },
    { id: 2, subject: 'Chemistry', topic: 'Organic Chemistry', type: 'flashcard', status: 'in-progress', timeEstimate: '30 min', importance: 'medium' },
    { id: 3, subject: 'Biology', topic: 'Cell Division', type: 'concept', status: 'pending', timeEstimate: '60 min', importance: 'high' },
    { id: 4, subject: 'Physics', topic: 'Practice Problems', type: 'exercise', status: 'pending', timeEstimate: '45 min', importance: 'medium' },
  ];
  
  const weeklyGoals = [
    { id: 1, name: 'Complete Physics Module 3', progress: 75 },
    { id: 2, name: 'Review Chemistry Flashcards', progress: 60 },
    { id: 3, name: 'Take Biology Practice Test', progress: 0 },
    { id: 4, name: 'Complete 2 Full Mock Tests', progress: 50 },
  ];
  
  const milestones = [
    { id: 1, name: 'Complete Physics Syllabus', deadline: 'Dec 15, 2023', status: 'in-progress', progress: 68 },
    { id: 2, name: 'Complete Chemistry Syllabus', deadline: 'Jan 20, 2024', status: 'in-progress', progress: 45 },
    { id: 3, name: 'Complete Biology Syllabus', deadline: 'Feb 28, 2024', status: 'not-started', progress: 20 },
    { id: 4, name: 'Full Syllabus Revision', deadline: 'Apr 15, 2024', status: 'not-started', progress: 0 },
  ];

  return (
    <SharedPageLayout
      title="Study Plan"
      subtitle="Your comprehensive roadmap to exam success"
    >
      <div className="space-y-6">
        {/* Exam Overview Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300">{examName}</h2>
                <div className="flex items-center text-blue-700 dark:text-blue-400 mt-1">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{daysRemaining} days remaining</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-300 mr-2">Overall Progress</span>
                  <span className="text-sm font-medium">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2 w-[200px]" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Study Plan Tabs */}
        <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="daily">Daily Plan</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Goals</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>
          
          {/* Daily Plan Tab */}
          <TabsContent value="daily" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Today's Tasks</h3>
              <Button size="sm" variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
            
            <div className="space-y-3">
              {dailyTasks.map(task => (
                <Card key={task.id} className={`border-l-4 ${task.status === 'completed' ? 'border-l-green-500' : task.status === 'in-progress' ? 'border-l-blue-500' : 'border-l-gray-300'}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <Badge className="mr-2" variant={task.importance === 'high' ? 'default' : 'outline'}>
                            {task.subject}
                          </Badge>
                          <span className="text-sm text-gray-500">{task.topic}</span>
                        </div>
                        <h4 className="font-medium mt-1">
                          {task.type === 'concept' ? 'Learn Concept' : 
                           task.type === 'flashcard' ? 'Review Flashcards' : 
                           'Practice Exercises'}
                        </h4>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          {task.timeEstimate}
                        </div>
                        <Button 
                          size="sm" 
                          variant={task.status === 'completed' ? 'outline' : 'default'} 
                          className="mt-2"
                        >
                          {task.status === 'completed' ? 'Completed' : 
                           task.status === 'in-progress' ? 'Continue' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline">Previous Day</Button>
              <Button>Next Day</Button>
            </div>
          </TabsContent>
          
          {/* Weekly Goals Tab */}
          <TabsContent value="weekly" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">This Week's Goals</h3>
              <span className="text-sm text-gray-500">Week 12 of 24</span>
            </div>
            
            <div className="space-y-4">
              {weeklyGoals.map(goal => (
                <Card key={goal.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{goal.name}</h4>
                      <span className="text-sm">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    
                    <div className="flex justify-end mt-3">
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weekly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-xs text-gray-500">Tasks Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">18</p>
                    <p className="text-xs text-gray-500">Study Hours</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">3</p>
                    <p className="text-xs text-gray-500">Practice Tests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Exam Milestones</h3>
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Timeline
              </Button>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              <div className="space-y-8 relative">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="ml-10 relative">
                    {/* Timeline dot */}
                    <div className={`absolute -left-[42px] top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-green-100 dark:bg-green-900' : 
                      milestone.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900' : 
                      'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : milestone.status === 'in-progress' ? (
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{milestone.name}</CardTitle>
                          <Badge variant={
                            milestone.status === 'completed' ? 'default' : 
                            milestone.status === 'in-progress' ? 'outline' : 
                            'secondary'
                          }>
                            {milestone.status === 'completed' ? 'Completed' : 
                             milestone.status === 'in-progress' ? 'In Progress' : 
                             'Not Started'}
                          </Badge>
                        </div>
                        <CardDescription>Deadline: {milestone.deadline}</CardDescription>
                      </CardHeader>
                      <CardContent className="py-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm font-medium">{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" className="p-0 h-auto">View Details</Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-auto py-4 justify-start text-left">
            <Link to="/dashboard/student/academic">
              <div>
                <div className="font-medium">Academic Advisor</div>
                <div className="text-xs text-gray-500">Adjust your study plan</div>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 justify-start text-left">
            <Link to="/dashboard/student/concepts">
              <div>
                <div className="font-medium">Concept Cards</div>
                <div className="text-xs text-gray-500">Learn key concepts</div>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 justify-start text-left">
            <Link to="/dashboard/student/flashcards">
              <div>
                <div className="font-medium">Flashcards</div>
                <div className="text-xs text-gray-500">Review and memorize</div>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 justify-start text-left">
            <Link to="/dashboard/student/practice-exam">
              <div>
                <div className="font-medium">Practice Exams</div>
                <div className="text-xs text-gray-500">Test your knowledge</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanView;
