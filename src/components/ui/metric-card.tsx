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
        "bg-card border border-border rounded-lg p-4 transition-all duration-200",
        "hover:shadow-md hover:border-border-accent",
        "min-h-[120px] flex flex-col justify-between",
        {
          "bg-gradient-card shadow-sm": variant === "default",
          "bg-gradient-savings shadow-success border-success/20": variant === "success",
          "bg-gradient-to-br from-warning/10 to-warning-light/10 border-warning/20": variant === "warning",
          "bg-gradient-primary text-primary-foreground border-primary/20": variant === "premium"
        },
        {
          "cursor-pointer hover:scale-[1.01] active:scale-[0.99]": onClick
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
        <div className="flex items-center justify-between mt-2">
          {subtitle && (
            <p className={cn(
              "body-sm",
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