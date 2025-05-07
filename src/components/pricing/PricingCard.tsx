
import React from "react";
import { Card } from "@/components/ui/card";
import { Check, X, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  subtitle: string;
  description: string;
  features: Array<{ name: string; included: boolean }>;
  recommended?: boolean;
  trial?: boolean;
  color?: string;
  icon?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  subtitle,
  description,
  features,
  recommended,
  trial,
  color,
}) => {
  return (
    <Card 
      className={`relative rounded-xl overflow-hidden transition-all h-full flex flex-col ${
        recommended 
          ? "border-2 border-sakha-blue shadow-xl -mt-4 pb-4" 
          : "border border-gray-200 shadow-md"
      }`}
    >
      {recommended && (
        <div className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white text-center py-2">
          <span className="text-sm font-semibold">MOST POPULAR</span>
        </div>
      )}
      
      {trial && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2">
          <span className="text-sm font-semibold">7-DAY FREE TRIAL</span>
        </div>
      )}
      
      <div className="p-8 flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-display font-bold">{title}</h3>
          {color && (
            <div className={`h-8 w-8 rounded-full bg-${color}-100 flex items-center justify-center`}>
              {recommended ? (
                <Star size={16} className={`text-${color}-600`} />
              ) : (
                <User size={16} className={`text-${color}-600`} />
              )}
            </div>
          )}
        </div>
        <div className="mb-2">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-gray-500 ml-1">{period}</span>}
        </div>
        <p className="text-sakha-blue font-medium mb-2">{subtitle}</p>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <Button 
          className={`w-full mb-8 ${
            recommended 
              ? "bg-gradient-to-r from-sakha-blue to-sakha-purple text-white" 
              : title === "Free Trial"
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          asChild
        >
          <Link to="/signup">
            {title === "Free Trial" ? "Start Free" : "Choose Plan"}
          </Link>
        </Button>
        
        <h4 className="font-medium mb-4 text-lg">Features:</h4>
        <ul className="space-y-3">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start gap-3">
              {feature.included ? (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  recommended ? "bg-sakha-blue text-white" : "bg-gray-100 text-gray-700"
                }`}>
                  <Check size={12} />
                </span>
              ) : (
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100 text-gray-400">
                  <X size={12} />
                </span>
              )}
              <span className={feature.included ? "" : "text-gray-400"}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default PricingCard;
