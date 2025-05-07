
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Users, Filter, Shield, Newspaper,
  BarChart2, ThumbsUp, ThumbsDown, MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomProgress } from "@/components/ui/custom-progress";

const PeerCommunitySection = () => {
  const { toast } = useToast();
  
  const handleConfigure = () => {
    toast({
      title: "Configure Peer Community Feed",
      description: "Opening configuration interface for peer community settings",
      variant: "default"
    });
  };
  
  const handleViewModeration = () => {
    toast({
      title: "Content Moderation",
      description: "Opening content moderation dashboard",
      variant: "default"
    });
  };
  
  const handleApproveContent = () => {
    toast({
      title: "Content Approved",
      description: "Selected content has been approved",
      variant: "default"
    });
  };
  
  const handleRejectContent = () => {
    toast({
      title: "Content Rejected",
      description: "Selected content has been rejected",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-blue-500" size={20} />
            <span>Peer Community Feed Tuner</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="moderation">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="moderation">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Pending Moderation</h3>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">24 Items</Badge>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Post by Rohit Sharma</p>
                          <p className="text-xs text-gray-600">3:45 PM today</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">Discussion</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      "Anyone have good resources for solving JEE Advanced integration problems? I'm struggling with..."
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={handleRejectContent} className="h-7 text-xs bg-red-500 text-white hover:bg-red-600">
                        Reject
                      </Button>
                      <Button size="sm" onClick={handleApproveContent} className="h-7 text-xs bg-green-500 text-white hover:bg-green-600">
                        Approve
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Newspaper size={16} className="text-purple-500" />
                        <div>
                          <p className="text-sm font-medium">Notes shared by Priya Patel</p>
                          <p className="text-xs text-gray-600">1:20 PM today</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">Study Material</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      "Here are my summarized notes for Physical Chemistry - Thermodynamics chapter. Hope this helps..."
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={handleRejectContent} className="h-7 text-xs bg-red-500 text-white hover:bg-red-600">
                        Reject
                      </Button>
                      <Button size="sm" onClick={handleApproveContent} className="h-7 text-xs bg-green-500 text-white hover:bg-green-600">
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleViewModeration} className="w-full mt-3">
                  View All Pending
                </Button>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">AutoMod Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-red-500" />
                      <span className="text-sm">Block Inappropriate Content</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-amber-500" />
                      <span className="text-sm">Flag Exam Solutions</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-green-500" />
                      <span className="text-sm">Auto-Approve Trusted Users</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="filters">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Content Filters</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Positive Influence Content</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <CustomProgress 
                      value={85} 
                      className="h-2" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Neutral Content</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <CustomProgress 
                      value={10} 
                      className="h-2" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Negative Influence Content (Filtered)</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <CustomProgress 
                      value={5} 
                      className="h-2" 
                      indicatorClassName="bg-red-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">NLP Filter + Mood Engine</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Filter size={16} className="text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">NLP Filter Strength</p>
                        <p className="text-xs text-gray-600">Controls sensitivity</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Medium</Badge>
                      <Button size="sm" variant="outline" className="h-7 text-xs">Adjust</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Filter size={16} className="text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Mood-Based Filtering</p>
                        <p className="text-xs text-gray-600">Personalized by student mood</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Tune NLP Filter
                  </Button>
                  <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700">
                    Apply Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <ThumbsUp size={18} className="text-green-500 mb-1" />
                  <div className="text-xl font-bold">87%</div>
                  <div className="text-xs text-gray-600">Positive Influence</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <BarChart2 size={18} className="text-blue-500 mb-1" />
                  <div className="text-xl font-bold">1,823</div>
                  <div className="text-xs text-gray-600">Daily Posts</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <Shield size={18} className="text-purple-500 mb-1" />
                  <div className="text-xl font-bold">132</div>
                  <div className="text-xs text-gray-600">Filtered Content</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <ThumbsDown size={18} className="text-red-500 mb-1" />
                  <div className="text-xl font-bold">23</div>
                  <div className="text-xs text-gray-600">Reported Content</div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Top Contributors</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                        A
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ananya Desai</p>
                        <p className="text-xs text-gray-600">54 helpful posts</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Top Contributor</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-600 flex items-center justify-center text-white text-sm font-bold">
                        V
                      </div>
                      <div>
                        <p className="text-sm font-medium">Vikram Reddy</p>
                        <p className="text-xs text-gray-600">48 helpful posts</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Rising Star</Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Content Engagement</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Last 7 days</Badge>
                </div>
                <div className="h-36 bg-white dark:bg-gray-800 rounded-md p-2">
                  <div className="h-full flex items-end space-x-1">
                    {[65, 48, 72, 53, 60, 55, 82].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end">
                        <div 
                          className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm w-full"
                          style={{height: `${height}%`}}
                        ></div>
                        <span className="text-xs mt-1">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600 text-center">
                  Content engagement is up 12% from last week
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PeerCommunitySection;
