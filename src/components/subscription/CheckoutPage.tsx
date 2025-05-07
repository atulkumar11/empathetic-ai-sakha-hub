
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CreditCard, Tag, X } from 'lucide-react';
import { SubscriptionPlan } from '@/types/user/base';

interface CheckoutPageProps {
  selectedPlan: SubscriptionPlan;
  onCancel: () => void;
  onSuccess: (plan: SubscriptionPlan, inviteCodes?: string[], emails?: string[]) => void;
  isGroupPlan?: boolean;
  invitedEmails?: string[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedPlan,
  onCancel,
  onSuccess,
  isGroupPlan = false,
  invitedEmails = []
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const handleApplyPromo = () => {
    if (!promoCode) return;
    
    // Simulate promo code check
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
    }
  };
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const mockInviteCodes = isGroupPlan ? 
        invitedEmails.map(() => `SAKHA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`) : 
        undefined;
      
      onSuccess(
        selectedPlan,
        mockInviteCodes,
        invitedEmails.length > 0 ? invitedEmails : undefined
      );
      setIsProcessing(false);
    }, 2000);
  };
  
  // Calculate prices
  const basePrice = selectedPlan.price;
  const discount = promoApplied ? Math.round(basePrice * 0.1) : 0;
  const gst = Math.round((basePrice - discount) * 0.18);
  const totalPrice = basePrice - discount + gst;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X size={20} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                  <TabsTrigger value="netbanking">Netbanking</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="4242 4242 4242 4242" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="upi" className="space-y-4">
                  <div>
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input id="upi-id" placeholder="yourname@upi" />
                    <p className="text-sm text-muted-foreground mt-2">Enter your UPI ID to make the payment</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="netbanking" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col">
                      <div className="h-10 w-10 bg-gray-200 rounded-full mb-2"></div>
                      <span>SBI</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <div className="h-10 w-10 bg-gray-200 rounded-full mb-2"></div>
                      <span>HDFC</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <div className="h-10 w-10 bg-gray-200 rounded-full mb-2"></div>
                      <span>ICICI</span>
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor="other-bank">Other Banks</Label>
                    <select id="other-bank" className="w-full border rounded-md p-2">
                      <option value="">Select Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                      <option value="yes">Yes Bank</option>
                    </select>
                  </div>
                </TabsContent>
                
                <TabsContent value="paypal" className="space-y-4">
                  <p className="text-center text-muted-foreground py-4">
                    Click the button below to pay with PayPal. You will be redirected to PayPal's website.
                  </p>
                  <div className="flex justify-center">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <div className="mr-2 h-4 w-4 text-white">P</div>
                      Pay with PayPal
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {isGroupPlan && invitedEmails.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Invited Members ({invitedEmails.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[200px] overflow-y-auto">
                  <ul className="space-y-2">
                    {invitedEmails.map((email, index) => (
                      <li key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                        {email}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span className="font-medium">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>₹{basePrice}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleApplyPromo}
                  disabled={!promoCode || promoApplied}
                >
                  {promoApplied ? (
                    <>
                      <Check size={16} className="mr-1" />
                      Applied
                    </>
                  ) : (
                    <>
                      <Tag size={16} className="mr-1" />
                      Apply
                    </>
                  )}
                </Button>
              </div>
              
              {promoApplied && (
                <div className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 p-2 rounded-md text-sm flex items-center">
                  <Check size={16} className="mr-1.5" />
                  Code WELCOME10 applied: 10% off
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button 
                className="w-full"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : (
                  <>
                    <CreditCard size={16} className="mr-2" />
                    Pay ₹{totalPrice}
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
