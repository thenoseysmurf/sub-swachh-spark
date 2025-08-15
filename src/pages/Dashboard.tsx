import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { PremiumLoading } from "@/components/ui/premium-loading";
import { useRouter } from "@/hooks/useRouter";
import { TrendingUp, TrendingDown, Calendar, Filter, Settings, BarChart3, AlertCircle, Play, Pause, Star, Crown, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
const mockSubscriptions = [{
  id: 1,
  name: "Netflix",
  amount: 199,
  nextRenewal: "2024-08-20",
  status: "active",
  isDead: false,
  category: "OTT"
}, {
  id: 2,
  name: "Spotify Premium",
  amount: 119,
  nextRenewal: "2024-08-18",
  status: "active",
  isDead: true,
  category: "Music"
}, {
  id: 3,
  name: "Adobe Creative Cloud",
  amount: 1675,
  nextRenewal: "2024-09-01",
  status: "active",
  isDead: false,
  category: "Productivity"
}, {
  id: 4,
  name: "Zomato Pro",
  amount: 299,
  nextRenewal: "2024-08-25",
  status: "paused",
  isDead: true,
  category: "Food"
}];
const monthlySpendData = [{
  month: "Jan",
  amount: 2800
}, {
  month: "Feb",
  amount: 3200
}, {
  month: "Mar",
  amount: 2950
}, {
  month: "Apr",
  amount: 3100
}, {
  month: "May",
  amount: 2750
}, {
  month: "Jun",
  amount: 2900
}, {
  month: "Jul",
  amount: 3050
}, {
  month: "Aug",
  amount: 2800
}, {
  month: "Sep",
  amount: 2650
}, {
  month: "Oct",
  amount: 2900
}, {
  month: "Nov",
  amount: 3150
}, {
  month: "Dec",
  amount: 2800
}];
const filters = ["All", "Inactive", "Paused"];
export default function Dashboard() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const totalSpend = mockSubscriptions.reduce((sum, sub) => sum + sub.amount * 12, 0);
  const deadSpend = mockSubscriptions.filter(sub => sub.isDead).reduce((sum, sub) => sum + sub.amount * 12, 0);
  const inactiveCount = mockSubscriptions.filter(sub => sub.isDead || sub.status === "paused").length;
  const filteredSubscriptions = mockSubscriptions.filter(sub => {
    switch (activeFilter) {
      case "All":
        return true;
      case "Inactive":
        return sub.isDead || sub.status === "paused";
      case "Paused":
        return sub.status === "paused";
      default:
        return true;
    }
  });
  return <MobileLayout showBackButton={false} showBottomNav={true}>
      <div className="px-4 py-6 space-y-6 animate-fade-in">
        {/* Enhanced Header with Glass Effect */}
        <div className="glass-nav p-4 rounded-xl -mx-4 mb-6 animate-slide-down">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="display-md gradient-text">Hi, John! 👋</h1>
              <p className="caption text-muted-foreground">Welcome back to your dashboard</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="glass" size="icon-sm" onClick={() => router.push("/analytics")} className="interactive-scale">
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button variant="glass" size="icon-sm" onClick={() => router.push("/configure-alerts")} className="interactive-scale">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up stagger-1">
          <WidgetCard variant="premium" interactive className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-hero opacity-10 animate-gradient"></div>
            <div className="relative text-center space-y-2 py-2">
              <div className="flex items-center justify-center space-x-1">
                <Crown className="h-4 w-4" />
                <p className="caption-xs opacity-90">Annual Spend</p>
              </div>
              <p className="heading-lg font-bold">₹{totalSpend.toLocaleString()}</p>
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="caption-xs text-success">+5.2% vs last year</span>
              </div>
            </div>
          </WidgetCard>

          <WidgetCard 
            variant="savings" 
            interactive 
            onClick={() => router.push("/dead-spend-detector")}
            className="relative overflow-hidden"
          >
            <div className="text-center space-y-2 py-2">
              <div className="flex items-center justify-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <p className="caption-xs opacity-90">Dead Spend</p>
              </div>
              <p className="heading-lg font-bold">₹{deadSpend.toLocaleString()}</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 mt-2">
              <div className="flex items-center justify-between caption-xs">
                <span className="opacity-90">Inactive Subscriptions:</span>
                <span className="font-bold">{inactiveCount}</span>
              </div>
            </div>
          </WidgetCard>
        </div>


        {/* Enhanced Analytics Chart */}
        <WidgetCard 
          variant="glass" 
          interactive 
          onClick={() => router.push("/analytics")}
          className="animate-slide-up stagger-2"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="heading-sm">Usage Analytics</h3>
              </div>
              <div className="flex items-center space-x-1 text-success">
                <TrendingUp className="h-4 w-4" />
                <span className="caption font-medium">+12.5%</span>
              </div>
            </div>
            
            <div className="h-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySpendData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
                    interval={1} 
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="url(#gradient)" 
                    strokeWidth={3} 
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--success))" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-center space-y-1">
              <p className="caption-lg font-medium">Monthly Spend Trend</p>
              <p className="caption text-muted-foreground">Tap to view detailed analytics</p>
            </div>
          </div>
        </WidgetCard>

        {/* Enhanced Filters Section */}
        <div className="space-y-4 animate-slide-up stagger-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="heading-sm">Your Subscriptions</h3>
            </div>
            <span className="caption bg-primary/10 text-primary px-2 py-1 rounded-full">
              {filteredSubscriptions.length} active
            </span>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter, index) => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)} 
                className={`
                  px-4 py-2 rounded-full caption-lg font-medium whitespace-nowrap transition-all duration-300
                  ${activeFilter === filter 
                    ? "bg-gradient-primary text-white shadow-md transform scale-105" 
                    : "glass-surface text-muted-foreground hover:bg-accent interactive-scale"
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Subscriptions List */}
        <div className="space-y-3 animate-slide-up stagger-4">
          {filteredSubscriptions.map((subscription, index) => (
            <WidgetCard 
              key={subscription.id} 
              variant={subscription.isDead ? "warning" : "elevated"}
              interactive
              className={`relative overflow-hidden animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {subscription.isDead && (
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-destructive"></div>
              )}
              
              <div className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="heading-xs">{subscription.name}</h4>
                    {subscription.isDead && <AlertCircle className="h-4 w-4 text-destructive animate-pulse" />}
                    {subscription.status === "paused" && <Pause className="h-4 w-4 text-warning animate-pulse" />}
                    {!subscription.isDead && subscription.status === "active" && (
                      <Play className="h-4 w-4 text-success" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-2">
                    <p className="heading-sm gradient-text">₹{subscription.amount}</p>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <p className="caption text-muted-foreground">
                        {new Date(subscription.nextRenewal).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="caption bg-accent text-accent-foreground px-2 py-1 rounded-full">
                      {subscription.category}
                    </span>
                    <span className={`caption px-2 py-1 rounded-full ${
                      subscription.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {subscription.status}
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={() => router.push(`/subscription/${subscription.id}`)}
                  className="ml-4"
                >
                  Manage
                </Button>
              </div>
            </WidgetCard>
          ))}
          
          {filteredSubscriptions.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <PremiumLoading variant="pulse" size="lg" className="mx-auto mb-4" />
              <p className="body-md text-muted-foreground">No subscriptions found</p>
              <p className="caption text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}
        </div>

      </div>
    </MobileLayout>;
}