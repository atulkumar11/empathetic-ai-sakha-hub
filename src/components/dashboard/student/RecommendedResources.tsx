
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Book, ExternalLink } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'book' | 'link';
  subject: string;
  url: string;
}

interface RecommendedResourcesProps {
  resources: Resource[];
}

const RecommendedResources: React.FC<RecommendedResourcesProps> = ({ resources }) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'book':
        return <Book className="h-5 w-5 text-green-500" />;
      case 'link':
        return <ExternalLink className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map(resource => (
            <a 
              href={resource.url} 
              key={resource.id}
              target="_blank" 
              rel="noopener noreferrer"
              className="block border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getResourceIcon(resource.type)}
                <div>
                  <h3 className="font-medium text-sm">{resource.title}</h3>
                  <Badge variant="outline" className="mt-1">{resource.subject}</Badge>
                </div>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedResources;
