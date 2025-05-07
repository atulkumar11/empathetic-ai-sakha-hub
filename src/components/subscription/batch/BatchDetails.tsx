
import React from "react";
import { Award, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface BatchDetailsProps {
  planType: "group" | "school" | "corporate";
  currentUserRole: "member" | "leader" | "school_admin" | "corporate_admin";
}

const BatchDetails = ({ planType, currentUserRole }: BatchDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Batch Details</CardTitle>
        <CardDescription>
          Information about your study batch
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Plan Type</Label>
            <Select defaultValue={planType} disabled>
              <SelectTrigger>
                <SelectValue placeholder={planType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group">Group Plan (Up to 5 members)</SelectItem>
                <SelectItem value="school">School Plan</SelectItem>
                <SelectItem value="corporate">Corporate Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Your Role</Label>
            <div className="flex items-center gap-2 mt-1.5">
              {currentUserRole === "leader" || 
               currentUserRole === "school_admin" || 
               currentUserRole === "corporate_admin" ? (
                <>
                  <Award size={16} className="text-amber-500" />
                  <span>{currentUserRole === "leader" ? "Batch Leader" : 
                        currentUserRole === "school_admin" ? "School Admin" : 
                        "Corporate Admin"}</span>
                </>
              ) : (
                <>
                  <User size={16} className="text-gray-500" />
                  <span>Member</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchDetails;
