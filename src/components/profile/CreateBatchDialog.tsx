
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BatchCreationData, BatchMemberInvite } from "@/types/user/batch";
import { Switch } from "@/components/ui/switch";
import { PlusIcon, TrashIcon } from "lucide-react";

interface CreateBatchDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateBatch: (batchData: BatchCreationData) => void;
  memberLimit: number;
}

export function CreateBatchDialog({
  open,
  onClose,
  onCreateBatch,
  memberLimit
}: CreateBatchDialogProps) {
  const currentYear = new Date().getFullYear();
  const [batchName, setBatchName] = useState("");
  const [examGoal, setExamGoal] = useState("");
  const [targetYear, setTargetYear] = useState(currentYear + 1);
  const [allowProgressVisibility, setAllowProgressVisibility] = useState(true);
  const [allowLeadershipTransfer, setAllowLeadershipTransfer] = useState(false);
  
  const emptyInvite: BatchMemberInvite = { name: "", email: "", phone: "" };
  const [invites, setInvites] = useState<BatchMemberInvite[]>([{ ...emptyInvite }]);
  
  const handleAddMember = () => {
    if (invites.length < memberLimit - 1) { // -1 because the current user is the batch leader
      setInvites([...invites, { ...emptyInvite }]);
    }
  };
  
  const handleRemoveMember = (index: number) => {
    const newInvites = [...invites];
    newInvites.splice(index, 1);
    setInvites(newInvites);
  };
  
  const handleMemberChange = (index: number, field: keyof BatchMemberInvite, value: string) => {
    const newInvites = [...invites];
    newInvites[index][field] = value;
    setInvites(newInvites);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only include non-empty invites
    const validInvites = invites.filter(invite => invite.name.trim() !== "" && invite.email.trim() !== "");
    
    const batchData: BatchCreationData = {
      batchName,
      examGoal,
      targetYear,
      allowProgressVisibility,
      allowLeadershipTransfer,
      invites: validInvites
    };
    
    onCreateBatch(batchData);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Study Batch</DialogTitle>
          <DialogDescription>
            Create a study batch and invite friends to join
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batchName">Batch Name</Label>
              <Input
                id="batchName"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="e.g., JEE Champions, UPSC Warriors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="examGoal">Exam Goal</Label>
              <Input
                id="examGoal"
                value={examGoal}
                onChange={(e) => setExamGoal(e.target.value)}
                placeholder="e.g., JEE Advanced, NEET, UPSC CSE"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetYear">Target Year</Label>
              <Input
                id="targetYear"
                type="number"
                min={currentYear}
                max={currentYear + 5}
                value={targetYear}
                onChange={(e) => setTargetYear(parseInt(e.target.value))}
                required
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Batch Settings</Label>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Allow Progress Visibility</div>
                  <div className="text-xs text-muted-foreground">
                    Members can see each other's study progress
                  </div>
                </div>
                <Switch 
                  checked={allowProgressVisibility} 
                  onCheckedChange={setAllowProgressVisibility}
                />
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Allow Leadership Transfer</div>
                  <div className="text-xs text-muted-foreground">
                    You can transfer batch leadership to another member
                  </div>
                </div>
                <Switch 
                  checked={allowLeadershipTransfer} 
                  onCheckedChange={setAllowLeadershipTransfer}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Invite Members ({invites.length}/{memberLimit - 1})</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddMember}
                  disabled={invites.length >= memberLimit - 1}
                >
                  <PlusIcon className="h-4 w-4 mr-1" /> Add Member
                </Button>
              </div>
              
              {invites.map((invite, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <Input
                      placeholder="Name"
                      value={invite.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div className="col-span-5">
                    <Input
                      placeholder="Email"
                      type="email"
                      value={invite.email}
                      onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      placeholder="Phone (optional)"
                      value={invite.phone || ''}
                      onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {invites.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMember(index)}
                        className="h-8 w-8"
                      >
                        <TrashIcon className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="text-xs text-muted-foreground">
                Invites will be sent to these email addresses. Members can accept or decline.
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Create Batch</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
