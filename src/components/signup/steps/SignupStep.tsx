
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "../OnboardingContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface SignupStepProps {
  onSubmit: (formValues: { name: string; mobile: string; otp: string; agreeTerms: boolean }) => void;
  isLoading: boolean;
}

const SignupStep: React.FC<SignupStepProps> = ({ onSubmit, isLoading }) => {
  const { toast } = useToast();
  const { onboardingData } = useOnboarding();
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    otp: "",
    agreeTerms: false
  });
  const [fact, setFact] = useState("");
  const examFacts = {
    "IIT-JEE": [
      "Did you know? The highest package offered to an IIT graduate was ₹2.4 Cr!",
      "11 of India's Fortune 500 CEOs are IIT alumni.",
      "IITs have a 98% placement rate across all branches."
    ],
    "NEET": [
      "India needs 2.5 million doctors by 2030 - huge opportunities ahead!",
      "Medical professionals are among the most respected careers globally.",
      "AIIMS Delhi sees over 10,000 patients daily - imagine the impact you'll make!"
    ],
    "UPSC": [
      "The youngest IAS officer was just 21 when selected!",
      "Over 48% of current IAS officers come from small towns.",
      "Civil servants directly impact millions of lives daily."
    ]
  };

  useEffect(() => {
    if (onboardingData.examGoal) {
      const facts = examFacts[onboardingData.examGoal as keyof typeof examFacts] || [];
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setFact(randomFact);
    }
  }, [onboardingData.examGoal]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRequestOtp = () => {
    if (!formValues.mobile) {
      toast({
        title: "Please fill in all fields",
        description: "We need your mobile number to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your mobile.",
    });
    
    setFormValues({ ...formValues, otp: "1234" }); // Auto-fill OTP for demo
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formValues.agreeTerms) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please agree to our terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (formValues.name && formValues.mobile && formValues.otp) {
      onSubmit(formValues);
    } else {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to create your account.",
        variant: "destructive"
      });
    }
  };

  const handleGoogleSignup = () => {
    toast({
      title: "Google Sign Up",
      description: "Google authentication would be implemented here",
    });
    
    // In a real app this would trigger OAuth flow
    // For now we just pass some dummy data
    onSubmit({
      name: "Google User",
      mobile: "9999999999",
      otp: "verified", 
      agreeTerms: true
    });
  };

  return (
    <div className="space-y-6">
      {fact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border border-purple-100 dark:border-purple-800"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
              {fact}
            </p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formValues.name} 
            onChange={handleFormChange} 
            required 
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input 
            id="mobile" 
            name="mobile" 
            value={formValues.mobile} 
            onChange={handleFormChange} 
            required 
            type="tel"
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
            placeholder="+91 9876543210"
          />
        </div>
        
        {formValues.mobile && (
          <Button 
            type="button" 
            variant="outline"
            onClick={handleRequestOtp}
            className="w-full border-purple-500 text-purple-600 hover:bg-purple-50"
          >
            Get OTP
          </Button>
        )}
        
        {formValues.mobile && (
          <div>
            <Label htmlFor="otp">OTP</Label>
            <Input 
              id="otp" 
              name="otp" 
              value={formValues.otp} 
              onChange={handleFormChange} 
              required 
              className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter OTP"
            />
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={formValues.agreeTerms} 
            onCheckedChange={(checked) => {
              setFormValues({ ...formValues, agreeTerms: checked === true });
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link to="/terms" className="text-purple-600 hover:underline">
              Terms & Conditions
            </Link>
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
          disabled={isLoading || !formValues.name || !formValues.mobile || !formValues.otp || !formValues.agreeTerms}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <Button 
          type="button"
          variant="outline" 
          className="w-full"
          onClick={handleGoogleSignup}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4 mr-2" />
          Sign up with Google
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupStep;
