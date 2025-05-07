
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface BatchCreationDialogProps {
  open: boolean;
  onClose: () => void;
  maxMembers: number;
}

const BatchCreationDialog: React.FC<BatchCreationDialogProps> = ({ open, onClose, maxMembers }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [batchData, setBatchData] = useState({
    name: "",
    examGoal: "",
    targetYear: new Date().getFullYear() + 1,
    shareProgress: true,
    allowLeadershipTransfer: true,
  });
  const [members, setMembers] = useState([{ name: "", email: "", phone: "" }]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBatchData({
      ...batchData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setBatchData({
      ...batchData,
      [name]: value,
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setBatchData({
      ...batchData,
      [name]: checked,
    });
  };
  
  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };
  
  const addMember = () => {
    if (members.length < maxMembers) {
      setMembers([...members, { name: "", email: "", phone: "" }]);
    } else {
      toast({
        title: "Member limit reached",
        description: `You can only add up to ${maxMembers} members with your current plan.`,
        variant: "destructive",
      });
    }
  };
  
  const removeMember = (index: number) => {
    if (members.length > 1) {
      const updatedMembers = [...members];
      updatedMembers.splice(index, 1);
      setMembers(updatedMembers);
    }
  };
  
  const handleNextStep = () => {
    // Validation for step 1
    if (step === 1) {
      if (!batchData.name.trim()) {
        toast({
          title: "Batch name required",
          description: "Please enter a name for your batch.",
          variant: "destructive",
        });
        return;
      }
      if (!batchData.examGoal.trim()) {
        toast({
          title: "Exam goal required",
          description: "Please select an exam goal.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
      return;
    }
  };
  
  const handlePreviousStep = () => {
    setStep(1);
  };
  
  const handleSubmit = () => {
    // Validate members data
    const hasEmptyFields = members.some(member => !member.email.trim());
    if (hasEmptyFields) {
      toast({
        title: "Missing information",
        description: "Please enter email addresses for all members.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the data to the server
    console.log("Batch creation data:", { batchData, members });
    
    // Show success message
    toast({
      title: "Batch created!",
      description: `Your batch "${batchData.name}" has been created successfully.`,
    });
    
    // Generate a random batch code
    const batchCode = `BATCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Show batch code
    toast({
      title: "Invite code generated",
      description: `Your batch invite code is: ${batchCode}`,
    });
    
    // Reset form and close dialog
    setBatchData({
      name: "",
      examGoal: "",
      targetYear: new Date().getFullYear() + 1,
      shareProgress: true,
      allowLeadershipTransfer: true,
    });
    setMembers([{ name: "", email: "", phone: "" }]);
    setStep(1);
    onClose();
  };
  
  const examGoals = [
    "JEE Main",
    "JEE Advanced",
    "NEET",
    "UPSC",
    "CAT",
    "GATE",
    "Bank PO",
    "SSC",
    "CLAT",
  ];
  
  const years = [
    new Date().getFullYear(),
    new Date().getFullYear() + 1,
    new Date().getFullYear() + 2,
  ];
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Create a New Batch" : "Add Members"}
          </DialogTitle>
        </DialogHeader>
        
        {step === 1 ? (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="batch-name">Batch Name</Label>
              <Input
                id="batch-name"
                name="name"
                value={batchData.name}
                onChange={handleChange}
                placeholder="e.g., JEE Champions 2025"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exam-goal">Exam Goal</Label>
                <Select 
                  value={batchData.examGoal} 
                  onValueChange={(value) => handleSelectChange("examGoal", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {examGoals.map((exam) => (
                      <SelectItem key={exam} value={exam}>
                        {exam}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target-year">Target Year</Label>
                <Select 
                  value={batchData.targetYear.toString()} 
                  onValueChange={(value) => handleSelectChange("targetYear", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-3">Batch Permissions</h3>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="share-progress" className="font-normal">
                    Allow batchmates to see progress
                  </Label>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Members can view each other's study progress
                  </p>
                </div>
                <Switch
                  id="share-progress"
                  checked={batchData.shareProgress}
                  onCheckedChange={(checked) => handleSwitchChange("shareProgress", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="leadership-transfer" className="font-normal">
                    Allow leadership transfer
                  </Label>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    You can transfer batch leadership to another member
                  </p>
                </div>
                <Switch
                  id="leadership-transfer"
                  checked={batchData.allowLeadershipTransfer}
                  onCheckedChange={(checked) => handleSwitchChange("allowLeadershipTransfer", checked)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Members ({members.length}/{maxMembers})</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMember} disabled={members.length >= maxMembers}>
                  Add Member
                </Button>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto space-y-4 pr-1">
                {members.map((member, index) => (
                  <div key={index} className="space-y-2 border p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Member {index + 1}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeMember(index)}
                        disabled={members.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <Label htmlFor={`member-${index}-name`} className="text-xs">
                          Name (Optional)
                        </Label>
                        <Input
                          id={`member-${index}-name`}
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                          placeholder="Member name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`member-${index}-email`} className="text-xs">
                          Email Address *
                        </Label>
                        <Input
                          id={`member-${index}-email`}
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                          placeholder="Email address"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`member-${index}-phone`} className="text-xs">
                          Phone Number (Optional)
                        </Label>
                        <Input
                          id={`member-${index}-phone`}
                          value={member.phone}
                          onChange={(e) => handleMemberChange(index, "phone", e.target.value)}
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-2 text-sm text-muted-foreground">
              <p>
                An invite link will be generated and sent to each member after batch creation.
                You can also manage and send invites later from the Batch Management panel.
              </p>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex justify-between">
          {step === 2 ? (
            <>
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button onClick={handleSubmit}>
                Create Batch
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleNextStep}>
                Next
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchCreationDialog;
