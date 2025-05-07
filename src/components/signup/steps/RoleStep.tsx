
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user/base";

interface RoleStepProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ onRoleSelect }) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={() => onRoleSelect(UserRole.Student)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 w-full h-auto py-3 justify-start"
        variant="outline"
      >
        Student
      </Button>
      {/* Teacher and Parent roles removed as requested */}
    </div>
  );
};

export default RoleStep;
