
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { SubscriptionType } from '@/types/user/base';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  isPremium?: boolean;
  comingSoon?: boolean;
  userSubscription?: SubscriptionType;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  path,
  isPremium = false,
  comingSoon = false,
  userSubscription = SubscriptionType.FREE
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (comingSoon) {
      return;
    }
    
    if (isPremium && userSubscription === SubscriptionType.FREE) {
      // Show upgrade prompt
      // For now, just navigate anyway
    }
    
    navigate(path);
  };
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${isPremium && userSubscription === SubscriptionType.FREE ? 'border-amber-200 dark:border-amber-800' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-900/40 dark:to-blue-900/40 p-2 rounded-lg">
              <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>
          
          {isPremium && userSubscription === SubscriptionType.FREE && (
            <span className="text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-1.5 py-0.5 rounded">
              Premium
            </span>
          )}
        </div>
        
        <div className="mt-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-sm"
            onClick={handleClick}
            disabled={comingSoon}
          >
            {comingSoon ? 'Coming Soon' : isPremium && userSubscription === SubscriptionType.FREE ? 'Upgrade to Access' : 'Open'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
