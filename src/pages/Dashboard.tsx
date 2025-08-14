import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { TrendingUp, TrendingDown, Calendar, Filter, Settings, BarChart3, AlertCircle, Play, Pause } from "lucide-react";
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
const filters = ["All", "Inactive", "Upcoming Renewals", "Active", "Paused"];
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
  return <MobileLayout showBackButton={false}>
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl text-primary">Hi, John! 👋</h1>
            <p className="body-sm text-muted-foreground">Your subscriptions at a glance — time to save!</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/analytics")}>
              <BarChart3 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push("/configure-alerts")}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <WidgetCard variant="gradient" className="flex items-center justify-center py-2">
            <div className="text-center space-y-1">
              <p className="text-xs opacity-90">Annual Spend</p>
              <p className="text-xl font-bold">₹{totalSpend.toLocaleString()}</p>
            </div>
          </WidgetCard>

          <WidgetCard variant="savings" className="cursor-pointer hover:scale-105 transition-transform space-y-2 py-2" onClick={() => router.push("/dead-spend-detector")}>
            <div className="text-center space-y-1">
              <p className="text-xs opacity-90">Dead Spend</p>
              <p className="text-xl font-bold">₹{deadSpend.toLocaleString()}</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-2">
              <div className="flex items-center justify-between text-xs">
                <span className="opacity-90">Inactive Subscriptions:</span>
                <span className="font-medium">{inactiveCount}</span>
              </div>
            </div>
          </WidgetCard>
        </div>


        {/* Spend Chart */}
        <WidgetCard className="cursor-pointer hover:scale-105 transition-transform" onClick={() => router.push("/analytics")}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="heading-sm">Usage Analytics</h3>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySpendData} margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5
              }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{
                  fontSize: 10,
                  fill: 'hsl(var(--muted-foreground))'
                }} interval={0} />
                  <YAxis hide />
                  <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} dot={{
                  fill: 'hsl(var(--primary))',
                  strokeWidth: 2,
                  r: 2
                }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <p className="body-sm text-muted-foreground text-center">
              Average: ₹{Math.round(monthlySpendData.reduce((sum, month) => sum + month.amount, 0) / 12).toLocaleString()}/month
            </p>
          </div>
        </WidgetCard>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="heading-sm">Subscriptions</h3>
            
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filters.map(filter => <button key={filter} onClick={() => setActiveFilter(filter)} className={`
                  px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${activeFilter === filter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}
                `}>
                {filter}
              </button>)}
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-3">
          {filteredSubscriptions.map(subscription => <WidgetCard key={subscription.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{subscription.name}</h4>
                    {subscription.isDead && <AlertCircle className="h-4 w-4 text-destructive" />}
                    {subscription.status === "paused" && <Pause className="h-4 w-4 text-yellow-500" />}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-lg font-bold text-primary">₹{subscription.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      Next: {new Date(subscription.nextRenewal).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric'
                  })}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{subscription.category}</p>
                </div>
                
                <Button variant="soft" size="sm" onClick={() => router.push(`/subscription/${subscription.id}`)}>
                  Manage
                </Button>
              </div>
            </WidgetCard>)}
        </div>

        {/* Bottom Actions */}
        <div className="pb-safe">
          <Button variant="outline" className="w-full" onClick={() => router.push("/analytics")}>
            <BarChart3 className="h-4 w-4 mr-2" />
            View Detailed Analytics
          </Button>
        </div>
      </div>
    </MobileLayout>;
}