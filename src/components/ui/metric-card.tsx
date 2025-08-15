import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  variant?: "default" | "success" | "warning" | "premium";
  className?: string;
  onClick?: () => void;
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  variant = "default",
  className,
  onClick 
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-card/80 backdrop-blur-sm border border-border-accent/30 rounded-lg p-4 transition-all duration-300",
        "hover:shadow-lg hover:border-border-accent/50 glow-primary",
        "min-h-[120px] flex flex-col justify-between",
        {
          "bg-gradient-card shadow-md": variant === "default",
          "bg-gradient-savings text-success-foreground shadow-success border-success/20 glow-success": variant === "success",
          "bg-gradient-warning text-warning-foreground border-warning/30 shadow-md glow-premium": variant === "warning",
          "bg-gradient-hero text-primary-foreground border-primary/20 shadow-premium glow-premium animate-gradient": variant === "premium"
        },
        {
          "cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:glow-pulse": onClick
        },
        className
      )}
      onClick={onClick}
    >
      <div className="space-y-1">
        <p className={cn(
          "caption-lg",
          variant === "premium" ? "text-primary-foreground/80" : "text-muted-foreground"
        )}>
          {title}
        </p>
        <p className={cn(
          "heading-lg font-semibold",
          variant === "premium" ? "text-primary-foreground" : "text-foreground"
        )}>
          {value}
        </p>
      </div>
      
      {(subtitle || trend) && (
        <div className={cn(
          "mt-2",
          trend ? "flex items-center justify-between" : "text-center"
        )}>
          {subtitle && (
            <p className={cn(
              "body-sm",
              trend ? "" : "text-center",
              variant === "premium" ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
              {subtitle}
            </p>
          )}
          {trend && (
            <span
              className={cn(
                "caption text-xs font-medium",
                trend.direction === "up" && "text-success",
                trend.direction === "down" && "text-destructive",
                trend.direction === "neutral" && "text-muted-foreground",
                variant === "premium" && "text-primary-foreground/80"
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
}