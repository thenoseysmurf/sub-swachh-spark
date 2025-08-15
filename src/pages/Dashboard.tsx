import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { NotificationBadge } from "@/components/ui/notification-badge";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { useRouter } from "@/hooks/useRouter";
import { TrendingUp, TrendingDown, Calendar, Filter, Settings, BarChart3, AlertCircle, Play, Pause, Plus, Eye, Zap, Target, Trophy, Bell } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";

const mockSubscriptions = [
  {
    id: 1,
    name: "Netflix",
    amount: 199,
    nextRenewal: "2024-08-20",
    status: "active",
    isDead: false,
    category: "OTT",
    usage: 85,
    trend: "up"
  },
  {
    id: 2,
    name: "Spotify Premium",
    amount: 119,
    nextRenewal: "2024-08-18",
    status: "active",
    isDead: true,
    category: "Music",
    usage: 12,
    trend: "down"
  },
  {
    id: 3,
    name: "Adobe Creative Cloud",
    amount: 1675,
    nextRenewal: "2024-09-01",
    status: "active",
    isDead: false,
    category: "Productivity",
    usage: 92,
    trend: "up"
  },
  {
    id: 4,
    name: "Zomato Pro",
    amount: 299,
    nextRenewal: "2024-08-25",
    status: "paused",
    isDead: true,
    category: "Food",
    usage: 5,
    trend: "down"
  }
];

const monthlySpendData = [
  { month: "Jan", amount: 2800, target: 3000 },
  { month: "Feb", amount: 3200, target: 3000 },
  { month: "Mar", amount: 2950, target: 3000 },
  { month: "Apr", amount: 3100, target: 3000 },
  { month: "May", amount: 2750, target: 3000 },
  { month: "Jun", amount: 2900, target: 3000 },
  { month: "Jul", amount: 3050, target: 3000 },
  { month: "Aug", amount: 2800, target: 3000 }
];

const filters = ["All", "Inactive", "Upcoming Renewals", "Active", "Paused"];

