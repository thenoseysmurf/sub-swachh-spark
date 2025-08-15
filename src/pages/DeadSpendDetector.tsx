import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { Clock, TrendingDown, Music, Coffee, Tv, Dumbbell, Settings, ArrowUpDown } from "lucide-react";
import { useState } from "react";
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
  const [sortByInactivity, setSortByInactivity] = useState(false);
  
  // Helper function to extract days from lastUsed string
  const extractDays = (lastUsed: string) => {
    const match = lastUsed.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };
  
  // Sort subscriptions by inactivity
  const sortedSubscriptions = sortByInactivity 
    ? [...mockDeadSpendData].sort((a, b) => extractDays(b.lastUsed) - extractDays(a.lastUsed))
    : mockDeadSpendData;
  
  const totalDeadSpend = mockDeadSpendData.reduce((sum, sub) => sum + sub.amount * 12, 0);
  const monthlyWaste = mockDeadSpendData.reduce((sum, sub) => sum + sub.amount, 0);
  return <MobileLayout title="Spend Optimizer" showBackButton>
      <div className="px-4 pt-3 pb-6 space-y-4">
        {/* Header Stats */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
            <TrendingDown className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-destructive">₹{monthlyWaste.toLocaleString()}</h2>
            <p className="text-xs text-muted-foreground">
              Money you are losing every year
            </p>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSortByInactivity(!sortByInactivity)}
            className="text-xs gap-1"
          >
            <ArrowUpDown className="h-3 w-3" />
            {sortByInactivity ? "Default" : "Sort by Inactivity"}
          </Button>
        </div>

        {/* Underutilized Subscriptions */}
        <div className="space-y-3">
          {sortedSubscriptions.map(subscription => {
            const Icon = subscription.icon;
            return <WidgetCard key={subscription.id} className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${subscription.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm truncate">{subscription.name}</h4>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${subscription.confidence === "Very High" ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"}`}>
                          {subscription.confidence === "Very High" ? "High Risk" : "Risk"}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold">₹{subscription.amount}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {subscription.lastUsed}
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full h-7 text-xs" onClick={() => router.push(`/subscription/${subscription.id}`)}>
                        <Settings className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </WidgetCard>;
          })}
        </div>

        {/* Summary Action */}
        <div className="pt-2">
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </MobileLayout>;
}