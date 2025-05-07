
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, AlertCircle, ChevronRight, Package } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { SubscriptionType } from '@/types/user/base';

interface SubscriptionBannerProps {
  subscription?: SubscriptionType | {
    planType: string;
    isActive: boolean;
    startDate: string;
    expiryDate: string;
    features?: string[];
  };
  className?: string;
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ subscription, className = '' }) => {
  const navigate = useNavigate();
  
  // Default to free plan if no subscription or invalid subscription
  const planType = typeof subscription === 'string' ? subscription : subscription?.planType || 'free';
  
  // Check if subscription is object and has expiryDate
  const hasExpiryDate = typeof subscription === 'object' && 'expiryDate' in subscription;
  const expiryDate = hasExpiryDate ? new Date(subscription.expiryDate as string) : null;
  const isActive = typeof subscription === 'object' && 'isActive' in subscription ? subscription.isActive : false;
  
  // Calculate days remaining
  const calculateDaysRemaining = () => {
    if (!expiryDate) return 0;
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const daysRemaining = calculateDaysRemaining();
  const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 7;
  const hasExpired = daysRemaining <= 0;
  
  const getPlanDetails = () => {
    const planTypeLower = typeof planType === 'string' ? planType.toLowerCase() : '';

    if (planTypeLower.includes('pro')) {
      return {
        name: 'Pro',
        color: 'bg-gradient-to-r from-purple-500 to-purple-300',
        textColor: 'text-purple-900',
        borderColor: 'border-purple-400',
        icon: <Sparkles className="h-4 w-4" />
      };
    } else if (planTypeLower.includes('group')) {
      return {
        name: 'Group',
        color: 'bg-gradient-to-r from-blue-500 to-blue-300',
        textColor: 'text-blue-900',
        borderColor: 'border-blue-400',
        icon: <Package className="h-4 w-4" />
      };
    } else {
      return {
        name: 'Free',
        color: 'bg-gradient-to-r from-gray-300 to-gray-200',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-300',
        icon: <Calendar className="h-4 w-4" />
      };
    }
  };
  
  const planDetails = getPlanDetails();
  
  const handleUpgradeClick = () => {
    navigate('/pricing');
  };
  
  const handleManageClick = () => {
    navigate('/dashboard/student/subscription');
  };
  
  if (hasExpired && isActive) {
    // Expired subscription banner
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full ${className}`}
      >
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <span className="font-medium text-red-800">
                    Your {planDetails.name} subscription has expired
                  </span>
                  <span className="text-sm text-red-600 ml-2">
                    Renew now to continue enjoying premium features
                  </span>
                </div>
              </div>
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleUpgradeClick}
              >
                Renew Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
  
  if (isExpiringSoon && isActive) {
    // Expiring soon banner
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full ${className}`}
      >
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div>
                  <span className="font-medium text-amber-800">
                    Your {planDetails.name} subscription expires in {daysRemaining} days
                  </span>
                  <span className="text-sm text-amber-600 ml-2">
                    Renew to avoid interruption
                  </span>
                </div>
              </div>
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-white"
                onClick={handleUpgradeClick}
              >
                Renew Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
  
  // Standard active subscription or free plan banner
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full ${className}`}
    >
      <Card className={`border-${planDetails.borderColor}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`h-8 w-8 rounded-full ${planDetails.color} flex items-center justify-center ${planDetails.textColor}`}>
                {planDetails.icon}
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-medium">
                    {planDetails.name} Plan
                  </span>
                  {isActive && !planType.toLowerCase().includes('free') && (
                    <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  )}
                </div>
                {expiryDate && isActive && (
                  <span className="text-xs text-gray-500">
                    Valid until {expiryDate.toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            {planType.toLowerCase().includes('free') ? (
              <Button 
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                onClick={handleUpgradeClick}
              >
                Upgrade to PRO
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleManageClick}
              >
                Manage Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubscriptionBanner;
