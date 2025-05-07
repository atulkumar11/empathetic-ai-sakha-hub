
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Activity,
  AlertTriangle,
  BarChart,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Cpu,
  Database,
  Download,
  HardDrive,
  RefreshCcw,
  Server,
  Settings,
  Zap,
  Brain
} from "lucide-react";

const SystemMonitoringPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  // Simulate models list
  const aiModels = [
    {
      name: "Learning Style Detector",
      type: "Classification",
      status: "active",
      performance: 92,
      lastUpdated: "2023-12-18",
      endpoint: "/api/models/learning-style",
      version: "1.3.2"
    },
    {
      name: "Concept Reinforcement",
      type: "Sequential",
      status: "active",
      performance: 88,
      lastUpdated: "2023-12-15",
      endpoint: "/api/models/reinforcement",
      version: "2.1.0"
    },
    {
      name: "Difficulty Engine",
      type: "Regression",
      status: "active",
      performance: 90,
      lastUpdated: "2023-12-10",
      endpoint: "/api/models/difficulty",
      version: "1.2.5"
    },
    {
      name: "Study Plan Generator",
      type: "Sequential",
      status: "needs-tuning",
      performance: 85,
      lastUpdated: "2023-11-30",
      endpoint: "/api/models/study-plan",
      version: "0.9.8"
    },
    {
      name: "Smart Suggestions",
      type: "Recommendation",
      status: "active",
      performance: 89,
      lastUpdated: "2023-12-05",
      endpoint: "/api/models/suggestions",
      version: "1.5.1"
    },
    {
      name: "Emotional Support",
      type: "NLP",
      status: "needs-tuning",
      performance: 78,
      lastUpdated: "2023-11-20",
      endpoint: "/api/models/emotional",
      version: "0.8.7"
    }
  ];

  // Simulate error logs
  const errorLogs = [
    {
      id: "err-001",
      timestamp: "2023-12-18T14:32:45Z",
      component: "API Gateway",
      message: "Rate limit exceeded for user ID: USR-928",
      severity: "warning"
    },
    {
      id: "err-002",
      timestamp: "2023-12-18T12:15:22Z",
      component: "Authentication Service",
      message: "Failed login attempt for user: john.smith@example.com",
      severity: "info"
    },
    {
      id: "err-003",
      timestamp: "2023-12-17T23:05:11Z",
      component: "Database",
      message: "Slow query performance on students table: Query took 4.2s",
      severity: "warning"
    },
    {
      id: "err-004",
      timestamp: "2023-12-17T18:22:03Z",
      component: "Learning Style Model",
      message: "Failed to classify learning style for user ID: USR-384",
      severity: "error"
    },
    {
      id: "err-005",
      timestamp: "2023-12-16T09:11:37Z",
      component: "Content Generator",
      message: "OpenAI API returned error: Rate limit exceeded",
      severity: "error"
    }
  ];

  const handleRefreshData = () => {
    toast({
      title: "Refreshing Data",
      description: "Fetching the latest system metrics...",
      variant: "default"
    });
    
    // Simulate refresh delay
    setTimeout(() => {
      toast({
        title: "Data Refreshed",
        description: "System metrics have been updated",
        variant: "default"
      });
    }, 1500);
  };

  const handleTestModel = (modelName) => {
    toast({
      title: "Testing Model",
      description: `Connecting to ${modelName} in Flask environment...`,
      variant: "default"
    });
    
    // Simulate test process
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: `${modelName} tested successfully with 93% accuracy`,
        variant: "default"
      });
    }, 2000);
  };

  const handleUpdateModel = (modelName) => {
    toast({
      title: "Updating Model",
      description: `Initiating update for ${modelName}...`,
      variant: "default"
    });
    
    // Simulate update process
    setTimeout(() => {
      toast({
        title: "Update Complete",
        description: `${modelName} has been updated to the latest version`,
        variant: "default"
      });
    }, 2500);
  };

  const handleDownloadLogs = () => {
    toast({
      title: "Downloading Logs",
      description: "Preparing log files for download...",
      variant: "default"
    });
    
    // Simulate download process
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "System logs have been downloaded",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">System Monitoring</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor system performance, resources, and AI models
          </p>
        </div>
        
        <Button onClick={handleRefreshData} className="flex items-center gap-2">
          <RefreshCcw size={16} />
          <span>Refresh Data</span>
        </Button>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API Performance</TabsTrigger>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
          <TabsTrigger value="models">ML Models</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">API Status</p>
                  <Badge className="bg-green-600">Operational</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold">99.98%</p>
                  <p className="text-xs text-muted-foreground">Uptime last 30 days</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Database Load</p>
                  <Badge className="bg-amber-500">Moderate</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-muted-foreground">Current utilization</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">AI Processing</p>
                  <Badge className="bg-green-600">Healthy</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold">1.2s</p>
                  <p className="text-xs text-muted-foreground">Average response time</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Errors (24h)</p>
                  <Badge className="bg-red-500">5</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold">0.03%</p>
                  <p className="text-xs text-muted-foreground">Error rate</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time system performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>CPU Usage</Label>
                    <span className="text-sm">42%</span>
                  </div>
                  <Progress value={42} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Memory Usage</Label>
                    <span className="text-sm">67%</span>
                  </div>
                  <Progress value={67} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Disk I/O</Label>
                    <span className="text-sm">28%</span>
                  </div>
                  <Progress value={28} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Network</Label>
                    <span className="text-sm">54%</span>
                  </div>
                  <Progress value={54} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Servers</CardTitle>
                <CardDescription>Status of system infrastructure components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">API Server</p>
                        <p className="text-xs text-muted-foreground">api.sakha.ai</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Online</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Database Server</p>
                        <p className="text-xs text-muted-foreground">db.sakha.ai</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Online</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">AI Processing Server</p>
                        <p className="text-xs text-muted-foreground">ai.sakha.ai</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Online</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium">Storage Server</p>
                        <p className="text-xs text-muted-foreground">storage.sakha.ai</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-500">High Load</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Monitoring Server</p>
                        <p className="text-xs text-muted-foreground">monitor.sakha.ai</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Online</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* API Performance Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Performance Metrics</CardTitle>
              <CardDescription>Response times and request volume by endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Endpoint</TableHead>
                      <TableHead>Avg. Response</TableHead>
                      <TableHead>95th Percentile</TableHead>
                      <TableHead>Requests (24h)</TableHead>
                      <TableHead>Error Rate</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">/api/auth</TableCell>
                      <TableCell>245ms</TableCell>
                      <TableCell>480ms</TableCell>
                      <TableCell>24,568</TableCell>
                      <TableCell>0.02%</TableCell>
                      <TableCell><Badge className="bg-green-600">Healthy</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">/api/students</TableCell>
                      <TableCell>312ms</TableCell>
                      <TableCell>650ms</TableCell>
                      <TableCell>18,345</TableCell>
                      <TableCell>0.01%</TableCell>
                      <TableCell><Badge className="bg-green-600">Healthy</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">/api/content</TableCell>
                      <TableCell>480ms</TableCell>
                      <TableCell>950ms</TableCell>
                      <TableCell>42,673</TableCell>
                      <TableCell>0.05%</TableCell>
                      <TableCell><Badge className="bg-amber-500">Degraded</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">/api/ai/tutor</TableCell>
                      <TableCell>1.2s</TableCell>
                      <TableCell>2.4s</TableCell>
                      <TableCell>9,847</TableCell>
                      <TableCell>0.08%</TableCell>
                      <TableCell><Badge className="bg-amber-500">Degraded</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">/api/analytics</TableCell>
                      <TableCell>178ms</TableCell>
                      <TableCell>340ms</TableCell>
                      <TableCell>7,234</TableCell>
                      <TableCell>0.00%</TableCell>
                      <TableCell><Badge className="bg-green-600">Healthy</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Error Logs Tab */}
        <TabsContent value="errors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>System Error Logs</CardTitle>
                <CardDescription>Recent errors and warnings across all services</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleDownloadLogs}>
                <Download size={16} />
                <span>Download Logs</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Component</TableHead>
                      <TableHead className="w-[400px]">Message</TableHead>
                      <TableHead>Severity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errorLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">
                          {new Date(log.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>{log.component}</TableCell>
                        <TableCell className="font-mono text-xs">{log.message}</TableCell>
                        <TableCell>
                          {log.severity === "error" && (
                            <Badge className="bg-red-500">Error</Badge>
                          )}
                          {log.severity === "warning" && (
                            <Badge className="bg-amber-500">Warning</Badge>
                          )}
                          {log.severity === "info" && (
                            <Badge className="bg-blue-500">Info</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Resource Usage Tab */}
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>Server resource allocation and usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Cpu size={16} />
                      <span>CPU Usage</span>
                    </Label>
                    <span className="text-sm">42% (8/16 cores)</span>
                  </div>
                  <Progress value={42} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Server size={16} />
                      <span>Memory Usage</span>
                    </Label>
                    <span className="text-sm">12.4GB / 32GB</span>
                  </div>
                  <Progress value={38} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <HardDrive size={16} />
                      <span>Disk Usage</span>
                    </Label>
                    <span className="text-sm">420GB / 1TB</span>
                  </div>
                  <Progress value={42} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Activity size={16} />
                      <span>Network I/O</span>
                    </Label>
                    <span className="text-sm">185 Mbps / 1 Gbps</span>
                  </div>
                  <Progress value={18} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Database Resources</CardTitle>
                <CardDescription>Database performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Database size={16} />
                      <span>Database Size</span>
                    </Label>
                    <span className="text-sm">14.2GB / 50GB</span>
                  </div>
                  <Progress value={28} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Query Response Time</span>
                    </Label>
                    <span className="text-sm">42ms (avg)</span>
                  </div>
                  <Progress value={42} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Activity size={16} />
                      <span>Active Connections</span>
                    </Label>
                    <span className="text-sm">78 / 200</span>
                  </div>
                  <Progress value={39} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <BarChart size={16} />
                      <span>Index Usage</span>
                    </Label>
                    <span className="text-sm">87%</span>
                  </div>
                  <Progress value={87} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* ML Models Tab */}
        <TabsContent value="models">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Machine Learning Models</CardTitle>
                <CardDescription>AI models deployed in Flask environment</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Brain size={16} />
                  <span>Connect New Model</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Settings size={16} />
                  <span>Model Settings</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aiModels.map((model, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{model.name}</TableCell>
                        <TableCell>{model.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={model.performance} className="w-[100px]" />
                            <span>{model.performance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {model.status === "active" && (
                            <Badge className="bg-green-600">Active</Badge>
                          )}
                          {model.status === "needs-tuning" && (
                            <Badge className="bg-amber-500">Needs Tuning</Badge>
                          )}
                          {model.status === "error" && (
                            <Badge className="bg-red-500">Error</Badge>
                          )}
                        </TableCell>
                        <TableCell>{model.lastUpdated}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTestModel(model.name)}
                            >
                              Test
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateModel(model.name)}
                            >
                              Update
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Model Environment Connection</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-md bg-muted/30">
                    <div>
                      <p className="font-medium">Flask Environment</p>
                      <p className="text-sm text-muted-foreground">Connected to http://flask.sakha.ai:5000</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600 flex items-center">
                        <Check size={12} className="mr-1" /> Connected
                      </Badge>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <p className="font-medium">Auto-Retrain Schedule</p>
                        <p className="text-sm text-muted-foreground">Models retrained weekly</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <p className="font-medium">Performance Monitoring</p>
                        <p className="text-sm text-muted-foreground">Alert when below 85%</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default SystemMonitoringPage;
