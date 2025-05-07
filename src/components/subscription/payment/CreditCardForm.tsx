
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CreditCardFormProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit, isProcessing }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { toast } = useToast();

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const limitedDigits = digits.substring(0, 16);
    return limitedDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const limitedDigits = digits.substring(0, 4);
    if (limitedDigits.length > 2) {
      return `${limitedDigits.substring(0, 2)}/${limitedDigits.substring(2)}`;
    }
    return limitedDigits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast({
        title: "Invalid Card Number",
        description: "Please enter a valid 16-digit card number.",
        variant: "destructive",
      });
      return;
    }

    if (cardName.trim() === '') {
      toast({
        title: "Invalid Name",
        description: "Please enter the cardholder name.",
        variant: "destructive",
      });
      return;
    }

    if (expiryDate.length !== 5) {
      toast({
        title: "Invalid Expiry Date",
        description: "Please enter a valid expiry date (MM/YY).",
        variant: "destructive",
      });
      return;
    }

    if (cvv.length < 3) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid CVV code.",
        variant: "destructive",
      });
      return;
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number</Label>
        <Input
          id="card-number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          className="font-mono"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="card-name">Cardholder Name</Label>
        <Input
          id="card-name"
          placeholder="John Doe"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
            className="font-mono"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
            className="font-mono"
            type="password"
            maxLength={3}
            required
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay Securely"}
      </Button>
    </form>
  );
};

export default CreditCardForm;
