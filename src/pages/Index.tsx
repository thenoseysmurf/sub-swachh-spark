import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useRouter } from "@/hooks/useRouter";
import { Zap, Sparkles, Shield, TrendingUp, Users, Star } from "lucide-react";

const Index = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 px-6 py-16 flex flex-col items-center justify-center min-h-screen space-y-12">
        {/* App Icon with Enhanced Animation */}
        <div className="relative animate-bounce-in">
          <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-xl opacity-50 animate-pulse-glow" />
          <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-glow">
            <Zap className="w-14 h-14 text-white animate-float" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Hero Content with Staggered Animation */}
        <div className="text-center text-white space-y-6 max-w-sm animate-slide-up">
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            <span className="text-gradient bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Subscription
            </span>
            <br />
            <span className="text-white">Swachh</span>
          </h1>
          <p className="text-xl opacity-90 leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Take control of your subscriptions.<br />
            <span className="text-yellow-300 font-semibold">Save thousands every year.</span>
          </p>
        </div>

        {/* Enhanced Savings Display */}
        <EnhancedCard variant="glass" padding="lg" className="text-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm font-medium">Average Savings</span>
            </div>
            <div className="text-6xl font-bold text-emerald-300">
              <AnimatedCounter value={25000} prefix="₹" formatNumber />
              <span className="text-3xl text-emerald-400">+</span>
            </div>
            <p className="text-white/80 text-base">per year</p>
          </div>
        </EnhancedCard>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-sm animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">
              <AnimatedCounter value={50} suffix="K+" />
            </div>
            <p className="text-xs text-white/70">Users</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">100%</div>
            <p className="text-xs text-white/70">Secure</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">4.9</div>
            <p className="text-xs text-white/70">Rating</p>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div className="w-full max-w-sm space-y-4 animate-slide-up" style={{ animationDelay: '1.2s' }}>
          <EnhancedButton 
            onClick={() => router.push("/signup")}
            variant="gradient"
            size="xl"
            className="w-full font-semibold shadow-glow hover:shadow-2xl"
            icon={<Sparkles />}
          >
            Get Started for Free
          </EnhancedButton>
          
          <p className="text-center text-white/60 text-sm">
            No credit card required • Free forever
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 gap-3 w-full max-w-sm animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            Auto-detect subscriptions from bank statements
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            Smart renewal alerts & cancellation assistance
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <div className="w-2 h-2 bg-purple-400 rounded-full" />
            Track spending patterns & optimize costs
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
