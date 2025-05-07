
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuickAccess } from '@/components/dashboard/student/QuickAccess';
import { SectionHeader } from '@/components/ui/section-header';

interface ConceptsPageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

export const ConceptsPageLayout: React.FC<ConceptsPageLayoutProps> = ({
  children,
  showBackButton = false,
  title,
  subtitle
}) => {
  return (
    <div className="space-y-6">
      <QuickAccess />
      
      <div className="flex items-center justify-between">
        {showBackButton && (
          <Link to="/dashboard/student/concepts">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Concepts
            </Button>
          </Link>
        )}
        
        {title && (
          <SectionHeader title={title} subtitle={subtitle} />
        )}
      </div>
      
      <Card className="p-6">
        {children}
      </Card>
    </div>
  );
};
