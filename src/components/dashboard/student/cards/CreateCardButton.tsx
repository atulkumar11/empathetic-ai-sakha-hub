
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CreateCardButtonProps {
  type: 'concept' | 'flashcard' | 'exam';
  onClick: () => void;
  isPremium: boolean;
  creditPoints?: number;
}

const CreateCardButton: React.FC<CreateCardButtonProps> = ({ 
  type, 
  onClick, 
  isPremium,
  creditPoints = 0
}) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: `Creating custom ${type} cards requires a Premium or Pro subscription.`,
        variant: "destructive",
      });
      return;
    }
    
    if (creditPoints <= 0) {
      toast({
        title: "Insufficient Credits",
        description: "You've used all your credit points. Purchase more to create additional cards.",
        variant: "destructive",
      });
      return;
    }
    
    onClick();
  };

  const typeLabel = 
    type === 'concept' ? 'Concept Card' :
    type === 'flashcard' ? 'Flashcard' : 'Practice Exam';

  return (
    <Button
      onClick={handleClick}
      className={`${isPremium ? 'bg-gradient-to-r from-blue-500 to-violet-500' : 'bg-gray-300'} text-white`}
      disabled={!isPremium || creditPoints <= 0}
    >
      <Plus className="mr-1 h-4 w-4" /> Create {typeLabel}
    </Button>
  );
};

export default CreateCardButton;
