import { cn } from "@/lib/utils";

interface WidgetCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "savings" | "glass" | "elevated" | "premium" | "warning";
  interactive?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
}

export function WidgetCard({ 
  children, 
  className, 
  variant = "default", 
  interactive = false,
  onClick,
  style,
  size = "md"
}: WidgetCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border transition-all duration-200 ease-out",
        {
          // Size variants
          "p-3": size === "sm",
          "p-4": size === "md", 
          "p-6": size === "lg",
        },
        {
          // Style variants with improved contrast
          "bg-card border-border shadow-sm hover:shadow-md hover:border-border-accent": variant === "default",
          "bg-gradient-primary text-primary-foreground shadow-md hover:shadow-lg border-primary/20": variant === "gradient",
          "bg-gradient-savings text-success-foreground shadow-success hover:shadow-lg border-success/20": variant === "savings",
          "glass-card backdrop-blur-xl": variant === "glass",
          "bg-card border-border shadow-lg hover:shadow-xl": variant === "elevated",
          "bg-gradient-hero text-primary-foreground shadow-glow hover:shadow-xl border-primary/20": variant === "premium",
          "bg-gradient-to-br from-warning/10 to-warning-light/10 text-warning-foreground border-warning/20 shadow-sm": variant === "warning"
        },
        {
          "cursor-pointer hover:scale-[1.01] active:scale-[0.99]": interactive || onClick,
        },
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}