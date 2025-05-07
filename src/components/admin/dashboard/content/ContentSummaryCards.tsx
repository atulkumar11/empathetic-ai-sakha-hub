
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ContentTypeCard {
  type: string;
  name: string;
  count: number;
  description: string;
  route: string;
}

interface ContentSummaryCardsProps {
  handleManageContent: (contentType: string) => void;
}

const ContentSummaryCards = ({ handleManageContent }: ContentSummaryCardsProps) => {
  const contentTypes: ContentTypeCard[] = [
    {
      type: "Concept Cards",
      name: "Concept Cards",
      count: 238,
      description: "Auto-generated topic concepts",
      route: "/api/content/conceptcard"
    },
    {
      type: "Flashcards",
      name: "Flashcards",
      count: 1546,
      description: "Auto-generated topic flashcards",
      route: "/api/content/flashcard"
    },
    {
      type: "Exam Papers",
      name: "Exam Papers",
      count: 42,
      description: "Based on past pattern & syllabus",
      route: "/api/content/exam"
    },
    {
      type: "Study Materials",
      name: "Study Materials",
      count: 89,
      description: "View + tag uploaded resources",
      route: "/api/content/library"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {contentTypes.map((item, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium">{item.name}</span>
            <Badge>{item.count}</Badge>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500">Route: {item.route}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7"
              onClick={() => handleManageContent(item.type)}
            >
              Manage
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentSummaryCards;
