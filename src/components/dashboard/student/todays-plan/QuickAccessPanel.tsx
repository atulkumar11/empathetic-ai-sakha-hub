
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, BookMarked, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickAccessPanelProps {
  className?: string;
}

const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Quick Access</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button variant="outline" asChild className="justify-start">
          <Link to="/dashboard/student/concepts">
            <BookOpen className="mr-2 h-4 w-4" /> Concept Cards
          </Link>
        </Button>
        <Button variant="outline" asChild className="justify-start">
          <Link to="/dashboard/student/flashcards">
            <BookMarked className="mr-2 h-4 w-4" /> Flashcards
          </Link>
        </Button>
        <Button variant="outline" asChild className="justify-start">
          <Link to="/dashboard/student/practice-exam">
            <Brain className="mr-2 h-4 w-4" /> Practice Exams
          </Link>
        </Button>
        <Button variant="outline" asChild className="justify-start">
          <Link to="/dashboard/student/academic">
            <CalendarDays className="mr-2 h-4 w-4" /> Study Plan
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAccessPanel;
