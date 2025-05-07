import React from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour?: () => void;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime,
  onOpenTour
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div>
          <h2 className="text-lg font-semibold">{formattedTime}</h2>
          <p className="text-muted-foreground text-sm">{formattedDate}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenTour}
          className="hidden sm:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 border-indigo-200"
        >
          <HelpCircle className="h-4 w-4" />
          Tour Guide
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
