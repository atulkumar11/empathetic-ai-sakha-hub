
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CardCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'concept' | 'flashcard' | 'exam';
  creditPoints: number;
  costPerCard: number;
  onCreateCard: (cardData: any) => void;
}

const CardCreationDialog: React.FC<CardCreationDialogProps> = ({
  open,
  onOpenChange,
  type,
  creditPoints,
  costPerCard,
  onCreateCard
}) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [concept, setConcept] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleCreate = () => {
    // Validation
    if (!subject || !topic || !concept || !difficulty) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Check credit points
    if (creditPoints < costPerCard) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${costPerCard} credits to create this ${type}. You currently have ${creditPoints}.`,
        variant: "destructive"
      });
      return;
    }

    // Create card data based on type
    const cardData = {
      subject,
      topic,
      concept,
      difficulty,
      tags,
      description,
      type,
      createdAt: new Date().toISOString()
    };

    onCreateCard(cardData);
    
    // Reset form
    setSubject('');
    setTopic('');
    setConcept('');
    setDifficulty('medium');
    setTags([]);
    setTag('');
    setDescription('');
    
    // Close dialog
    onOpenChange(false);
    
    toast({
      title: "Card Created",
      description: `Your ${type} card is being generated. It will be available shortly.`,
    });
  };

  const typeTitle = 
    type === 'concept' ? 'Concept Card' : 
    type === 'flashcard' ? 'Flashcard' : 'Practice Exam';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New {typeTitle}</DialogTitle>
          <DialogDescription>
            This will cost {costPerCard} credit points. You currently have {creditPoints} points.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject*</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Physics"
              />
            </div>
            <div>
              <Label htmlFor="topic">Topic*</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Mechanics"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="concept">Concept/Title*</Label>
            <Input
              id="concept"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="e.g. Newton's Laws of Motion"
            />
          </div>
          
          <div>
            <Label htmlFor="difficulty">Difficulty Level*</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="very-hard">Very Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="tags"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Add tags"
                className="flex-grow"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" variant="secondary" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge key={t} className="px-2 py-1">
                  {t}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleRemoveTag(t)}
                    className="h-4 w-4 ml-1 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Additional Instructions (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any specific requirements or focus areas"
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleCreate}
            className="bg-gradient-to-r from-blue-500 to-violet-500"
          >
            Create {typeTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardCreationDialog;
