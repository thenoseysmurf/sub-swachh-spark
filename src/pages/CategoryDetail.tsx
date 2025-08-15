import { MobileLayout } from "@/components/ui/mobile-layout";
import { WidgetCard } from "@/components/ui/widget-card";
import { AppLogo } from "@/components/ui/app-logo";
import { useRouter } from "@/hooks/useRouter";
import { useParams } from "react-router-dom";
import { Film, Heart, GraduationCap, Tag, Play, Music, Dumbbell, BookOpen, Coffee, ShoppingBag, Tv, Users, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const getAppIcon = (appName: string) => {
  const iconMap: { [key: string]: any } = {
    "Netflix": Tv,
    "Prime Video": Play,
    "Nike Training": Dumbbell,
    "MyFitnessPal": Heart,
    "Skillshare": BookOpen,
    "Coursera": GraduationCap,
    "Zomato Pro": Coffee,
    "Amazon Prime": ShoppingBag
  };
  return iconMap[appName] || Tag;
};

const categoriesData = {
  1: {
    name: "Entertainment",
    icon: Film,
    apps: [
      {
        name: "Netflix",
        iconComponent: Tv,
        amount: 199,
        purchaseDate: "Aug 10",
        lastActiveDate: "Aug 14, 2025",
        status: "active"
      },
      {
        name: "Prime Video", 
        iconComponent: Play,
        amount: 1499,
        purchaseDate: "Apr 1, 2025",
        lastActiveDate: "Jul 1, 2025",
        status: "inactive"
      }
    ]
  },
  2: {
    name: "Fitness", 
    icon: Heart,
    apps: [
      {
        name: "Nike Training",
        iconComponent: Dumbbell,
        amount: 299,
        purchaseDate: "Mar 15",
        lastActiveDate: "Aug 20, 2025",
        status: "active"
      },
      {
        name: "MyFitnessPal",
        iconComponent: Heart,
        amount: 199,
        purchaseDate: "Jan 1, 2025",
        lastActiveDate: "Aug 10, 2025",
        status: "active"
      }
    ]
  },
  3: {
    name: "Education",
    icon: GraduationCap,
    apps: [
      {
        name: "Skillshare",
        iconComponent: BookOpen,
        amount: 299,
        purchaseDate: "Feb 5",
        lastActiveDate: "Aug 12, 2025",
        status: "active"
      },
      {
        name: "Coursera",
        iconComponent: GraduationCap,
        amount: 399,
        purchaseDate: "Jan 20, 2025",
        lastActiveDate: "Jul 15, 2025",
        status: "inactive"
      }
    ]
  },
  4: {
    name: "Others",
    icon: Tag,
    apps: [
      {
        name: "Zomato Pro",
        iconComponent: Coffee,
        amount: 299,
        purchaseDate: "Mar 1",
        lastActiveDate: "Aug 18, 2025",
        status: "active"
      },
      {
        name: "Amazon Prime",
        iconComponent: ShoppingBag,
        amount: 199,
        purchaseDate: "Feb 10, 2025",
        lastActiveDate: "Aug 16, 2025",
        status: "active"
      }
    ]
  }
};

export default function CategoryDetail() {
  const router = useRouter();
  const { categoryId } = useParams();
  
  const category = categoriesData[parseInt(categoryId || "1") as keyof typeof categoriesData];
  
  if (!category) {
    return (
      <MobileLayout title="Category Not Found" onBack={() => router.back()}>
        <div className="px-4 pt-8 text-center">
          <p className="text-muted-foreground">Category not found</p>
        </div>
      </MobileLayout>
    );
  }

  const Icon = category.icon;

  const activeApps = category.apps.filter(app => app.status === 'active').length;
  const totalApps = category.apps.length;

  return (
    <MobileLayout title={category.name} onBack={() => router.back()} showBottomNav={true}>
      <div className="px-6 pt-4 pb-8 space-y-8">
        {/* Category Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground">
            {activeApps} of {totalApps} subscriptions are actively used
          </p>
        </div>

        {/* Apps List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Your Subscriptions</h2>
          
          <div className="space-y-3">
            {category.apps.map((app, index) => {
              const AppIcon = app.iconComponent;
              const isInactive = app.status === 'inactive';
              
              return (
                <WidgetCard 
                  key={index} 
                  className={cn(
                    "p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02]",
                    isInactive && "border-destructive/20 bg-destructive/5"
                  )}
                  onClick={() => router.push(`/app/${category.name.toLowerCase()}/${app.name.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center p-1",
                        isInactive ? "bg-destructive/10" : "bg-primary/10"
                      )}>
                        <AppLogo appName={app.name} size="lg" className="w-full h-full" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-base">{app.name}</h3>
                          {isInactive && (
                            <div className="flex items-center space-x-1">
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                              <span className="text-xs font-medium text-destructive">Dead Spend</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-muted-foreground">
                            Purchased: {app.purchaseDate}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Last used: {app.lastActiveDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold">₹{app.amount}</p>
                      <p className="text-sm text-muted-foreground">per month</p>
                    </div>
                  </div>
                </WidgetCard>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <WidgetCard className="p-6 bg-gradient-subtle">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Total monthly spend in {category.name}</p>
            <p className="text-3xl font-bold">
              ₹{category.apps.reduce((sum, app) => sum + app.amount, 0)}
            </p>
            {category.apps.some(app => app.status === 'inactive') && (
              <p className="text-sm text-destructive">
                Consider canceling unused subscriptions to save money
              </p>
            )}
          </div>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}