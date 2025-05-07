
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from 'lucide-react';
import type { Subject } from '@/types/user/studyPlan';

interface SubjectsListProps {
  subjects: Subject[];
}

const SubjectsList: React.FC<SubjectsListProps> = ({ subjects }) => {
  const getTopicStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-200 dark:bg-gray-700';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {subjects.map((subject) => (
        <AccordionItem key={subject.name} value={subject.name}>
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">{subject.name}</span>
                {subject.proficiency === 'weak' && 
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100">
                    Focus Needed
                  </Badge>
                }
              </div>
              <div className="flex items-center gap-2">
                <Progress value={subject.progress} className={`w-24 ${
                  subject.proficiency === 'strong' ? 'bg-green-500' : 
                  subject.proficiency === 'moderate' ? 'bg-amber-500' : 
                  'bg-red-500'
                }`} />
                <span>{subject.progress}%</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {subject.topics.map((topic) => (
                <div key={topic.name} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getTopicStatusColor(topic.status)}`} />
                    <span>{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {getPriorityBadge(topic.priority)}
                    {topic.status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SubjectsList;
