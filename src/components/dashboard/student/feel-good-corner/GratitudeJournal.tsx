
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, Save, BookOpen, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GratitudeJournalProps {
  onLike: () => void;
}

interface JournalEntry {
  id: number;
  date: Date;
  content: string;
}

const GratitudeJournal: React.FC<GratitudeJournalProps> = ({ onLike }) => {
  const { toast } = useToast();
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      content: "I'm grateful for the clear explanation my physics teacher gave today which helped me understand a difficult concept."
    },
    {
      id: 2,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      content: "Thankful for my study group who helped me prepare for the mock test. Their support made a big difference."
    }
  ]);
  
  const saveEntry = () => {
    if (!journalText.trim()) {
      toast({
        title: "Cannot Save Empty Entry",
        description: "Please write something you're grateful for today.",
        variant: "destructive"
      });
      return;
    }
    
    const newEntry = {
      id: Date.now(),
      date: new Date(),
      content: journalText
    };
    
    setEntries([newEntry, ...entries]);
    setJournalText('');
    
    toast({
      title: "Entry Saved",
      description: "Your gratitude journal entry has been saved successfully."
    });
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-amber-500" />
            Today's Gratitude Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            What are you grateful for today in your learning journey?
          </p>
          <Textarea
            placeholder="I'm grateful for..."
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {journalText.length > 0 ? `${journalText.length} characters` : 'Start writing...'}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setJournalText('')}>Clear</Button>
              <Button onClick={saveEntry}>
                <Save className="h-4 w-4 mr-2" /> Save Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Previous Entries</h3>
        <Button variant="outline" onClick={onLike}>
          <ThumbsUp className="h-4 w-4 mr-2" /> Like This Activity
        </Button>
      </div>
      
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {formatDate(entry.date)}
                </span>
              </div>
              <p className="text-sm">{entry.content}</p>
            </CardContent>
          </Card>
        ))}
        
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" /> View More Entries
        </Button>
      </div>
      
      <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Benefits of Gratitude Practice</h3>
          <ul className="text-sm space-y-1 list-disc ml-4 text-amber-800 dark:text-amber-300">
            <li>Improves focus and mental clarity during study sessions</li>
            <li>Reduces stress and anxiety before exams</li>
            <li>Increases overall satisfaction with learning progress</li>
            <li>Builds resilience for challenging academic periods</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GratitudeJournal;
