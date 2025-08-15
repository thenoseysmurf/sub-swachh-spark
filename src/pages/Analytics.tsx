import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { Film, Heart, GraduationCap, Tag, Play, Music, Dumbbell, BookOpen, Coffee, ShoppingBag } from "lucide-react";
const categories = [{
  id: 1,
  name: "Entertainment",
  icon: Film,
  spends: 2340,
  savings: 890,
  apps: [{
    name: "Netflix",
    icon: Play,
    amount: 799
  }, {
    name: "Spotify",
    icon: Music,
    amount: 119
  }, {
    name: "Prime Video",
    icon: Film,
    amount: 299
  }, {
    name: "YouTube Premium",
    icon: Play,
    amount: 129
  }]
}, {
  id: 2,
  name: "Fitness",
  icon: Heart,
  spends: 1250,
  savings: 450,
  apps: [{
    name: "Nike Training",
    icon: Dumbbell,
    amount: 299
  }, {
    name: "MyFitnessPal",
    icon: Heart,
    amount: 199
  }, {
    name: "Headspace",
    icon: Heart,
    amount: 299
  }]
}, {
  id: 3,
  name: "Education",
  icon: GraduationCap,
  spends: 980,
  savings: 320,
  apps: [{
    name: "Skillshare",
    icon: BookOpen,
    amount: 299
  }, {
    name: "Coursera",
    icon: GraduationCap,
    amount: 399
  }, {
    name: "Duolingo",
    icon: BookOpen,
    amount: 149
  }]
}, {
  id: 4,
  name: "Others",
  icon: Tag,
  spends: 750,
  savings: 180,
  apps: [{
    name: "Zomato Pro",
    icon: Coffee,
    amount: 299
  }, {
    name: "Amazon Prime",
    icon: ShoppingBag,
    amount: 199
  }]
}];
export default function Analytics() {
  const router = useRouter();
  const totalSpends = categories.reduce((sum, cat) => sum + cat.spends, 0);
  const totalSavings = categories.reduce((sum, cat) => sum + cat.savings, 0);
  return <MobileLayout title="Spending Insights" onBack={() => router.back()}>
      <div className="px-4 pt-2 pb-8 space-y-8">
        {/* Header Message */}
        <div className="text-center px-2">
          <p className="text-muted-foreground text-sm">
            Track, optimize, and save smarter
          </p>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <WidgetCard variant="gradient" className="text-center py-6 hover-scale">
            <div className="space-y-2">
              <p className="text-sm opacity-90">Monthly Spend</p>
              <p className="text-2xl font-bold">₹{totalSpends.toLocaleString()}</p>
              <p className="text-xs opacity-75">This month</p>
            </div>
          </WidgetCard>
          
          <WidgetCard variant="savings" className="text-center py-6 hover-scale">
            <div className="space-y-2">
              <p className="text-sm opacity-90">Potential Savings</p>
              <p className="text-2xl font-bold">₹{(totalSavings * 12).toLocaleString()}</p>
              <p className="text-xs opacity-75">Per year</p>
            </div>
          </WidgetCard>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Categories</h2>
            
          </div>
          
          <div className="space-y-5">
            {categories.map(category => {
            const Icon = category.icon;
            return <WidgetCard key={category.id} className="p-5 animate-fade-in hover-scale">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.apps.length} subscriptions
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{category.spends}</p>
                      <p className="text-xs text-muted-foreground">per month</p>
                    </div>
                  </div>
                  
                  {/* App Icons */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3 flex-1">
                      {category.apps.slice(0, 4).map((app, index) => {
                    const AppIcon = app.icon;
                    return <div key={index} className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title={`${app.name} - ₹${app.amount}`}>
                            <AppIcon className="h-4 w-4 text-muted-foreground" />
                          </div>;
                  })}
                      {category.apps.length > 4 && <div className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                          +{category.apps.length - 4}
                        </div>}
                    </div>
                    
                    <Button variant="outline" size="sm" className="ml-4" onClick={() => router.push(`/category/${category.id}`)}>
                      View All
                    </Button>
                  </div>
                </WidgetCard>;
          })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4">
          <Button variant="secondary" className="w-full py-3" onClick={() => router.push("/dead-spend-detector")}>
            Find Unused Subscriptions
          </Button>
        </div>
      </div>
    </MobileLayout>;
}