
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  HelpCircle, Book, MessageSquare, CheckCircle, 
  BarChart2, Clock, Users, ThumbsUp, ThumbsDown
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CustomProgress } from "@/components/ui/custom-progress";

const DoubtResponderSection = () => {
  const { toast } = useToast();
  
  const handleConfigure = () => {
    toast({
      title: "Configure Doubt Auto-Responder",
      description: "Opening configuration interface for the doubt responder system",
      variant: "default"
    });
  };
  
  const handleViewLogs = () => {
    toast({
      title: "Doubt Response Logs",
      description: "Opening logs for doubt responses",
      variant: "default"
    });
  };
  
  const handleApproveKB = () => {
    toast({
      title: "Knowledge Base Update",
      description: "Approving changes to the knowledge base",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="text-amber-500" size={20} />
            <span>Doubt Auto-Responder</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="kb">Knowledge Base</TabsTrigger>
            <TabsTrigger value="logs">Response Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">System Performance</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Response Accuracy</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <CustomProgress 
                      value={94} 
                      className="h-2" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Student Satisfaction</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <CustomProgress 
                      value={87} 
                      className="h-2" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">KB Coverage</span>
                      <span className="text-sm font-medium">76%</span>
                    </div>
                    <CustomProgress 
                      value={76} 
                      className="h-2" 
                      indicatorClassName="bg-amber-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <MessageSquare size={20} className="text-blue-500 mb-1" />
                  <div className="text-xl font-bold">1,256</div>
                  <div className="text-xs text-gray-600">Daily Responses</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <Clock size={20} className="text-purple-500 mb-1" />
                  <div className="text-xl font-bold">1.2s</div>
                  <div className="text-xs text-gray-600">Avg. Response Time</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <Users size={20} className="text-green-500 mb-1" />
                  <div className="text-xl font-bold">94%</div>
                  <div className="text-xs text-gray-600">Usage Rate</div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Most Popular Topics</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Calculus Integration</span>
                    <Badge variant="secondary">352 questions</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chemical Bonding</span>
                    <Badge variant="secondary">289 questions</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Modern Physics</span>
                    <Badge variant="secondary">231 questions</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="kb">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Knowledge Base Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-md text-center">
                    <Book size={18} className="mx-auto text-purple-500 mb-1" />
                    <div className="text-lg font-bold">12,568</div>
                    <div className="text-xs text-gray-600">Knowledge Units</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-md text-center">
                    <BarChart2 size={18} className="mx-auto text-blue-500 mb-1" />
                    <div className="text-lg font-bold">98.2%</div>
                    <div className="text-xs text-gray-600">Content Accuracy</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Pending KB Approvals</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Advanced Organic Reactions</span>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">Pending</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">42 new knowledge units added by GPT</p>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
                      <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                    </div>
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Constitutional Law Updates</span>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">Pending</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">28 new knowledge units added by GPT</p>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
                      <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleApproveKB} className="w-full mt-3">
                  Approve All
                </Button>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Export KB</Button>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700">
                  Update KB
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Recent Responses</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    Today
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Physics - Wave Optics</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} className="text-green-500" />
                        <span className="text-xs">Student satisfied</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">"How do I calculate the interference pattern for Young's double slit experiment?"</p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline" className="h-7 text-xs">View Full Response</Button>
                    </div>
                  </div>
                  
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Chemistry - Organic</span>
                      <div className="flex items-center gap-1">
                        <ThumbsDown size={14} className="text-red-500" />
                        <span className="text-xs">Escalated to tutor</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">"Why does benzene undergo substitution instead of addition reactions?"</p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline" className="h-7 text-xs">View Full Response</Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleViewLogs} className="w-full mt-3">
                  View All Logs
                </Button>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Response Analytics</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Response Length</p>
                    <p className="text-lg font-bold">186 words</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">With Diagrams</p>
                    <p className="text-lg font-bold">32%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Follow-up Rate</p>
                    <p className="text-lg font-bold">18%</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DoubtResponderSection;
