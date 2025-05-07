
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, CreditCard, Calendar, AlertTriangle } from "lucide-react";
import { UserProfileType } from "@/types/user";
import { format } from "date-fns";

interface SubscriptionDetailsProps {
  userProfile: UserProfileType;
  onUpgrade?: () => void;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  userProfile,
  onUpgrade
}) => {
  const subscription = userProfile.subscription;
  
  // Format date properly
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (e) {
      return dateString;
    }
  };
  
  // Get plan details
  const getPlanDetails = () => {
    const planType = subscription?.planType || subscription?.type || "free";
    
    switch (planType) {
      case "free":
        return {
          name: "Free Plan",
          description: "Basic access to learning resources",
          isActive: true,
          badge: "Free",
          badgeColor: "bg-gray-500",
          expiryDate: null
        };
      
      case "pro_monthly":
        return {
          name: "Pro Monthly",
          description: "Full access to all premium features",
          isActive: subscription?.isActive !== false,
          badge: "Pro",
          badgeColor: "bg-violet-500",
          expiryDate: subscription?.endDate || subscription?.expiryDate
        };
        
      case "pro_annual":
        return {
          name: "Pro Annual",
          description: "Annual subscription with all premium features",
          isActive: subscription?.isActive !== false,
          badge: "Pro",
          badgeColor: "bg-violet-500",
          expiryDate: subscription?.endDate || subscription?.expiryDate
        };
        
      case "group":
        return {
          name: "Group Plan",
          description: "Team learning with batch creation",
          isActive: subscription?.isActive !== false,
          badge: "Group",
          badgeColor: "bg-blue-500",
          expiryDate: subscription?.endDate || subscription?.expiryDate
        };
        
      default:
        return {
          name: "Unknown Plan",
          description: "Subscription details unavailable",
          isActive: false,
          badge: "Unknown",
          badgeColor: "bg-gray-500",
          expiryDate: null
        };
    }
  };
  
  const planDetails = getPlanDetails();
  
  // Calculate days remaining if expiry date exists
  const getDaysRemaining = () => {
    if (!planDetails.expiryDate) return null;
    
    try {
      const expiry = new Date(planDetails.expiryDate);
      const today = new Date();
      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch {
      return null;
    }
  };
  
  const daysRemaining = getDaysRemaining();
  
  // List of features based on plan
  const getFeaturesList = () => {
    const planType = subscription?.planType || subscription?.type || "free";
    
    if (planType === "free") {
      return [
        "Access to free concept cards",
        "Limited flashcards creation",
        "Basic practice exams",
        "Community access"
      ];
    } else {
      // Return features from the subscription if available
      return subscription?.features || [
        "Unlimited concept cards",
        "Unlimited flashcards",
        "All practice exams",
        "AI tutor access",
        "Personalized study plan",
        "Weekly progress reports",
      ];
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </div>
            <Badge className={`${planDetails.badgeColor} text-white`}>
              {planDetails.badge}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{planDetails.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {planDetails.description}
                  </p>
                </div>
                {planDetails.isActive ? (
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    <CheckCircle className="mr-1 h-3 w-3" /> Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                    <AlertTriangle className="mr-1 h-3 w-3" /> Expired
                  </Badge>
                )}
              </div>
              
              {planDetails.expiryDate && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm">
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Subscription Status</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiry Date:</span>
                    <span>{formatDate(planDetails.expiryDate)}</span>
                  </div>
                  {daysRemaining !== null && (
                    <div className="flex justify-between mt-1">
                      <span>Days Remaining:</span>
                      <span className={daysRemaining < 7 ? "text-amber-600" : ""}>
                        {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Plan Features</h4>
              <ul className="space-y-2">
                {getFeaturesList().map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {userProfile.paymentMethods?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Payment Method</h4>
                <div className="p-3 border rounded-md flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {userProfile.paymentMethods[0].cardType || "Card"} •••• 
                      {userProfile.paymentMethods[0].lastFour || "****"}
                    </p>
                    {userProfile.paymentMethods[0].expiryDate && (
                      <p className="text-xs text-muted-foreground">
                        Expires {userProfile.paymentMethods[0].expiryDate}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Change
                  </Button>
                </div>
              </div>
            )}
            
            {userProfile.billingHistory?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Billing</h4>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {userProfile.billingHistory.map((item, index) => (
                    <div key={index} className="text-sm flex justify-between items-center p-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{item.planName}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.amount}</p>
                        <Badge variant="outline" className={`text-xs ${
                          item.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          {planDetails.badge === "Free" ? (
            <Button className="w-full sm:w-auto" onClick={onUpgrade}>
              Upgrade to Pro
            </Button>
          ) : (
            <>
              <Button className="w-full sm:w-auto" onClick={onUpgrade}>
                {daysRemaining !== null && daysRemaining < 7 ? "Renew Now" : "Change Plan"}
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Billing History
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      
      {/* Credit Wallet Card for Pro users */}
      {planDetails.badge !== "Free" && (
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle>Credit Wallet</CardTitle>
            <CardDescription>
              Use credits to create custom cards and access premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Available Credits</h4>
                  <p className="text-3xl font-bold mt-1">20</p>
                </div>
                <Button>Buy Credits</Button>
              </div>
            </div>
            
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Credit Usage</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 border rounded-md text-center">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Used this month</p>
                  </div>
                  <div className="p-3 border rounded-md text-center">
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-muted-foreground">Cards created</p>
                  </div>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="mb-1">With credits you can:</p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                  <li>Create custom exam cards</li>
                  <li>Generate personalized flashcards</li>
                  <li>Access premium practice tests</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SubscriptionDetails;
