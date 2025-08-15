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
      "bg-card/95 backdrop-blur-md border-t border-border",
      "safe-area-pb h-16",
      className
    )}>
      <div className="flex items-center justify-around px-2 h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-2",
                "transition-all duration-200 ease-out rounded-lg",
                "hover:scale-105 active:scale-95",
                item.isActive 
                  ? "text-primary bg-primary/8" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
              )}
            >
              <Icon 
                className={cn(
                  "transition-all duration-200 mb-1",
                  item.isActive ? "scale-110" : "hover:scale-105"
                )} 
                size={20} 
              />
              <span className={cn(
                "caption font-medium transition-all duration-200",
                "truncate max-w-full",
                item.isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}