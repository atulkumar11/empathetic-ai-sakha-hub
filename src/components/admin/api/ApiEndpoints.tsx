
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, Globe, Settings, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiEndpointService from "@/services/admin/apiEndpointService";

const ApiEndpoints = () => {
  const [apiGroups, setApiGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [endpointDetails, setEndpointDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Load API endpoints
  useEffect(() => {
    const loadEndpoints = async () => {
      try {
        setLoading(true);
        const data = await apiEndpointService.getApiEndpoints();
        setApiGroups(data);
        if (data.length > 0) {
          setSelectedGroup(data[0].id);
        }
      } catch (error) {
        console.error("Error loading API endpoints:", error);
        toast({
          title: "Failed to load API endpoints",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadEndpoints();
  }, [toast]);

  // Get the selected group endpoints
  const selectedGroupData = apiGroups.find(group => group.id === selectedGroup);
  
  // Filter endpoints based on search query
  const filteredEndpoints = selectedGroupData ? selectedGroupData.endpoints.filter((endpoint: any) => 
    endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    endpoint.method.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  // Handle toggling endpoint status
  const handleToggleEndpoint = async (endpointId: string, isActive: boolean) => {
    try {
      await apiEndpointService.updateEndpointStatus(endpointId, !isActive);
      
      // Update the local state
      setApiGroups(prev => prev.map(group => ({
        ...group,
        endpoints: group.endpoints.map((endpoint: any) => 
          endpoint.id === endpointId ? { ...endpoint, isActive: !isActive } : endpoint
        )
      })));
      
      toast({
        title: `Endpoint ${!isActive ? 'Activated' : 'Deactivated'}`,
        description: `The endpoint has been ${!isActive ? 'activated' : 'deactivated'} successfully.`
      });
    } catch (error) {
      console.error("Error updating endpoint status:", error);
      toast({
        title: "Failed to update endpoint",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  // Handle viewing endpoint details
  const handleViewDetails = async (endpointId: string) => {
    try {
      const details = await apiEndpointService.getEndpointDetails(endpointId);
      setEndpointDetails(details);
    } catch (error) {
      console.error("Error loading endpoint details:", error);
      toast({
        title: "Failed to load endpoint details",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  // Close endpoint details panel
  const closeDetails = () => {
    setEndpointDetails(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">API Endpoints</h2>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search endpoints..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-[250px]"
            />
          </div>
        </div>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>API Management</CardTitle>
          <CardDescription>
            Manage API endpoints connecting student and admin dashboards
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {loading && apiGroups.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              Loading API endpoints...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs 
                  value={selectedGroup}
                  onValueChange={setSelectedGroup}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
                    {apiGroups.map(group => (
                      <TabsTrigger key={group.id} value={group.id}>
                        {group.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {apiGroups.map(group => (
                    <TabsContent key={group.id} value={group.id}>
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center">
                            <CardTitle>{group.name}</CardTitle>
                            <Badge 
                              className={`${
                                group.status === 'active' 
                                  ? 'bg-green-100 text-green-800 border-green-300' 
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                              }`}
                            >
                              {group.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[50px]">Method</TableHead>
                                  <TableHead className="w-[300px]">Path</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredEndpoints.length > 0 ? (
                                  filteredEndpoints.map((endpoint: any) => (
                                    <TableRow key={endpoint.id}>
                                      <TableCell>
                                        <Badge 
                                          className={`${
                                            endpoint.method === 'GET' 
                                              ? 'bg-blue-100 text-blue-800 border-blue-300' 
                                              : endpoint.method === 'POST'
                                                ? 'bg-green-100 text-green-800 border-green-300'
                                                : endpoint.method === 'PUT'
                                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                                  : 'bg-red-100 text-red-800 border-red-300'
                                          }`}
                                        >
                                          {endpoint.method}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="font-medium flex items-center">
                                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                                        {endpoint.path}
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex items-center space-x-2">
                                          <Switch
                                            id={`endpoint-toggle-${endpoint.id}`}
                                            checked={endpoint.isActive}
                                            onCheckedChange={() => handleToggleEndpoint(endpoint.id, endpoint.isActive)}
                                          />
                                          <span className={endpoint.isActive ? "text-green-600" : "text-gray-400"}>
                                            {endpoint.isActive ? "Active" : "Inactive"}
                                          </span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right space-x-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => handleViewDetails(endpoint.id)}
                                        >
                                          Details
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                      {searchQuery ? 'No endpoints match your search' : 'No endpoints available'}
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
              
              <div className="lg:col-span-1">
                {endpointDetails ? (
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex justify-between">
                        <span>Endpoint Details</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={closeDetails}
                          className="h-6 w-6"
                        >
                          <span aria-hidden="true">&times;</span>
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-1">Path</h3>
                          <div className="flex items-center">
                            <Badge 
                              className={`mr-2 ${
                                endpointDetails.method === 'GET' 
                                  ? 'bg-blue-100 text-blue-800 border-blue-300' 
                                  : endpointDetails.method === 'POST'
                                    ? 'bg-green-100 text-green-800 border-green-300'
                                    : endpointDetails.method === 'PUT'
                                      ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                      : 'bg-red-100 text-red-800 border-red-300'
                              }`}
                            >
                              {endpointDetails.method}
                            </Badge>
                            <code className="bg-gray-100 p-1 rounded">{endpointDetails.path}</code>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-1">Description</h3>
                          <p className="text-gray-700">{endpointDetails.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-1">Parameters</h3>
                          {endpointDetails.parameters.map((param: any, index: number) => (
                            <div key={index} className="bg-gray-50 p-2 rounded mb-2">
                              <div className="flex justify-between">
                                <span className="font-medium">{param.name}</span>
                                <span className="text-xs bg-gray-200 px-1 rounded">{param.type}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">{param.description}</span>
                                <span className="text-xs">
                                  {param.required ? (
                                    <span className="text-red-500">Required</span>
                                  ) : (
                                    <span className="text-gray-500">Optional</span>
                                  )}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-1">Response Codes</h3>
                          {endpointDetails.responses.map((response: any, index: number) => (
                            <div key={index} className="flex justify-between text-sm mb-1">
                              <span className={`font-medium ${
                                response.code >= 200 && response.code < 300 
                                  ? 'text-green-600'
                                  : response.code >= 400
                                    ? 'text-red-600'
                                    : 'text-yellow-600'
                              }`}>
                                {response.code}
                              </span>
                              <span>{response.description}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-1">Usage Statistics</h3>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-blue-50 p-2 rounded text-center">
                              <p className="text-xs text-blue-700">Daily</p>
                              <p className="font-semibold text-blue-800">{endpointDetails.usage.daily}</p>
                            </div>
                            <div className="bg-green-50 p-2 rounded text-center">
                              <p className="text-xs text-green-700">Weekly</p>
                              <p className="font-semibold text-green-800">{endpointDetails.usage.weekly}</p>
                            </div>
                            <div className="bg-purple-50 p-2 rounded text-center">
                              <p className="text-xs text-purple-700">Monthly</p>
                              <p className="font-semibold text-purple-800">{endpointDetails.usage.monthly}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-3">
                          <Button variant="default" className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Test Endpoint
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center text-center p-6">
                    <div className="space-y-4">
                      <div className="mx-auto rounded-full bg-gray-100 p-3 w-12 h-12 flex items-center justify-center">
                        <Settings className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Endpoint Details</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Select an endpoint to view detailed information
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiEndpoints;
