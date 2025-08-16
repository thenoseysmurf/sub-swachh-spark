import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { AppLogo } from "@/components/ui/app-logo";
import { useRouter } from "@/hooks/useRouter";
import { useParams } from "react-router-dom";
import { Film, Heart, GraduationCap, Tag, Play, Music, Dumbbell, BookOpen, Coffee, ShoppingBag, Tv, TrendingUp, Calendar, DollarSign, Activity } from "lucide-react";
const appData: {
  [key: string]: {
    [key: string]: any;
  };
} = {
  "entertainment": {
    "netflix": {
      name: "Netflix",
      icon: Tv,
      amount: 199,
      purchaseDate: "Aug 10",
      lastActiveDate: "Aug 14, 2025",
      status: "active",
      category: "Entertainment",
      plan: "Premium Monthly",
      nextBilling: "Sep 10, 2025",
      usageData: [40, 65, 30, 80, 45, 70, 35]
    },
    "prime-video": {
      name: "Prime Video",
      icon: Play,
      amount: 1499,
      purchaseDate: "Apr 1, 2025",
      lastActiveDate: "Jul 1, 2025",
      status: "inactive",
      category: "Entertainment",
      plan: "Annual Plan",
      nextBilling: "Apr 1, 2026",
      usageData: [80, 90, 70, 20, 10, 5, 0]
    }
  },
  "fitness": {
    "nike-training": {
      name: "Nike Training",
      icon: Dumbbell,
      amount: 299,
      purchaseDate: "Mar 15",
      lastActiveDate: "Aug 20, 2025",
      status: "active",
      category: "Fitness",
      plan: "Premium Monthly",
      nextBilling: "Sep 15, 2025",
      usageData: [60, 70, 65, 80, 75, 85, 90]
    },
    "myfitnesspal": {
      name: "MyFitnessPal",
      icon: Heart,
      amount: 199,
      purchaseDate: "Jan 1, 2025",
      lastActiveDate: "Aug 10, 2025",
      status: "active",
      category: "Fitness",
      plan: "Premium Monthly",
      nextBilling: "Sep 1, 2025",
      usageData: [45, 50, 55, 60, 65, 70, 75]
    }
  },
  "education": {
    "skillshare": {
      name: "Skillshare",
      icon: BookOpen,
      amount: 299,
      purchaseDate: "Feb 5",
      lastActiveDate: "Aug 12, 2025",
      status: "active",
      category: "Education",
      plan: "Premium Monthly",
      nextBilling: "Sep 5, 2025",
      usageData: [30, 40, 35, 50, 45, 60, 55]
    },
    "coursera": {
      name: "Coursera",
      icon: GraduationCap,
      amount: 399,
      purchaseDate: "Jan 20, 2025",
      lastActiveDate: "Jul 15, 2025",
      status: "inactive",
      category: "Education",
      plan: "Plus Monthly",
      nextBilling: "Sep 20, 2025",
      usageData: [70, 60, 40, 30, 15, 10, 5]
    }
  },
  "others": {
    "zomato-pro": {
      name: "Zomato Pro",
      icon: Coffee,
      amount: 299,
      purchaseDate: "Mar 1",
      lastActiveDate: "Aug 18, 2025",
      status: "active",
      category: "Others",
      plan: "Pro Monthly",
      nextBilling: "Sep 1, 2025",
      usageData: [25, 30, 35, 40, 45, 50, 55]
    },
    "amazon-prime": {
      name: "Amazon Prime",
      icon: ShoppingBag,
      amount: 199,
      purchaseDate: "Feb 10, 2025",
      lastActiveDate: "Aug 16, 2025",
      status: "active",
      category: "Others",
      plan: "Prime Monthly",
      nextBilling: "Sep 10, 2025",
      usageData: [50, 55, 60, 65, 70, 75, 80]
    }
  }
};
export default function AppSubscription() {
  const router = useRouter();
  const {
    category,
    appName
  } = useParams();
  const app = appData[category || ""]?.[appName || ""];
  if (!app) {
    return <MobileLayout title="App Not Found" onBack={() => router.back()}>
        <div className="px-4 pt-8 text-center">
          <p className="text-muted-foreground">App not found</p>
        </div>
      </MobileLayout>;
  }
  const Icon = app.icon;
  const isInactive = app.status === 'inactive';
  const avgUsage = app.usageData.reduce((sum: number, val: number) => sum + val, 0) / app.usageData.length;
  return <MobileLayout title={app.name} onBack={() => router.back()} showBottomNav={true}>
      <div className="px-4 pt-2 pb-20 space-y-4">
        {/* App Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto p-2 bg-gradient-primary">
            <AppLogo appName={app.name} size="lg" className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{app.name}</h1>
            <p className="text-sm text-muted-foreground">{app.plan}</p>
          </div>
        </div>

        {/* Spending Info */}
        <WidgetCard className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <span className="text-xs font-medium text-muted-foreground">Monthly Spend</span>
              <p className="text-xl font-bold">₹{app.amount}</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Calendar className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Last Used</span>
              </div>
              <p className="text-xs font-semibold">{app.lastActiveDate}</p>
            </div>
          </div>
        </WidgetCard>

        {/* Usage Chart */}
        <WidgetCard className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Usage vs Cost</h3>
              <div className="flex items-center space-x-1">
                <Activity className="h-3 w-3 text-primary" />
                <span className="text-xs text-muted-foreground">Monthly trend</span>
              </div>
            </div>
            
            {/* Simple usage visualization */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Usage</span>
                <span>{Math.round(avgUsage)}% avg</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-300 ${isInactive ? 'bg-destructive' : avgUsage > 60 ? 'bg-green-500' : avgUsage > 30 ? 'bg-yellow-500' : 'bg-destructive'}`} style={{
                width: `${avgUsage}%`
              }} />
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-center">
                {isInactive ? "Canceling this will save you ₹1,428 per month and ₹17,988 per year" : avgUsage > 60 ? "Great value! You're using this subscription effectively" : "Low usage detected. Consider if you really need this subscription"}
              </p>
            </div>
          </div>
        </WidgetCard>

        {/* Subscription Details */}
        <WidgetCard className="p-4">
          <div className="space-y-3">
            <h3 className="text-base font-semibold">Subscription Details</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Purchase Date</span>
                <span className="text-xs font-medium">{app.purchaseDate}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Next Billing</span>
                <span className="text-xs font-medium">{app.nextBilling}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Status</span>
                <span className={`text-xs font-medium ${isInactive ? 'text-destructive' : 'text-green-600'}`}>
                  {isInactive ? 'Inactive' : 'Active'}
                </span>
              </div>
            </div>
          </div>
        </WidgetCard>
      </div>

      {/* Fixed Bottom CTA Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t">
        <Button variant="primary" className="w-full h-12 text-sm font-medium" onClick={() => router.push(`/subscription/1`)}>
          Manage Subscription
        </Button>
      </div>
    </MobileLayout>;
}