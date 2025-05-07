
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  backButtonUrl?: string;
  actions?: React.ReactNode;
}

export const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  title,
  subtitle,
  children,
  showBackButton = false,
  backButtonUrl = '',
  actions
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backButtonUrl) {
      navigate(backButtonUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 mr-2" 
              onClick={handleBack}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Go back</span>
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="mt-4 sm:mt-0">{actions}</div>}
      </div>
      {children}
    </div>
  );
};
