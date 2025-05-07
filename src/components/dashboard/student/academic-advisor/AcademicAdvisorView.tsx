
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, CalendarClock, Lightbulb, Clock, BarChart } from 'lucide-react';

const AcademicAdvisorView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateStudyPlanModal, setShowCreateStudyPlanModal] = useState(false);
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Academic Advisor</h1>
          <p className="text-muted-foreground">Get personalized guidance for your academic journey</p>
        </div>
        <Button onClick={() => setShowCreateStudyPlanModal(true)}>Create New Study Plan</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="studyPlans">Study Plans</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Study Plan</CardTitle>
                <CardDescription>Your active study plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Physics Mastery Plan</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Focus on mechanics and electromagnetism for the upcoming NEET exam.
                  </p>
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">Started: June 1, 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">2 hours daily</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent academic activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <Book className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Completed Concept Card</p>
                      <p className="text-xs text-muted-foreground">Newton's Laws of Motion</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <BarChart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Practice Test Completed</p>
                      <p className="text-xs text-muted-foreground">Physics - Mechanics</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Recommendations</p>
                      <p className="text-xs text-muted-foreground">Based on your recent performance</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Activity</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="studyPlans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Physics Mastery Plan</CardTitle>
                <CardDescription>Active</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Focus on mechanics and electromagnetism</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div className="h-2 bg-primary rounded-full w-[45%]"></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Physics Mastery Plan</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="plan-subject">Subject</Label>
                        <Select value="physics" disabled>
                          <SelectTrigger id="plan-subject" className="w-full">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="plan-duration">Duration</Label>
                        <Input id="plan-duration" value="8 weeks" readOnly />
                      </div>
                      
                      <div>
                        <div>
                          <Label htmlFor="plan-goal">Goal</Label>
                          <Input id="plan-goal" value="Master mechanics and electromagnetism concepts" readOnly />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="plan-difficulty">Difficulty Level</Label>
                        <Select value="medium" disabled>
                          <SelectTrigger id="plan-difficulty" className="w-full">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="plan-schedule">Study Schedule</Label>
                        <Select value="daily" disabled>
                          <SelectTrigger id="plan-schedule" className="w-full">
                            <SelectValue placeholder="Select schedule" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekends">Weekends</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="plan-hours">Hours per Day</Label>
                        <Select value="2" disabled>
                          <SelectTrigger id="plan-hours" className="w-full">
                            <SelectValue placeholder="Select hours" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 hour per day</SelectItem>
                            <SelectItem value="2">2 hours per day</SelectItem>
                            <SelectItem value="3">3 hours per day</SelectItem>
                            <SelectItem value="4">4+ hours per day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Chemistry Preparation</CardTitle>
                <CardDescription>Draft</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Organic and inorganic chemistry focus</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>Not Started</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div className="h-2 bg-primary rounded-full w-0"></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex-1 mr-2">Edit</Button>
                <Button variant="default" className="flex-1">Start</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setShowCreateStudyPlanModal(true)}>
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <h3 className="font-medium">Create New Study Plan</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">Create a customized study plan based on your goals</p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Track your academic progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Performance charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Books</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm">• Understanding Physics by DC Pandey</li>
                  <li className="text-sm">• Organic Chemistry by Morrison & Boyd</li>
                  <li className="text-sm">• Biology by Trueman</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Video Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm">• Khan Academy - Calculus Series</li>
                  <li className="text-sm">• MIT OpenCourseware - Physics I</li>
                  <li className="text-sm">• Crash Course - Biology</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Practice Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm">• Previous Year Question Papers</li>
                  <li className="text-sm">• Mock Tests</li>
                  <li className="text-sm">• Topic-wise Practice Problems</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Create Study Plan Dialog */}
      <Dialog open={showCreateStudyPlanModal} onOpenChange={setShowCreateStudyPlanModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Study Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="new-plan-subject">Subject</Label>
              <Select>
                <SelectTrigger id="new-plan-subject" className="w-full">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="new-plan-goal">Goal</Label>
              <Input id="new-plan-goal" placeholder="E.g., Master mechanics concepts" />
            </div>
            
            <div>
              <Label htmlFor="new-plan-duration">Duration (weeks)</Label>
              <Select>
                <SelectTrigger id="new-plan-duration" className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 weeks</SelectItem>
                  <SelectItem value="8">8 weeks</SelectItem>
                  <SelectItem value="12">12 weeks</SelectItem>
                  <SelectItem value="16">16 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="new-plan-difficulty">Difficulty Level</Label>
              <Select>
                <SelectTrigger id="new-plan-difficulty" className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="new-plan-schedule">Study Schedule</Label>
              <Select>
                <SelectTrigger id="new-plan-schedule" className="w-full">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="new-plan-hours">Hours per Day</Label>
              <Select>
                <SelectTrigger id="new-plan-hours" className="w-full">
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour per day</SelectItem>
                  <SelectItem value="2">2 hours per day</SelectItem>
                  <SelectItem value="3">3 hours per day</SelectItem>
                  <SelectItem value="4">4+ hours per day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCreateStudyPlanModal(false)}>Cancel</Button>
            <Button>Create Study Plan</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcademicAdvisorView;
