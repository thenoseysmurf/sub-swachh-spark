import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { MetricCard } from "@/components/ui/metric-card";
import { AppLogo } from "@/components/ui/app-logo";
import { useRouter } from "@/hooks/useRouter";
import { Clock, TrendingDown, Music, Coffee, Tv, Dumbbell, Settings, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
const mockDeadSpendData = [{
  id: 2,
  name: "Spotify Premium",
  amount: 119,
  category: "Music Streaming",
  lastUsed: "45 days ago",
  confidence: "High",
  reason: "No listening activity detected",
  icon: Music,
  color: "text-green-500"
}, {
  id: 4,
  name: "Zomato Pro",
  amount: 299,
  category: "Food Delivery",
  lastUsed: "62 days ago",
  confidence: "Very High",
  reason: "No orders placed recently",
  icon: Coffee,
  color: "text-red-500"
}, {
  id: 5,
  name: "Disney+ Hotstar",
  amount: 899,
  category: "Entertainment",
  lastUsed: "89 days ago",
  confidence: "High",
  reason: "Zero streaming hours recorded",
  icon: Tv,
  color: "text-blue-500"
}, {
  id: 6,
  name: "Gym Membership",
  amount: 2500,
  category: "Fitness",
  lastUsed: "120+ days ago",
  confidence: "Very High",
  reason: "No facility check-ins detected",
  icon: Dumbbell,
  color: "text-orange-500"
}];
export default function DeadSpendDetector() {
  const router = useRouter();
  const [sortByInactivity, setSortByInactivity] = useState(true); // Default to sorted by inactivity

  // Helper function to extract days from lastUsed string
  const extractDays = (lastUsed: string) => {
    const match = lastUsed.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Helper function to determine inactivity level
  const getInactivityLevel = (lastUsed: string) => {
    const days = extractDays(lastUsed);
    return days > 60 ? "highly inactive" : "moderately inactive";
  };

  // Helper function to get inactivity color classes
  const getInactivityClasses = (lastUsed: string) => {
    const level = getInactivityLevel(lastUsed);
    return level === "highly inactive" ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
  };

  // Sort subscriptions by inactivity level first, then by days
  const sortedSubscriptions = sortByInactivity ? [...mockDeadSpendData].sort((a, b) => {
    const aLevel = getInactivityLevel(a.lastUsed);
    const bLevel = getInactivityLevel(b.lastUsed);

    // First sort by inactivity level (highly inactive first)
    if (aLevel === "highly inactive" && bLevel === "moderately inactive") return -1;
    if (aLevel === "moderately inactive" && bLevel === "highly inactive") return 1;

    // Then sort by days within same level (higher days first)
    return extractDays(b.lastUsed) - extractDays(a.lastUsed);
  }) : mockDeadSpendData;
  const totalDeadSpend = mockDeadSpendData.reduce((sum, sub) => sum + sub.amount * 12, 0);
  const monthlyWaste = mockDeadSpendData.reduce((sum, sub) => sum + sub.amount, 0);
  return <MobileLayout title="Spend Optimizer" showBackButton onBack={() => router.push("/dashboard")} showBottomNav={true}>
      <div className="px-4 pt-3 pb-6 space-y-6">
        {/* Apple-style Header Stats */}
        <div className="space-y-4">
          <MetricCard title="Monthly Waste" value={`₹${monthlyWaste.toLocaleString()}`} subtitle="Money you could save" variant="warning" className="text-center" />
        </div>

        {/* Sort Filter */}
        <div className="flex justify-end">
          
        </div>

        {/* Apple-style Underutilized Subscriptions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="heading-lg">Inactive Subscriptions</h2>
            
          </div>
          
          <div className="space-y-3">
            {sortedSubscriptions.map(subscription => {
            const Icon = subscription.icon;
            return <WidgetCard key={subscription.id} variant="default" interactive>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <AppLogo appName={subscription.name} size="lg" />
                        
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="heading-xs text-foreground">{subscription.name}</h4>
                            
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="heading-sm text-foreground font-semibold">
                              ₹{subscription.amount}
                              <span className="caption text-muted-foreground font-normal">/mo</span>
                            </p>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="caption text-muted-foreground">{subscription.lastUsed}</span>
                            </div>
                          </div>
                          
                          
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="ml-3 font-medium bg-purple-500 text-white hover:bg-purple-600 border-purple-500" onClick={() => router.push(`/subscription/${subscription.id}`)}>
                        Manage
                      </Button>
                    </div>
                  </WidgetCard>;
          })}
          </div>
        </div>

        {/* Apple-style Summary Action */}
        <div className="pt-2">
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </MobileLayout>;
}