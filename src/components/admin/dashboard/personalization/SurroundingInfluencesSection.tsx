
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomProgress } from "@/components/ui/custom-progress";
import { Users, Sliders, Eye, AlertTriangle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SurroundingInfluencesSection = () => {
  const { toast } = useToast();
  
  const handleConfigure = () => {
    toast({
      title: "Configure Surrounding Influences",
      description: "Opening configuration interface for influence tracking",
      variant: "default"
    });
  };
  
  const handleViewDashboard = () => {
    toast({
      title: "Visual Dashboard",
      description: "Opening visual analytics for surrounding influences",
      variant: "default"
    });
  };
  
  const handleTuneModel = () => {
    toast({
      title: "Model Tuning",
      description: "Starting the tuning process for the hybrid behavior model",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-blue-400" size={20} />
            <span>Surrounding Influence Meter</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="model">Model</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Influence Measurements</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Peer Influence</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <CustomProgress 
                      value={68} 
                      className="h-2" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Environmental Factors</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <CustomProgress 
                      value={42} 
                      className="h-2" 
                      indicatorClassName="bg-purple-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Study Confidence</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <CustomProgress 
                      value={75} 
                      className="h-2" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Key Insights</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    Last 7 days
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/30 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Positive study environment improved by 12%</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/30 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span>Peer distractions are moderate during evenings</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/30 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Noise levels affecting focus during peak hours</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleViewDashboard} 
                className="w-full flex items-center justify-center gap-1"
                variant="outline"
              >
                <Eye size={16} />
                View Full Dashboard
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Tracked Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                    <div className="text-sm font-medium mb-1">Peer Influence</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600">Measures social impact</div>
                      <Badge variant="secondary">High priority</Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                    <div className="text-sm font-medium mb-1">Noise Level</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600">Environmental factor</div>
                      <Badge variant="secondary">Medium priority</Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                    <div className="text-sm font-medium mb-1">Study Space</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600">Physical environment</div>
                      <Badge variant="secondary">Medium priority</Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                    <div className="text-sm font-medium mb-1">Device Distractions</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600">Digital interruptions</div>
                      <Badge variant="secondary">High priority</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Student Alerts</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className="text-red-500" />
                      <span className="text-sm">High distraction environment</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7">View</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-900/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className="text-amber-500" />
                      <span className="text-sm">Moderate peer influence</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="model">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Hybrid Model Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Sliders size={16} className="text-blue-500" />
                      <span className="text-sm">Behavior Tracking</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/30">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Sliders size={16} className="text-purple-500" />
                      <span className="text-sm">LLM Integration</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/30">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Sliders size={16} className="text-pink-500" />
                      <span className="text-sm">Real-time Analysis</span>
                    </div>
                    <Badge variant="outline" className="text-amber-600 bg-amber-50 dark:bg-amber-900/30">Partial</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-1">
                  <ExternalLink size={16} />
                  View Logs
                </Button>
                <Button onClick={handleTuneModel} className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700">
                  Tune Model
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SurroundingInfluencesSection;
