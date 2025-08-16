import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { MetricCard } from "@/components/ui/metric-card";
import { AppLogo } from "@/components/ui/app-logo";
import { useRouter } from "@/hooks/useRouter";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
  const totalSpends = categories.reduce((sum, cat) => sum + cat.spends, 0);
  const totalSavings = categories.reduce((sum, cat) => sum + cat.savings, 0);
  return <MobileLayout title={t('analytics.title')} onBack={() => router.back()} showBottomNav={true}>
      <div className="px-4 pt-2 pb-8 space-y-8">
        {/* Header Message */}
        <div className="text-center px-2">
          <p className="text-muted-foreground text-sm">
            Track, optimize, and save smarter
          </p>
        </div>

        {/* Apple-style Top Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            title={t('analytics.totalSpend')}
            value={`₹${(totalSpends * 12).toLocaleString()}`}
            variant="premium"
          />
          
          <MetricCard
            title={t('analytics.deadSpend')}
            value={`₹${(totalSavings * 12).toLocaleString()}`}
            variant="premium"
          />
        </div>

        {/* Apple-style Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="heading-lg">{t('analytics.categoryBreakdown')}</h2>
          </div>
          
          <div className="space-y-3">
            {categories.map(category => {
            const Icon = category.icon;
            return <WidgetCard 
                key={category.id} 
                variant="default"
                interactive
                onClick={() => router.push(`/category/${category.id}`)}
              >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="heading-xs text-foreground">{category.name}</h3>
                        <p className="caption text-muted-foreground">
                          {category.apps.length} subscriptions
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="heading-sm text-foreground font-semibold">₹{category.spends}</p>
                      <p className="caption text-muted-foreground">per month</p>
                    </div>
                  </div>
                  
                  {/* App Icons */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 flex-1">
                      {category.apps.slice(0, 4).map((app, index) => (
                        <div 
                          key={index} 
                          className="w-8 h-8 hover:scale-110 transition-transform" 
                          title={`${app.name} - ₹${app.amount}`}
                        >
                          <AppLogo appName={app.name} size="sm" className="w-full h-full" />
                        </div>
                      ))}
                      {category.apps.length > 4 && 
                        <div className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center caption text-secondary-foreground">
                          +{category.apps.length - 4}
                        </div>
                      }
                    </div>
                    
                    <Button variant="outline" size="sm" className="ml-4">
                      View All
                    </Button>
                  </div>
                </WidgetCard>;
          })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4">
          
        </div>
      </div>
    </MobileLayout>;
}