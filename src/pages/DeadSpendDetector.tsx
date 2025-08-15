import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { AlertCircle, Clock, TrendingDown } from "lucide-react";

const mockDeadSpendData = [
  {
    id: 2,
    name: "Spotify Premium",
    amount: 119,
    category: "Music",
    lastUsed: "45 days ago",
    confidence: "High",
    reason: "No activity in last 6 weeks"
  },
  {
    id: 4,
    name: "Zomato Pro",
    amount: 299,
    category: "Food",
    lastUsed: "62 days ago", 
    confidence: "Very High",
    reason: "Account paused, no orders placed"
  },
  {
    id: 5,
    name: "Disney+ Hotstar",
    amount: 899,
    category: "OTT",
    lastUsed: "89 days ago",
    confidence: "High", 
    reason: "No streaming activity detected"
  },
  {
    id: 6,
    name: "Gym Membership",
    amount: 2500,
    category: "Health",
    lastUsed: "120+ days ago",
    confidence: "Very High",
    reason: "No check-ins since last quarter"
  }
];

export default function DeadSpendDetector() {
  const router = useRouter();
  
  const totalDeadSpend = mockDeadSpendData.reduce((sum, sub) => sum + sub.amount * 12, 0);
  const monthlyWaste = mockDeadSpendData.reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <MobileLayout title="Dead Spend Detector" showBackButton>
      <div className="px-4 py-6 space-y-6">
        {/* Header Stats */}
        <div className="text-center space-y-2">
          <TrendingDown className="h-12 w-12 mx-auto text-destructive" />
          <h2 className="heading-lg text-destructive">₹{totalDeadSpend.toLocaleString()}</h2>
          <p className="body-sm text-muted-foreground">
            Annual waste from {mockDeadSpendData.length} unused subscriptions
          </p>
          <p className="text-sm text-destructive font-medium">
            ₹{monthlyWaste.toLocaleString()}/month going to waste
          </p>
        </div>


        {/* Dead Spend List */}
        <div className="space-y-4">
          <h3 className="heading-sm flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Unused Subscriptions
          </h3>
          
          <div className="space-y-3">
            {mockDeadSpendData.map((subscription) => (
              <WidgetCard key={subscription.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{subscription.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          subscription.confidence === "Very High" 
                            ? "bg-destructive/10 text-destructive" 
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}>
                          {subscription.confidence}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{subscription.category}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-lg font-bold text-destructive">₹{subscription.amount}/month</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {subscription.lastUsed}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">{subscription.reason}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => router.push(`/subscription/${subscription.id}`)}
                    >
                      Cancel Subscription
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/subscription/${subscription.id}`)}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </WidgetCard>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="pb-safe space-y-3">
          <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground" size="lg">
            Cancel All Unused (Save ₹{monthlyWaste.toLocaleString()}/month)
          </Button>
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