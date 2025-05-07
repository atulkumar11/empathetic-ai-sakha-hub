
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { UserProfileType } from '@/types/user';
import { Users, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BatchManagementContentProps {
  isLeader: boolean;
  userProfile: UserProfileType;
}

const BatchManagementContent: React.FC<BatchManagementContentProps> = ({ 
  isLeader,
  userProfile
}) => {
  const navigate = useNavigate();
  
  const batchName = typeof userProfile.subscription === 'object' ? 
    userProfile.subscription.batchName || 'Study Group' : 
    'Study Group';
    
  // Mock batch members for display purposes
  const members = [
    {
      id: "1",
      name: userProfile.name || "You",
      email: userProfile.email || "",
      role: isLeader ? "leader" : "member",
      progress: 85,
      avatar: userProfile.avatar
    },
    {
      id: "2",
      name: "Priya Singh",
      email: "priya@example.com",
      role: "member",
      progress: 65,
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: "3",
      name: "Amit Sharma",
      email: "amit@example.com",
      role: "member",
      progress: 42,
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];
  
  const handleManageBatch = () => {
    navigate('/dashboard/student/batch');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{batchName}</h2>
        <Button onClick={handleManageBatch}>
          {isLeader ? 'Manage Batch' : 'View Full Details'}
        </Button>
      </div>
      
      {isLeader && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start">
              <Crown size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">You are the Batch Leader</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You can manage members, track their progress, and assign tasks to your batch.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <Users size={18} className="mr-2" />
          Batch Members ({members.length})
        </h3>
        
        <div className="space-y-3">
          {members.map(member => (
            <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>
                    {member.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">{member.name}</p>
                    {member.role === 'leader' && (
                      <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                        Leader
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium">{member.progress}%</div>
                <div className="w-24 hidden sm:block">
                  <Progress value={member.progress} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleManageBatch}>
          Go to Full Batch Management
        </Button>
      </div>
    </div>
  );
};

export default BatchManagementContent;
