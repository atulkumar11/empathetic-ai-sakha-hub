
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CardCreditsPanelProps {
  credits: number;
  maxCredits: number;
  subscriptionType: string;
}

const CardCreditsPanel: React.FC<CardCreditsPanelProps> = ({
  credits,
  maxCredits,
  subscriptionType
}) => {
  const { toast } = useToast();
  
  const percentage = (credits / maxCredits) * 100;
  
  const handleBuyCredits = () => {
    toast({
      title: "Purchase Credits",
      description: "Opening credits purchase page...",
    });
    // Implementation would go to a payment page
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Card Credits
        </CardTitle>
        <CardDescription>
          Credits available for creating custom content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{credits} credits remaining</span>
              <span className="text-sm text-muted-foreground">{percentage.toFixed(0)}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
          
          <div className="text-xs text-muted-foreground">
            {subscriptionType === 'pro' ? (
              <p>Pro subscribers get {maxCredits} credits/month</p>
            ) : subscriptionType === 'premium' ? (
              <p>Premium subscribers get {maxCredits} credits/month</p>
            ) : (
              <p>Upgrade to Pro/Premium for more monthly credits!</p>
            )}
          </div>
          
          <Button 
            onClick={handleBuyCredits} 
            variant="outline" 
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-1" /> Buy More Credits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardCreditsPanel;
