
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  icon,
  change,
  changeType
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline mt-1">
              <h3 className="text-2xl font-bold">{value}</h3>
              <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
        </div>
        
        <div className={cn(
          "flex items-center mt-4 text-xs font-medium",
          changeType === 'increase' ? "text-green-500" : 
          changeType === 'decrease' ? "text-red-500" : 
          "text-gray-500"
        )}>
          {changeType === 'increase' ? (
            <ArrowUp className="h-3 w-3 mr-1" />
          ) : changeType === 'decrease' ? (
            <ArrowDown className="h-3 w-3 mr-1" />
          ) : (
            <Minus className="h-3 w-3 mr-1" />
          )}
          <span>{change}%</span>
          <span className="ml-1 text-muted-foreground">from last period</span>
        </div>
      </CardContent>
    </Card>
  );
};
