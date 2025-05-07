
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, Star, Users, Clock, 
  AlertTriangle, CheckCircle, ArrowUpRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CustomProgress } from "@/components/ui/custom-progress";

const TutorChatSection = () => {
  const { toast } = useToast();
  
  const handleConfigure = () => {
    toast({
      title: "Configure Tutor Chat",
      description: "Opening configuration interface for the 24x7 tutor chat system",
      variant: "default"
    });
  };
  
  const handleViewConversations = () => {
    toast({
      title: "Tutor Chat Conversations",
      description: "Opening chat conversation logs",
      variant: "default"
    });
  };
  
  const handleEscalate = () => {
    toast({
      title: "Escalate Chat",
      description: "Escalating chat to human tutor",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-indigo-500" size={20} />
            <span>24x7 Tutor Chat</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stats">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="stats">Overview</TabsTrigger>
            <TabsTrigger value="active">Active Chats</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <MessageSquare size={18} className="text-blue-500 mb-1" />
                  <div className="text-xl font-bold">3,421</div>
                  <div className="text-xs text-gray-600">Total Chats Today</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <Star size={18} className="text-amber-500 mb-1" />
                  <div className="text-xl font-bold">4.7/5</div>
                  <div className="text-xs text-gray-600">Average Rating</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center">
                  <Users size={18} className="text-green-500 mb-1" />
                  <div className="text-xl font-bold">186</div>
                  <div className="text-xs text-gray-600">Active Now</div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Performance Metrics</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Response Accuracy</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <CustomProgress 
                      value={92} 
                      className="h-2" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Student Satisfaction</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <CustomProgress 
                      value={88} 
                      className="h-2" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <CustomProgress 
                      value={95} 
                      className="h-2" 
                      indicatorClassName="bg-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Chat Distribution by Subject</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Physics</span>
                    <Badge variant="secondary">28%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mathematics</span>
                    <Badge variant="secondary">24%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chemistry</span>
                    <Badge variant="secondary">19%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Biology</span>
                    <Badge variant="secondary">15%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Other Subjects</span>
                    <Badge variant="secondary">14%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Active Chat Sessions</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700">186 Active Now</Badge>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-sm font-medium">Rohan Mehta</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-xs">12m</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Topic: Integration by Parts (Mathematics)</p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline" className="h-7 text-xs">View Chat</Button>
                    </div>
                  </div>
                  
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-amber-500" />
                        <span className="text-sm font-medium">Priya Shah</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-xs">24m</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Topic: Quantum Mechanics (Physics)</p>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">View Chat</Button>
                      <Button size="sm" className="h-7 text-xs bg-amber-600 hover:bg-amber-700 text-white" onClick={handleEscalate}>
                        Escalate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-sm font-medium">Arjun Kapoor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-xs">8m</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Topic: Organic Chemistry (Chemistry)</p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline" className="h-7 text-xs">View Chat</Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleViewConversations} className="w-full mt-3">
                  View All Active Chats
                </Button>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Chats Needing Attention</h3>
                  <Badge variant="outline" className="bg-red-50 text-red-700">12 Flagged</Badge>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-red-500" />
                        <span className="text-sm font-medium">Neha Sharma</span>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-white">
                        Intervene
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600">Complex question beyond AI capability</p>
                  </div>
                  
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-amber-500" />
                        <span className="text-sm font-medium">Raj Malhotra</span>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-white">
                        Intervene
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600">Multiple follow-up questions (10+)</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">GPT + Chat Layer</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">GPT Response Quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">Excellent</span>
                      <ArrowUpRight size={14} className="text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Knowledge Base Integration</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Human Escalation Threshold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Medium</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs">Adjust</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Chat Analytics</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm">Duration</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">1 Day</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">7 Days</Button>
                    <Button size="sm" className="h-7 text-xs bg-purple-600 hover:bg-purple-700 text-white">30 Days</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Generate Analytics Report
                </Button>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">View All Settings</Button>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TutorChatSection;