export default function Dashboard() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const totalSpend = mockSubscriptions.reduce((sum, sub) => sum + sub.amount * 12, 0);
  const deadSpend = mockSubscriptions.filter(sub => sub.isDead).reduce((sum, sub) => sum + sub.amount * 12, 0);
  const inactiveCount = mockSubscriptions.filter(sub => sub.isDead || sub.status === "paused").length;
  const savingsGoal = 50000;
  const currentSavings = deadSpend;
  const savingsProgress = Math.min((currentSavings / savingsGoal) * 100, 100);
  
  const filteredSubscriptions = mockSubscriptions.filter(sub => {
    switch (activeFilter) {
      case "All":
        return true;
      case "Inactive":
        return sub.isDead || sub.status === "paused";
      case "Upcoming Renewals":
        {
          const renewal = new Date(sub.nextRenewal);
          const now = new Date();
          const diffDays = Math.ceil((renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          return diffDays <= 15;
        }
      case "Active":
        return sub.status === "active" && !sub.isDead;
      case "Paused":
        return sub.status === "paused";
      default:
        return true;
    }
  });

  return (
    <>
      <MobileLayout showBackButton={false}>
        <div className="px-4 py-6 space-y-6 pb-20">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between animate-slide-down">
            <div>
              <h1 className="heading-xl text-gradient animate-fade-in">Hi, John! 👋</h1>
              <p className="body-sm text-muted-foreground mt-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Let's manage your subscriptions
              </p>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <EnhancedButton 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => router.push("/analytics")}
                  className="hover-glow"
                >
                  <BarChart3 className="h-5 w-5" />
                </EnhancedButton>
                <NotificationBadge count={3} variant="success" size="sm" />
              </div>
              <EnhancedButton 
                variant="ghost" 
                size="icon" 
                onClick={() => router.push("/configure-alerts")}
                className="hover-glow"
              >
                <Settings className="h-5 w-5" />
              </EnhancedButton>
            </div>
          </div>

          {/* Savings Goal Progress */}
          <EnhancedCard variant="gradient" padding="lg" className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-300" />
                <span className="text-lg font-semibold text-white">Savings Goal</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter value={currentSavings} prefix="₹" formatNumber />
                </div>
                <div className="text-sm text-white/70">of ₹{savingsGoal.toLocaleString()}</div>
              </div>
            </div>
            <ProgressIndicator 
              value={savingsProgress} 
              variant="default" 
              size="lg" 
              className="mb-2 [&>div]:bg-gradient-to-r [&>div]:from-yellow-300 [&>div]:to-orange-400"
            />
            <div className="flex justify-between text-sm text-white/80">
              <span>{Math.round(savingsProgress)}% complete</span>
              <span>₹{(savingsGoal - currentSavings).toLocaleString()} to go</span>
            </div>
          </EnhancedCard>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <EnhancedCard variant="glass" padding="default" className="hover-lift animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm font-medium">Annual Spend</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  <AnimatedCounter value={totalSpend} prefix="₹" formatNumber />
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-success">
                  <TrendingDown className="w-3 h-3" />
                  <span>12% vs last year</span>
                </div>
              </div>
            </EnhancedCard>

            <EnhancedCard 
              variant="success" 
              padding="default" 
              interactive 
              className="hover-lift animate-slide-up cursor-pointer" 
              style={{ animationDelay: '0.5s' }}
              onClick={() => router.push("/dead-spend-detector")}
            >
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">Dead Spend</span>
                </div>
                <div className="text-2xl font-bold">
                  <AnimatedCounter value={deadSpend} prefix="₹" formatNumber />
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{inactiveCount} inactive subscriptions</span>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </div>

          {/* Enhanced Spend Chart */}
          <EnhancedCard 
            variant="floating" 
            padding="lg" 
            interactive 
            className="cursor-pointer animate-fade-in" 
            style={{ animationDelay: '0.6s' }}
            onClick={() => router.push("/analytics")}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="heading-sm">Spending Trends</h3>
                  <p className="text-sm text-muted-foreground">Monthly vs target</p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium text-success">On track</span>
                </div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlySpendData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                    />
                    <YAxis hide />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      fill="url(#colorTarget)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      fill="url(#colorAmount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </EnhancedCard>

          {/* Enhanced Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.7s' }}>
              <h3 className="heading-sm">Your Subscriptions</h3>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  {filteredSubscriptions.length} of {mockSubscriptions.length}
                </div>
                <EnhancedButton variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </EnhancedButton>
              </div>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin animate-slide-up" style={{ animationDelay: '0.8s' }}>
              {filters.map((filter, index) => (
                <EnhancedButton
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  variant={activeFilter === filter ? "gradient" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap animate-scale-in"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  {filter}
                  {filter === "Inactive" && inactiveCount > 0 && (
                    <NotificationBadge count={inactiveCount} variant="destructive" size="sm" className="ml-1" />
                  )}
                </EnhancedButton>
              ))}
            </div>
          </div>

          {/* Enhanced Subscriptions List */}
          <div className="space-y-3">
            {filteredSubscriptions.map((subscription, index) => (
              <EnhancedCard 
                key={subscription.id} 
                variant="floating" 
                padding="lg" 
                interactive
                className="hover-lift animate-slide-up"
                style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                onClick={() => router.push(`/subscription/${subscription.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                          {subscription.name.charAt(0)}
                        </div>
                        {subscription.isDead && (
                          <NotificationBadge 
                            variant="destructive" 
                            size="sm" 
                            position="top-right" 
                            dot 
                            animate 
                          />
                        )}
                        {subscription.status === "paused" && (
                          <NotificationBadge 
                            variant="warning" 
                            size="sm" 
                            position="top-right" 
                            dot 
                            animate 
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold truncate">{subscription.name}</h4>
                          {subscription.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                        <div className="flex items-center space-x-3 mt-1">
                          <p className="text-xl font-bold text-primary">
                            <AnimatedCounter value={subscription.amount} prefix="₹" />
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Next: {new Date(subscription.nextRenewal).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                            {subscription.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Usage</span>
                            <ProgressIndicator 
                              value={subscription.usage} 
                              variant={subscription.usage > 70 ? "success" : subscription.usage > 30 ? "warning" : "destructive"}
                              size="sm"
                              className="w-16"
                            />
                            <span className="text-xs font-medium">{subscription.usage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <EnhancedButton 
                    variant="ghost" 
                    size="sm"
                    icon={<Eye className="w-4 h-4" />}
                  >
                    View
                  </EnhancedButton>
                </div>
              </EnhancedCard>
            ))}
          </div>
        </div>
      </MobileLayout>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => router.push("/add-subscription")}
        variant="gradient"
        size="lg"
        tooltip="Add Subscription"
        className="animate-bounce-in"
        style={{ animationDelay: '1.5s' }}
      >
        <Plus className="w-6 h-6" />
      </FloatingActionButton>
    </>
  );
}