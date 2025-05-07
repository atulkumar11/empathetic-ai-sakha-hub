
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import CheckoutPage from '@/components/subscription/CheckoutPage';
import { SubscriptionPlan } from '@/types/user/base';

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateUserProfile } = useAuth();
  
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isGroup, setIsGroup] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  
  const handleSelectPlan = (plan: SubscriptionPlan, isGroupPlan: boolean) => {
    setSelectedPlan(plan);
    setIsGroup(isGroupPlan);
    
    if (isGroupPlan) {
      toast({
        title: "Group Plan Selected",
        description: "You can invite team members after checkout"
      });
    }
    
    setShowCheckout(true);
  };
  
  const handlePurchaseComplete = (plan: SubscriptionPlan, inviteCodes?: string[], emails?: string[]) => {
    // In a real app, this would typically happen via webhook
    // For demo purposes, we'll simulate updating the user profile
    
    if (user) {
      updateUserProfile({
        ...user,
        subscription: {
          planType: plan.type,
          startDate: new Date().toISOString(),
          expiryDate: new Date(new Date().setMonth(new Date().getMonth() + (plan.id.includes('annual') ? 12 : 1))).toISOString(),
          status: 'active',
          autoRenew: true,
        }
      });
    }
    
    toast({
      title: "Subscription Activated",
      description: `You are now subscribed to the ${plan.name} plan`
    });
    
    // For group plans, show invite codes
    if (isGroup && inviteCodes && emails) {
      // In a real app, you would email these
      toast({
        title: "Invite Codes Generated",
        description: "Invite codes have been generated for your team members"
      });
    }
    
    // Redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard/student');
    }, 1500);
  };
  
  return (
    <MainLayout>
      {showCheckout && selectedPlan ? (
        <CheckoutPage 
          selectedPlan={selectedPlan}
          onCancel={() => setShowCheckout(false)}
          onSuccess={handlePurchaseComplete}
          isGroupPlan={isGroup}
          invitedEmails={invitedEmails}
        />
      ) : (
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Choose Your Plan</h1>
              <p className="text-muted-foreground">Select the perfect plan for your exam preparation journey</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/student/profile')}
            >
              Back to Profile
            </Button>
          </div>
          
          <SubscriptionPlans
            currentPlanId={user?.subscription?.planType?.toString() || 'free'}
            onSelectPlan={handleSelectPlan}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default SubscriptionPage;
