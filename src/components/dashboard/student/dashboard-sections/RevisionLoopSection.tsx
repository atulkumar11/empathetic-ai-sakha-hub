
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, AlertTriangle, Check, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RevisionItem } from '@/types/student/dashboard';

interface RevisionLoopSectionProps {
  revisionItems: RevisionItem[];
}

const RevisionLoopSection: React.FC<RevisionLoopSectionProps> = ({ revisionItems }) => {
  // Helper function to get proper badge for each priority level
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Helper function to get icon based on revision item type
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'concept':
        return <div className="bg-blue-100 text-blue-700 p-1 rounded-md"><RotateCw className="h-4 w-4" /></div>;
      case 'flashcard':
        return <div className="bg-purple-100 text-purple-700 p-1 rounded-md"><RotateCw className="h-4 w-4" /></div>;
      case 'quiz':
        return <div className="bg-green-100 text-green-700 p-1 rounded-md"><RotateCw className="h-4 w-4" /></div>;
      default:
        return <div className="bg-gray-100 text-gray-700 p-1 rounded-md"><RotateCw className="h-4 w-4" /></div>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <RotateCw className="mr-2 h-5 w-5 text-amber-500" />
          <CardTitle className="text-lg font-medium">Revision Loop</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-600">
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Smart revision recommendations based on spaced repetition
        </div>
        
        <div className="space-y-3">
          {revisionItems && revisionItems.length > 0 ? (
            revisionItems.map(item => (
              <div 
                key={item.id}
                className="p-3 border rounded-lg bg-gradient-to-r from-amber-50/50 to-white dark:from-amber-900/10 dark:to-gray-800/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <div className="font-medium">{item.title}</div>
                  </div>
                  {getPriorityBadge(item.priority)}
                </div>
                
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <div className="space-x-4 flex">
                    <span className="text-muted-foreground">{item.subject}</span>
                    <span className="flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-1 sm:mt-0">
                    <span className="text-muted-foreground">Retention:</span>
                    <div className="flex items-center">
                      <span className={`font-medium ${
                        item.retentionScore < 50 ? 'text-red-500' : 
                        item.retentionScore < 75 ? 'text-amber-500' : 
                        'text-green-500'
                      }`}>
                        {item.retentionScore}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    Review Now
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <AlertTriangle className="mx-auto h-8 w-8 mb-2 text-amber-500 opacity-70" />
              <p>No revision items due</p>
              <Button variant="outline" size="sm" className="mt-3">
                <Check className="mr-1 h-3 w-3" />
                All caught up!
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RevisionLoopSection;
