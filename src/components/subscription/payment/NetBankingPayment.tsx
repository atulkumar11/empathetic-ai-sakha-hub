
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface NetBankingPaymentProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

const NetBankingPayment: React.FC<NetBankingPaymentProps> = ({ onSubmit, isProcessing }) => {
  const [selectedBank, setSelectedBank] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const bankOptions = [
    { id: 'sbi', name: 'State Bank of India', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/State_Bank_of_India_logo.svg/1200px-State_Bank_of_India_logo.svg.png' },
    { id: 'hdfc', name: 'HDFC Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1200px-HDFC_Bank_Logo.svg.png' },
    { id: 'icici', name: 'ICICI Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/ICICI_Bank_Logo.svg/1200px-ICICI_Bank_Logo.svg.png' },
    { id: 'axis', name: 'Axis Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/1200px-Axis_Bank_logo.svg.png' },
    { id: 'kotak', name: 'Kotak Mahindra Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Kotak_Mahindra_Bank_logo.svg/1200px-Kotak_Mahindra_Bank_logo.svg.png' },
    { id: 'pnb', name: 'Punjab National Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Punjab_National_Bank_logo.svg/1200px-Punjab_National_Bank_logo.svg.png' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Select Your Bank</Label>
        <RadioGroup 
          value={selectedBank}
          onValueChange={setSelectedBank}
          className="grid grid-cols-2 gap-2"
        >
          {bankOptions.map((bank) => (
            <Label
              key={bank.id}
              htmlFor={bank.id}
              className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedBank === bank.id ? "border-primary bg-primary/5" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value={bank.id} id={bank.id} className="sr-only" />
              <img src={bank.logo} alt={bank.name} className="h-6 w-auto object-contain" />
              <div className="text-sm">{bank.name}</div>
              {selectedBank === bank.id && (
                <div className="ml-auto h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
              )}
            </Label>
          ))}
        </RadioGroup>
      </div>
      
      <div className="text-xs text-muted-foreground">
        Note: You will be redirected to your bank's secure payment gateway to complete the transaction.
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isProcessing || !selectedBank}
      >
        {isProcessing ? "Processing..." : "Continue to Bank Payment Gateway"}
      </Button>
    </form>
  );
};

export default NetBankingPayment;
