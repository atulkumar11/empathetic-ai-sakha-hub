
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface Plan {
  id: string;
  name: string;
  price: number;
  planType?: 'group' | 'school' | 'corporate';
}

interface PlanSummaryCardProps {
  plan: Plan;
  maxUsers: number;
}

const PlanSummaryCard = ({ plan, maxUsers }: PlanSummaryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 border-purple-200 dark:border-purple-900 hover:shadow-lg transition-shadow">
        <div className="flex items-start space-x-4">
          <motion.div 
            className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">{plan.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Up to {maxUsers} users • ₹{Math.round(plan.price / maxUsers)}/user/month
            </p>
            <Badge className="mt-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
              {plan.planType === 'school' ? 'Educational' : plan.planType === 'corporate' ? 'Business' : 'Group'} License
            </Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PlanSummaryCard;
