
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Activity,
  AlertTriangle,
  Check,
  Clock,
  Database,
  ExternalLink,
  Loader2,
  PlayCircle,
  Power,
  RefreshCw,
} from "lucide-react";
import { apiEndpointChecker } from "@/services/api/apiEndpointChecker";

const APIPerformance = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("monitoring");
  const [customEndpoint, setCustomEndpoint] = useState("");
  const [testingEndpoint, setTestingEndpoint] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const testEndpoint = async () => {
    if (!customEndpoint) {
      toast({
        title: "Missing Endpoint",
        description: "Please enter an endpoint URL to test",
        variant: "destructive"
      });
      return;
    }

    setTestingEndpoint(true);
    
    try {
      // Using our apiEndpointChecker utility
      const result = await apiEndpointChecker.checkEndpoint(customEndpoint);
      
      setTestResults(result);
      
      toast({
        title: result.exists ? "Endpoint Available" : "Endpoint Not Found",
        description: result.message,
        variant: result.exists ? "default" : "destructive"
      });
    } catch (error) {
      console.error("Error testing endpoint:", error);
      setTestResults({
        exists: false,
        message: "Error testing endpoint. Check console for details."
      });
      
      toast({
        title: "Test Failed",
        description: "Error testing endpoint. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setTestingEndpoint(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    
    toast({
      title: "Refreshing API Data",
      description: "Fetching latest performance metrics...",
      variant: "default"
    });
    
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      
      toast({
        title: "Refresh Complete",
        description: "API performance data has been updated",
        variant: "default"
      });
    }, 1500);
  };
  
  const handleRestart = (serviceName: string) => {
    toast({
      title: "Restarting Service",
      description: `Restarting ${serviceName}...`,
      variant: "default"
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Service Restarted",
        description: `${serviceName} has been restarted successfully`,
        variant: "default"
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">API Performance</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitor and test API endpoints and service performance
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant={showForm ? "secondary" : "outline"} 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Test Form" : "Test Endpoint"}
          </Button>
          
          <Button 
            variant="default" 
            onClick={handleRefresh} 
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh Data
          </Button>
        </div>
      </div>
      
      {showForm && (
        <Card className="p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Test API Endpoint</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="endpoint-url" className="mb-1 block">Endpoint URL</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="endpoint-url"
                  placeholder="https://api.example.com/v1/resource"
                  value={customEndpoint}
                  onChange={(e) => setCustomEndpoint(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={testEndpoint} 
                  disabled={testingEndpoint}
                >
                  {testingEndpoint ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Test
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Enter a complete URL including protocol (http/https)
              </p>
            </div>
            
            {testResults && (
              <div className={`p-4 rounded-lg ${
                testResults.exists 
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" 
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              }`}>
                <div className="flex items-center">
                  {testResults.exists ? (
                    <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500 mr-2" />
                  )}
                  <h4 className={`font-medium ${
                    testResults.exists 
                      ? "text-green-800 dark:text-green-300" 
                      : "text-red-800 dark:text-red-300"
                  }`}>
                    {testResults.exists ? "Endpoint Available" : "Endpoint Not Found"}
                  </h4>
                </div>
                <p className={`mt-1 text-sm ${
                  testResults.exists 
                    ? "text-green-700 dark:text-green-400" 
                    : "text-red-700 dark:text-red-400"
                }`}>
                  {testResults.message}
                </p>
                {testResults.status && (
                  <p className="mt-1 text-sm font-mono">
                    Status: <span className="font-bold">{testResults.status}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <TabsList className="flex h-10 items-center p-0 bg-transparent">
              <TabsTrigger 
                value="monitoring" 
                className="h-10 px-4 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none"
              >
                API Monitoring
              </TabsTrigger>
              <TabsTrigger 
                value="latency" 
                className="h-10 px-4 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none"
              >
                Latency Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="h-10 px-4 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none"
              >
                Service Status
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="monitoring" className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Endpoint</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Avg Response</th>
                    <th className="text-left py-3 px-4 font-medium">Uptime</th>
                    <th className="text-left py-3 px-4 font-medium">Last Check</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                    <td className="py-3 px-4">/api/students/{"{id}"}/profile</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <Check size={12} className="mr-1" /> Available
                      </span>
                    </td>
                    <td className="py-3 px-4">120ms</td>
                    <td className="py-3 px-4">99.9%</td>
                    <td className="py-3 px-4">5 min ago</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <PlayCircle size={14} className="mr-1" />
                        Test
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                    <td className="py-3 px-4">/api/students/{"{id}"}/study-plan</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <Check size={12} className="mr-1" /> Available
                      </span>
                    </td>
                    <td className="py-3 px-4">215ms</td>
                    <td className="py-3 px-4">99.7%</td>
                    <td className="py-3 px-4">5 min ago</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <PlayCircle size={14} className="mr-1" />
                        Test
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                    <td className="py-3 px-4">/api/content/generate</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        <AlertTriangle size={12} className="mr-1" /> Error
                      </span>
                    </td>
                    <td className="py-3 px-4">382ms</td>
                    <td className="py-3 px-4">97.5%</td>
                    <td className="py-3 px-4">5 min ago</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600">
                        <AlertTriangle size={14} className="mr-1" />
                        View Errors
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                    <td className="py-3 px-4">/api/ai/analyze-mood</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <Clock size={12} className="mr-1" /> Slow
                      </span>
                    </td>
                    <td className="py-3 px-4">890ms</td>
                    <td className="py-3 px-4">99.2%</td>
                    <td className="py-3 px-4">5 min ago</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Activity size={14} className="mr-1" />
                        Optimize
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="latency" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-medium mb-1">Average Response Time</h3>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">210ms</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Across all endpoints</p>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-medium mb-1">Slowest Endpoint</h3>
                  <p className="text-xl font-bold text-amber-600 dark:text-amber-400 truncate">/api/ai/analyze-mood</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">890ms average response time</p>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-medium mb-1">Error Rate</h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">0.8%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last 24 hours</p>
                </div>
              </Card>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Endpoints by Response Time</h3>
              <Select defaultValue="24h">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="6h">6 hours</SelectItem>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              {[
                { name: "/api/ai/analyze-mood", time: 890, limit: 1000 },
                { name: "/api/content/generate", time: 382, limit: 500 },
                { name: "/api/students/{id}/study-plan", time: 215, limit: 300 },
                { name: "/api/students/{id}/profile", time: 120, limit: 200 }
              ].map(endpoint => (
                <div key={endpoint.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{endpoint.name}</span>
                    <span className="font-mono">{endpoint.time}ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className={`h-2.5 rounded-full ${
                        endpoint.time > endpoint.limit ? "bg-red-600" : 
                        endpoint.time > endpoint.limit * 0.8 ? "bg-yellow-500" : "bg-green-600"
                      }`} 
                      style={{ width: `${Math.min(100, endpoint.time / 10)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end text-xs text-gray-500">
                    Limit: {endpoint.limit}ms
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">API Gateway</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Main API Service</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <Check size={12} className="mr-1" /> Online
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CPU Usage</span>
                    <span>12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory</span>
                    <span>456MB / 2GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <span>15d 7h 32m</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ExternalLink size={14} />
                    Logs
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleRestart("API Gateway")}
                  >
                    <Power size={14} />
                    Restart
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">Flask ML Server</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Machine Learning Service</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <Check size={12} className="mr-1" /> Online
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CPU Usage</span>
                    <span>67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory</span>
                    <span>1.8GB / 4GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <span>8d 14h 45m</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ExternalLink size={14} />
                    Logs
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleRestart("Flask ML Server")}
                  >
                    <Power size={14} />
                    Restart
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">Database Server</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PostgreSQL Database</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <Check size={12} className="mr-1" /> Online
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CPU Usage</span>
                    <span>28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory</span>
                    <span>3.2GB / 8GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <span>30d 2h 18m</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Database size={14} />
                    Status
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 text-yellow-600"
                    onClick={() => handleRestart("Database Server")}
                  >
                    <AlertTriangle size={14} />
                    Maintenance
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default APIPerformance;
