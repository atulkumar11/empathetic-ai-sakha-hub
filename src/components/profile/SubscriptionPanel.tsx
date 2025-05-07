
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubscriptionPlan } from "@/types/user/base";
import { Calendar, Check, ChevronRight, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { format, addDays, differenceInDays } from "date-fns";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SubscriptionPanelProps {
  subscription?: SubscriptionPlan;
}

export function SubscriptionPanel({ subscription }: SubscriptionPanelProps) {
  const [showUpgradeOptions, setShowUpgradeOptions] = useState(false);

  const getSubscriptionDisplayInfo = () => {
    if (!subscription) {
      return {
        title: "Free Plan",
        status: "Active",
        badgeColor: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        startDate: null,
        endDate: null,
        features: ["Basic access to study materials", "Limited daily questions", "Community forum access"],
        progress: 100
      };
    }

    let title = "Unknown Plan";
    let badgeColor = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

    switch (subscription.planType.toLowerCase()) {
      case 'free':
        title = "Free Plan";
        badgeColor = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        break;
      case 'premium':
        title = "Premium Plan";
        badgeColor = "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300";
        break;
      case 'pro':
        title = "Pro Plan";
        badgeColor = "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300";
        break;
      case 'trial':
        title = "Trial Plan";
        badgeColor = "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300";
        break;
      default:
        if (subscription.planType.includes('group')) {
          title = "Group Plan";
          badgeColor = "bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300";
        }
    }

    const today = new Date();
    const startDate = subscription.startDate ? new Date(subscription.startDate) : addDays(today, -30);
    const endDate = subscription.endDate ? new Date(subscription.endDate) : addDays(today, 335);
    
    const totalDays = differenceInDays(endDate, startDate);
    const daysRemaining = differenceInDays(endDate, today);
    const progress = Math.max(0, Math.min(100, 100 - (daysRemaining / totalDays * 100)));

    const status = subscription.isActive ? "Active" : "Inactive";
    
    return {
      title,
      status,
      badgeColor,
      startDate,
      endDate,
      progress,
      features: subscription.features || [
        "Full access to all study materials",
        "Unlimited practice questions",
        "AI-powered study recommendations",
        "24/7 doubt solving assistance"
      ]
    };
  };

  const info = getSubscriptionDisplayInfo();
  const isExpiringSoon = info.endDate && differenceInDays(info.endDate, new Date()) < 15;
  
  const subscriptionOptions = [
    {
      id: "premium",
      name: "Premium",
      price: "₹499",
      interval: "month",
      features: [
        "Unlimited practice questions",
        "AI-powered recommendations",
        "24/7 doubt solving",
        "Study analytics & insights"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹999",
      interval: "month",
      featured: true,
      features: [
        "Everything in Premium",
        "1-on-1 mentoring sessions",
        "Mock tests with detailed analysis",
        "Personalized study plan",
        "Performance benchmarking"
      ]
    },
    {
      id: "group_small",
      name: "Group Plan",
      price: "₹1999",
      interval: "month",
      features: [
        "Everything in Pro",
        "Up to 5 members",
        "Group analytics",
        "Collaborative study tools",
        "Group leaderboards"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {!showUpgradeOptions ? (
        <>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Current Subscription</CardTitle>
                <Badge className={info.badgeColor}>{info.status}</Badge>
              </div>
              <CardDescription>
                {info.title}
                {subscription?.memberLimit && ` (Up to ${subscription.memberLimit} members)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(info.startDate && info.endDate) && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(info.startDate, "MMM dd, yyyy")} - {format(info.endDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {differenceInDays(info.endDate, new Date())} days remaining
                      </span>
                    </div>
                  </div>
                  
                  <Progress value={info.progress} className="h-2" />
                </div>
              )}
              
              <div className="mt-6 space-y-2">
                <p className="font-medium">Plan Benefits:</p>
                <ul className="space-y-1">
                  {info.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              {subscription?.planType === 'free' ? (
                <Button onClick={() => setShowUpgradeOptions(true)} className="w-full">
                  Upgrade Now
                </Button>
              ) : (
                <>
                  {isExpiringSoon ? (
                    <Button onClick={() => setShowUpgradeOptions(true)} className="w-full">
                      Renew Subscription
                    </Button>
                  ) : (
                    <Button onClick={() => setShowUpgradeOptions(true)} variant="outline" className="w-full">
                      Change Plan
                    </Button>
                  )}
                </>
              )}
            </CardFooter>
          </Card>

          <Accordion type="single" collapsible>
            <AccordionItem value="subscription_info">
              <AccordionTrigger className="text-lg font-semibold">
                Additional Subscription Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Subscription Agreement</h4>
                    <p className="text-sm text-muted-foreground">
                      Your subscription is subject to our Terms of Service and automatic renewal terms. 
                      You can cancel at any time from your profile settings.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Billing Cycle</h4>
                    <p className="text-sm text-muted-foreground">
                      {subscription?.planType === 'free' 
                        ? "The Free plan has no billing cycle." 
                        : "Your subscription will automatically renew at the end of your billing cycle unless canceled."}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Upgrade Benefits</h4>
                    <p className="text-sm text-muted-foreground">
                      Upgrading your plan gives you immediate access to additional features.
                      Any unused time on your current subscription will be prorated towards your new plan.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Upgrade Your Plan</h2>
            <Button variant="ghost" onClick={() => setShowUpgradeOptions(false)}>
              Back to Subscription
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionOptions.map((option) => (
              <Card key={option.id} className={option.featured ? "border-primary shadow-md" : ""}>
                {option.featured && (
                  <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{option.name}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">{option.price}</span>
                    <span className="text-sm">/{option.interval}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={option.featured ? "default" : "outline"}>
                    Select Plan <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Annual Plans</CardTitle>
              <CardDescription>
                Save up to 20% with our annual subscription plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Premium Annual</div>
                    <div className="text-sm text-muted-foreground">₹4,999/year (Save ₹1,989)</div>
                  </div>
                  <Button size="sm">Select</Button>
                </div>
                
                <div className="bg-muted rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Pro Annual</div>
                    <div className="text-sm text-muted-foreground">₹9,999/year (Save ₹1,989)</div>
                  </div>
                  <Button size="sm">Select</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Need a custom plan?</CardTitle>
              <CardDescription>
                For educational institutions, coaching centers, or large groups
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">
                Contact our team for custom pricing and tailored solutions for your specific needs.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
