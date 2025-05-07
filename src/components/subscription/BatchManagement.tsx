
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateUtils";
import { BatchDetails, BatchMember } from "./batch/types";
import { ArrowUpRight, Bell, CheckCircle, Clock, Copy, Crown, Download, Send, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BatchManagementProps {
  userBatches: BatchDetails[];
  onRemoveMember: (memberId: string) => Promise<void>;
  onSendAlert: (memberId: string, message: string) => Promise<void>;
}

const BatchManagement: React.FC<BatchManagementProps> = ({ 
  userBatches,
  onRemoveMember,
  onSendAlert
}) => {
  const { toast } = useToast();
  const [selectedBatch, setSelectedBatch] = useState<BatchDetails | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMemberId, setAlertMemberId] = useState<string>('');
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const handleRemoveMember = async (memberId: string) => {
    try {
      await onRemoveMember(memberId);
      toast({
        title: "Member Removed",
        description: "The member has been removed from your batch.",
      });
    } catch (error) {
      toast({
        title: "Failed to Remove Member",
        description: "There was an error removing this member. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendAlert = async () => {
    if (!alertMessage.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onSendAlert(alertMemberId, alertMessage);
      toast({
        title: "Alert Sent",
        description: "Your message has been sent successfully.",
      });
      setAlertMessage('');
      setAlertDialogOpen(false);
    } catch (error) {
      toast({
        title: "Failed to Send Alert",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openAlertDialog = (memberId: string) => {
    setAlertMemberId(memberId);
    setAlertDialogOpen(true);
  };

  const handleDownloadReport = (batchId: string) => {
    // In a real app, this would generate and download a batch report
    toast({
      title: "Downloading Report",
      description: "Your batch report is being generated and will download shortly.",
    });
    
    // Mock download by showing a success message after a delay
    setTimeout(() => {
      toast({
        title: "Report Downloaded",
        description: "Batch performance report has been downloaded successfully.",
      });
    }, 2000);
  };

  const handleCopyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Invite Code Copied",
      description: "The batch invite code has been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="overview">Batch Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {userBatches.length > 0 ? (
            <div className="space-y-4">
              {userBatches.map(batch => (
                <Card key={batch.id} className="overflow-hidden">
                  <div className="h-2 bg-blue-500" />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{batch.name}</CardTitle>
                      <Badge>{batch.planType === 'school' ? 'School' : batch.planType === 'corporate' ? 'Corporate' : 'Group'}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {batch.members.length} / {batch.maxMembers} members
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Expires: {formatDate(batch.expiryDate || "")}
                          </span>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => handleDownloadReport(batch.id)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Report
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Crown className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">
                            Batch Leader: {batch.owner.name}
                          </span>
                        </div>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="secondary" size="sm" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              Invite
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Invite Members to {batch.name}</DialogTitle>
                              <DialogDescription>
                                Share this invite code with members you want to join your batch.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex items-center space-x-2">
                                <Input 
                                  value={`SAKHA-${batch.id.substring(0, 8).toUpperCase()}`}
                                  readOnly 
                                  className="font-mono"
                                />
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleCopyInviteCode(`SAKHA-${batch.id.substring(0, 8).toUpperCase()}`)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Members can use this code on their profile page to join your batch.
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="text-sm font-semibold mb-2">Recent Activity</h4>
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 inline-block mr-1 text-green-500" />
                            <span>2 new members joined today</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <ArrowUpRight className="h-3 w-3 inline-block mr-1 text-blue-500" />
                            <span>Average progress increased by 5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Users className="h-10 w-10 mx-auto opacity-20 mb-4" />
              <h3 className="font-medium text-lg mb-1">No Batches Found</h3>
              <p className="text-muted-foreground text-sm">
                You don't have any batches yet. Create a batch or enter an invitation code to join one.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="members">
          {userBatches.length > 0 ? (
            <div className="space-y-6">
              {userBatches.map(batch => (
                <Card key={`members-${batch.id}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{batch.name} - Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {batch.members.map(member => (
                        <div 
                          key={member.id} 
                          className="flex items-center justify-between border-b pb-3 last:border-0"
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge 
                                  variant={member.status === "active" ? "default" : 
                                    member.status === "pending" ? "outline" : "secondary"}
                                  className="text-xs"
                                >
                                  {member.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs">{member.role}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => openAlertDialog(member.id)}
                            >
                              <Bell className="h-3 w-3 mr-1" />
                              Alert
                            </Button>
                            
                            {member.id !== batch.owner.id && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No batch members found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="analytics">
          {userBatches.length > 0 ? (
            <div className="space-y-6">
              {userBatches.map(batch => (
                <Card key={`analytics-${batch.id}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{batch.name} - Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border rounded-md p-4">
                          <div className="text-sm text-muted-foreground mb-1">Active Members</div>
                          <div className="text-2xl font-bold">
                            {batch.members.filter(m => m.status === "active").length}
                          </div>
                        </div>
                        <div className="border rounded-md p-4">
                          <div className="text-sm text-muted-foreground mb-1">Avg. Completion</div>
                          <div className="text-2xl font-bold">65%</div>
                        </div>
                        <div className="border rounded-md p-4">
                          <div className="text-sm text-muted-foreground mb-1">Engagement Score</div>
                          <div className="text-2xl font-bold">7.8</div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold mb-4">Subject Progress</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Physics</span>
                              <span>70%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full">
                              <div 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ width: "70%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Chemistry</span>
                              <span>45%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full">
                              <div 
                                className="h-full bg-green-500 rounded-full" 
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Mathematics</span>
                              <span>80%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full">
                              <div 
                                className="h-full bg-purple-500 rounded-full" 
                                style={{ width: "80%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button variant="outline" onClick={() => handleDownloadReport(batch.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Detailed Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No analytics available.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Alert</DialogTitle>
            <DialogDescription>
              Send a notification to this batch member. Use this for important updates or reminders.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message here..."
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setAlertDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendAlert}>
              <Send className="h-4 w-4 mr-2" />
              Send Alert
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchManagement;
