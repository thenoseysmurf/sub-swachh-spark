import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { AppLogo } from "@/components/ui/app-logo";
import { useRouter } from "@/hooks/useRouter";
import { useParams } from "react-router-dom";
import { AlertTriangle, Calendar, DollarSign, Shield, CreditCard, Bell } from "lucide-react";
import { useState } from "react";

const appPlans = {
  "netflix": {
    name: "Netflix",
    currentPlan: "Premium Monthly",
    amount: 199,
    plans: [
      { name: "Basic", price: 149, features: ["1 screen", "480p quality"] },
      { name: "Standard", price: 199, features: ["2 screens", "1080p quality"] },
      { name: "Premium", price: 649, features: ["4 screens", "4K quality"] }
    ]
  },
  "prime-video": {
    name: "Prime Video", 
    currentPlan: "Annual Plan",
    amount: 1499,
    plans: [
      { name: "Monthly", price: 179, features: ["HD streaming", "Prime delivery"] },
      { name: "Annual", price: 1499, features: ["HD streaming", "Prime delivery", "Save 30%"] }
    ]
  },
  "nike-training": {
    name: "Nike Training",
    currentPlan: "Premium Monthly", 
    amount: 299,
    plans: [
      { name: "Free", price: 0, features: ["Basic workouts", "Limited content"] },
      { name: "Premium", price: 299, features: ["All workouts", "Personalized plans", "Expert guidance"] }
    ]
  },
  "myfitnesspal": {
    name: "MyFitnessPal",
    currentPlan: "Premium Monthly",
    amount: 199,
    plans: [
      { name: "Free", price: 0, features: ["Basic tracking", "Limited features"] },
      { name: "Premium", price: 199, features: ["Advanced analytics", "No ads", "Custom goals"] }
    ]
  },
  "skillshare": {
    name: "Skillshare",
    currentPlan: "Premium Monthly",
    amount: 299,
    plans: [
      { name: "Free", price: 0, features: ["Limited classes", "Ads"] },
      { name: "Premium", price: 299, features: ["All classes", "No ads", "Offline viewing"] }
    ]
  },
  "coursera": {
    name: "Coursera",
    currentPlan: "Plus Monthly",
    amount: 399,
    plans: [
      { name: "Individual", price: 399, features: ["Most courses", "Certificates"] },
      { name: "Plus", price: 599, features: ["All courses", "Projects", "Certificates"] }
    ]
  },
  "zomato-pro": {
    name: "Zomato Pro",
    currentPlan: "Pro Monthly",
    amount: 299,
    plans: [
      { name: "Pro", price: 299, features: ["Free delivery", "No surge", "Priority support"] }
    ]
  },
  "amazon-prime": {
    name: "Amazon Prime",
    currentPlan: "Prime Monthly",
    amount: 199,
    plans: [
      { name: "Monthly", price: 199, features: ["Fast delivery", "Prime Video", "Music"] },
      { name: "Annual", price: 1499, features: ["Fast delivery", "Prime Video", "Music", "Save 37%"] }
    ]
  }
};

export default function ManageSubscription() {
  const router = useRouter();
  const { appName } = useParams();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  
  const app = appPlans[appName as keyof typeof appPlans];
  
  if (!app) {
    return (
      <MobileLayout title="Subscription Not Found" onBack={() => router.back()}>
        <div className="px-4 pt-8 text-center">
          <p className="text-muted-foreground">Subscription not found</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Manage Subscription" onBack={() => router.back()} showBottomNav={true}>
      <div className="px-4 pt-4 pb-8 space-y-6">
        {/* App Header */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto p-3 bg-gradient-primary glow-effect">
            <AppLogo appName={app.name} size="lg" className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{app.name}</h1>
            <p className="text-sm text-muted-foreground">{app.currentPlan}</p>
            <p className="text-lg font-semibold text-primary">₹{app.amount}/month</p>
          </div>
        </div>

        {/* Current Plan */}
        <WidgetCard className="p-4 border-primary/20 bg-primary/5 glow-effect">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Current Plan</h3>
              <p className="text-sm text-muted-foreground">{app.currentPlan}</p>
            </div>
          </div>
        </WidgetCard>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-1 glass-effect hover:bg-primary/10"
              onClick={() => setSelectedAction('pause')}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Pause Plan</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-1 glass-effect hover:bg-primary/10"
              onClick={() => setSelectedAction('change')}
            >
              <CreditCard className="h-5 w-5" />
              <span className="text-xs">Change Plan</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-1 glass-effect hover:bg-primary/10"
              onClick={() => setSelectedAction('notifications')}
            >
              <Bell className="h-5 w-5" />
              <span className="text-xs">Notifications</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-1 glass-effect hover:bg-destructive/10 border-destructive/20"
              onClick={() => router.push('/cancellation-instructions')}
            >
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="text-xs text-destructive">Cancel</span>
            </Button>
          </div>
        </div>

        {/* Available Plans */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Available Plans</h2>
          
          <div className="space-y-3">
            {app.plans.map((plan, index) => (
              <WidgetCard 
                key={index} 
                className={`p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  plan.name === app.currentPlan.split(' ')[0] 
                    ? 'border-primary/30 bg-primary/5 glow-effect' 
                    : 'glass-effect hover:bg-primary/5'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{plan.name}</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      {plan.features.map((feature, i) => (
                        <div key={i}>• {feature}</div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                    </p>
                    {plan.price > 0 && (
                      <p className="text-xs text-muted-foreground">per month</p>
                    )}
                  </div>
                </div>
              </WidgetCard>
            ))}
          </div>
        </div>

        {/* Action Confirmation */}
        {selectedAction && (
          <WidgetCard className="p-4 border-primary/20 bg-gradient-subtle">
            <div className="text-center space-y-3">
              <h3 className="font-semibold">
                {selectedAction === 'pause' && 'Pause Subscription'}
                {selectedAction === 'change' && 'Change Plan'}
                {selectedAction === 'notifications' && 'Notification Settings'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedAction === 'pause' && 'Your subscription will be paused and you can resume anytime.'}
                {selectedAction === 'change' && 'Select a new plan from the options above.'}
                {selectedAction === 'notifications' && 'Manage your billing and usage notifications.'}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedAction(null)}
              >
                Got it
              </Button>
            </div>
          </WidgetCard>
        )}
      </div>
    </MobileLayout>
  );
}