import { cn } from "@/lib/utils";

interface WidgetCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "savings";
}

export function WidgetCard({ children, className, variant = "default" }: WidgetCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 shadow-card animate-fade-in",
        {
          "bg-gradient-card border border-border/50": variant === "default",
          "bg-gradient-primary text-white": variant === "gradient", 
          "bg-gradient-savings text-success-foreground": variant === "savings"
        },
        className
      )}
    >
      {children}
    </div>
  );
}