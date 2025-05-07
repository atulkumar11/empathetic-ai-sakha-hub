
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, UserCheck, AlertTriangle } from "lucide-react";
import { BatchMember } from './types';

interface BatchLeadershipTransferProps {
  members: BatchMember[];
  onCancel: () => void;
  onTransfer: (memberId: string) => void;
}

const BatchLeadershipTransfer: React.FC<BatchLeadershipTransferProps> = ({
  members,
  onCancel,
  onTransfer
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [confirmationStep, setConfirmationStep] = useState(false);
  
  const handleContinue = () => {
    setConfirmationStep(true);
  };
  
  const handleTransfer = () => {
    if (selectedMemberId) {
      onTransfer(selectedMemberId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Batch Leadership</CardTitle>
        <CardDescription>
          {confirmationStep
            ? "Please confirm that you want to transfer batch leadership. You will still remain as a batch admin."
            : "Select a batch member to become the new batch leader."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {confirmationStep ? (
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-400">Important Note</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  After transferring leadership:
                </p>
                <ul className="list-disc list-inside text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                  <li>The new leader will have full control over the batch</li>
                  <li>You will become a batch admin with limited permissions</li>
                  <li>This action cannot be easily reversed</li>
                </ul>
              </div>
            </div>
            
            {selectedMemberId && (
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-md">
                <p className="text-sm font-medium">New Batch Leader:</p>
                <div className="flex items-center mt-2">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    {members.find(m => m.id === selectedMemberId)?.avatar ? (
                      <img 
                        src={members.find(m => m.id === selectedMemberId)?.avatar} 
                        alt={members.find(m => m.id === selectedMemberId)?.name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <UserCheck className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{members.find(m => m.id === selectedMemberId)?.name}</p>
                    <p className="text-xs text-muted-foreground">{members.find(m => m.id === selectedMemberId)?.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <RadioGroup value={selectedMemberId || ""} onValueChange={setSelectedMemberId}>
            <div className="space-y-4">
              {members.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium">No Eligible Members</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    There are no active members who can become batch leaders.
                    Invite more members or make sure they accept their invitations.
                  </p>
                </div>
              ) : (
                members.map(member => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={member.id} id={`member-${member.id}`} />
                    <Label 
                      htmlFor={`member-${member.id}`}
                      className="flex flex-1 items-center rounded-md border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                        {member.avatar ? (
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <UserCheck className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </Label>
                  </div>
                ))
              )}
            </div>
          </RadioGroup>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={confirmationStep ? () => setConfirmationStep(false) : onCancel}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {confirmationStep ? 'Back' : 'Cancel'}
        </Button>
        
        {confirmationStep ? (
          <Button
            variant="destructive"
            onClick={handleTransfer}
            disabled={!selectedMemberId}
          >
            <UserCheck className="mr-2 h-4 w-4" />
            Confirm Transfer
          </Button>
        ) : (
          <Button 
            onClick={handleContinue}
            disabled={!selectedMemberId}
          >
            Continue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BatchLeadershipTransfer;
