import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminService } from "@/services/adminService";
import { Activity, AlertCircle, Check, Clock, Database, Server, FileText, TrendingUp, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DatabaseSchemaDownloader from "../DatabaseSchemaDownloader";
import APIPerformance from "../system/APIPerformance";

interface KpiStats {
  stressReduction: number;
  timeOptimization: number;
  habitFormation: number;
  examConfidence: number;
  userRetention: number;
  moodBasedUsage: number;
}

interface DataReliability {
  stressReduction: boolean;
  timeOptimization: boolean;
  habitFormation: boolean;
  examConfidence: boolean;
  userRetention: boolean;
  moodBasedUsage: boolean;
}

const SystemAnalyticsTab = () => {
  const [stats, setStats] = React.useState<KpiStats | null>(null);
  const [dataReliability, setDataReliability] = React.useState<DataReliability>({
    stressReduction: false,
    timeOptimization: false,
    habitFormation: false,
    examConfidence: false,
    userRetention: false,
    moodBasedUsage: false
  });
  const [sampleSizes, setSampleSizes] = React.useState({
    totalStudents: 0,
    totalSessions: 0,
    completedSurveys: 0
  });
  const [activeTab, setActiveTab] = useState("metrics");

  React.useEffect(() => {
    const fetchStats = async () => {
      const dashboardStats = await adminService.getDashboardStats();
      if (dashboardStats) {
        setStats({
          stressReduction: dashboardStats.verifiedMoodImprovement
            ? Math.min(Math.round(dashboardStats.verifiedMoodImprovement), 100)
            : Math.min(Math.round((dashboardStats.averageMoodScore - 5) / 5 * 100), 100),
          
          timeOptimization: dashboardStats.averageTimeSavedPerWeek
            ? Math.round(dashboardStats.averageTimeSavedPerWeek)
            : dashboardStats.studyPlanEfficiencyImprovement
              ? Math.round(dashboardStats.studyPlanEfficiencyImprovement / 10)
              : 5,
          
          habitFormation: dashboardStats.studentsWithVerifiedConsistentHabits
            ? Math.round((dashboardStats.studentsWithVerifiedConsistentHabits / dashboardStats.totalStudents) * 100)
            : Math.round((dashboardStats.studentsWithConsistentHabits / dashboardStats.totalStudents) * 100),
          
          examConfidence: dashboardStats.verifiedExamConfidenceImprovement
            ? Math.round(dashboardStats.verifiedExamConfidenceImprovement)
            : Math.round((dashboardStats.averageConfidenceScore / 10) * 100),
          
          userRetention: dashboardStats.verifiedRetentionRate
            ? dashboardStats.verifiedRetentionRate
            : Math.round((dashboardStats.activeStudents / dashboardStats.totalStudents) * 100),
          
          moodBasedUsage: dashboardStats.verifiedMoodFeatureUsage
            ? dashboardStats.verifiedMoodFeatureUsage
            : Math.round((dashboardStats.moodBasedSessionsCount / dashboardStats.totalSessions) * 100)
        });
        
        setSampleSizes({
          totalStudents: dashboardStats.totalStudents,
          totalSessions: dashboardStats.totalSessions,
          completedSurveys: dashboardStats.completedSurveys || 0
        });
        
        const MIN_SAMPLE_SIZE = 50;
        const MIN_SESSIONS_FOR_TIME_CALC = 100;
        const MIN_SURVEYS = 30;
        
        setDataReliability({
          stressReduction: Boolean(dashboardStats.verifiedMoodImprovement) && 
                          (dashboardStats.completedSurveys >= MIN_SURVEYS),
          
          timeOptimization: Boolean(dashboardStats.averageTimeSavedPerWeek) && 
                          (dashboardStats.totalSessions >= MIN_SESSIONS_FOR_TIME_CALC),
          
          habitFormation: Boolean(dashboardStats.studentsWithVerifiedConsistentHabits) && 
                          (dashboardStats.totalStudents >= MIN_SAMPLE_SIZE),
          
          examConfidence: Boolean(dashboardStats.verifiedExamConfidenceImprovement) && 
                          (dashboardStats.completedSurveys >= MIN_SURVEYS),
          
          userRetention: Boolean(dashboardStats.verifiedRetentionRate) && 
                        (dashboardStats.totalStudents >= MIN_SAMPLE_SIZE),
          
          moodBasedUsage: Boolean(dashboardStats.verifiedMoodFeatureUsage) && 
                        (dashboardStats.totalSessions >= MIN_SESSIONS_FOR_TIME_CALC)
        });
      }
    };

    fetchStats();
  }, []);

  const DataReliabilityIndicator = ({ isReliable }: { isReliable: boolean }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {isReliable ? (
            <span className="h-3 w-3 rounded-full bg-green-500 inline-block ml-2"></span>
          ) : (
            <span className="h-3 w-3 rounded-full bg-amber-500 inline-block ml-2"></span>
          )}
        </TooltipTrigger>
        <TooltipContent>
          {isReliable ? 
            "Verified data with sufficient sample size" : 
            "Estimated data - needs more samples for verification"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="metrics" className="flex-1">Student Metrics</TabsTrigger>
          <TabsTrigger value="homepage" className="flex-1">Homepage KPIs</TabsTrigger>
          <TabsTrigger value="monitoring" className="flex-1">System Monitoring</TabsTrigger>
          <TabsTrigger value="database" className="flex-1">Database</TabsTrigger>
          <TabsTrigger value="api" className="flex-1">API Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-md mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 dark:text-amber-400 mt-1" size={18} />
              <div>
                <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Data Reliability Information</h4>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                  Sample sizes: {sampleSizes.totalStudents} students, {sampleSizes.totalSessions} sessions, {sampleSizes.completedSurveys} surveys.
                  <br />
                  Green indicators show verified metrics with sufficient sample size. Amber indicators show estimated data.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Student Success Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Stress Reduction</span>
                    <div className="flex items-center">
                      <span className="font-bold">{stats?.stressReduction || 0}%</span>
                      <DataReliabilityIndicator isReliable={dataReliability.stressReduction} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Habit Formation</span>
                    <div className="flex items-center">
                      <span className="font-bold">{stats?.habitFormation || 0}%</span>
                      <DataReliabilityIndicator isReliable={dataReliability.habitFormation} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Exam Confidence</span>
                    <div className="flex items-center">
                      <span className="font-bold">{stats?.examConfidence || 0}%</span>
                      <DataReliabilityIndicator isReliable={dataReliability.examConfidence} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>User Retention</span>
                    <div className="flex items-center">
                      <span className="font-bold">{stats?.userRetention || 0}%</span>
                      <DataReliabilityIndicator isReliable={dataReliability.userRetention} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mood-Based Usage</span>
                    <div className="flex items-center">
                      <span className="font-bold">{stats?.moodBasedUsage || 0}%</span>
                      <DataReliabilityIndicator isReliable={dataReliability.moodBasedUsage} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Time Optimization</span>
                    <div className="flex items-center">
                      <span className="font-bold">{stats?.timeOptimization || 0}+ hrs/week</span>
                      <DataReliabilityIndicator isReliable={dataReliability.timeOptimization} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <TrendingUp className="h-24 w-24 text-gray-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="homepage">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Homepage KPI Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                These statistics are displayed on the homepage in the KPI section. Update these values to reflect current performance metrics.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Student Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Students</span>
                      <span className="font-medium">10,000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Concepts Mastered</span>
                      <span className="font-medium">850/student</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Content Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Practice Questions</span>
                      <span className="font-medium">500,000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Flashcards Reviewed</span>
                      <span className="font-medium">2 Million+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Study Plans</span>
                      <span className="font-medium">12,000+</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Experience Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Weekly Study Time</span>
                      <span className="font-medium">6.5 hrs/week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Target Exams</span>
                      <span className="font-medium">20+ Exams</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Mood Tracking</span>
                      <span className="font-medium">85% Weekly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Anxiety Reduction</span>
                      <span className="font-medium">72%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline">
                  Update Homepage KPI Values
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Homepage KPI Edit Form</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "Total Students", key: "totalStudents", value: 10000, suffix: "" },
                  { label: "Success Rate", key: "successRate", value: 95, suffix: "%" },
                  { label: "Avg Concepts Mastered", key: "averageConcepts", value: 850, suffix: "/student" },
                  { label: "Practice Questions", key: "totalQuestions", value: 500000, suffix: "+" },
                  { label: "Flashcards Reviewed", key: "totalFlashcards", value: 2000000, suffix: "+" },
                  { label: "Study Plans", key: "totalStudyPlans", value: 12000, suffix: "+" },
                  { label: "Weekly Study Time", key: "averageStudyTimePerUser", value: 6.5, suffix: " hrs/week" },
                  { label: "Target Exams", key: "targetExams", value: 20, suffix: "+" },
                  { label: "Mood Tracking", key: "studentsWithMoodTracking", value: 85, suffix: "%" },
                  { label: "Anxiety Reduction", key: "verifiedMoodImprovement", value: 72, suffix: "%" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-medium">{item.label}</label>
                    <div className="flex">
                      <input 
                        type="number" 
                        defaultValue={item.value}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md"
                      />
                      {item.suffix && (
                        <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-r-md">
                          {item.suffix}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex gap-4">
                <Button>Save Changes</Button>
                <Button variant="outline">Reset to Default</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm text-gray-500">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-gray-500">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Disk Space</span>
                    <span className="text-sm text-gray-500">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Network Traffic</span>
                    <span className="text-sm text-gray-500">5.2 Mbps</span>
                  </div>
                  <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-md flex items-end">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div 
                        key={i} 
                        className="bg-blue-500 w-full" 
                        style={{
                          height: `${Math.floor(Math.random() * 80) + 10}%`,
                          marginRight: '1px'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Configure Alerts</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5" /> Database Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Connection</span>
                    <span className="text-green-600 font-medium">Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Queries</span>
                    <span>12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Query Response Time</span>
                    <span>45ms avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Database Size</span>
                    <span>1.2 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Backup Status</span>
                    <span className="text-green-600 font-medium">Up to date</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Backup</span>
                    <span>Today, 3:45 AM</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">Database Management</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" /> System Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    { time: "18:42:12", message: "User authentication successful", level: "info" },
                    { time: "18:40:05", message: "Content generation completed", level: "info" },
                    { time: "18:35:56", message: "API rate limit warning", level: "warning" },
                    { time: "18:30:22", message: "Study plan updated for user_123", level: "info" },
                    { time: "18:15:44", message: "Failed login attempt", level: "warning" },
                    { time: "18:01:17", message: "Database query error", level: "error" },
                  ].map((log, i) => (
                    <div key={i} className={`text-xs p-2 rounded ${
                      log.level === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300' : 
                      log.level === 'warning' ? 'bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300' :
                      'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                    }`}>
                      <span className="font-mono">{log.time}</span> - {log.message}
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">View All Logs</Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" /> Flask Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Environment</h3>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                    <span className="text-sm">Production</span>
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Version</span>
                    <span className="text-sm">v2.3.1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Restart</span>
                    <span className="text-sm">1d ago</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Endpoints Status</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">/api/personalize</span>
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">/api/doubts</span>
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">/api/generate-plan</span>
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">/api/tutor-chat</span>
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">Restart Service</Button>
                    <Button variant="outline" size="sm" className="w-full">Update API</Button>
                    <Button variant="outline" size="sm" className="w-full">Test Connection</Button>
                    <Button variant="default" size="sm" className="w-full">Flask Dashboard</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database">
          <DatabaseSchemaDownloader />
        </TabsContent>
        
        <TabsContent value="api">
          <APIPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemAnalyticsTab;
