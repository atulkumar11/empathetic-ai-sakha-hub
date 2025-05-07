
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface DailyQuoteProps {
  quote?: string;
  author?: string;
}

const DailyQuote: React.FC<DailyQuoteProps> = ({ 
  quote = "The secret of getting ahead is getting started.",
  author = "Mark Twain" 
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <blockquote className="border-l-4 border-primary/30 pl-4 py-2 italic text-gray-700 dark:text-gray-300">
          "{quote}"
          <footer className="text-right mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            — {author}
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default DailyQuote;
