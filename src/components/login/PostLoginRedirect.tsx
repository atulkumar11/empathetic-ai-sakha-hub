
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book, BookOpen, LayoutDashboard } from "lucide-react";

interface PostLoginRedirectProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lastActivity?: {
    type: string;
    id?: string;
    description: string;
  } | null;
}

const PostLoginRedirect: React.FC<PostLoginRedirectProps> = ({
  open,
  onOpenChange,
  lastActivity
}) => {
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  const getLastActivityPath = () => {
    if (!lastActivity) return '/dashboard/student/overview';
    
    switch (lastActivity.type) {
      case 'concept':
        return `/dashboard/student/concepts/${lastActivity.id}`;
      case 'flashcard':
        return `/dashboard/student/flashcards/${lastActivity.id}`;
      case 'practice-exam':
        return `/dashboard/student/practice-exam/${lastActivity.id}`;
      default:
        return '/dashboard/student/overview';
    }
  };

  const getLastActivityDescription = () => {
    if (!lastActivity) return 'Welcome back! Choose where to start:';
    return `Last time you were working on: ${lastActivity.description}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome Back!</DialogTitle>
          <DialogDescription>
            {getLastActivityDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {lastActivity && (
            <Button
              onClick={() => handleRedirect(getLastActivityPath())}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Continue where you left off
            </Button>
          )}
          
          <Button
            onClick={() => handleRedirect('/dashboard/student/overview')}
            variant="outline"
            className="w-full"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
          
          <Button
            onClick={() => handleRedirect('/dashboard/student/concepts/all')}
            variant="outline"
            className="w-full"
          >
            <Book className="mr-2 h-4 w-4" />
            Browse All Concepts
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostLoginRedirect;
