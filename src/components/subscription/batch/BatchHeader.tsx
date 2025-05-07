
import React from "react";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface BatchHeaderProps {
  batchName: string;
  activeMembers: number;
  maxMembers: number;
  planType: "group" | "school" | "corporate";
}

const BatchHeader = ({ 
  batchName, 
  activeMembers, 
  maxMembers, 
  planType 
}: BatchHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div>
        <CardTitle className="text-xl font-bold">{batchName}</CardTitle>
        <CardDescription className="flex items-center gap-2 mt-1">
          <Users size={16} className="text-muted-foreground" />
          <span>
            {activeMembers} of {maxMembers} members
          </span>
          <Badge variant="secondary">
            {planType.charAt(0).toUpperCase() + planType.slice(1)} Plan
          </Badge>
        </CardDescription>
      </div>
    </CardHeader>
  );
};

export default BatchHeader;
