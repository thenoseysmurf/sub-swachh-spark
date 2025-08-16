import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { Zap } from "lucide-react";
const Index = () => {
  const router = useRouter();
  return <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/20 rounded-full animate-float blur-3xl"></div>
        <div className="absolute top-1/2 -right-8 w-64 h-64 bg-success/20 rounded-full animate-float blur-3xl" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-primary-glow/20 rounded-full animate-float blur-3xl" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      <div className="relative px-6 py-16 flex flex-col items-center justify-center min-h-screen space-y-8">
        {/* App Icon with Enhanced Styling */}
        <div className="relative animate-bounce-in">
          <div className="w-28 h-28 rounded-3xl bg-gradient-hero shadow-glow flex items-center justify-center backdrop-blur-sm border border-white/20 animate-pulse-glow">
            <Zap className="w-14 h-14 text-white drop-shadow-lg" />
          </div>
          <div className="absolute -inset-2 bg-gradient-hero rounded-3xl blur-lg opacity-60 animate-pulse-glow"></div>
        </div>

        {/* Hero Content with Enhanced Typography */}
        <div className="text-center text-white space-y-6 max-w-md animate-slide-up stagger-1">
          <h1 className="display-lg gradient-text bg-gradient-to-r from-white via-primary-glow to-success-glow bg-clip-text text-transparent text-4xl">
            PocketWise
          </h1>
          <p className="body-xl leading-relaxed max-w-sm mx-auto text-slate-50 text-base font-light text-center">Save your Pocket Drain! 
Without using Brain!</p>
        </div>

        {/* Savings Display with Glass Effect */}
        

        {/* Enhanced CTA Button */}
        <div className="w-full max-w-sm animate-slide-up stagger-3">
          <Button onClick={() => router.push("/signup")} variant="outline-primary" size="xl" className="w-full">
            Get Started
          </Button>
        </div>

        {/* Trust Indicator with Social Proof */}
        <div className="text-center space-y-2 animate-slide-up stagger-4">
          
          <p className="text-white/70 caption-lg">
            Trusted by 50,000+ smart savers
          </p>
        </div>
      </div>
    </div>;
};
export default Index;