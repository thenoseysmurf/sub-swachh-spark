import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { Smartphone, Shield, TrendingDown, Users } from "lucide-react";

const Index = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="px-4 py-12 space-y-8">
        {/* Hero Section */}
        <div className="text-center text-white space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              Subscription Swachh
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Take control of your subscriptions.<br />
              Save thousands every year.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-lg font-semibold">₹25,000+</p>
              <p className="text-sm opacity-80">Average yearly savings</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          {[
            {
              icon: Smartphone,
              title: "Smart Detection",
              description: "Find subscriptions linked to your payment methods"
            },
            {
              icon: TrendingDown, 
              title: "Dead Spend Analysis",
              description: "Identify unused subscriptions draining your money"
            },
            {
              icon: Shield,
              title: "Easy Cancellation", 
              description: "Cancel with one tap or get guided assistance"
            },
            {
              icon: Users,
              title: "Join 50K+ Users",
              description: "Trusted by thousands for subscription management"
            }
          ].map((feature, index) => (
            <WidgetCard key={index} className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </WidgetCard>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={() => router.push("/signup")}
            variant="primary" 
            size="xl" 
            className="w-full"
          >
            Start Your Clean-Up Today
          </Button>
          
          <Button 
            onClick={() => router.push("/login")}
            variant="soft" 
            size="lg" 
            className="w-full"
          >
            Already have an account? Sign In
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center text-white/80 space-y-2">
          <p className="text-sm">🔒 Bank-grade security • No hidden fees</p>
          <p className="text-xs opacity-70">
            Used by 50,000+ Indians to save money monthly
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
