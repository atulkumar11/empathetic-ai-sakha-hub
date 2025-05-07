
import React, { useState, useMemo } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Plus, Info, CreditCard, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionType } from '@/types/user/base';

interface CreateExamCardDialogProps {
  userSubscription?: SubscriptionType;
  userCredits: {
    standard: number;
    exam: number;
  };
  onCreateCards: (data: ExamCardFormData) => void;
  onPurchaseCredits: () => void;
}

export interface ExamCardFormData {
  subject: string;
  topic: string;
  concept: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  cardCount: number;
}

// Mock subject-topic mapping for auto-suggestions
const subjectTopicMap: Record<string, string[]> = {
  'physics': ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Modern Physics'],
  'chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
  'mathematics': ['Calculus', 'Algebra', 'Geometry', 'Statistics', 'Trigonometry'],
  'biology': ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Microbiology'],
  'polity': ['Indian Constitution', 'Governance', 'International Relations', 'Public Policy'],
  'geography': ['Physical Geography', 'Human Geography', 'Indian Geography', 'World Geography'],
  'history': ['Ancient History', 'Medieval History', 'Modern History', 'World History']
};

const CreateExamCardDialog: React.FC<CreateExamCardDialogProps> = ({
  userSubscription = SubscriptionType.Free,
  userCredits = { standard: 0, exam: 0 },
  onCreateCards,
  onPurchaseCredits
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ExamCardFormData>({
    subject: '',
    topic: '',
    concept: '',
    difficulty: 'medium',
    tags: [],
    cardCount: 5
  });
  
  // Check if user has access to create cards
  const hasAccess = userSubscription !== SubscriptionType.Free;
  
  // Check if user has enough credits
  const hasEnoughCredits = userCredits.exam >= formData.cardCount;
  
  // Available topics based on selected subject
  const availableTopics = useMemo(() => {
    if (!formData.subject) return [];
    return subjectTopicMap[formData.subject.toLowerCase()] || [];
  }, [formData.subject]);
  
  const handleInputChange = (field: keyof ExamCardFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    setFormData(prev => ({ ...prev, tags }));
  };
  
  const handleSubmit = () => {
    // Validate form
    if (!formData.subject || !formData.topic || !formData.concept) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Check subscription status
    if (!hasAccess) {
      toast({
        title: "Premium feature",
        description: "You need a Pro or Group subscription to create exam cards.",
        variant: "destructive"
      });
      return;
    }
    
    // Check credit balance
    if (!hasEnoughCredits) {
      toast({
        title: "Insufficient credits",
        description: `You need ${formData.cardCount} exam credits to create these cards. Please purchase more credits.`,
        variant: "destructive"
      });
      // Open purchase dialog or redirect
      onPurchaseCredits();
      return;
    }
    
    // All checks passed, create the cards
    onCreateCards(formData);
    
    // Close dialog and reset form
    setOpen(false);
    setFormData({
      subject: '',
      topic: '',
      concept: '',
      difficulty: 'medium',
      tags: [],
      cardCount: 5
    });
    
    toast({
      title: "Cards created!",
      description: `${formData.cardCount} exam cards have been created successfully.`
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Create Exam Cards
          {userCredits.exam > 0 && (
            <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
              {userCredits.exam} credits
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Custom Exam Cards</DialogTitle>
          <DialogDescription>
            Generate AI-powered exam cards for your study plan
            {!hasAccess && (
              <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                Pro Feature
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Exam Credits Available:</span>
            </div>
            <Badge variant={hasEnoughCredits ? "outline" : "destructive"}>
              {userCredits.exam} credits
            </Badge>
          </div>
          
          {!hasEnoughCredits && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                You don't have enough exam credits. Each card requires 1 credit.
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.subject}
              onValueChange={(value) => handleInputChange("subject", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="polity">Polity</SelectItem>
                <SelectItem value="geography">Geography</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="topic">Topic <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.topic}
              onValueChange={(value) => handleInputChange("topic", value)}
              disabled={!formData.subject}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.subject ? "Select a topic" : "Select a subject first"} />
              </SelectTrigger>
              <SelectContent>
                {availableTopics.map((topic) => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="concept">Concept/Focus Area <span className="text-red-500">*</span></Label>
            <Input 
              id="concept" 
              placeholder="e.g., Newton's Laws, Integration Techniques" 
              value={formData.concept}
              onChange={(e) => handleInputChange("concept", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select 
              value={formData.difficulty}
              onValueChange={(value: 'easy' | 'medium' | 'hard') => handleInputChange("difficulty", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input 
              id="tags" 
              placeholder="e.g., important, revision, formulae" 
              value={formData.tags.join(', ')}
              onChange={(e) => handleTagsChange(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="cardCount">Number of Cards to Create</Label>
              <span className="text-sm font-medium">
                {formData.cardCount} cards
                <span className="text-muted-foreground ml-1">
                  ({formData.cardCount} credits)
                </span>
              </span>
            </div>
            <Slider 
              min={1}
              max={20}
              step={1}
              value={[formData.cardCount]}
              onValueChange={(value) => handleInputChange("cardCount", value[0])}
              className="py-4"
            />
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {!hasEnoughCredits && (
            <Button 
              onClick={onPurchaseCredits} 
              variant="outline" 
              className="w-full sm:w-auto"
            >
              <CreditCard className="h-4 w-4 mr-1" />
              Purchase Credits
            </Button>
          )}
          <Button 
            onClick={handleSubmit} 
            disabled={!hasAccess || !hasEnoughCredits}
            className="w-full sm:w-auto"
          >
            Create {formData.cardCount} Cards
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamCardDialog;
