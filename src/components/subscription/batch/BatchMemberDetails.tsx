
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, UserCheck, UserMinus, BarChart, Clock } from "lucide-react";
import { BatchMember } from './types';
import { Progress } from "@/components/ui/progress";

interface BatchMemberDetailsProps {
  member: BatchMember;
  onBack: () => void;
  isLeader: boolean;
  onSendReminder?: (memberId: string) => void;
  onPromoteToAdmin?: (memberId: string) => void;
  onRemoveMember?: (memberId: string) => void;
}

const BatchMemberDetails: React.FC<BatchMemberDetailsProps> = ({
  member,
  onBack,
  isLeader,
  onSendReminder,
  onPromoteToAdmin,
  onRemoveMember
}) => {
  const canPromote = isLeader && member.role === 'member' && member.status === 'active';
  const canRemove = isLeader && member.role !== 'leader';
  const isActive = member.status === 'active';
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getLastActivity = (): string => {
    // For demo purposes, we'll just use today or yesterday
    const isToday = Math.random() > 0.5;
    return isToday ? 'Today' : 'Yesterday';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <CardTitle className="text-lg">Member Details</CardTitle>
          <div className="w-24"></div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Member Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-3 md:mb-0">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
              {member.avatar ? (
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <span className="text-xl font-medium text-indigo-600 dark:text-indigo-400">
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="ml-4">
              <h2 className="text-xl font-medium">{member.name}</h2>
              <p className="text-muted-foreground text-sm">{member.email}</p>
              
              <div className="flex items-center mt-1">
                <Badge 
                  className={
                    member.role === 'leader' ? 'bg-indigo-100 text-indigo-800 border-indigo-200' : 
                    member.role === 'school_admin' || member.role === 'corporate_admin' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                    'bg-green-100 text-green-800 border-green-200'
                  }
                >
                  {member.role === 'leader' ? 'Leader' : 
                   (member.role === 'school_admin' || member.role === 'corporate_admin') ? 'Admin' : 
                   'Member'}
                </Badge>
                
                <Badge 
                  className="ml-2 bg-gray-100 text-gray-800 border-gray-200"
                >
                  Joined {formatDate(member.joinDate)}
                </Badge>
              </div>
            </div>
          </div>
          
          {isLeader && isActive && (
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onSendReminder && onSendReminder(member.id)}
              >
                <Send className="h-4 w-4 mr-1" />
                Send Reminder
              </Button>
              
              {canPromote && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onPromoteToAdmin && onPromoteToAdmin(member.id)}
                >
                  <UserCheck className="h-4 w-4 mr-1" />
                  Make Admin
                </Button>
              )}
              
              {canRemove && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onRemoveMember && onRemoveMember(member.id)}
                >
                  <UserMinus className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Activity Stats */}
        {isActive && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-50 dark:bg-gray-900 border-0">
              <CardContent className="p-4 flex items-center">
                <Clock className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Activity</p>
                  <p className="font-medium">{getLastActivity()}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 dark:bg-gray-900 border-0">
              <CardContent className="p-4 flex items-center">
                <BarChart className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Study Progress</p>
                  <p className="font-medium">
                    {member.progress 
                      ? `${Math.round((member.progress.completedTopics / member.progress.totalTopics) * 100)}%` 
                      : 'No data'}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 dark:bg-gray-900 border-0">
              <CardContent className="p-4 flex items-center">
                <UserCheck className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">
                    {member.status === 'active' ? 'Active' : 'Pending'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Progress Details */}
        {isActive && member.progress && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Progress Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium">Topics Completed</p>
                    <p className="text-sm font-medium">
                      {member.progress.completedTopics} of {member.progress.totalTopics}
                    </p>
                  </div>
                  <Progress 
                    value={(member.progress.completedTopics / member.progress.totalTopics) * 100}
                    className="h-2"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recent Topics</p>
                    <ul className="space-y-1">
                      <li className="text-sm px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-md flex justify-between">
                        <span>Algebra Fundamentals</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                      </li>
                      <li className="text-sm px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-md flex justify-between">
                        <span>Linear Equations</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                      </li>
                      <li className="text-sm px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-md flex justify-between">
                        <span>Quadratic Equations</span>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Upcoming Topics</p>
                    <ul className="space-y-1">
                      <li className="text-sm px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 rounded-md flex justify-between">
                        <span>Logarithms</span>
                        <Badge variant="outline">Pending</Badge>
                      </li>
                      <li className="text-sm px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 rounded-md flex justify-between">
                        <span>Trigonometry</span>
                        <Badge variant="outline">Pending</Badge>
                      </li>
                      <li className="text-sm px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 rounded-md flex justify-between">
                        <span>Calculus Basics</span>
                        <Badge variant="outline">Pending</Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Note: This is a simplified view of member progress. Individual study details are private.
              </p>
            </CardContent>
          </Card>
        )}
        
        {!isActive && (
          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-400">Pending Invitation</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    This member hasn't accepted the batch invitation yet. They need to register and enter the invitation code.
                  </p>
                  {isLeader && (
                    <Button 
                      className="mt-3 bg-amber-600 hover:bg-amber-700"
                      size="sm"
                      onClick={() => onSendReminder && onSendReminder(member.id)}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Resend Invitation
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default BatchMemberDetails;
