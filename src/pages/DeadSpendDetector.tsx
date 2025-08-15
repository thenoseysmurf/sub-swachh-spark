import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { Clock, TrendingDown, Music, Coffee, Tv, Dumbbell, Settings } from "lucide-react";

const mockDeadSpendData = [
  {
    id: 2,
    name: "Spotify Premium",
    amount: 119,
    category: "Music Streaming",
    lastUsed: "45 days ago",
    confidence: "High",
    reason: "No listening activity detected",
    icon: Music,
    color: "text-green-500"
  },
  {
    id: 4,
    name: "Zomato Pro",
    amount: 299,
    category: "Food Delivery",
    lastUsed: "62 days ago", 
    confidence: "Very High",
    reason: "No orders placed recently",
    icon: Coffee,
    color: "text-red-500"
  },
  {
    id: 5,
    name: "Disney+ Hotstar",
    amount: 899,
    category: "Entertainment",
    lastUsed: "89 days ago",
    confidence: "High", 
    reason: "Zero streaming hours recorded",
    icon: Tv,
    color: "text-blue-500"
  },
  {
    id: 6,
    name: "Gym Membership",
    amount: 2500,
    category: "Fitness",
    lastUsed: "120+ days ago",
    confidence: "Very High",
    reason: "No facility check-ins detected",
    icon: Dumbbell,
    color: "text-orange-500"
  }
];

export default function DeadSpendDetector() {
  const router = useRouter();
  
  const totalDeadSpend = mockDeadSpendData.reduce((sum, sub) => sum + sub.amount * 12, 0);
  const monthlyWaste = mockDeadSpendData.reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <MobileLayout title="Spend Optimizer" showBackButton>
      <div className="px-4 pt-4 pb-8 space-y-8">
        {/* Header Stats */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
            <TrendingDown className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-destructive">₹{totalDeadSpend.toLocaleString()}</h2>
            <p className="text-sm text-muted-foreground">
              Potential yearly savings from optimizing {mockDeadSpendData.length} subscriptions
            </p>
          </div>
        </div>

        {/* Underutilized Subscriptions */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-semibold">Underutilized Subscriptions</h3>
            <p className="text-sm text-muted-foreground">Review and optimize these subscriptions</p>
          </div>
          
          <div className="space-y-4">
            {mockDeadSpendData.map((subscription) => {
              const Icon = subscription.icon;
              return (
                <WidgetCard key={subscription.id} className="p-5 hover-scale">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center ${subscription.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-base">{subscription.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            subscription.confidence === "Very High" 
                              ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" 
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                          }`}>
                            {subscription.confidence} Risk
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{subscription.category}</p>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold">₹{subscription.amount}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {subscription.lastUsed}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">{subscription.reason}</p>
                    </div>
                    
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => router.push(`/subscription/${subscription.id}`)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Subscription
                    </Button>
                  </div>
                </WidgetCard>
              );
            })}
          </div>
        </div>

        {/* Summary Action */}
        <div className="pt-4 space-y-3">
          <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-2">Monthly optimization potential</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{monthlyWaste.toLocaleString()}</p>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}