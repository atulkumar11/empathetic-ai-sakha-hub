
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  AlertTriangle,
  Check,
  Database,
  FileDown,
  GitMerge,
  Loader2,
  RefreshCw,
  Server,
  Settings,
  X
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const MLModelManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("deployed");
  const [testingModel, setTestingModel] = useState(false);
  const [deployingModel, setDeployingModel] = useState(false);
  const [showAddModelForm, setShowAddModelForm] = useState(false);
  const [modelName, setModelName] = useState("");
  const [modelType, setModelType] = useState("sentiment");
  const [modelVersion, setModelVersion] = useState("");
  const [flaskEnvironment, setFlaskEnvironment] = useState("production");

  const handleModelTest = (id: string, name: string) => {
    setTestingModel(true);
    
    toast({
      title: "Testing Model",
      description: `Running test for ${name}...`,
      variant: "default",
    });
    
    // Simulate API call
    setTimeout(() => {
      setTestingModel(false);
      toast({
        title: "Test Complete",
        description: `Model ${name} passed all tests.`,
        variant: "default",
      });
    }, 2000);
  };
  
  const handleModelDeploy = (id: string, name: string, environment: string) => {
    setDeployingModel(true);
    
    toast({
      title: "Deploying Model",
      description: `Deploying ${name} to ${environment}...`,
      variant: "default",
    });
    
    // Simulate API call
    setTimeout(() => {
      setDeployingModel(false);
      toast({
        title: "Deployment Complete",
        description: `Model ${name} has been successfully deployed to ${environment}.`,
        variant: "default",
      });
    }, 3000);
  };
  
  const handleAddNewModel = () => {
    if (!modelName || !modelVersion) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Adding New Model",
      description: "Processing your request...",
      variant: "default",
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Model Added",
        description: `${modelName} v${modelVersion} has been added successfully.`,
        variant: "default",
      });
      
      // Reset form
      setModelName("");
      setModelVersion("");
      setModelType("sentiment");
      setShowAddModelForm(false);
    }, 1500);
  };
  
  const handleUpdateFlaskEnvironment = () => {
    toast({
      title: "Updating Flask Environment",
      description: `Switching environment to ${flaskEnvironment}...`,
      variant: "default",
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Environment Updated",
        description: `Flask environment has been set to ${flaskEnvironment}.`,
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">ML Model Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage, test and deploy machine learning models
          </p>
        </div>
        
        <div className="space-x-2">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowAddModelForm(!showAddModelForm)}
          >
            {showAddModelForm ? <X size={16} /> : <Settings size={16} />}
            {showAddModelForm ? "Cancel" : "Add New Model"}
          </Button>
          
          <Button 
            variant="default" 
            className="flex items-center gap-2"
            onClick={handleUpdateFlaskEnvironment}
          >
            <RefreshCw size={16} />
            Update Flask Environment
          </Button>
        </div>
      </div>
      
      {showAddModelForm && (
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Add New ML Model</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="model-name" className="mb-1 block">Model Name *</Label>
              <Input
                id="model-name"
                placeholder="Enter model name"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="model-type" className="mb-1 block">Model Type *</Label>
              <Select value={modelType} onValueChange={setModelType}>
                <SelectTrigger id="model-type">
                  <SelectValue placeholder="Select model type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sentiment">Sentiment Analysis</SelectItem>
                  <SelectItem value="classification">Classification</SelectItem>
                  <SelectItem value="nlp">Natural Language Processing</SelectItem>
                  <SelectItem value="custom">Custom Model</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="model-version" className="mb-1 block">Version *</Label>
              <Input
                id="model-version"
                placeholder="e.g., 1.0.0"
                value={modelVersion}
                onChange={(e) => setModelVersion(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="flask-env" className="mb-1 block">Flask Environment</Label>
              <Select value={flaskEnvironment} onValueChange={setFlaskEnvironment}>
                <SelectTrigger id="flask-env">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="default"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleAddNewModel}
            >
              Add Model
            </Button>
          </div>
        </Card>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <TabsList className="flex h-10 items-center p-0 bg-transparent">
              <TabsTrigger 
                value="deployed" 
                className="h-10 px-4 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none"
              >
                Deployed Models
              </TabsTrigger>
              <TabsTrigger 
                value="available" 
                className="h-10 px-4 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none"
              >
                Available Models
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="h-10 px-4 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none"
              >
                Environment Settings
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="deployed" className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Model Name</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Version</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Last Updated</th>
                    <th className="text-left py-3 px-4 font-medium">Environment</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                    <td className="py-3 px-4">Sentiment Analyzer</td>
                    <td className="py-3 px-4">Sentiment Analysis</td>
                    <td className="py-3 px-4">2.3.1</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <Check size={12} className="mr-1" /> Active
                      </span>
                    </td>
                    <td className="py-3 px-4">2025-04-05</td>
                    <td className="py-3 px-4">Production</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleModelTest("1", "Sentiment Analyzer")}>
                          Test
                        </Button>
                        <Button variant="outline" size="sm" className="text-blue-600">
                          Configure
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                    <td className="py-3 px-4">Learning Style Detector</td>
                    <td className="py-3 px-4">Classification</td>
                    <td className="py-3 px-4">1.5.0</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <Check size={12} className="mr-1" /> Active
                      </span>
                    </td>
                    <td className="py-3 px-4">2025-04-01</td>
                    <td className="py-3 px-4">Production</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleModelTest("2", "Learning Style Detector")}>
                          Test
                        </Button>
                        <Button variant="outline" size="sm" className="text-blue-600">
                          Configure
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                    <td className="py-3 px-4">Question Generator</td>
                    <td className="py-3 px-4">NLP</td>
                    <td className="py-3 px-4">3.0.2</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <AlertTriangle size={12} className="mr-1" /> Needs Update
                      </span>
                    </td>
                    <td className="py-3 px-4">2025-03-15</td>
                    <td className="py-3 px-4">Production</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleModelTest("3", "Question Generator")}>
                          Test
                        </Button>
                        <Button variant="outline" size="sm" className="text-yellow-600">
                          Update
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="available" className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Model Name</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Version</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Environment</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                    <td className="py-3 px-4">Question Generator</td>
                    <td className="py-3 px-4">NLP</td>
                    <td className="py-3 px-4">3.1.0</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        Ready to Deploy
                      </span>
                    </td>
                    <td className="py-3 px-4">Testing</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="bg-indigo-600 hover:bg-indigo-700"
                          onClick={() => handleModelDeploy("4", "Question Generator v3.1.0", "Production")}
                          disabled={deployingModel}
                        >
                          {deployingModel ? (
                            <>
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              Deploying
                            </>
                          ) : (
                            <>Deploy</>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/10">
                    <td className="py-3 px-4">Study Plan Generator</td>
                    <td className="py-3 px-4">NLP</td>
                    <td className="py-3 px-4">1.0.0</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Testing
                      </span>
                    </td>
                    <td className="py-3 px-4">Development</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleModelTest("5", "Study Plan Generator")}>
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Flask Environment Configuration</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-medium">Environment</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current: {flaskEnvironment}</p>
                    </div>
                    <Select value={flaskEnvironment} onValueChange={setFlaskEnvironment}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="testing">Testing</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-medium">Debug Mode</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enable debug logs and verbose output</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-medium">Auto-reload</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Automatically reload on code changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button 
                    className="w-full mt-2" 
                    onClick={handleUpdateFlaskEnvironment}
                  >
                    <Server className="mr-2 h-4 w-4" />
                    Update Flask Environment
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Database & Storage</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-medium">Database Connection</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">PostgreSQL</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <Check size={12} className="mr-1" /> Connected
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-medium">Model Storage</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">S3 Bucket</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <Check size={12} className="mr-1" /> Active
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-medium">Cache Server</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Redis</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <Check size={12} className="mr-1" /> Active
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" className="flex items-center gap-1">
                      <Database className="h-4 w-4" />
                      Test Connections
                    </Button>
                    <Button variant="outline" className="flex items-center gap-1">
                      <FileDown className="h-4 w-4" />
                      Get Logs
                    </Button>
                  </div>
                  
                  <Button 
                    variant="default" 
                    className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <GitMerge className="mr-2 h-4 w-4" />
                    Synchronize Environments
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

export default MLModelManagement;
