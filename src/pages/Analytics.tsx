import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { 
  TrendingDown, 
  TrendingUp, 
  AlertCircle,
  PieChart,
  BarChart3,
  Target
} from "lucide-react";

const monthlyData = [
  { month: "Mar", amount: 1200 },
  { month: "Apr", amount: 1150 },
  { month: "May", amount: 980 },
  { month: "Jun", amount: 920 },
  { month: "Jul", amount: 850 },
  { month: "Aug", amount: 790 }
];

const categoryData = [
  { category: "OTT", amount: 398, percentage: 45, color: "bg-blue-500" },
  { category: "Music", amount: 119, percentage: 13, color: "bg-green-500" },
  { category: "Productivity", amount: 200, percentage: 23, color: "bg-purple-500" },
  { category: "Food", amount: 73, percentage: 8, color: "bg-orange-500" },
  { category: "Others", amount: 100, percentage: 11, color: "bg-gray-500" }
];

const unusedSubscriptions = [
  {
    id: 1,
    name: "Spotify Premium",
    amount: 119,
    lastUsed: "3 months ago",
    confidence: "High",
    reason: "No activity detected"
  },
  {
    id: 2,
    name: "Adobe Stock",
    amount: 750,
    lastUsed: "2 months ago", 
    confidence: "Medium",
    reason: "Low usage pattern"
  },
  {
    id: 3,
    name: "Zomato Pro",
    amount: 299,
    lastUsed: "1 month ago",
    confidence: "Medium", 
    reason: "Seasonal usage"
  }
];

export default function Analytics() {
  const router = useRouter();

  const totalCurrentSpend = monthlyData[monthlyData.length - 1].amount;
  const previousSpend = monthlyData[monthlyData.length - 2].amount;
  const trendPercentage = Math.round(((totalCurrentSpend - previousSpend) / previousSpend) * 100);
  const isPositiveTrend = trendPercentage < 0; // Negative spending is positive trend

  const potentialSavings = unusedSubscriptions.reduce((sum, sub) => sum + (sub.amount * 12), 0);

  return (
    <MobileLayout 
      title="Analytics" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="body-lg text-muted-foreground">
            Spot waste. Act fast. Save more.
          </p>
        </div>

        {/* Trend Overview */}
        <WidgetCard variant={isPositiveTrend ? "savings" : "default"} className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            {isPositiveTrend ? (
              <TrendingDown className="h-6 w-6" />
            ) : (
              <TrendingUp className="h-6 w-6" />
            )}
            <h3 className="heading-lg">Monthly Trend</h3>
          </div>
          <div>
            <p className="text-3xl font-bold">
              {isPositiveTrend ? "" : "+"}{Math.abs(trendPercentage)}%
            </p>
            <p className="opacity-90">
              {isPositiveTrend ? "Spending reduced" : "Spending increased"} vs last month
            </p>
          </div>
        </WidgetCard>

        {/* Monthly Spend Chart */}
        <WidgetCard className="space-y-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="heading-sm">6-Month Spend Trend</h3>
          </div>
          
          <div className="space-y-2">
            {monthlyData.map((data, index) => {
              const maxAmount = Math.max(...monthlyData.map(d => d.amount));
              const width = (data.amount / maxAmount) * 100;
              
              return (
                <div key={data.month} className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-8">{data.month}</span>
                  <div className="flex-1 bg-muted rounded-full h-3 relative">
                    <div 
                      className="bg-primary rounded-full h-3 transition-all duration-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-16 text-right">₹{data.amount}</span>
                </div>
              );
            })}
          </div>
        </WidgetCard>

        {/* Category Breakdown */}
        <WidgetCard className="space-y-4">
          <div className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-primary" />
            <h3 className="heading-sm">Spending by Category</h3>
          </div>
          
          <div className="space-y-3">
            {categoryData.map((category) => (
              <div key={category.category} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                <span className="flex-1 text-sm font-medium">{category.category}</span>
                <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                <span className="text-sm font-semibold w-16 text-right">₹{category.amount}</span>
              </div>
            ))}
          </div>
        </WidgetCard>

        {/* Potential Savings */}
        <WidgetCard variant="gradient" className="text-center space-y-4">
          <Target className="h-12 w-12 mx-auto opacity-90" />
          <div>
            <h3 className="heading-lg mb-2">Potential Annual Savings</h3>
            <p className="text-3xl font-bold">₹{potentialSavings.toLocaleString()}</p>
            <p className="text-sm opacity-90 mt-1">
              From {unusedSubscriptions.length} likely unused subscriptions
            </p>
          </div>
        </WidgetCard>

        {/* Unused Subscriptions */}
        <WidgetCard className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h3 className="heading-sm">Likely Unused Subscriptions</h3>
          </div>
          
          <div className="space-y-3">
            {unusedSubscriptions.map((subscription) => (
              <div key={subscription.id} className="border border-destructive/20 bg-destructive/5 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{subscription.name}</h4>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        subscription.confidence === "High" 
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {subscription.confidence}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last used: {subscription.lastUsed}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {subscription.reason}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-destructive">₹{subscription.amount}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => router.push(`/subscription/${subscription.id}`)}
                >
                  Manage Subscription
                </Button>
              </div>
            ))}
          </div>
        </WidgetCard>

        {/* Bottom Action */}
        <div className="pb-safe">
          <Button 
            variant="primary" 
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