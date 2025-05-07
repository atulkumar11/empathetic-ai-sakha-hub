
import * as React from "react"
import { cn } from "@/lib/utils"

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, vertical = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-3",
          vertical ? "flex flex-col" : "flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Steps.displayName = "Steps"

interface StepLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  completed?: boolean
}

const StepLabel = React.forwardRef<HTMLDivElement, StepLabelProps>(
  ({ className, active = false, completed = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start space-x-3 p-3 rounded-lg",
          active && "bg-primary-50 dark:bg-primary-950/20",
          completed && "bg-green-50 dark:bg-green-950/20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
StepLabel.displayName = "StepLabel"

export { Steps, StepLabel }
