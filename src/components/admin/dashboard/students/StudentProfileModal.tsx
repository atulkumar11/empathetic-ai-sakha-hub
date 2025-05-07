
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StudentData } from "@/types/admin/studentData";

export interface StudentProfileModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  studentData?: StudentData;
  student?: StudentData;
  onClose?: () => void;
}

const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  open,
  onOpenChange,
  studentData,
  student,
  onClose
}) => {
  // Use either studentData or student prop
  const studentInfo = studentData || student;

  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  // For backwards compatibility - if onOpenChange is not provided but onClose is
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  if (!studentInfo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange || handleCloseModal}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Student Profile: {studentInfo.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              {studentInfo.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{studentInfo.name}</h3>
              <p className="text-gray-500">{studentInfo.email}</p>
              <div className="mt-1">
                <Badge variant={
                  studentInfo.status === "active" ? "default" : 
                  studentInfo.status === "inactive" ? "secondary" : "outline"
                }>
                  {studentInfo.status.charAt(0).toUpperCase() + studentInfo.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium">Joined Date:</span> {formatDate(studentInfo.joinedDate)}
              </div>
              <div>
                <span className="font-medium">Last Active:</span> {formatDate(studentInfo.lastActive || "")}
              </div>
              <div>
                <span className="font-medium">Exam Prep:</span> {studentInfo.examPrep || "N/A"}
              </div>
              <div>
                <span className="font-medium">Role:</span> {studentInfo.role}
              </div>
            </div>
          </div>

          {studentInfo.subjects && studentInfo.subjects.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {studentInfo.subjects.map((subject, index) => (
                  <Badge key={index} variant="outline">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {typeof studentInfo.progress === "number" && (
            <div>
              <h4 className="font-semibold mb-2">Overall Progress</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{studentInfo.progress}%</span>
                </div>
                <Progress value={studentInfo.progress || 0} />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileModal;
