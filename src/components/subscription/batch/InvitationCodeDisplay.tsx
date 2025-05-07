
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface InvitationCodeDisplayProps {
  inviteCode: string;
}

const InvitationCodeDisplay: React.FC<InvitationCodeDisplayProps> = ({ inviteCode }) => {
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast({
      title: "Copied to clipboard",
      description: "The invitation code has been copied to your clipboard",
    });
  };

  return (
    <div className="mt-4 rounded-md bg-blue-50 dark:bg-blue-900/20 p-3">
      <p className="font-medium text-blue-700 dark:text-blue-400 mb-1">
        Invitation Code
      </p>
      <div className="flex items-center">
        <code className="bg-blue-100 dark:bg-blue-800 rounded px-2 py-1 text-sm">
          {inviteCode}
        </code>
        <Button
          variant="ghost"
          size="sm"
          className="ml-2"
          onClick={handleCopyCode}
        >
          Copy
        </Button>
      </div>
    </div>
  );
};

export default InvitationCodeDisplay;
