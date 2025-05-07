
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, PlusCircle, MessageSquare, BookOpen, Calendar, Lock, Share2, UserPlus, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

const StudyGroupsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("my-groups");
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  const myGroups = [
    {
      id: '1',
      name: 'Physics Masters',
      description: 'Advanced preparation for JEE Physics',
      members: 5,
      maxMembers: 8,
      isAdmin: true,
      category: 'Physics',
      lastActivity: '2 hours ago',
      avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png'
    },
    {
      id: '2',
      name: 'Chemistry Study Circle',
      description: 'NEET Chemistry preparation group',
      members: 7,
      maxMembers: 10,
      isAdmin: false,
      category: 'Chemistry',
      lastActivity: 'Yesterday',
      avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png'
    }
  ];

  const recommendedGroups = [
    {
      id: '3',
      name: 'Math Wizards',
      description: 'Advanced calculus and algebra for JEE',
      members: 8,
      maxMembers: 10,
      category: 'Mathematics',
      lastActivity: '3 hours ago',
      avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png'
    },
    {
      id: '4',
      name: 'Biology Group',
      description: 'NEET biology preparation with weekly quizzes',
      members: 12,
      maxMembers: 15,
      category: 'Biology',
      lastActivity: 'Just now',
      avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png'
    },
    {
      id: '5',
      name: 'UPSC General Studies',
      description: 'Current affairs discussion and notes sharing',
      members: 20,
      maxMembers: 25,
      category: 'UPSC',
      lastActivity: '1 day ago',
      avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png'
    }
  ];

  const handleCreateGroup = () => {
    // For demo, we'll simulate checking if user has group plan
    const hasGroupPlan = false;
    
    if (!hasGroupPlan) {
      setShowPremiumDialog(true);
      return;
    }

    // If user has group plan, show creation dialog
    // Implementation would go here
  };

  const handleJoinGroup = (groupId: string) => {
    // For demo, we'll simulate checking if user has group plan
    const hasGroupPlan = false;
    
    if (!hasGroupPlan) {
      setShowPremiumDialog(true);
      return;
    }

    toast({
      title: "Joined study group",
      description: "You've successfully joined the group.",
    });
  };

  const handleSubmitNewGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Group name required",
        description: "Please enter a name for your study group.",
        variant: "destructive"
      });
      return;
    }

    // In real app, would create group in backend
    toast({
      title: "Group created!",
      description: "Your new study group has been created successfully."
    });
  };

  return (
    <SharedPageLayout
      title="Study Groups"
      subtitle="Collaborate with peers on your exam preparation"
      showBackButton
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Group Study</h2>
            <p className="text-muted-foreground">Create or join study groups for better exam preparation</p>
          </div>
          
          <Button onClick={handleCreateGroup} className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Group
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="my-groups">My Groups</TabsTrigger>
            <TabsTrigger value="discover">Discover Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-groups" className="space-y-4">
            {myGroups.length > 0 ? (
              <>
                {myGroups.map(group => (
                  <Card key={group.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-muted">
                            <AvatarImage src={group.avatar} />
                            <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{group.name}</CardTitle>
                            <CardDescription>{group.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {group.category}
                          </Badge>
                          {group.isAdmin && (
                            <Badge className="bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              Admin
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{group.members}/{group.maxMembers} members</span>
                        </div>
                        <div className="text-muted-foreground">Last active: {group.lastActivity}</div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Group Chat
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Study Materials
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Session
                      </Button>
                      {group.isAdmin && (
                        <Button variant="outline" size="sm" className="flex items-center">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Invite Members
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </>
            ) : (
              <Card className="text-center p-8">
                <div className="flex flex-col items-center space-y-4">
                  <Users className="h-12 w-12 text-muted-foreground" />
                  <CardTitle>No Groups Yet</CardTitle>
                  <CardDescription>You haven't joined any study groups yet.</CardDescription>
                  <Button onClick={() => setActiveTab("discover")}>Discover Groups</Button>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="discover" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recommendedGroups.map(group => (
                <Card key={group.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-muted">
                          <AvatarImage src={group.avatar} />
                          <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{group.name}</CardTitle>
                          <CardDescription className="text-xs">{group.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {group.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{group.members}/{group.maxMembers} members</span>
                      </div>
                      <div className="text-muted-foreground text-xs">Last active: {group.lastActivity}</div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleJoinGroup(group.id)}>
                      Join Group
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Premium Plan Required Dialog */}
        <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Premium Feature</DialogTitle>
              <DialogDescription>
                Group study features are available exclusively to users with a Group Plan subscription.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <Alert className="bg-amber-50 border-amber-200">
                <AlertDescription className="text-amber-800">
                  Upgrade to a Group Plan to create and join study groups, access shared resources, and participate in group discussions.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <h4 className="font-medium">Group Plan Benefits:</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Create and join up to 5 study groups</li>
                  <li>Group chat and discussion forums</li>
                  <li>Shared resource library with your peers</li>
                  <li>Schedule group study sessions</li>
                  <li>Track group progress and achievements</li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPremiumDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowPremiumDialog(false);
                window.location.href = "/dashboard/student/subscription";
              }}>
                View Group Plans
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* New Group Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <span className="hidden">Create Group</span> {/* Hidden trigger - we use the button instead */}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Study Group</DialogTitle>
              <DialogDescription>
                Set up a collaborative study environment for your exam preparation.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Group Name</label>
                <Input 
                  placeholder="Enter group name..." 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="What will your group focus on?" 
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Mathematics</option>
                  <option>General Studies</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Privacy</label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="private-group" />
                  <label htmlFor="private-group" className="text-sm flex items-center">
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    Private Group (Invite only)
                  </label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSubmitNewGroup}>Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SharedPageLayout>
  );
};

export default StudyGroupsPage;
