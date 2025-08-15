import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { BottomNavbar } from "./bottom-navbar";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  className?: string;
  showBackButton?: boolean;
  showBottomNav?: boolean;
}

export function MobileLayout({ 
  children, 
  title, 
  onBack, 
  className,
  showBackButton = true,
  showBottomNav = true
}: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {(title || showBackButton) && (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            {showBackButton && onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            {title && (
              <h1 className="heading-md text-center flex-1">{title}</h1>
            )}
            {showBackButton && <div className="w-10" />}
          </div>
        </header>
      )}
      
      {/* Content */}
      <main className={cn("pb-safe", showBottomNav && "pb-20", className)}>
        {children}
      </main>
      
      {/* Bottom Navigation */}
      {showBottomNav && <BottomNavbar />}
    </div>
  );
}