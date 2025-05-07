import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Send, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BatchMember } from "./types";

interface BatchMemberTableProps {
  batchMembers: BatchMember[];
  isLeader: boolean;
  onRemoveMember: (id: string) => Promise<void>;
  onTransferLeadership: (id: string) => void;
}

const BatchMemberTable = ({
  batchMembers,
  isLeader,
  onRemoveMember,
  onTransferLeadership,
}: BatchMemberTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {batchMembers.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {member.avatar ? (
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-8 h-8 rounded-full" 
                  />
                ) : (
                  <User size={16} className="text-gray-500" />
                )}
              </div>
              {member.name}
            </TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>
              {member.role === "leader" ? (
                <Badge variant="secondary">Leader</Badge>
              ) : member.role === "school_admin" ? (
                <Badge variant="secondary">School Admin</Badge>
              ) : member.role === "corporate_admin" ? (
                <Badge variant="secondary">Corporate Admin</Badge>
              ) : (
                <Badge variant="outline">Member</Badge>
              )}
            </TableCell>
            <TableCell>
              {member.status === "active" ? (
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Active
                </Badge>
              ) : member.status === "pending" ? (
                <Badge variant="default" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  Pending
                </Badge>
              ) : (
                <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                  Inactive
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {member.joinedDate ? new Date(member.joinedDate).toLocaleDateString() : "-"}
            </TableCell>
            <TableCell className="text-right">
              {isLeader && member.id !== "current-user-id" && (
                <div className="flex justify-end gap-2">
                  {member.status === "pending" && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Send invitation again</span>
                      <Send size={14} />
                    </Button>
                  )}
                  
                  {member.role === "member" && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8"
                      onClick={() => onTransferLeadership(member.id)}
                    >
                      Transfer Leader
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onRemoveMember(member.id)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BatchMemberTable;
