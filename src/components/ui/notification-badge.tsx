import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-semibold transition-all duration-normal ease-smooth",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        warning: "bg-warning text-warning-foreground",
        outline: "border border-border bg-transparent text-foreground",
        ghost: "bg-muted text-muted-foreground"
      },
      size: {
        sm: "h-4 w-4 text-xs",
        default: "h-5 w-5 text-xs",
        lg: "h-6 w-6 text-sm"
      },
      position: {
        "top-right": "absolute -top-1 -right-1",
        "top-left": "absolute -top-1 -left-1",
        "bottom-right": "absolute -bottom-1 -right-1",
        "bottom-left": "absolute -bottom-1 -left-1"
      },
      animate: {
        true: "animate-bounce-in",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animate: false
    }
  }
);

export interface NotificationBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  count?: number;
  max?: number;
  showZero?: boolean;
  dot?: boolean;
}

const NotificationBadge = React.forwardRef<HTMLDivElement, NotificationBadgeProps>(
  ({ className, variant, size, position, animate, count = 0, max = 99, showZero = false, dot = false, children, ...props }, ref) => {
    if (count === 0 && !showZero && !dot) return null;

    const displayCount = dot ? "" : count > max ? `${max}+` : count.toString();

    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, position, animate, className }))}
        {...props}
      >
        {dot ? (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        ) : (
          displayCount
        )}
      </div>
    );
  }
);

NotificationBadge.displayName = "NotificationBadge";

export { NotificationBadge, badgeVariants };