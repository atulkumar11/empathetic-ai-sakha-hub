
import React from "react";
import { AlertCircle } from "lucide-react";

const EmptyBatchState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
      <h3 className="text-lg font-medium">No members yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
        Add members to your batch by sending them invitation codes or emails
      </p>
    </div>
  );
};

export default EmptyBatchState;
