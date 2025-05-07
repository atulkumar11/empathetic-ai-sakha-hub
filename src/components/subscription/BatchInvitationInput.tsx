
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface BatchInvitationInputProps {
  onJoinBatch: (code: string) => Promise<void>;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ onJoinBatch }) => {
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter an invitation code",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onJoinBatch(inviteCode);
      setInviteCode("");
      toast({
        title: "Success!",
        description: "You have joined the batch successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join batch. Please check the invitation code and try again.",
        variant: "destructive",
      });
      console.error("Error joining batch:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a Batch</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Enter an invitation code to join an existing batch
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter invitation code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Joining..." : "Join"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BatchInvitationInput;
