
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Search,
  Filter,
  MessageSquare,
  UserCheck,
  ShieldAlert,
  Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { SystemLog } from "@/types/admin";

interface IssueResolutionTabProps {
  recentLogs: SystemLog[];
}

const IssueResolutionTab = ({ recentLogs }: IssueResolutionTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Issue Resolution & System Health</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          <Button className="flex items-center gap-2">
            <AlertOctagon size={16} />
            <span>System Checkup</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Open Issues</h3>
              <Badge className="bg-amber-100 text-amber-800">15 Open</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">4</Badge>
                  <span className="text-sm">Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800">7</Badge>
                  <span className="text-sm">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">4</Badge>
                  <span className="text-sm">Normal</span>
                </div>
              </div>
              <div className="h-24 w-24 rounded-full border-8 border-blue-200 dark:border-blue-900/30 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">15</span>
                </div>
                <div className="absolute top-0 right-0 left-0 bottom-0 border-8 border-amber-400 rounded-full" style={{ clip: 'rect(0, 48px, 96px, 0)' }}></div>
                <div className="absolute top-0 right-0 left-0 bottom-0 border-8 border-red-400 rounded-full" style={{ clip: 'rect(0, 24px, 48px, 0)' }}></div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">View All Issues</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Resolution Time</h3>
              <Badge className="bg-green-100 text-green-800">Improving</Badge>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold">3.2</span>
              <span className="text-sm text-gray-500">hours avg</span>
            </div>
            <div className="h-10 bg-green-50 dark:bg-green-900/20 rounded-md flex items-end">
              <div className="bg-green-500 h-10 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-8 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-7 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-6 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-5 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-4 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-3 w-8 rounded-sm"></div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">Last Week: 5.8 hrs</span>
              <span className="text-xs text-green-600">-44%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">System Status</h3>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Services</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Services</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-gray-600">82% Used</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">System Logs</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Support Tickets</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search tickets..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { 
                    id: 'TICKET-124', 
                    user: 'Rahul Sharma', 
                    issue: 'Cannot submit quiz answers',
                    status: 'open',
                    priority: 'high',
                    created: new Date(2023, 5, 15, 14, 32) 
                  },
                  { 
                    id: 'TICKET-123', 
                    user: 'Priya Patel', 
                    issue: 'Payment failed but account charged',
                    status: 'in-progress',
                    priority: 'critical',
                    created: new Date(2023, 5, 15, 10, 24) 
                  },
                  { 
                    id: 'TICKET-122', 
                    user: 'Amit Kumar', 
                    issue: 'Unable to view flashcards',
                    status: 'resolved',
                    priority: 'normal',
                    created: new Date(2023, 5, 14, 16, 45) 
                  },
                  { 
                    id: 'TICKET-121', 
                    user: 'Sneha Gupta', 
                    issue: 'Wrong score displayed for test',
                    status: 'open',
                    priority: 'high',
                    created: new Date(2023, 5, 14, 9, 18) 
                  },
                ].map((ticket, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-mono">{ticket.id}</TableCell>
                    <TableCell>{ticket.user}</TableCell>
                    <TableCell>{ticket.issue}</TableCell>
                    <TableCell>
                      {ticket.status === 'open' && (
                        <Badge className="bg-amber-100 text-amber-800">Open</Badge>
                      )}
                      {ticket.status === 'in-progress' && (
                        <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                      )}
                      {ticket.status === 'resolved' && (
                        <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {ticket.priority === 'critical' && (
                        <Badge className="bg-red-100 text-red-800">Critical</Badge>
                      )}
                      {ticket.priority === 'high' && (
                        <Badge className="bg-amber-100 text-amber-800">High</Badge>
                      )}
                      {ticket.priority === 'normal' && (
                        <Badge className="bg-blue-100 text-blue-800">Normal</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {ticket.created.toLocaleDateString()} {ticket.created.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8">
                          <MessageSquare size={14} />
                          <span>Reply</span>
                        </Button>
                        {ticket.status !== 'resolved' && (
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 text-green-600">
                            <CheckCircle2 size={14} />
                            <span>Resolve</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLogs.map((log, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-mono text-xs">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {log.level === 'error' && (
                        <Badge className="bg-red-100 text-red-800">Error</Badge>
                      )}
                      {log.level === 'warning' && (
                        <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
                      )}
                      {log.level === 'info' && (
                        <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{log.message}</TableCell>
                    <TableCell>{log.source}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline">View All Logs</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-md">
                <ShieldAlert className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Multiple Failed Login Attempts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">5 failed attempts from IP 103.54.244.12</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">Today, 10:24 AM</span>
                    <Button variant="outline" size="sm" className="h-7 text-xs">Block IP</Button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/10 p-3 rounded-md">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Security Scan Complete</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">No vulnerabilities detected in system</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">Yesterday, 11:30 PM</span>
                    <Button variant="outline" size="sm" className="h-7 text-xs">View Report</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Admin Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <UserCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Vikram Singh</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Updated AI model parameters for learning style detection</p>
                  <span className="text-xs text-gray-500">Today, 2:14 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Ananya Sharma</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Approved 24 new concept cards for Physics</p>
                  <span className="text-xs text-gray-500">Today, 11:32 AM</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertOctagon className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Raj Patel</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Resolved system issue with doubt responder API</p>
                  <span className="text-xs text-gray-500">Yesterday, 5:47 PM</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">View All Activity</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssueResolutionTab;
