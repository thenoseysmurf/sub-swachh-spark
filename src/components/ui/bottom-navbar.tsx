import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useRouter } from "@/hooks/useRouter";
import { BarChart3, Home, Target } from "lucide-react";

interface BottomNavbarProps {
  className?: string;
}

export function BottomNavbar({ className }: BottomNavbarProps) {
  const location = useLocation();
  const router = useRouter();

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard",
      isActive: location.pathname === "/dashboard"
    },
    {
      icon: BarChart3,
      label: "Insights",
      path: "/analytics",
      isActive: location.pathname === "/analytics"
    },
    {
      icon: Target,
      label: "Optimiser",
      path: "/dead-spend-detector",
      isActive: location.pathname === "/dead-spend-detector"
    }
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-glass/80 backdrop-blur-xl border-t border-glass-border",
      "safe-area-pb",
      className
    )}>
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1",
                "transition-all duration-300 ease-out",
                "hover:scale-105 active:scale-95",
                "group"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-6 h-6 mb-1",
                "transition-all duration-300",
                item.isActive 
                  ? "text-primary drop-shadow-glow" 
                  : "text-muted-foreground group-hover:text-foreground"
              )}>
                <Icon 
                  className={cn(
                    "transition-all duration-300",
                    item.isActive ? "scale-110" : "group-hover:scale-105"
                  )} 
                  size={20} 
                />
              </div>
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                "truncate max-w-full",
                item.isActive 
                  ? "text-primary font-semibold" 
                  : "text-muted-foreground group-hover:text-foreground"
              )}>
                {item.label}
              </span>
              {item.isActive && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full animate-scale-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}