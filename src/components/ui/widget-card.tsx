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
          // Enhanced style variants with premium vibrancy
          "bg-card/80 backdrop-blur-sm border-border-accent/30 shadow-md hover:shadow-lg hover:border-border-accent/50 glow-primary": variant === "default",
          "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-premium border-primary/30 glow-primary": variant === "gradient",
          "bg-gradient-savings text-success-foreground shadow-success hover:shadow-lg border-success/30 glow-success": variant === "savings",
          "glass-card backdrop-blur-xl glow-premium": variant === "glass",
          "bg-card/90 backdrop-blur-sm border-border-accent/40 shadow-lg hover:shadow-xl glow-primary": variant === "elevated",
          "bg-gradient-hero text-primary-foreground shadow-premium hover:shadow-xl border-primary/30 glow-premium animate-gradient": variant === "premium",
          "bg-gradient-warning text-warning-foreground border-warning/30 shadow-md hover:shadow-lg glow-premium": variant === "warning"
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