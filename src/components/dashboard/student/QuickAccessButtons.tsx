
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, FileText, MessageSquare, Calendar } from 'lucide-react';

export const QuickAccessButtons: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Link to="/dashboard/student/concepts">
        <Button variant="outline" size="sm" className="flex items-center">
          <Book className="h-4 w-4 mr-1" />
          Concepts
        </Button>
      </Link>
      <Link to="/dashboard/student/flashcards">
        <Button variant="outline" size="sm" className="flex items-center">
          <BookOpen className="h-4 w-4 mr-1" />
          Flashcards
        </Button>
      </Link>
      <Link to="/dashboard/student/practice-exam">
        <Button variant="outline" size="sm" className="flex items-center">
          <FileText className="h-4 w-4 mr-1" />
          Practice Tests
        </Button>
      </Link>
      <Link to="/dashboard/student/tutor">
        <Button variant="outline" size="sm" className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          AI Tutor
        </Button>
      </Link>
      <Link to="/dashboard/student/study-plan">
        <Button variant="outline" size="sm" className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          Study Plan
        </Button>
      </Link>
    </div>
  );
};

export default QuickAccessButtons;
