
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, AlertCircle } from 'lucide-react';
import { CreditPack, creditPacks } from '@/types/user/subscription';
import { useToast } from '@/hooks/use-toast';

interface PurchaseCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchaseComplete: () => void;
}

const PurchaseCreditsDialog: React.FC<PurchaseCreditsDialogProps> = ({
  open,
  onOpenChange,
  onPurchaseComplete
}) => {
  const { toast } = useToast();
  const [selectedCreditPack, setSelectedCreditPack] = useState<string>('credits_100');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter credit packs by type
  const standardCreditPacks = creditPacks.filter(pack => !pack.isExamCredits);
  const examCreditPacks = creditPacks.filter(pack => pack.isExamCredits);
  
  const handlePurchase = () => {
    setIsLoading(true);
    
    // In a real app, this would be a payment API call
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      
      const selectedPack = creditPacks.find(pack => pack.id === selectedCreditPack);
      
      toast({
        title: "Purchase successful!",
        description: `You have successfully purchased ${selectedPack?.credits} ${selectedPack?.isExamCredits ? 'exam' : ''} credits.`,
      });
      
      onPurchaseComplete();
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase Credits</DialogTitle>
          <DialogDescription>
            Credits are used to create custom study materials with our AI
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="standard">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="standard">Standard Credits</TabsTrigger>
            <TabsTrigger value="exam">Exam Credits</TabsTrigger>
          </TabsList>
          <TabsContent value="standard">
            <RadioGroup value={selectedCreditPack} onValueChange={setSelectedCreditPack} className="space-y-3">
              {standardCreditPacks.map((pack) => (
                <Label
                  key={pack.id}
                  htmlFor={pack.id}
                  className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-primary ${
                    selectedCreditPack === pack.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={pack.id} id={pack.id} />
                    <div>
                      <span className="font-medium text-base">{pack.name}</span>
                      <div className="text-sm text-muted-foreground">
                        Create {pack.credits} flashcards or concept cards
                      </div>
                      {pack.bestValue && (
                        <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">
                          Best Value
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹{pack.price}</div>
                    <div className="text-xs text-muted-foreground">
                      ₹{(pack.price/pack.credits).toFixed(2)}/credit
                    </div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </TabsContent>
          <TabsContent value="exam">
            <RadioGroup value={selectedCreditPack} onValueChange={setSelectedCreditPack} className="space-y-3">
              {examCreditPacks.map((pack) => (
                <Label
                  key={pack.id}
                  htmlFor={pack.id}
                  className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-primary ${
                    selectedCreditPack === pack.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={pack.id} id={pack.id} />
                    <div>
                      <span className="font-medium text-base">{pack.name}</span>
                      <div className="text-sm text-muted-foreground">
                        Create {pack.credits} exam questions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹{pack.price}</div>
                    <div className="text-xs text-muted-foreground">
                      ₹{(pack.price/pack.credits).toFixed(2)}/credit
                    </div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-4 pt-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Select Payment Method</h3>
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="grid grid-cols-3 gap-3">
              <Label
                htmlFor="card-payment"
                className={`flex flex-col items-center justify-center border rounded-lg p-3 cursor-pointer hover:border-primary ${
                  selectedPaymentMethod === 'card' ? "border-primary bg-primary/5" : ""
                }`}
              >
                <RadioGroupItem value="card" id="card-payment" className="sr-only" />
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs">Card</span>
              </Label>
              <Label
                htmlFor="upi-payment"
                className={`flex flex-col items-center justify-center border rounded-lg p-3 cursor-pointer hover:border-primary ${
                  selectedPaymentMethod === 'upi' ? "border-primary bg-primary/5" : ""
                }`}
              >
                <RadioGroupItem value="upi" id="upi-payment" className="sr-only" />
                <span className="font-bold text-base">UPI</span>
                <span className="text-xs">Pay</span>
              </Label>
              <Label
                htmlFor="wallet-payment"
                className={`flex flex-col items-center justify-center border rounded-lg p-3 cursor-pointer hover:border-primary ${
                  selectedPaymentMethod === 'wallet' ? "border-primary bg-primary/5" : ""
                }`}
              >
                <RadioGroupItem value="wallet" id="wallet-payment" className="sr-only" />
                <span className="font-bold text-base">Pay</span>
                <span className="text-xs">Wallet</span>
              </Label>
            </RadioGroup>
          </div>
          
          <Card>
            <CardContent className="p-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Selected Package:</span>
                  <span>
                    {creditPacks.find(pack => pack.id === selectedCreditPack)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span>₹{creditPacks.find(pack => pack.id === selectedCreditPack)?.price}</span>
                </div>
                <div className="flex justify-between font-medium pt-1 border-t mt-1">
                  <span>Total:</span>
                  <span>₹{creditPacks.find(pack => pack.id === selectedCreditPack)?.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              You will be redirected to the payment gateway to complete your purchase.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handlePurchase} disabled={isLoading}>
            {isLoading ? "Processing..." : "Purchase Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseCreditsDialog;
