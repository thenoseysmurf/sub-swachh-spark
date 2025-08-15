import { cn } from "@/lib/utils";

interface PremiumLoadingProps {
  variant?: "spinner" | "pulse" | "skeleton" | "shimmer";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PremiumLoading({ 
  variant = "spinner", 
  size = "md", 
  className 
}: PremiumLoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  if (variant === "spinner") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-glow"></div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("bg-gradient-primary rounded-full animate-pulse-glow", sizeClasses[size], className)}></div>
    );
  }

  if (variant === "skeleton") {
    return (
      <div className={cn("skeleton rounded-lg", className)}>
        <div className="shimmer"></div>
      </div>
    );
  }

  if (variant === "shimmer") {
    return (
      <div className={cn("shimmer bg-muted rounded-lg", className)}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background to-transparent opacity-60 animate-shimmer"></div>
      </div>
    );
  }

  return null;
}