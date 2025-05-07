
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SystemLog } from '@/types/admin';

interface SystemLogsProps {
  logs: SystemLog[];
}

const SystemLogs: React.FC<SystemLogsProps> = ({ logs }) => {
  // Function to format timestamp
  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  // Function to get log level badge variant
  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case 'info':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
      case 'debug':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Debug</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">System Logs</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                  <TableCell>{getLogLevelBadge(log.level)}</TableCell>
                  <TableCell className="font-medium">{log.message}</TableCell>
                  <TableCell>{log.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogs;
