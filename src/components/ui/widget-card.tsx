import { cn } from "@/lib/utils";

interface WidgetCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "savings" | "glass" | "elevated" | "premium" | "warning";
  interactive?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function WidgetCard({ 
  children, 
  className, 
  variant = "default", 
  interactive = false,
  onClick,
  style
}: WidgetCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 transition-all duration-300 ease-out animate-fade-in",
        {
          "bg-gradient-card border border-border shadow-md hover:shadow-lg": variant === "default",
          "bg-gradient-primary text-white shadow-lg hover:shadow-xl glow-primary": variant === "gradient",
          "bg-gradient-savings text-success-foreground shadow-success hover:shadow-xl glow-success": variant === "savings",
          "glass-card": variant === "glass",
          "bg-card-elevated border border-border-subtle shadow-xl hover:shadow-2xl": variant === "elevated",
          "bg-gradient-hero text-white shadow-glow hover:shadow-2xl animate-pulse-glow": variant === "premium",
          "bg-gradient-to-br from-warning to-warning-light text-warning-foreground shadow-lg": variant === "warning"
        },
        {
          "interactive-card cursor-pointer": interactive || onClick,
          "hover:scale-[1.02] active:scale-[0.98]": interactive || onClick
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