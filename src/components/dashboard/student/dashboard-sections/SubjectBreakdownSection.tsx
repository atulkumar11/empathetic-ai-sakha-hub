
import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Subject } from '@/types/student/dashboard';
import { AlertCircle, ArrowDown, ArrowUp, BookOpen } from 'lucide-react';

interface SubjectBreakdownSectionProps {
  subjects: Subject[];
}

const SubjectBreakdownSection: React.FC<SubjectBreakdownSectionProps> = ({ subjects }) => {
  const [sortField, setSortField] = useState<keyof Subject>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Subject) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSubjects = [...subjects].sort((a, b) => {
    let compare = 0;
    
    if (sortField === 'name' || sortField === 'priority' || sortField === 'status') {
      compare = String(a[sortField]).localeCompare(String(b[sortField]));
    } else if (sortField === 'flashcards' || sortField === 'practiceTests') {
      // Handle nested objects
      const fieldA = sortField === 'flashcards' ? a.flashcards.accuracy : a.practiceTests.score;
      const fieldB = sortField === 'flashcards' ? b.flashcards.accuracy : b.practiceTests.score;
      compare = fieldA - fieldB;
    } else {
      // For numeric fields
      compare = Number(a[sortField]) - Number(b[sortField]);
    }
    
    return sortDirection === 'asc' ? compare : -compare;
  });

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300">✅ Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300">🟡 In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300">🟠 Not Started</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Helper function to get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300">High</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-violet-600" />
          Subject-Wise Detailed Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer" 
                  onClick={() => handleSort('name')}
                >
                  Subject
                  {sortField === 'name' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                </TableHead>
                <TableHead 
                  className="cursor-pointer" 
                  onClick={() => handleSort('priority')}
                >
                  Priority
                  {sortField === 'priority' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('conceptsCompleted')}
                >
                  Concepts
                  {sortField === 'conceptsCompleted' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                </TableHead>
                <TableHead>Flashcards</TableHead>
                <TableHead>Practice Tests</TableHead>
                <TableHead 
                  className="cursor-pointer" 
                  onClick={() => handleSort('quizAverage')}
                >
                  Quiz Score
                  {sortField === 'quizAverage' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('flashcards')}
                >
                  Recall Accuracy
                  {sortField === 'flashcards' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                </TableHead>
                <TableHead 
                  className="cursor-pointer" 
                  onClick={() => handleSort('status')}
                >
                  Status
                  {sortField === 'status' && (sortDirection === 'asc' ? <ArrowUp className="ml-1 inline h-3 w-3" /> : <ArrowDown className="ml-1 inline h-3 w-3" />)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSubjects.map(subject => (
                <TableRow key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell>{getPriorityBadge(subject.priority)}</TableCell>
                  <TableCell>
                    {subject.conceptsCompleted} / {subject.conceptsTotal}
                    <Progress 
                      value={(subject.conceptsCompleted / subject.conceptsTotal) * 100} 
                      className="h-1 mt-1" 
                    />
                  </TableCell>
                  <TableCell>
                    {subject.flashcards.completed} / {subject.flashcards.total}
                    <Progress 
                      value={(subject.flashcards.completed / subject.flashcards.total) * 100} 
                      className="h-1 mt-1" 
                    />
                  </TableCell>
                  <TableCell>
                    {subject.practiceTests.completed} / {subject.practiceTests.total}
                    <Progress 
                      value={(subject.practiceTests.completed / subject.practiceTests.total) * 100} 
                      className="h-1 mt-1" 
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span 
                        className={`font-medium ${subject.quizAverage >= 80 ? 'text-green-600 dark:text-green-400' : 
                          subject.quizAverage >= 60 ? 'text-amber-600 dark:text-amber-400' : 
                          'text-red-600 dark:text-red-400'}`}
                      >
                        {subject.quizAverage}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span 
                        className={`font-medium ${subject.flashcards.accuracy >= 80 ? 'text-green-600 dark:text-green-400' : 
                          subject.flashcards.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' : 
                          'text-red-600 dark:text-red-400'}`}
                      >
                        {subject.flashcards.accuracy}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(subject.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectBreakdownSection;
