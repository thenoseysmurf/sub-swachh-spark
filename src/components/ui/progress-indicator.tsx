import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative overflow-hidden rounded-full bg-muted",
  {
    variants: {
      variant: {
        default: "[&>div]:bg-primary",
        success: "[&>div]:bg-success",
        warning: "[&>div]:bg-warning",
        destructive: "[&>div]:bg-destructive",
        gradient: "[&>div]:bg-gradient-primary"
      },
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
        xl: "h-4"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  animated?: boolean;
  showValue?: boolean;
  label?: string;
}

const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ className, variant, size, value = 0, max = 100, animated = true, showValue = false, label, ...props }, ref) => {
    const percentage = Math.min(Math.max(value, 0), max) / max * 100;

    return (
      <div className="space-y-2">
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && <span className="text-sm font-medium">{label}</span>}
            {showValue && <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>}
          </div>
        )}
        <div
          ref={ref}
          className={cn(progressVariants({ variant, size, className }))}
          {...props}
        >
          <div
            className={cn(
              "h-full transition-all duration-slow ease-smooth rounded-full",
              animated && "transition-transform"
            )}
            style={{ 
              width: `${percentage}%`,
              transform: animated ? `translateX(0)` : undefined
            }}
          />
        </div>
      </div>
    );
  }
);

ProgressIndicator.displayName = "ProgressIndicator";

export { ProgressIndicator, progressVariants };