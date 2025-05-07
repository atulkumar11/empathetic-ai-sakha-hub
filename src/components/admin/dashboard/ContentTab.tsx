
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export interface ContentTabProps {
  data: any;
}

const ContentTab: React.FC<ContentTabProps> = ({ data }) => {
  const contentItems = data.items || [];
  
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Content Management</CardTitle>
        <Button>Add New Content</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contentItems.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ContentTab;
