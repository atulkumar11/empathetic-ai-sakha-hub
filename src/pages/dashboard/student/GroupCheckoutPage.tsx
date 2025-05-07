
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Users, Check, Info } from 'lucide-react';

export default function GroupCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const { plan, emails, inviteCodes, isGroup } = location.state || {};
  
  const {
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();

  useEffect(() => {
    // Redirect to subscription page if no plan data is available
    if (!plan) {
      navigate('/dashboard/student/subscription');
      toast({
        title: "Error",
        description: "No plan information found. Please select a plan first.",
        variant: "destructive",
      });
    }
  }, [plan, navigate, toast]);
  
  if (!userProfile || !plan) {
    return <DashboardLoading />;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleProcessPayment = () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: "Your group plan has been activated.",
        variant: "default",
      });
      
      // Navigate to profile page with updated plan info
      navigate('/dashboard/student/profile', { 
        state: { 
          planUpdated: true, 
          newPlan: plan,
          isGroupLeader: true,
          invitedEmails: emails,
          inviteCodes
        }
      });
      
      setLoading(false);
    }, 2000);
  };

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div className="container max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={handleGoBack}
        >
          <ArrowLeft size={16} />
          Back to Plans
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Review your order details and complete payment
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users size={18} className="mr-2" /> Group Plan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                    {plan.name} - Group of {plan.userCount} Users
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    You are becoming the batch leader for this group.
                  </p>
                  
                  {emails && emails.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                        Invited Members ({emails.length})
                      </h4>
                      <div className="space-y-2">
                        {emails.map((email: string, index: number) => (
                          <div key={email} className="flex items-center justify-between bg-white/50 dark:bg-gray-800/50 p-2 rounded">
                            <span className="text-sm">{email}</span>
                            <span className="text-xs text-gray-500">{inviteCodes[index]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <Info size={16} />
                  <p className="text-sm">
                    After payment, you can invite more members up to the group limit.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Choose your payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Button
                    type="button"
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    className={`flex items-center gap-2 ${paymentMethod === 'card' ? 'bg-primary' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard size={16} />
                    <span>Credit/Debit Card</span>
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                    className={`flex items-center gap-2 ${paymentMethod === 'upi' ? 'bg-primary' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 8.5C15 12.0899 12.0899 15 8.5 15C4.91015 15 2 12.0899 2 8.5C2 4.91015 4.91015 2 8.5 2C12.0899 2 15 4.91015 15 8.5Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 6L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>UPI</span>
                  </Button>
                </div>
                
                {paymentMethod === 'card' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You will receive a payment request on your UPI app.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-5">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{plan.name}</span>
                  <span>₹{plan.price}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>5 Users Subscription ({plan.billing})</span>
                  <span>₹{Math.round(plan.price / 5)}/user</span>
                </div>
                
                {plan.billing === 'monthly' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Billed monthly</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Save 20% with annual billing
                    </Badge>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>₹{plan.price}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(plan.price * 0.18)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{plan.price + Math.round(plan.price * 0.18)}</span>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm">
                  <p className="flex items-center">
                    <Check size={16} className="mr-2 text-green-600 dark:text-green-400" />
                    <span>Batch leader privileges included</span>
                  </p>
                  <p className="flex items-center mt-1">
                    <Check size={16} className="mr-2 text-green-600 dark:text-green-400" />
                    <span>Unlimited plan management</span>
                  </p>
                  <p className="flex items-center mt-1">
                    <Check size={16} className="mr-2 text-green-600 dark:text-green-400" />
                    <span>Premium support included</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <Button 
                  className="w-full bg-primary" 
                  size="lg"
                  onClick={handleProcessPayment}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span>Complete Payment</span>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  By completing this payment, you agree to our terms of service
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
