
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";

const UsersManagement = () => {
  // Mock user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', registeredDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Student', status: 'Active', registeredDate: '2023-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', status: 'Inactive', registeredDate: '2023-03-10' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Student', status: 'Active', registeredDate: '2023-04-05' },
    { id: 5, name: 'Admin User', email: 'admin@prepzr.com', role: 'Admin', status: 'Active', registeredDate: '2023-01-01' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-3xl font-bold">Users Management</h2>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {user.status === 'Active' ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                            <span>Inactive</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{user.registeredDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagement;
