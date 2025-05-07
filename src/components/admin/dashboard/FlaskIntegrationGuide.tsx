
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, FileCog, Code, Server, 
  Brain, Database, Network, Puzzle, 
  ListChecks, FileJson, ArrowRight, RefreshCw,
  Check, Play, BookOpen, ExternalLink, Copy, MessageSquare
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FlaskIntegrationGuide = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [testingEndpoint, setTestingEndpoint] = useState("");
  const [testResult, setTestResult] = useState<null | { success: boolean; message: string }>(null);
  const [isTesting, setIsTesting] = useState(false);
  
  const handleDownloadGuide = () => {
    toast({
      title: "Downloading Integration Guide",
      description: "Preparing the comprehensive Flask integration documentation",
      variant: "default"
    });
    
    setTimeout(() => {
      const jsonContent = JSON.stringify({
        title: "Flask Integration Guide",
        version: "1.2.0",
        sections: [
          "Setup & Installation",
          "API Configuration",
          "Database Connection",
          "AI Model Integration",
          "Security Best Practices",
          "Deployment Guide"
        ],
        content: "Full documentation content would be here..."
      }, null, 2);
      
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flask-integration-guide.json';
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Complete",
        description: "Flask integration guide has been downloaded successfully",
        variant: "default"
      });
    }, 1500);
  };
  
  const handleCopyEndpoint = (endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    toast({
      title: "Endpoint Copied",
      description: "API endpoint copied to clipboard",
      variant: "default"
    });
  };
  
  const handleDownloadSchemas = () => {
    toast({
      title: "Downloading Schema Documentation",
      description: "Preparing database schema documentation",
      variant: "default"
    });
    
    setTimeout(() => {
      const jsonContent = JSON.stringify({
        title: "Database Schema Documentation",
        version: "1.3.1",
        tables: [
          {
            name: "users",
            columns: [
              { name: "id", type: "UUID", primaryKey: true },
              { name: "name", type: "VARCHAR(255)" },
              { name: "email", type: "VARCHAR(255)", unique: true },
              { name: "created_at", type: "TIMESTAMP" }
            ]
          },
          {
            name: "study_plans",
            columns: [
              { name: "id", type: "UUID", primaryKey: true },
              { name: "user_id", type: "UUID", foreignKey: "users.id" },
              { name: "title", type: "VARCHAR(255)" },
              { name: "created_at", type: "TIMESTAMP" }
            ]
          }
        ]
      }, null, 2);
      
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'database-schemas.json';
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Complete",
        description: "Database schema documentation has been downloaded successfully",
        variant: "default"
      });
    }, 1500);
  };

  const handleTestEndpoint = () => {
    if (!testingEndpoint) {
      toast({
        title: "Error",
        description: "Please enter an endpoint to test",
        variant: "destructive"
      });
      return;
    }
    
    setIsTesting(true);
    setTestResult(null);
    
    // Simulate API testing
    setTimeout(() => {
      setIsTesting(false);
      
      // Simple validation for demo
      if (testingEndpoint.startsWith('/api/v1/') || testingEndpoint.startsWith('http')) {
        setTestResult({
          success: true,
          message: "Endpoint successfully tested. Status: 200 OK"
        });
        toast({
          title: "Test Successful",
          description: "API endpoint is available and responding properly",
          variant: "default"
        });
      } else {
        setTestResult({
          success: false,
          message: "Invalid endpoint format or endpoint not found. Status: 404"
        });
        toast({
          title: "Test Failed",
          description: "API endpoint test failed",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  // API endpoints data
  const apiEndpoints = [
    { 
      method: "GET", 
      endpoint: "/api/v1/students", 
      description: "Retrieve all students with pagination",
      authenticated: true
    },
    { 
      method: "POST", 
      endpoint: "/api/v1/students", 
      description: "Create a new student",
      authenticated: true
    },
    { 
      method: "GET", 
      endpoint: "/api/v1/students/:id", 
      description: "Retrieve a specific student by ID",
      authenticated: true
    },
    { 
      method: "PUT", 
      endpoint: "/api/v1/students/:id", 
      description: "Update a specific student",
      authenticated: true
    },
    { 
      method: "POST", 
      endpoint: "/api/v1/auth/login", 
      description: "Authenticate a user",
      authenticated: false
    },
    { 
      method: "POST", 
      endpoint: "/api/v1/auth/register", 
      description: "Register a new user",
      authenticated: false
    },
    { 
      method: "POST", 
      endpoint: "/api/v1/content/upload", 
      description: "Upload content files",
      authenticated: true
    },
    { 
      method: "GET", 
      endpoint: "/api/v1/content", 
      description: "Get all content files with pagination",
      authenticated: true
    },
    { 
      method: "GET", 
      endpoint: "/api/v1/admin/dashboard", 
      description: "Get admin dashboard statistics",
      authenticated: true,
      adminOnly: true
    }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Server className="text-purple-500" />
          Flask Environment Integration
        </CardTitle>
        <CardDescription>
          Guide for seamlessly connecting your Sakha admin dashboard with Flask backend services
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-6">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex items-center gap-2 flex-1">
              <Code size={16} />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="endpoints" className="flex items-center gap-2 flex-1">
              <Server size={16} />
              <span>API Endpoints</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2 flex-1">
              <Database size={16} />
              <span>Database Schema</span>
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center gap-2 flex-1">
              <Play size={16} />
              <span>Testing</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2 flex-1">
              <BookOpen size={16} />
              <span>Documentation</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="space-y-6 mt-6">
          <TabsContent value="overview" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Code className="text-blue-500" />
                  Integration Steps
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li className="pb-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Clone the Flask repository</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Our Flask backend is pre-configured with necessary models and database connections.
                      </p>
                    </li>
                    <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Set up the Python environment</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Use Python 3.9+ and install dependencies from requirements.txt
                      </p>
                    </li>
                    <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Configure environment variables</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Set API keys, database URIs, and other required configuration
                      </p>
                    </li>
                    <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Run database migrations</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Use Flask-Migrate to initialize and update database schema
                      </p>
                    </li>
                    <li className="pt-3">
                      <span className="font-medium">Start Flask development server</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Run the application and connect with React frontend
                      </p>
                    </li>
                  </ol>
                </div>
                
                <div className="flex justify-between mt-2">
                  <Button 
                    className="gap-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                    onClick={handleDownloadGuide}
                  >
                    <Download size={16} />
                    Download Complete Guide
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      window.open("https://github.com/flask-projects/ai-flask-template", "_blank");
                    }}
                  >
                    <Code size={16} />
                    View Sample Code
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Database className="text-green-500" />
                  API Structure & Database
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Key API Endpoints</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <Badge className="bg-green-100 text-green-800 mr-2 mt-1">GET</Badge>
                      <div>
                        <p className="font-mono">/api/v1/students</p>
                        <p className="text-xs text-gray-600">Retrieve student data with pagination</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Badge className="bg-blue-100 text-blue-800 mr-2 mt-1">POST</Badge>
                      <div>
                        <p className="font-mono">/api/v1/ai/personalize</p>
                        <p className="text-xs text-gray-600">Generate personalized learning content</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Badge className="bg-purple-100 text-purple-800 mr-2 mt-1">POST</Badge>
                      <div>
                        <p className="font-mono">/api/v1/content/upload</p>
                        <p className="text-xs text-gray-600">Upload and process study materials</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Badge className="bg-amber-100 text-amber-800 mr-2 mt-1">GET</Badge>
                      <div>
                        <p className="font-mono">/api/v1/analytics/dashboard</p>
                        <p className="text-xs text-gray-600">Retrieve dashboard stats and metrics</p>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mt-4 mb-2">Database Schema</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    The database is designed to maintain consistency between admin and student views.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex justify-between items-center"
                    onClick={handleDownloadSchemas}
                  >
                    <span className="flex items-center gap-2">
                      <FileJson size={16} className="text-blue-500" />
                      Download Database Schemas
                    </span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-4 rounded-lg border border-purple-100 dark:border-purple-900/50">
                  <h4 className="font-medium flex items-center gap-2">
                    <Brain className="text-purple-500" />
                    AI Model Integration
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Our Flask backend includes pre-configured connectors for various AI models and endpoints required for the personalization features.
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Puzzle className="text-purple-500" size={14} />
                      <span>Sentiment analysis & emotional tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Puzzle className="text-purple-500" size={14} />
                      <span>Learning style detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Puzzle className="text-purple-500" size={14} />
                      <span>Content generation & personalization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints" className="m-0">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-3">API Endpoints</h3>
                <p className="text-sm mb-4">
                  These endpoints are configured in your Flask backend and available for use in the frontend application.
                </p>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Method</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Auth Required</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiEndpoints.map((endpoint, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge className={
                              endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                              endpoint.method === 'PUT' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {endpoint.method}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{endpoint.endpoint}</TableCell>
                          <TableCell>{endpoint.description}</TableCell>
                          <TableCell>
                            {endpoint.authenticated ? (
                              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                                {endpoint.adminOnly ? "Admin Only" : "Yes"}
                              </Badge>
                            ) : (
                              <Badge variant="outline">Public</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleCopyEndpoint(endpoint.endpoint)}
                            >
                              <Copy size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="database" className="m-0">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Database Structure</h3>
                <p className="text-sm mb-4">
                  The database schema is designed to support all features of the Sakha AI platform, with tables for users, content, analytics, and more.
                </p>
                
                <img 
                  src="https://via.placeholder.com/800x400?text=Database+Schema+Diagram" 
                  alt="Database Schema"
                  className="w-full rounded-lg border border-gray-200 mb-4"
                />
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleDownloadSchemas} 
                    className="gap-2"
                  >
                    <Download size={16} />
                    Download Schema Documentation
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Core Tables</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="font-medium">users</span>
                      <Badge>12 columns</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium">study_plans</span>
                      <Badge>8 columns</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium">content_items</span>
                      <Badge>14 columns</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium">student_progress</span>
                      <Badge>10 columns</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium">mood_logs</span>
                      <Badge>7 columns</Badge>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Relationships</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>users → study_plans</span>
                      <Badge variant="outline">One-to-Many</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>users → mood_logs</span>
                      <Badge variant="outline">One-to-Many</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>study_plans → content_items</span>
                      <Badge variant="outline">Many-to-Many</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>users → student_progress</span>
                      <Badge variant="outline">One-to-One</Badge>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="testing" className="m-0">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-3">API Endpoint Testing</h3>
                <p className="text-sm mb-4">
                  Test your API endpoints to ensure they are properly configured and responding as expected.
                </p>
                
                <div className="flex gap-2 mb-4">
                  <Input 
                    placeholder="Enter API endpoint (e.g., /api/v1/students)" 
                    value={testingEndpoint}
                    onChange={(e) => setTestingEndpoint(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleTestEndpoint}
                    disabled={isTesting}
                    className="gap-2"
                  >
                    {isTesting ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
                    {isTesting ? "Testing..." : "Test Endpoint"}
                  </Button>
                </div>
                
                {testResult && (
                  <div className={`p-4 rounded-lg mt-4 ${testResult.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    <div className="flex items-center gap-2">
                      {testResult.success ? (
                        <Check className="text-green-500" size={18} />
                      ) : (
                        <RefreshCw className="text-red-500" size={18} />
                      )}
                      <span className="font-medium">{testResult.message}</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Quick Test Common Endpoints</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setTestingEndpoint('/api/v1/students')}
                    >
                      <Server className="mr-2 h-4 w-4 text-green-500" />
                      /api/v1/students
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setTestingEndpoint('/api/v1/auth/login')}
                    >
                      <Server className="mr-2 h-4 w-4 text-blue-500" />
                      /api/v1/auth/login
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setTestingEndpoint('/api/v1/content/upload')}
                    >
                      <Server className="mr-2 h-4 w-4 text-purple-500" />
                      /api/v1/content/upload
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setTestingEndpoint('/api/v1/admin/dashboard')}
                    >
                      <Server className="mr-2 h-4 w-4 text-amber-500" />
                      /api/v1/admin/dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="docs" className="m-0">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Available Documentation</h3>
                <p className="text-sm mb-4">
                  Download comprehensive documentation for different aspects of the Sakha AI platform integration.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <BookOpen className="text-blue-500" size={18} />
                        Getting Started Guide
                      </CardTitle>
                      <CardDescription>For new administrators</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full flex justify-between">
                        <span>Download PDF</span>
                        <Download size={14} />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Brain className="text-purple-500" size={18} />
                        AI Model Management
                      </CardTitle>
                      <CardDescription>Configuration & personalization</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full flex justify-between">
                        <span>Download PDF</span>
                        <Download size={14} />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <BookOpen className="text-green-500" size={18} />
                        Content Management
                      </CardTitle>
                      <CardDescription>Content creation workflow</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full flex justify-between">
                        <span>Download PDF</span>
                        <Download size={14} />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Network className="text-amber-500" size={18} />
                        Technical Documentation
                      </CardTitle>
                      <CardDescription>System, API, database & security</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full flex justify-between">
                        <span>Download PDF</span>
                        <Download size={14} />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">External Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Flask Documentation</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                        <ExternalLink size={12} />
                        Visit
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>SQLAlchemy ORM Guide</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                        <ExternalLink size={12} />
                        Visit
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>React Integration Examples</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                        <ExternalLink size={12} />
                        Visit
                      </Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>LangChain Documentation</span>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                        <ExternalLink size={12} />
                        Visit
                      </Button>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-4 rounded-lg border border-purple-100 dark:border-purple-900/50">
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <MessageSquare className="text-purple-500" />
                    Need Help?
                  </h4>
                  <p className="text-sm mb-4">
                    Our technical support team is available to help with any integration questions or issues.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white w-full">
                    Contact Support Team
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t pt-4 mt-4 flex flex-wrap justify-between gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button variant="outline" className="justify-start text-xs h-8">
            <ListChecks className="mr-2 h-4 w-4 text-green-500" />
            Technical Documentation
          </Button>
          <Button variant="outline" className="justify-start text-xs h-8">
            <Network className="mr-2 h-4 w-4 text-blue-500" />
            Developer Community
          </Button>
          <Button variant="outline" className="justify-start text-xs h-8">
            <FileCog className="mr-2 h-4 w-4 text-purple-500" />
            Integration Guide
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FlaskIntegrationGuide;
