
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CheckCircle, CreditCard } from "lucide-react";
import { SubscriptionInfo } from "@/types/user/subscription";
import { UserRole } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionPlanProps {
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  isCurrentPlan?: boolean;
  maxMembers?: number;
  onSelect: () => void;
}

const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({
  name,
  price,
  features,
  isPopular = false,
  isCurrentPlan = false,
  maxMembers,
  onSelect,
}) => {
  return (
    <Card className={`relative border ${
      isCurrentPlan 
        ? "border-primary shadow-md" 
        : isPopular 
          ? "border-purple-300 dark:border-purple-800 shadow-md" 
          : ""
    }`}>
      {isCurrentPlan && (
        <div className="absolute -top-3 left-0 w-full flex justify-center">
          <Badge className="bg-primary hover:bg-primary text-primary-foreground">
            Your Plan
          </Badge>
        </div>
      )}
      
      {isPopular && !isCurrentPlan && (
        <div className="absolute -top-3 left-0 w-full flex justify-center">
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardContent className="pt-6 pb-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        
        <div className="mt-2">
          <span className="text-3xl font-bold">₹{price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        
        {maxMembers && (
          <div className="mt-2 text-sm">
            <span className="font-medium">Up to {maxMembers} members</span>
          </div>
        )}
        
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          className="w-full mt-6"
          variant={isCurrentPlan ? "outline" : "default"}
          onClick={onSelect}
        >
          {isCurrentPlan ? "Current Plan" : "Select Plan"}
        </Button>
      </CardContent>
    </Card>
  );
};

interface ProfileSubscriptionPanelProps {
  currentSubscription?: string | SubscriptionInfo;
  userRole: UserRole;
}

const ProfileSubscriptionPanel: React.FC<ProfileSubscriptionPanelProps> = ({
  currentSubscription,
  userRole,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Determine current plan type
  const getCurrentPlanType = () => {
    if (!currentSubscription) return "free";
    
    if (typeof currentSubscription === "object") {
      return currentSubscription.planType;
    }
    
    return currentSubscription;
  };
  
  const planType = getCurrentPlanType();
  
  const handleSelectPlan = (planName: string) => {
    toast({
      title: "Subscription Selected",
      description: `You've selected the ${planName} plan. Redirecting to checkout...`,
    });
    
    // In a real app, this would redirect to a checkout page
    setTimeout(() => {
      navigate('/dashboard/student/subscription');
    }, 1500);
  };
  
  const handleManageSubscription = () => {
    navigate('/dashboard/student/subscription');
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Manage Your Subscription</h2>
        <p className="text-muted-foreground mt-2">
          Choose the plan that works best for your learning goals
        </p>
      </div>
      
      {/* Current Plan Summary */}
      {currentSubscription && typeof currentSubscription === 'object' && currentSubscription.isActive && (
        <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-none">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-violet-600" />
                  Your Current Plan: {planType === 'free' ? 'Free' : 
                    planType === 'premium' ? 'Premium' :
                    planType === 'pro_annual' ? 'Pro (Annual)' :
                    planType === 'pro_monthly' ? 'Pro (Monthly)' :
                    planType === 'group_small' ? 'Group (Small)' :
                    planType === 'group_medium' ? 'Group (Medium)' :
                    planType === 'group_large' ? 'Group (Large)' : 
                    'Custom'}
                </h3>
                
                <div className="flex items-center gap-2 mt-1">
                  {currentSubscription.startDate && (
                    <span className="text-sm text-muted-foreground">
                      Started: {new Date(currentSubscription.startDate).toLocaleDateString()}
                    </span>
                  )}
                  
                  {currentSubscription.expiryDate && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        Expires: {new Date(currentSubscription.expiryDate).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>
                
                {currentSubscription.features && currentSubscription.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentSubscription.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="capitalize">
                        {feature.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={handleManageSubscription}>
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Available Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Individual Plans */}
        <SubscriptionPlan
          name="Basic"
          price={199}
          features={[
            "All core learning modules",
            "Practice questions",
            "Basic progress tracking",
            "Limited AI tutor assistance"
          ]}
          isCurrentPlan={planType === "basic"}
          onSelect={() => handleSelectPlan("Basic")}
        />
        
        <SubscriptionPlan
          name="Premium"
          price={499}
          features={[
            "Everything in Basic",
            "Unlimited AI tutor assistance",
            "Advanced analytics",
            "Mock tests with detailed analysis",
            "Personalized study plan"
          ]}
          isPopular={true}
          isCurrentPlan={planType === "premium"}
          onSelect={() => handleSelectPlan("Premium")}
        />
        
        <SubscriptionPlan
          name="Pro"
          price={999}
          features={[
            "Everything in Premium",
            "Live doubt clearing sessions",
            "Personalized feedback",
            "Subject expert consultations",
            "Guaranteed score improvement"
          ]}
          isCurrentPlan={planType === "pro_monthly" || planType === "pro_annual"}
          onSelect={() => handleSelectPlan("Pro")}
        />
      
        {/* Group Plans */}
        {userRole === UserRole.Student && (
          <>
            <SubscriptionPlan
              name="Group Small"
              price={1999}
              maxMembers={5}
              features={[
                "All features of Premium plan",
                "Group analytics dashboard",
                "Shared study materials",
                "Group competitions and leaderboards",
                "Batch leader tools"
              ]}
              isCurrentPlan={planType === "group_small"}
              onSelect={() => handleSelectPlan("Group Small")}
            />
            
            <SubscriptionPlan
              name="Group Medium"
              price={3499}
              maxMembers={10}
              features={[
                "All features of Premium plan",
                "Group analytics dashboard",
                "Shared study materials",
                "Group competitions and leaderboards",
                "Batch leader tools",
                "Extended member management"
              ]}
              isCurrentPlan={planType === "group_medium"}
              onSelect={() => handleSelectPlan("Group Medium")}
            />
            
            <SubscriptionPlan
              name="Group Large"
              price={5999}
              maxMembers={20}
              features={[
                "All features of Premium plan",
                "Group analytics dashboard",
                "Shared study materials",
                "Group competitions and leaderboards",
                "Enhanced batch leader tools",
                "Advanced member management",
                "Sub-group creation"
              ]}
              isCurrentPlan={planType === "group_large"}
              onSelect={() => handleSelectPlan("Group Large")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSubscriptionPanel;
