
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Users, X } from 'lucide-react';
import { SubscriptionType } from '@/types/user/base';
import { motion } from 'framer-motion';

interface SubscriptionPlansProps {
  currentPlanId?: string;
  onSelectPlan: (plan: any, isGroup: boolean) => void;
  showGroupOption?: boolean;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  currentPlanId, 
  onSelectPlan,
  showGroupOption = true
}) => {
  // Basic plans
  const basicPlans = [
    {
      id: 'free',
      name: 'Free Plan (7 Days)',
      price: 0,
      features: [
        '5 Concept Cards (Auto-generated)',
        '5 Flashcards',
        '5 Practice Exams with analytics',
        '1 Academic Advisor plan',
        'Basic Smart Study Plan',
        '10 AI Tutor requests',
        'Feel Good Corner'
      ],
      type: SubscriptionType.Free
    },
    {
      id: 'pro_monthly',
      name: 'Pro Plan (Monthly)',
      price: 999,
      features: [
        'Unlimited Concept Cards (via Study Plan)',
        'Unlimited Flashcards',
        'Unlimited Practice Exams',
        'Create Custom Cards (via credits)',
        '2 Academic Advisor plans/month',
        'Full + Mood-Based Smart Study Plan',
        'Unlimited AI Tutor (Fair Use)',
        'Surrounding Influence',
        'Feel Good Corner'
      ],
      type: SubscriptionType.ProMonthly
    },
    {
      id: 'pro_annual',
      name: 'Pro Plan (Annual)',
      price: 9999,
      features: [
        'All Monthly Pro Plan features',
        '₹2,000 savings compared to monthly',
        'Priority support',
        'Early access to new features'
      ],
      type: SubscriptionType.ProAnnual
    }
  ];

  // Group plans
  const groupPlans = [
    {
      id: 'group_small',
      name: 'Group Plan (5 Users)',
      price: 3999,
      features: [
        '5 Users included (₹799/user extra)',
        'Unlimited Concept Cards (via Study Plan)',
        'Unlimited Flashcards',
        'Unlimited Practice Exams',
        'Create Custom Cards (shared credit pool)',
        '4 Academic Advisor plans/month shared',
        'Full + Mood-Based Smart Study Plan',
        'Unlimited AI Tutor (Per User)',
        'Study Groups',
        'Admin Dashboard',
        'Batch Manager',
        'Surrounding Influence',
        'Feel Good Corner'
      ],
      type: SubscriptionType.GroupSmall,
      maxMembers: 5
    },
    {
      id: 'group_annual',
      name: 'Group Plan (Annual)',
      price: 39999,
      features: [
        'All Monthly Group Plan features',
        '₹8,000 savings compared to monthly',
        'Priority group support',
        'Enhanced analytics',
        'Customized onboarding session'
      ],
      type: SubscriptionType.GroupAnnual,
      maxMembers: 5
    }
  ];

  const handleSelectPlan = (plan: any, isGroup: boolean = false) => {
    onSelectPlan(plan, isGroup);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    if (price === 999) return '₹999/month';
    if (price === 9999) return '₹9,999/year';
    if (price === 3999) return '₹3,999/month';
    if (price === 39999) return '₹39,999/year';
    return `₹${price}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      } 
    })
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-bold mb-6">Individual Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {basicPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ translateY: -5 }}
            >
              <Card className={`overflow-hidden h-full flex flex-col ${
                currentPlanId === plan.id ? 'border-2 border-primary' : ''
              } ${plan.id === 'pro_monthly' ? 'border-2 border-purple-500 shadow-lg' : ''}`}>
                {currentPlanId === plan.id && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    Current Plan
                  </div>
                )}
                {plan.id === 'pro_monthly' && currentPlanId !== plan.id && (
                  <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white text-center py-1 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">{formatPrice(plan.price)}</span>
                    {plan.id === 'pro_annual' && (
                      <span className="text-sm text-green-600 ml-2">Save ₹2,000</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.id === 'pro_monthly' 
                        ? 'bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800' 
                        : ''
                    }`}
                    variant={currentPlanId === plan.id ? 'outline' : 'default'}
                    disabled={currentPlanId === plan.id}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {currentPlanId === plan.id ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {showGroupOption && (
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Users size={20} className="mr-2" />
            Group Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ translateY: -5 }}
              >
                <Card className={`overflow-hidden h-full flex flex-col ${
                  currentPlanId === plan.id ? 'border-2 border-primary' : ''
                }`}>
                  {currentPlanId === plan.id && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Current Plan
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.id === 'group_annual' && (
                        <Badge className="bg-green-500">Best Value</Badge>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">{formatPrice(plan.price)}</span>
                      {plan.id === 'group_annual' && (
                        <span className="text-sm text-green-600 ml-2">Save ₹8,000</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={currentPlanId === plan.id ? 'outline' : 'default'}
                      disabled={currentPlanId === plan.id}
                      onClick={() => handleSelectPlan(plan, true)}
                    >
                      {currentPlanId === plan.id ? 'Current Plan' : 'Select Plan'}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Credit system section */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Card Credit System</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">For Custom Card Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">50 Credits</h4>
                <p className="text-2xl font-bold mt-1">₹99</p>
                <p className="text-sm text-muted-foreground mt-2">Create 50 Concept or Flashcards</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <h4 className="font-medium">100 Credits</h4>
                <p className="text-2xl font-bold mt-1">₹179</p>
                <p className="text-sm text-muted-foreground mt-2">Create 100 Concept or Flashcards</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Best Value</Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">250 Credits</h4>
                <p className="text-2xl font-bold mt-1">₹399</p>
                <p className="text-sm text-muted-foreground mt-2">Create 250 Concept or Flashcards</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-medium">100 Exam Credits</h4>
                <p className="text-2xl font-bold mt-1">₹499</p>
                <p className="text-sm text-muted-foreground mt-2">Create 100 exam cards</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Exam Card Cost</h4>
                  <p className="text-sm text-muted-foreground mt-1">More detailed AI generation</p>
                </div>
                <p className="text-xl font-bold">2 credits</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Features Comparison Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Plans Comparison</h3>
        <Card>
          <CardContent className="p-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Feature</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Free Plan</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Pro Plan</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Group Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-3 text-sm font-medium">Concept Cards</td>
                  <td className="py-3 text-sm">5 total</td>
                  <td className="py-3 text-sm">Unlimited (via Study Plan)</td>
                  <td className="py-3 text-sm">Unlimited (via Study Plan)</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Flashcards</td>
                  <td className="py-3 text-sm">5 total</td>
                  <td className="py-3 text-sm">Unlimited</td>
                  <td className="py-3 text-sm">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Practice Exams</td>
                  <td className="py-3 text-sm">5 total</td>
                  <td className="py-3 text-sm">Unlimited</td>
                  <td className="py-3 text-sm">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Create Custom Cards</td>
                  <td className="py-3 text-sm"><X size={16} className="text-red-500" /></td>
                  <td className="py-3 text-sm">✅ (via credits)</td>
                  <td className="py-3 text-sm">✅ (shared credit pool)</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Academic Advisor</td>
                  <td className="py-3 text-sm">1 plan</td>
                  <td className="py-3 text-sm">2/month</td>
                  <td className="py-3 text-sm">4/month shared</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Study Plan</td>
                  <td className="py-3 text-sm">Basic</td>
                  <td className="py-3 text-sm">Full + Mood-Based</td>
                  <td className="py-3 text-sm">Full + Mood-Based</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">AI Tutor</td>
                  <td className="py-3 text-sm">10 requests</td>
                  <td className="py-3 text-sm">Unlimited (Fair Use)</td>
                  <td className="py-3 text-sm">Unlimited (Per User)</td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Study Groups</td>
                  <td className="py-3 text-sm"><X size={16} className="text-red-500" /></td>
                  <td className="py-3 text-sm"><X size={16} className="text-red-500" /></td>
                  <td className="py-3 text-sm"><Check size={16} className="text-green-500" /></td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Admin Dashboard</td>
                  <td className="py-3 text-sm"><X size={16} className="text-red-500" /></td>
                  <td className="py-3 text-sm"><X size={16} className="text-red-500" /></td>
                  <td className="py-3 text-sm"><Check size={16} className="text-green-500" /></td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Batch Manager</td>
                  <td className="py-3 text-sm"><X size={16} className="text-red-500" /></td>
                  <td className="py-3 text-sm"><X size={16} className="text-red-500" /></td>
                  <td className="py-3 text-sm"><Check size={16} className="text-green-500" /></td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Feel Good Corner</td>
                  <td className="py-3 text-sm"><Check size={16} className="text-green-500" /></td>
                  <td className="py-3 text-sm"><Check size={16} className="text-green-500" /></td>
                  <td className="py-3 text-sm"><Check size={16} className="text-green-500" /></td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium">Surrounding Influence</td>
                  <td className="py-3 text-sm"><X size={16} className="text-red-500" /></td>
                  <td className="py-3 text-sm"><Check size={16} className="text-green-500" /></td>
                  <td className="py-3 text-sm"><Check size={16} className="text-green-500" /></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
