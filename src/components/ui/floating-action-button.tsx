import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fabVariants = cva(
  "fixed z-50 inline-flex items-center justify-center rounded-full shadow-hover transition-all duration-normal ease-spring hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-dark hover:shadow-glow",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-dark",
        success: "bg-success text-success-foreground hover:bg-success-dark",
        gradient: "bg-gradient-primary text-white hover:shadow-glow",
        glass: "glass text-foreground hover:bg-glass-bg"
      },
      size: {
        sm: "h-12 w-12 [&_svg]:h-5 [&_svg]:w-5",
        default: "h-14 w-14 [&_svg]:h-6 [&_svg]:w-6",
        lg: "h-16 w-16 [&_svg]:h-7 [&_svg]:w-7"
      },
      position: {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
        "top-right": "top-6 right-6",
        "top-left": "top-6 left-6",
        "top-center": "top-6 left-1/2 -translate-x-1/2"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      position: "bottom-right"
    }
  }
);

export interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  children: React.ReactNode;
  tooltip?: string;
}

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ className, variant, size, position, children, tooltip, ...props }, ref) => {
    return (
      <>
        <button
          className={cn(fabVariants({ variant, size, position, className }))}
          ref={ref}
          title={tooltip}
          {...props}
        >
          {children}
        </button>
        {/* Add safe area padding for mobile */}
        <div className="pb-safe" />
      </>
    );
  }
);

FloatingActionButton.displayName = "FloatingActionButton";

export { FloatingActionButton, fabVariants };