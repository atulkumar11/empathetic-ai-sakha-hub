
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TransferLeadershipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const TransferLeadershipDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: TransferLeadershipDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Leadership</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground">
            Are you sure you want to transfer batch leadership? This action cannot be undone.
          </p>
          <p className="mt-4 font-medium">
            You will lose administrative privileges over this batch.
          </p>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={onConfirm}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Confirm Transfer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferLeadershipDialog;
