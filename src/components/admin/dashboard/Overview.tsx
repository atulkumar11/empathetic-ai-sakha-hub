
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDown, Users, BookOpen, Brain, Award, Activity } from 'lucide-react';

// Mock data for student engagement metrics
const studentEngagementData = [
  { name: 'Mon', active: 40, completed: 24 },
  { name: 'Tue', active: 30, completed: 28 },
  { name: 'Wed', active: 50, completed: 35 },
  { name: 'Thu', active: 40, completed: 38 },
  { name: 'Fri', active: 60, completed: 42 },
  { name: 'Sat', active: 70, completed: 45 },
  { name: 'Sun', active: 80, completed: 30 }
];

// Mock data for content usage
const contentUsageData = [
  { name: 'Jan', concepts: 4000, flashcards: 2400, exams: 1400 },
  { name: 'Feb', concepts: 3000, flashcards: 1398, exams: 2210 },
  { name: 'Mar', concepts: 2000, flashcards: 9800, exams: 2290 },
  { name: 'Apr', concepts: 2780, flashcards: 3908, exams: 2000 },
  { name: 'May', concepts: 1890, flashcards: 4800, exams: 2181 },
  { name: 'Jun', concepts: 2390, flashcards: 3800, exams: 2500 }
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard Overview</h1>
      
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 12%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Content</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,256</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 8%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Learning Sessions</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,580</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-red-500 flex items-center mr-1">
                <ArrowDown className="h-3 w-3 mr-1" /> 3%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Achievements Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,763</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 16%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="active" stroke="#8884d8" activeDot={{ r: 8 }} name="Active Students" />
                  <Line type="monotone" dataKey="completed" stroke="#82ca9d" name="Completed Sessions" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Content Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="concepts" fill="#8884d8" name="Concept Cards" />
                  <Bar dataKey="flashcards" fill="#82ca9d" name="Flashcards" />
                  <Bar dataKey="exams" fill="#ffc658" name="Practice Exams" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Database Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle>Database & API Sync Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Student Records</p>
                  <Badge className="bg-green-100 text-green-800 border-green-300">Synced</Badge>
                </div>
                <div className="text-sm text-gray-500">Last synced: Today, 10:24 AM</div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Content Library</p>
                  <Badge className="bg-green-100 text-green-800 border-green-300">Synced</Badge>
                </div>
                <div className="text-sm text-gray-500">Last synced: Today, 10:15 AM</div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Learning Analytics</p>
                  <Badge className="bg-green-100 text-green-800 border-green-300">Synced</Badge>
                </div>
                <div className="text-sm text-gray-500">Last synced: Today, 10:18 AM</div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">API Endpoints</p>
                  <Badge className="bg-green-100 text-green-800 border-green-300">Active</Badge>
                </div>
                <div className="text-sm text-gray-500">20/20 endpoints online</div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Activity className="h-4 w-4 mr-2" />
              View Detailed Sync Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`px-2 py-1 text-xs rounded ${className || ''}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant, className }: { children: React.ReactNode, variant?: string, className?: string }) => {
  return (
    <button 
      className={`px-4 py-2 rounded text-sm font-medium flex items-center justify-center ${
        variant === 'outline' 
          ? 'border border-gray-300 hover:bg-gray-50' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Overview;
