
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaymentMethod, BillingHistory } from "@/types/user/base";
import { Calendar, CreditCard, Download, Plus } from "lucide-react";
import { format } from "date-fns";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface PaymentMethodsPanelProps {
  paymentMethods: PaymentMethod[];
  billingHistory: BillingHistory[];
}

export function PaymentMethodsPanel({
  paymentMethods,
  billingHistory
}: PaymentMethodsPanelProps) {
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [paymentType, setPaymentType] = useState<'card' | 'upi' | 'paypal'>('card');
  
  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the payment method to a payment processor
    setIsAddingPayment(false);
  };
  
  const handleRemovePaymentMethod = (id: string) => {
    console.log("Remove payment method:", id);
  };
  
  const handleSetDefaultPaymentMethod = (id: string) => {
    console.log("Set default payment method:", id);
  };
  
  // Get payment method icon
  const getPaymentIcon = (type: string, cardType?: string) => {
    // In a real app, we would use different icons for different card types
    return <CreditCard className="h-5 w-5" />;
  };
  
  // Format payment method details for display
  const formatPaymentDetails = (method: PaymentMethod) => {
    if (method.type === 'card') {
      return `${method.cardType || 'Card'} ending in ${method.lastFour}`;
    } else if (method.type === 'upi') {
      return method.upiId;
    } else if (method.type === 'paypal') {
      return method.paypalEmail;
    }
    return 'Unknown payment method';
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="payment-methods">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>
      
        <TabsContent value="payment-methods" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Payment Methods</h3>
            <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>
                    Add a new payment method to your account
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="card" onValueChange={(v) => setPaymentType(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="cardNumber">
                        Card Number
                      </label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="expiryDate">
                          Expiry Date
                        </label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="cvv">
                          CVV
                        </label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="nameOnCard">
                        Name on Card
                      </label>
                      <Input id="nameOnCard" placeholder="John Doe" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upi" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="upiId">
                        UPI ID
                      </label>
                      <Input id="upiId" placeholder="yourname@bank" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="paypal" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="paypalEmail">
                        PayPal Email
                      </label>
                      <Input id="paypalEmail" placeholder="email@example.com" type="email" />
                    </div>
                  </TabsContent>
                </Tabs>
                
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setIsAddingPayment(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPaymentMethod}>Save Payment Method</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {paymentMethods.length > 0 ? (
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <Card key={method.id} className={method.isDefault ? "border-primary border-2" : ""}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-full">
                        {getPaymentIcon(method.type, method.cardType)}
                      </div>
                      <div>
                        <div className="font-medium">{formatPaymentDetails(method)}</div>
                        <div className="text-sm text-muted-foreground">
                          {method.type === 'card' && method.expiryDate && `Expires: ${method.expiryDate}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {method.isDefault ? (
                        <Badge>Default</Badge>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetDefaultPaymentMethod(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleRemovePaymentMethod(method.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/50">
              <CardContent className="p-8 flex flex-col items-center justify-center">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h4 className="text-lg font-medium mb-1">No Payment Methods</h4>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Add a payment method to make subscription payments easier
                </p>
                <Button onClick={() => setIsAddingPayment(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      
        <TabsContent value="billing-history" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Billing History</h3>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {billingHistory.length > 0 ? (
            <div className="space-y-3">
              {billingHistory.map((invoice) => (
                <Card key={invoice.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-full">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{invoice.planName}</div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(invoice.date), "MMMM dd, yyyy")}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">₹{invoice.amount.toFixed(2)}</div>
                        <Badge 
                          variant={invoice.status === 'paid' ? 'default' : 
                                  invoice.status === 'pending' ? 'outline' : 'destructive'}
                          className="capitalize"
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      
                      {invoice.invoiceUrl && (
                        <Button variant="ghost" size="icon">
                          <Download className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/50">
              <CardContent className="p-8 flex flex-col items-center justify-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h4 className="text-lg font-medium mb-1">No Billing History</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Your billing history will appear here once you've made payments
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
