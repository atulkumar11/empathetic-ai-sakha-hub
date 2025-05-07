
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Banknote, Building } from "lucide-react";

type PaymentMethod = "credit_card" | "upi" | "net_banking" | "wallet";

interface PaymentMethodSelectorProps {
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  selectedMethod: PaymentMethod;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  onSelectPaymentMethod,
  selectedMethod
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-2">Select Payment Method</h3>
      
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={(value) => onSelectPaymentMethod(value as PaymentMethod)}
        className="grid grid-cols-1 gap-3"
      >
        <Label
          htmlFor="credit_card"
          className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedMethod === "credit_card" ? "border-primary bg-primary/5" : "border-gray-200"
          }`}
        >
          <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
          <CreditCard className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <h4 className="font-medium">Credit / Debit Card</h4>
            <p className="text-sm text-muted-foreground">Pay securely with your card</p>
          </div>
          {selectedMethod === "credit_card" && (
            <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
          )}
        </Label>
        
        <Label
          htmlFor="upi"
          className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedMethod === "upi" ? "border-primary bg-primary/5" : "border-gray-200"
          }`}
        >
          <RadioGroupItem value="upi" id="upi" className="sr-only" />
          <div className="h-5 w-5 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">U</div>
          <div className="flex-1">
            <h4 className="font-medium">UPI</h4>
            <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm UPI</p>
          </div>
          {selectedMethod === "upi" && (
            <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
          )}
        </Label>
        
        <Label
          htmlFor="net_banking"
          className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedMethod === "net_banking" ? "border-primary bg-primary/5" : "border-gray-200"
          }`}
        >
          <RadioGroupItem value="net_banking" id="net_banking" className="sr-only" />
          <Building className="h-5 w-5 text-blue-600" />
          <div className="flex-1">
            <h4 className="font-medium">Net Banking</h4>
            <p className="text-sm text-muted-foreground">All major banks supported</p>
          </div>
          {selectedMethod === "net_banking" && (
            <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
          )}
        </Label>
        
        <Label
          htmlFor="wallet"
          className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedMethod === "wallet" ? "border-primary bg-primary/5" : "border-gray-200"
          }`}
        >
          <RadioGroupItem value="wallet" id="wallet" className="sr-only" />
          <Banknote className="h-5 w-5 text-green-600" />
          <div className="flex-1">
            <h4 className="font-medium">Wallets</h4>
            <p className="text-sm text-muted-foreground">Paytm, Amazon Pay & more</p>
          </div>
          {selectedMethod === "wallet" && (
            <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
          )}
        </Label>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
