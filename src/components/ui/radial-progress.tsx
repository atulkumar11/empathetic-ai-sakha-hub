
import React from "react";
import { cn } from "@/lib/utils";

interface RadialProgressProps {
  value: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  showValue?: boolean;
  className?: string;
  colorClassName?: string;
  thickness?: number;
  children?: React.ReactNode;
}

export function RadialProgress({
  value,
  size = 'md',
  label,
  showValue = true,
  className,
  colorClassName = "text-primary",
  thickness = 3,
  children
}: RadialProgressProps) {
  // Ensure value is between 0 and 100
  const progress = Math.min(Math.max(value, 0), 100);
  
  // Size styles
  const sizesMap = {
    sm: 64,
    md: 96,
    lg: 128,
    xl: 160,
  };
  
  const fontSizesMap = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };
  
  // Calculate dimensions
  const diameter = sizesMap[size];
  const radius = (diameter / 2) - (thickness * 2);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <div className="relative" style={{ width: diameter, height: diameter }}>
        {/* Background circle */}
        <svg
          className="w-full h-full -rotate-90"
          viewBox={`0 0 ${diameter} ${diameter}`}
        >
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            className="stroke-muted-foreground/20"
          />
          
          {/* Progress circle */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={colorClassName}
            style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          {children || (showValue && 
            <span className={cn("font-semibold", fontSizesMap[size])}>{progress}%</span>
          )}
        </div>
      </div>
      
      {label && (
        <span className="mt-2 text-sm font-medium text-center">{label}</span>
      )}
    </div>
  );
}
