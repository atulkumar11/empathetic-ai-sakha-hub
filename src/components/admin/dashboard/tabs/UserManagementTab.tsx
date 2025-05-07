import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Filter, Download, UserPlus, UserX, Check, X } from "lucide-react";
import StudentProfileModal from "../students/StudentProfileModal";
import { StudentData } from "@/types/admin/studentData";

const studentsData: StudentData[] = [
  {
    id: "std-001",
    name: "Aryan Sharma",
    email: "aryan.s@example.com",
    joinedDate: "2023-09-15",
    role: "Student",
    status: "active",
    subjects: ["Physics", "Mathematics", "Chemistry"],
    examPrep: "IIT-JEE",
    lastActive: "2023-10-01",
    progress: {
      completedTopics: 68,
      totalTopics: 100
    }
  },
  {
    id: "std-002",
    name: "Priya Patel",
    email: "priya.p@example.com",
    joinedDate: "2023-08-22",
    role: "Student",
    status: "active",
    subjects: ["Biology", "Chemistry", "Physics"],
    examPrep: "NEET",
    lastActive: "2023-10-02",
    progress: {
      completedTopics: 75,
      totalTopics: 100
    }
  },
  {
    id: "std-003",
    name: "Vikram Singh",
    email: "vikram.s@example.com",
    joinedDate: "2023-07-12",
    role: "Student",
    status: "inactive",
    subjects: ["Economics", "Political Science", "History"],
    examPrep: "UPSC",
    lastActive: "2023-09-15",
    progress: {
      completedTopics: 42,
      totalTopics: 100
    }
  },
  {
    id: "std-004",
    name: "Ananya Desai",
    email: "ananya.d@example.com",
    joinedDate: "2023-09-30",
    role: "Student",
    status: "pending",
    subjects: ["Mathematics", "Computer Science"],
    examPrep: "CAT",
    lastActive: "2023-10-01",
    progress: {
      completedTopics: 20,
      totalTopics: 100
    }
  },
  {
    id: "std-005",
    name: "Rahul Kumar",
    email: "rahul.k@example.com",
    joinedDate: "2023-06-18",
    role: "Student",
    status: "active",
    subjects: ["Physics", "Mathematics"],
    examPrep: "IIT-JEE",
    lastActive: "2023-09-28",
    progress: {
      completedTopics: 90,
      totalTopics: 100
    }
  },
];

interface UserManagementTabProps {
  recentStudents?: StudentData[];
}

const UserManagementTab = ({ recentStudents = studentsData }: UserManagementTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const filteredStudents = recentStudents.filter(student => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.examPrep?.toLowerCase().includes(query) ||
      student.subjects?.some(subj => subj.toLowerCase().includes(query))
    );
  });

  const handleViewStudent = (student: StudentData) => {
    setSelectedStudent(student);
    setProfileModalOpen(true);
  };

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowAddStudentDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Exam Prep</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} onClick={() => handleViewStudent(student)} className="cursor-pointer">
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.examPrep}</TableCell>
                <TableCell>{formatDate(student.joinedDate || '')}</TableCell>
                <TableCell>
                  {student.status === "active" && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  )}
                  {student.status === "inactive" && (
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                      Inactive
                    </Badge>
                  )}
                  {student.status === "pending" && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(student.lastActive || '')}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${student.progress ? (student.progress.completedTopics / student.progress.totalTopics) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">
                      {student.progress ? Math.round((student.progress.completedTopics / student.progress.totalTopics) * 100) : 0}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleViewStudent(student);
                      }}>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudent(student);
                        setShowDeleteConfirm(true);
                      }}>Delete Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentProfileModal
          open={profileModalOpen}
          onOpenChange={setProfileModalOpen}
          studentData={selectedStudent}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStudent?.name}'s account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              setShowDeleteConfirm(false);
            }}>
              <UserX className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Create a new student account by entering their details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="exam" className="text-right text-sm font-medium">
                Exam Prep
              </label>
              <Input
                id="exam"
                placeholder="IIT-JEE, NEET, etc."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">
                Status
              </label>
              <div className="flex items-center col-span-3 space-x-2">
                <Switch id="active" />
                <label htmlFor="active">Active</label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>Cancel</Button>
            <Button type="submit" onClick={() => {
              setShowAddStudentDialog(false);
            }}>
              <Check className="mr-2 h-4 w-4" />
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagementTab;
