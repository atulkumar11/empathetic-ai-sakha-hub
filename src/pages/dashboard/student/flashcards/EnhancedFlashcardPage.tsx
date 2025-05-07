
import React, { useState } from 'react';
import EnhancedInteractiveFlashcard from '@/components/flashcards/EnhancedInteractiveFlashcard';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import CreateCardButton from '@/components/dashboard/student/cards/CreateCardButton';
import CardCreationDialog from '@/components/dashboard/student/cards/CardCreationDialog';
import CardCreditsPanel from '@/components/dashboard/student/cards/CardCreditsPanel';
import { useToast } from '@/hooks/use-toast';

const EnhancedFlashcardPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Mock user data - in real app would come from user context or API
  const userSubscription = {
    type: 'premium',
    isPremium: true,
    creditPoints: 25,
    maxCreditPoints: 50
  };
  
  const handleCreateFlashcard = (cardData: any) => {
    console.log("Creating flashcard:", cardData);
    // Here we would send the data to an API to generate the flashcard
    
    toast({
      title: "Flashcard Created",
      description: "Your flashcard is now being generated and will be available soon.",
    });
  };

  return (
    <SharedPageLayout
      title="Interactive Flashcards"
      subtitle="Master concepts with our enhanced flashcard learning system"
      showQuickAccess={false}
      actionComponent={
        <CreateCardButton
          type="flashcard"
          onClick={() => setIsCreateDialogOpen(true)}
          isPremium={userSubscription.isPremium}
          creditPoints={userSubscription.creditPoints}
        />
      }
    >
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <EnhancedInteractiveFlashcard />
        </div>
        
        <div className="md:col-span-1">
          <CardCreditsPanel 
            credits={userSubscription.creditPoints}
            maxCredits={userSubscription.maxCreditPoints}
            subscriptionType={userSubscription.type}
          />
        </div>
      </div>
      
      <CardCreationDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        type="flashcard"
        creditPoints={userSubscription.creditPoints}
        costPerCard={5}
        onCreateCard={handleCreateFlashcard}
      />
    </SharedPageLayout>
  );
};

export default EnhancedFlashcardPage;
