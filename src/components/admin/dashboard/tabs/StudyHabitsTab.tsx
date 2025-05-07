
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { StudyHabitSettings, StudyHabitAnalytics } from "@/types/admin/studyHabits";
import { adminService } from "@/services/adminService";
import { Calendar, Clock, Settings, Users, BarChart, Save, RefreshCcw } from "lucide-react";

const StudyHabitsTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<StudyHabitSettings>({
    minSessionsPerWeek: 4,
    minDaysPerWeek: 4,
    minMinutesPerSession: 30,
    consistencyThreshold: 80,
    trackingPeriodWeeks: 2
  });
  
  const [analytics, setAnalytics] = useState<StudyHabitAnalytics | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would use the studyHabitsService
      // For now, we'll simulate with mock data
      const mockAnalytics: StudyHabitAnalytics = {
        totalStudents: 1245,
        studentsWithConsistentHabits: 876,
        averageWeeklySessions: 8.4,
        averageWeeklyStudyHours: 12.6,
        mostPopularStudyDays: [
          { day: "Sunday", count: 842 },
          { day: "Saturday", count: 765 },
          { day: "Wednesday", count: 684 }
        ],
        mostPopularStudyTimes: [
          { timeSlot: "8 PM - 10 PM", count: 1230 },
          { timeSlot: "6 PM - 8 PM", count: 945 },
          { timeSlot: "10 AM - 12 PM", count: 782 }
        ],
        subjectDistribution: [
          { subject: "Mathematics", percentage: 32 },
          { subject: "Physics", percentage: 28 },
          { subject: "Chemistry", percentage: 23 },
          { subject: "Biology", percentage: 17 }
        ]
      };
      
      setAnalytics(mockAnalytics);
      
      toast({
        title: "Data Loaded",
        description: "Study habits data has been loaded successfully",
        variant: "default"
      });
    } catch (error) {
      console.error("Error loading study habits data:", error);
      toast({
        title: "Error",
        description: "Failed to load study habits data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: parseInt(value)
    });
  };
  
  const handleSaveSettings = () => {
    // In a real implementation, this would use the studyHabitsService
    toast({
      title: "Settings Saved",
      description: "Study habit settings have been updated",
      variant: "default"
    });
  };
  
  if (loading) {
    return <div className="p-6 text-center">Loading study habits data...</div>;
  }
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span>Consistency Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{analytics ? Math.round((analytics.studentsWithConsistentHabits / analytics.totalStudents) * 100) : 0}%</div>
                  <p className="text-sm text-gray-500">
                    {analytics?.studentsWithConsistentHabits} out of {analytics?.totalStudents} students have consistent habits
                  </p>
                  <Progress 
                    value={analytics ? (analytics.studentsWithConsistentHabits / analytics.totalStudents) * 100 : 0}
                    className="h-2 mt-2"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span>Weekly Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{analytics?.averageWeeklySessions || 0}</div>
                  <p className="text-sm text-gray-500">
                    Average sessions per student per week
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    Recommended: {settings.minSessionsPerWeek}+ sessions/week
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span>Study Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{analytics?.averageWeeklyStudyHours || 0} hrs</div>
                  <p className="text-sm text-gray-500">
                    Average study time per student per week
                  </p>
                  <div className="text-xs text-gray-500 mt-2">
                    Minimum session length: {settings.minMinutesPerSession} minutes
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Study Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.mostPopularStudyDays.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{day.day}</span>
                        <span className="font-medium">{day.count} sessions</span>
                      </div>
                      <Progress 
                        value={(day.count / Math.max(...analytics.mostPopularStudyDays.map(d => d.count))) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.subjectDistribution.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{subject.subject}</span>
                        <span className="font-medium">{subject.percentage}%</span>
                      </div>
                      <Progress 
                        value={subject.percentage}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Study Habits Detailed Analysis</span>
                <Button size="sm" variant="outline" className="flex items-center gap-2" onClick={fetchData}>
                  <RefreshCcw className="h-4 w-4" />
                  <span>Refresh</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Popular Study Times</h3>
                  <div className="space-y-4">
                    {analytics?.mostPopularStudyTimes.map((timeSlot, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{timeSlot.timeSlot}</span>
                          <span className="font-medium">{timeSlot.count} sessions</span>
                        </div>
                        <Progress 
                          value={(timeSlot.count / Math.max(...analytics.mostPopularStudyTimes.map(t => t.count))) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Consistency Factors</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Factor</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Sessions Per Week</TableCell>
                        <TableCell>{analytics?.averageWeeklySessions}</TableCell>
                        <TableCell>{settings.minSessionsPerWeek}+</TableCell>
                        <TableCell>
                          {analytics && analytics.averageWeeklySessions >= settings.minSessionsPerWeek ? (
                            <span className="text-green-600">Meeting Target</span>
                          ) : (
                            <span className="text-amber-600">Below Target</span>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Days Studied Per Week</TableCell>
                        <TableCell>{analytics ? Math.round(analytics.averageWeeklySessions / 2) : 0}</TableCell>
                        <TableCell>{settings.minDaysPerWeek}+</TableCell>
                        <TableCell>
                          {analytics && Math.round(analytics.averageWeeklySessions / 2) >= settings.minDaysPerWeek ? (
                            <span className="text-green-600">Meeting Target</span>
                          ) : (
                            <span className="text-amber-600">Below Target</span>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Minutes Per Session</TableCell>
                        <TableCell>{analytics ? Math.round((analytics.averageWeeklyStudyHours * 60) / analytics.averageWeeklySessions) : 0}</TableCell>
                        <TableCell>{settings.minMinutesPerSession}+</TableCell>
                        <TableCell>
                          {analytics && Math.round((analytics.averageWeeklyStudyHours * 60) / analytics.averageWeeklySessions) >= settings.minMinutesPerSession ? (
                            <span className="text-green-600">Meeting Target</span>
                          ) : (
                            <span className="text-amber-600">Below Target</span>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>Study Habit Consistency Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="minSessionsPerWeek">Minimum Sessions Per Week</Label>
                    <Input 
                      id="minSessionsPerWeek" 
                      name="minSessionsPerWeek"
                      type="number"
                      value={settings.minSessionsPerWeek} 
                      onChange={handleSettingsChange}
                    />
                    <p className="text-xs text-gray-500">
                      Students should complete at least this many study sessions per week to be considered consistent
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="minDaysPerWeek">Minimum Days Per Week</Label>
                    <Input 
                      id="minDaysPerWeek" 
                      name="minDaysPerWeek"
                      type="number"
                      min="1"
                      max="7"
                      value={settings.minDaysPerWeek} 
                      onChange={handleSettingsChange}
                    />
                    <p className="text-xs text-gray-500">
                      Students should study on at least this many different days per week
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="minMinutesPerSession">Minimum Minutes Per Session</Label>
                    <Input 
                      id="minMinutesPerSession" 
                      name="minMinutesPerSession"
                      type="number"
                      value={settings.minMinutesPerSession} 
                      onChange={handleSettingsChange}
                    />
                    <p className="text-xs text-gray-500">
                      Each study session should last at least this many minutes to count
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="consistencyThreshold">Consistency Threshold (%)</Label>
                    <Input 
                      id="consistencyThreshold" 
                      name="consistencyThreshold"
                      type="number"
                      min="1"
                      max="100"
                      value={settings.consistencyThreshold} 
                      onChange={handleSettingsChange}
                    />
                    <p className="text-xs text-gray-500">
                      Percentage threshold to consider a student's habits consistent
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="trackingPeriodWeeks">Tracking Period (weeks)</Label>
                    <Input 
                      id="trackingPeriodWeeks" 
                      name="trackingPeriodWeeks"
                      type="number"
                      value={settings.trackingPeriodWeeks} 
                      onChange={handleSettingsChange}
                    />
                    <p className="text-xs text-gray-500">
                      Number of weeks to evaluate for consistency (e.g., 2 weeks)
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    <span>Save Settings</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyHabitsTab;
