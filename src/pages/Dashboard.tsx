import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { MetricCard } from "@/components/ui/metric-card";
import { PremiumLoading } from "@/components/ui/premium-loading";
import { AppLogo } from "@/components/ui/app-logo";
import { useRouter } from "@/hooks/useRouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Calendar, Filter, Settings, BarChart3, AlertCircle, Play, Pause, Star, Crown, Sparkles, Bell, Languages, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
const mockSubscriptions = [{
  id: 1,
  name: "Netflix",
  amount: 199,
  nextRenewal: "2024-08-20",
  status: "active",
  isDead: true,
  category: "OTT"
}, {
  id: 2,
  name: "Spotify Premium",
  amount: 119,
  nextRenewal: "2024-08-18",
  status: "active",
  isDead: false,
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
}];
const filters = [
  { key: "all", label: "filters.all" },
  { key: "inactive", label: "filters.inactive" },
  { key: "paused", label: "filters.paused" }
];

export default function Dashboard() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [userName, setUserName] = useState("John");
  useEffect(() => {
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      const firstName = profile.name.split(" ")[0];
      setUserName(firstName);
    }
  }, []);
  const monthlySpend = mockSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const deadSpend = Math.round(mockSubscriptions.filter(sub => sub.isDead).reduce((sum, sub) => sum + sub.amount, 0));
  const totalSubscriptions = mockSubscriptions.length;
  const inactiveCount = mockSubscriptions.filter(sub => sub.isDead || sub.status === "paused").length;
  const filteredSubscriptions = mockSubscriptions.filter(sub => {
    switch (activeFilter) {
      case "all":
        return true;
      case "inactive":
        return sub.isDead || sub.status === "paused";
      case "paused":
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
              <h1 className="display-md gradient-text">{t('dashboard.welcome').replace('{name}', userName)}</h1>
              <p className="caption text-muted-foreground">{t('dashboard.welcomeSubtitle')}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="glass" size="icon-sm" onClick={() => router.push("/notifications")} className="interactive-scale">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="glass" size="icon-sm" className="interactive-scale">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => router.push("/configure-alerts")}>
                    <Settings className="h-4 w-4 mr-2" />
                    {t('settings.configureAlerts')}
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Languages className="h-4 w-4 mr-2" />
                      {t('settings.language')}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setLanguage('en')}>
                        {t('settings.english')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage('hi')}>
                        {t('settings.hindi')}
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/")}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('settings.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Apple-style Key Metrics */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up stagger-1">
          <MetricCard title={t('dashboard.monthlySpend')} value={`₹${monthlySpend.toLocaleString()}`} subtitle={`${totalSubscriptions} ${t('dashboard.subscriptions')}`} variant="premium" className="cursor-pointer" onClick={() => router.push("/analytics")} />

          <MetricCard title={t('dashboard.deadSpend')} value={`₹${deadSpend.toLocaleString()}`} subtitle={`${inactiveCount} ${t('dashboard.inactiveSubscriptions')}`} variant="warning" className="cursor-pointer" onClick={() => router.push("/dead-spend-detector")} />
        </div>


        {/* Apple-style Analytics Chart */}
        <WidgetCard variant="default" interactive onClick={() => router.push("/analytics")} className="animate-slide-up stagger-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="heading-sm">{t('dashboard.monthlySpendTrend')}</h3>
              </div>
              <div className="flex items-center space-x-1 text-success">
                <TrendingUp className="h-4 w-4" />
                <span className="caption font-medium">+12.5%</span>
              </div>
            </div>
            
            <div className="h-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySpendData} margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10
              }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{
                  fontSize: 10,
                  fill: 'hsl(var(--muted-foreground))'
                }} interval={0} />
                  <YAxis hide />
                  <Line type="monotone" dataKey="amount" stroke="url(#gradient)" strokeWidth={3} dot={{
                  fill: 'hsl(var(--primary))',
                  strokeWidth: 2,
                  r: 3
                }} activeDot={{
                  r: 5,
                  fill: 'hsl(var(--primary))',
                  strokeWidth: 2
                }} />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--success))" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
            
          </div>
        </WidgetCard>

        {/* Enhanced Filters Section */}
        <div className="space-y-4 animate-slide-up stagger-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="heading-sm">{t('dashboard.yourSubscriptions')}</h3>
            </div>
            <span className="caption bg-primary/10 text-primary px-2 py-1 rounded-full">
              {filteredSubscriptions.length} {t('dashboard.active')}
            </span>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter, index) => <button key={filter.key} onClick={() => setActiveFilter(filter.key)} className={`
                  px-4 py-2 rounded-full caption-lg font-medium whitespace-nowrap transition-all duration-300
                  ${activeFilter === filter.key ? "bg-gradient-primary text-white shadow-md transform scale-105" : "glass-surface text-muted-foreground hover:bg-accent interactive-scale"}
                `}>
                {t(filter.label)}
              </button>)}
          </div>
        </div>

        {/* Apple-style Subscriptions List */}
        <div className="space-y-3 animate-slide-up stagger-4">
          {filteredSubscriptions.map((subscription, index) => <WidgetCard key={subscription.id} variant={subscription.isDead ? "warning" : "default"} interactive className="animate-slide-up" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <AppLogo appName={subscription.name} size="md" />
                    <div className="flex items-center space-x-2">
                      <h4 className="heading-xs text-foreground">{subscription.name}</h4>
                      {subscription.isDead && <AlertCircle className="h-4 w-4 text-destructive" />}
                      {subscription.status === "paused" && <Pause className="h-4 w-4 text-warning" />}
                      {!subscription.isDead && subscription.status === "active" && <Play className="h-4 w-4 text-success" />}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <p className="heading-sm text-foreground font-semibold">₹{subscription.amount}</p>
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
                  
                  <div className="flex items-center space-x-2">
                    <span className="caption bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                      {t(`category.${subscription.category.toLowerCase()}`)}
                    </span>
                  </div>
                </div>
                
                <Button variant="primary" size="sm" onClick={() => router.push(`/subscription/${subscription.id}`)} className="ml-4 font-medium">
                  {t('dashboard.manage')}
                </Button>
              </div>
            </WidgetCard>)}
          
          {filteredSubscriptions.length === 0 && <div className="text-center py-12 animate-fade-in">
              <PremiumLoading variant="pulse" size="lg" className="mx-auto mb-4" />
              <p className="body-md text-muted-foreground">{t('dashboard.noSubscriptionsFound')}</p>
              <p className="caption text-muted-foreground">{t('dashboard.tryAdjustingFilters')}</p>
            </div>}
        </div>

      </div>
    </MobileLayout>;
}