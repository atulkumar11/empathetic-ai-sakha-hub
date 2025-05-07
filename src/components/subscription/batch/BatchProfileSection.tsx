
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Crown, UserPlus } from 'lucide-react';

interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "leader" | "member" | "school_admin" | "corporate_admin";
  status: "active" | "pending" | "inactive";
  avatar?: string;
  progress?: number;
  invitationCode?: string;
}

interface BatchData {
  id: string;
  name: string;
  createdAt: string;
  expiryDate?: string;
  owner: BatchMember;
  members: BatchMember[];
  maxMembers: number;
  planType: string;
}

interface BatchProfileSectionProps {
  userBatches: BatchData[];
  onInviteMembers: (emails: string[]) => void;
}

const BatchProfileSection: React.FC<BatchProfileSectionProps> = ({
  userBatches,
  onInviteMembers
}) => {
  const handleInvite = () => {
    // In a real app, we would open a dialog or modal to collect emails
    const emails = window.prompt("Enter email addresses separated by commas:")?.split(",") || [];
    if (emails.length > 0) {
      onInviteMembers(emails.map(e => e.trim()));
    }
  };

  return (
    <div className="space-y-6">
      {userBatches.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">You haven't created any batches yet.</p>
          <Button>Create a Batch</Button>
        </div>
      ) : (
        userBatches.map(batch => (
          <Card key={batch.id} className="overflow-hidden">
            <div className="h-1.5 bg-blue-500" />
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium flex items-center">
                    <Crown size={18} className="text-amber-500 mr-2" />
                    {batch.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {batch.members.length}/{batch.maxMembers} members
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleInvite}>
                  <UserPlus size={16} className="mr-1" />
                  Invite Members
                </Button>
              </div>
              
              <h4 className="font-medium mb-3">Members</h4>
              <div className="space-y-2">
                {batch.members.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium">{member.name}</p>
                          {member.role === "leader" && (
                            <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs">
                              Leader
                            </Badge>
                          )}
                          {member.status === "pending" && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    
                    {member.progress !== undefined && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium">{member.progress}%</span>
                        <Progress value={member.progress} className="w-20 h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default BatchProfileSection;
