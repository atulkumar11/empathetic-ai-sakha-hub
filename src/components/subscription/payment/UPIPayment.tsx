
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface UPIPaymentProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

const UPIPayment: React.FC<UPIPaymentProps> = ({ onSubmit, isProcessing }) => {
  const [upiId, setUpiId] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
    
    if (!upiPattern.test(upiId)) {
      toast({
        title: "Invalid UPI ID",
        description: "Please enter a valid UPI ID (e.g., username@bankname).",
        variant: "destructive",
      });
      return;
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="upi-id">UPI ID</Label>
        <Input
          id="upi-id"
          placeholder="username@bankname"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-4 gap-4 my-4">
        <div className="p-3 border rounded-md flex flex-col items-center">
          <img 
            src="https://1000logos.net/wp-content/uploads/2021/03/Google-Pay-logo.png" 
            alt="Google Pay" 
            className="h-8 w-auto mb-1 object-contain" 
          />
          <span className="text-xs">Google Pay</span>
        </div>
        <div className="p-3 border rounded-md flex flex-col items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/PhonePe_Logo.svg/2560px-PhonePe_Logo.svg.png" 
            alt="PhonePe" 
            className="h-8 w-auto mb-1 object-contain" 
          />
          <span className="text-xs">PhonePe</span>
        </div>
        <div className="p-3 border rounded-md flex flex-col items-center">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/019/766/099/original/amazon-pay-logo-editorial-free-vector.jpg" 
            alt="Amazon Pay" 
            className="h-8 w-auto mb-1 object-contain" 
          />
          <span className="text-xs">Amazon Pay</span>
        </div>
        <div className="p-3 border rounded-md flex flex-col items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" 
            alt="Paytm" 
            className="h-8 w-auto mb-1 object-contain" 
          />
          <span className="text-xs">Paytm</span>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay with UPI"}
      </Button>
    </form>
  );
};

export default UPIPayment;
