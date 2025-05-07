
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Batch, UserProfileType } from "@/types/user/base";
import { 
  Check, 
  ChevronRight, 
  Clock, 
  Crown, 
  Eye, 
  Mail, 
  Plus, 
  RefreshCw, 
  Users, 
  X, 
  LinkIcon,
  User
} from "lucide-react";
import { format } from "date-fns";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BatchManagementPanelProps {
  userProfile: UserProfileType;
  onCreateBatch: () => void;
  canCreateBatch: boolean;
  isBatchLeader: boolean;
}

export function BatchManagementPanel({
  userProfile,
  onCreateBatch,
  canCreateBatch,
  isBatchLeader
}: BatchManagementPanelProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Generate a random invitation code
  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };
  
  const inviteCode = generateInviteCode();
  
  // Handle member actions
  const handleRemoveMember = (memberId: string) => {
    console.log("Remove member:", memberId);
  };

  const handleTransferLeadership = (memberId: string) => {
    console.log("Transfer leadership to:", memberId);
  };
  
  const handleSendReminder = (memberEmail: string) => {
    console.log("Send reminder to:", memberEmail);
  };

  // Handle leave batch
  const handleLeaveBatch = () => {
    console.log("Leave batch");
  };
  
  // Get the batch object
  const batch = userProfile.batch;
  
  return (
    <div className="space-y-6">
      {batch ? (
        // User is in a batch
        <>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{batch.name}</CardTitle>
                  <CardDescription>
                    {batch.examGoal} {batch.targetYear}
                  </CardDescription>
                </div>
                <Badge className={isBatchLeader ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" : ""}>
                  {isBatchLeader ? "Batch Leader" : "Member"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>{batch.members.length}/{batch.memberLimit} members</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Created on {format(new Date(batch.createdAt), "MMM dd, yyyy")}
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Batch Settings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>Members can see each other's progress</span>
                        </div>
                        <Badge variant={batch.settings.allowProgressVisibility ? "default" : "outline"}>
                          {batch.settings.allowProgressVisibility ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-muted-foreground" />
                          <span>Leadership transfer allowed</span>
                        </div>
                        <Badge variant={batch.settings.allowLeadershipTransfer ? "default" : "outline"}>
                          {batch.settings.allowLeadershipTransfer ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Member Summary</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-2xl font-bold">
                          {batch.members.filter(m => m.joinStatus === "joined").length}
                        </div>
                        <div className="text-xs text-muted-foreground">Active</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-2xl font-bold">
                          {batch.members.filter(m => m.joinStatus === "pending").length}
                        </div>
                        <div className="text-xs text-muted-foreground">Pending</div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-2xl font-bold">
                          {batch.memberLimit - batch.members.length}
                        </div>
                        <div className="text-xs text-muted-foreground">Available</div>
                      </div>
                    </div>
                  </div>
                  
                  {isBatchLeader && batch.members.length < batch.memberLimit && (
                    <Card className="bg-muted/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Invite Members</CardTitle>
                        <CardDescription>Share this code with your friends</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-background rounded-md p-3 font-mono flex justify-between items-center">
                          <div>{inviteCode}</div>
                          <Button variant="ghost" size="sm">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" className="w-full">
                          <Mail className="mr-2 h-4 w-4" />
                          Email Invites
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="members" className="mt-4">
                  <div className="space-y-3">
                    {batch.members.map((member) => (
                      <div 
                        key={member.id} 
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            {member.id === userProfile.id && userProfile.avatar ? (
                              <AvatarImage src={userProfile.avatar} />
                            ) : (
                              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            )}
                          </Avatar>
                          
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {member.name}
                              {member.id === batch.leaderId && (
                                <Crown className="h-3 w-3 text-amber-500" />
                              )}
                              {member.id === userProfile.id && (
                                <Badge variant="outline" className="text-xs py-0">You</Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {member.joinStatus === "pending" ? (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                              Pending
                            </Badge>
                          ) : member.joinStatus === "declined" ? (
                            <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                              Declined
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                              Joined {member.joinDate && `• ${format(new Date(member.joinDate), "MMM dd")}`}
                            </Badge>
                          )}
                          
                          {isBatchLeader && member.id !== userProfile.id && (
                            <div className="flex">
                              {member.joinStatus === "pending" && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleSendReminder(member.email)}
                                >
                                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              )}
                              
                              {member.joinStatus === "joined" && batch.settings.allowLeadershipTransfer && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Crown className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Transfer Leadership</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to transfer leadership to {member.name}? 
                                        You will no longer be the batch leader.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleTransferLeadership(member.id)}>
                                        Transfer Leadership
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <X className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove Member</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove {member.name} from the batch?
                                      This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleRemoveMember(member.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isBatchLeader && batch.members.length < batch.memberLimit && (
                      <Button variant="outline" className="w-full mt-2" onClick={onCreateBatch}>
                        <Plus className="mr-2 h-4 w-4" /> Invite More Members
                      </Button>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="pt-2">
              {!isBatchLeader && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                      Leave Batch
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Leave Batch</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to leave this batch? 
                        You will lose access to all batch resources and communications.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleLeaveBatch}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Leave Batch
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <>
          {/* No batch yet */}
          {canCreateBatch ? (
            <Card>
              <CardHeader>
                <CardTitle>Create a Study Batch</CardTitle>
                <CardDescription>
                  Study together with friends preparing for the same exam
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Users className="h-10 w-10 mb-2 text-primary" />
                    <h3 className="font-medium text-center">Study Together</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Create study groups with peers
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Eye className="h-10 w-10 mb-2 text-primary" />
                    <h3 className="font-medium text-center">Track Progress</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Compare performance & stay motivated
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Clock className="h-10 w-10 mb-2 text-primary" />
                    <h3 className="font-medium text-center">Stay Consistent</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Keep each other accountable
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Your Subscription Includes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>
                        Up to {userProfile.subscription?.memberLimit || 5} batch members
                      </span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Shared study resources & progress tracking</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Batch leaderboards & friendly competition</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={onCreateBatch} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Create Batch
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Group Study Features</CardTitle>
                <CardDescription>
                  Upgrade to access batch creation & management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Users className="h-10 w-10 mb-2 text-muted-foreground" />
                    <h3 className="font-medium text-center">Create Study Batches</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Invite friends & study together
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Eye className="h-10 w-10 mb-2 text-muted-foreground" />
                    <h3 className="font-medium text-center">Compare Progress</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Track & analyze group performance
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <User className="h-10 w-10 mb-2 text-muted-foreground" />
                    <h3 className="font-medium text-center">Leader Features</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Manage members & track engagement
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Upgrade to Group Plans</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get access to batch creation and collaborative study tools with our group plans.
                  </p>
                  <Button onClick={() => setActiveTab("subscription")} className="w-full">
                    View Group Plans <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
