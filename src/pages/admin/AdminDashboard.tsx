
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { adminService } from "@/services/adminService";
import { AdminDashboardStats, SystemLog } from "@/types/admin"; 
import { StudentData } from "@/types/admin/studentData";

import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import DashboardTabs from "@/components/admin/dashboard/DashboardTabs";
import LoadingState from "@/components/admin/dashboard/LoadingState";
import DownloadDataButton from "@/components/admin/dashboard/DownloadDataButton";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCcw, Download, FileText } from "lucide-react";

const AdminDashboard = () => {
  const { adminUser, isAuthenticated, loading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentStudents, setRecentStudents] = useState<StudentData[]>([]);
  const [recentLogs, setRecentLogs] = useState<SystemLog[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [examResults, setExamResults] = useState<any[]>([]);

  useEffect(() => {
    console.log("AdminDashboard - Auth state:", { 
      isAuthenticated, 
      authLoading, 
      user: adminUser?.name, 
      role: adminUser?.role 
    });
  }, [isAuthenticated, authLoading, adminUser]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && adminUser) {
      console.log("Admin authenticated, fetching dashboard data");
      fetchDashboardData();
    } else if (!authLoading && !isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, adminUser, navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      console.log("Fetching dashboard data...");
      const dashboardStats = await adminService.getDashboardStats();
      setStats(dashboardStats);
      
      const studentsRes = await adminService.getStudents(1, 5);
      
      // Convert to unified StudentData format with all required properties
      const convertedStudents: StudentData[] = studentsRes.data.map(student => ({
        id: student.id,
        name: student.name,
        email: student.email,
        registrationDate: student.registrationDate || new Date(),
        joinedDate: student.registrationDate || new Date(),
        role: "student",
        status: "active",
        examType: student.examType,
        subjects: student.subjectsSelected,
        subjectsSelected: student.subjectsSelected,
        examPrep: student.examType,
        lastActive: student.lastActive,
        progress: student.engagementScore || 0,
        phoneNumber: student.phoneNumber || '',
        completedOnboarding: student.completedOnboarding || false,
        goals: student.goals || [],
        studyHours: student.studyHours || 0,
        moodScore: student.moodScore || 0,
        engagementScore: student.engagementScore || 0,
        targetScore: student.targetScore || 0,
        avatarUrl: student.avatarUrl || ''
      }));
      
      setRecentStudents(convertedStudents);
      
      const logsRes = await adminService.getSystemLogs('', 1, 5);
      setRecentLogs(logsRes.data);
      
      // Fetch exam results (mock data for now)
      const mockExamResults = [
        {
          id: "exam1",
          title: "Physics Mock Test",
          studentsAttempted: 45,
          averageScore: 72,
          completionRate: 88,
          date: "2023-04-15"
        },
        {
          id: "exam2",
          title: "Chemistry Final",
          studentsAttempted: 38,
          averageScore: 68,
          completionRate: 92,
          date: "2023-04-10"
        }
      ];
      setExamResults(mockExamResults);
      
      toast({
        title: "Dashboard Loaded",
        description: "Admin dashboard data has been loaded successfully",
        variant: "default"
      });
      console.log("Dashboard data loaded successfully");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
    toast({
      title: "Refreshing Data",
      description: "Fetching the latest dashboard information",
      variant: "default"
    });
  };

  const handleShowDocs = () => {
    setActiveTab("documentation");
    navigate("/admin/docs");
  };

  if (authLoading || loading) {
    return <LoadingState />;
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage students, track performance, and analyze system metrics
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5"
              onClick={handleRefresh}
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5"
              onClick={handleShowDocs}
            >
              <FileText className="h-4 w-4" />
              API Docs
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <Sparkles className="h-4 w-4" />
              New Feature
            </Button>
          </div>
        </div>
        
        {stats && <DashboardStats stats={stats} />}
        
        {/* Make sure the DashboardTabs component is included and prominently displayed */}
        <div className="mb-6">
          <DashboardTabs stats={stats} recentStudents={recentStudents} recentLogs={recentLogs} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Students</h2>
              <DownloadDataButton 
                dataType="students"
                data={recentStudents}
                isLoading={loading}
              />
            </div>
            {/* Student table content */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{student.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{student.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(student.joinedDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">System Logs</h2>
              <DownloadDataButton 
                dataType="logs"
                data={recentLogs}
                isLoading={loading}
              />
            </div>
            {/* Logs content */}
            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="p-2 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium 
                      ${log.level === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 
                        log.level === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}>
                      {log.level}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm mt-1">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Exam Results</h2>
              <DownloadDataButton 
                dataType="exams"
                data={examResults}
                isLoading={loading}
              />
            </div>
            {/* Exam results table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg. Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {examResults.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{exam.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{exam.studentsAttempted}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{exam.averageScore}%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{exam.completionRate}%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{exam.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <DownloadDataButton 
            dataType="stats"
            data={stats}
            isLoading={loading}
            variant="default"
            size="default"
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
