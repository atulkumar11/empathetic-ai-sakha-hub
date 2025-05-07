
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface AddPaymentMethodDialogProps {
  open: boolean;
  onClose: () => void;
  onAddPaymentMethod: (data: any) => void;
}

export const AddPaymentMethodDialog = ({
  open,
  onClose,
  onAddPaymentMethod
}: AddPaymentMethodDialogProps) => {
  const [activeTab, setActiveTab] = useState("card");
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    setDefault: true
  });
  
  const [upiData, setUpiData] = useState({
    upiId: "",
    setDefault: true
  });
  
  const [paypalData, setPaypalData] = useState({
    email: "",
    setDefault: true
  });
  
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpiData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaypalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaypalData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPaymentMethod({ ...cardData, type: 'card' });
  };
  
  const handleUpiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPaymentMethod({ ...upiData, type: 'upi' });
  };
  
  const handlePaypalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPaymentMethod({ ...paypalData, type: 'paypal' });
  };
  
  const handleCardDefaultChange = () => {
    setCardData(prev => ({ ...prev, setDefault: !prev.setDefault }));
  };
  
  const handleUpiDefaultChange = () => {
    setUpiData(prev => ({ ...prev, setDefault: !prev.setDefault }));
  };
  
  const handlePaypalDefaultChange = () => {
    setPaypalData(prev => ({ ...prev, setDefault: !prev.setDefault }));
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="card">Card</TabsTrigger>
            <TabsTrigger value="upi">UPI</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
          
          {/* Card Tab */}
          <TabsContent value="card">
            <form onSubmit={handleCardSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={cardData.name}
                  onChange={handleCardChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="number">Card Number</Label>
                <Input
                  id="number"
                  name="number"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={handleCardChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={handleCardChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    name="cvc"
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={handleCardChange}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="card-default"
                  checked={cardData.setDefault}
                  onCheckedChange={handleCardDefaultChange}
                />
                <Label htmlFor="card-default">Set as default payment method</Label>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button type="submit">Add Card</Button>
              </div>
            </form>
          </TabsContent>
          
          {/* UPI Tab */}
          <TabsContent value="upi">
            <form onSubmit={handleUpiSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  name="upiId"
                  placeholder="username@upi"
                  value={upiData.upiId}
                  onChange={handleUpiChange}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="upi-default"
                  checked={upiData.setDefault}
                  onCheckedChange={handleUpiDefaultChange}
                />
                <Label htmlFor="upi-default">Set as default payment method</Label>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button type="submit">Add UPI</Button>
              </div>
            </form>
          </TabsContent>
          
          {/* PayPal Tab */}
          <TabsContent value="paypal">
            <form onSubmit={handlePaypalSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paypalEmail">PayPal Email</Label>
                <Input
                  id="paypalEmail"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={paypalData.email}
                  onChange={handlePaypalChange}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="paypal-default"
                  checked={paypalData.setDefault}
                  onCheckedChange={handlePaypalDefaultChange}
                />
                <Label htmlFor="paypal-default">Set as default payment method</Label>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button type="submit">Add PayPal</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="pt-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
