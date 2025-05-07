
import React from 'react';
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface CustomProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
  children?: React.ReactNode;
}

export const CustomProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps
>(({ className, value, indicatorClassName, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          indicatorClassName || "bg-violet-500"
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

CustomProgress.displayName = "CustomProgress";
