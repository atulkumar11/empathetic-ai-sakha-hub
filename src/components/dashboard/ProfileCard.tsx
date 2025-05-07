
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfileBase, SubscriptionType } from "@/types/user/base";

interface ProfileCardProps {
  userProfile: UserProfileBase;
  className?: string;
}

export function ProfileCard({ userProfile, className = "" }: ProfileCardProps) {
  // Determine subscription display info
  const getSubscriptionInfo = () => {
    let planType = "free";
    if (typeof userProfile.subscription === 'object' && userProfile.subscription) {
      planType = userProfile.subscription.planType;
    } else if (typeof userProfile.subscription === 'string') {
      planType = userProfile.subscription;
    }

    const subscriptionColors: Record<string, string> = {
      free: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      basic: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      premium: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      enterprise: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      trial: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      pro_annual: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      pro_monthly: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
    };
    
    const subscriptionLabels: Record<string, string> = {
      free: "Free",
      basic: "Basic",
      premium: "Premium",
      enterprise: "Enterprise",
      trial: "Trial",
      pro_annual: "Pro (Annual)",
      pro_monthly: "Pro (Monthly)",
      custom: "Custom"
    };

    const color = subscriptionColors[planType.toLowerCase()] || subscriptionColors.free;
    const label = subscriptionLabels[planType.toLowerCase()] || "Unknown";
    
    return { color, label };
  };
  
  const subscriptionInfo = getSubscriptionInfo();
  
  // Format last active time if available
  const lastActiveText = "Active now";
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const avatarUrl = userProfile.avatar || '';
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar className="h-16 w-16 mr-4">
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={userProfile.name} /> : null}
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {getInitials(userProfile.name)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-lg font-semibold">{userProfile.name}</h3>
              <div className="flex items-center mt-1 space-x-2">
                <Badge variant="outline" className={subscriptionInfo.color}>
                  {subscriptionInfo.label}
                </Badge>
                
                <span className="text-xs text-muted-foreground">
                  {userProfile.email}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{lastActiveText}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col p-2 bg-muted/40 rounded-lg">
            <span className="text-sm">Streak</span>
            <span className="text-xl font-semibold">0 days</span>
          </div>
          <div className="flex flex-col p-2 bg-muted/40 rounded-lg">
            <span className="text-sm">Study Hours</span>
            <span className="text-xl font-semibold">0h</span>
          </div>
          <div className="flex flex-col p-2 bg-muted/40 rounded-lg">
            <span className="text-sm">Concepts</span>
            <span className="text-xl font-semibold">0</span>
          </div>
          <div className="flex flex-col p-2 bg-muted/40 rounded-lg">
            <span className="text-sm">Tests</span>
            <span className="text-xl font-semibold">0</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
