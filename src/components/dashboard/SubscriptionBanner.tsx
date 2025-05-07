
import React from 'react';
import { SubscriptionType } from '@/types/user/base';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionBannerProps {
  planType?: SubscriptionType;
  expiryDate?: Date;
  isExpired?: boolean;
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ planType = 'free', expiryDate, isExpired = false }) => {
  const navigate = useNavigate();
  
  // Don't show banner for premium users who are not expired
  if ((planType === 'premium' || planType === 'pro') && !isExpired) {
    return null;
  }
  
  const handleUpgradeClick = () => {
    navigate('/dashboard/student/subscription');
  };
  
  // Show warning for expired premium users
  if ((planType === 'premium' || planType === 'pro') && isExpired) {
    return (
      <Alert className="mb-4 bg-red-50 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50">
        <AlertDescription className="flex justify-between items-center">
          <span>
            Your {planType} subscription has expired on {expiryDate ? format(new Date(expiryDate), 'PPP') : 'recently'}. Renew now to continue premium features.
          </span>
          <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleUpgradeClick}>
            Renew Subscription
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Show upgrade message for free/basic users
  return (
    <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-800/30">
      <AlertDescription className="flex justify-between items-center">
        <span>
          {planType === 'free' ? (
            'Upgrade to Premium for advanced features, personalized feedback, and unlimited practice tests.'
          ) : (
            'Upgrade to Premium for AI tutoring and advanced analytics to boost your exam performance.'
          )}
        </span>
        <Button 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleUpgradeClick}
        >
          <ArrowUp className="h-4 w-4 mr-2" /> Upgrade
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default SubscriptionBanner;
