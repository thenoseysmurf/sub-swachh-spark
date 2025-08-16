import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { PiggyBank, Coins, ArrowRight } from "lucide-react";
const Index = () => {
  const router = useRouter();
  const { t } = useLanguage();
  return <div className="min-h-screen bg-gradient-surface relative overflow-hidden">
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/5 rounded-full animate-float blur-3xl"></div>
        <div className="absolute top-1/2 -right-8 w-64 h-64 bg-accent/8 rounded-full animate-float blur-3xl" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-primary/6 rounded-full animate-float blur-3xl" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      <div className="relative px-6 py-16 flex flex-col items-center justify-center min-h-screen space-y-8">
        {/* Enhanced Logo with Coins and App Name */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative mx-auto w-fit">
            <div className="glass-card w-32 h-32 rounded-3xl flex items-center justify-center border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 shadow-xl">
              <div className="relative">
                <PiggyBank className="w-16 h-16 text-primary" />
                <Coins className="w-8 h-8 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
                <Coins className="w-6 h-6 text-yellow-400 absolute -bottom-1 -left-1 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight" style={{ filter: 'drop-shadow(0 0 15px rgba(147, 51, 234, 0.8))' }}>
            {"PocketWise".split("").map((letter, index) => (
              <span 
                key={index} 
                className="inline-block animate-bounce-in hover:animate-pulse hover:scale-110 transition-all duration-300" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Hero Content with Modern Typography */}
        <div className="glass-surface rounded-2xl p-8 max-w-md text-center space-y-4 animate-slide-up stagger-1">
          <p className="body-lg text-muted-foreground leading-relaxed">
            {t('landing.subtitle')}
          </p>
        </div>

        {/* Modern CTA Button */}
        <div className="w-full max-w-sm animate-slide-up stagger-2">
          <Button 
            onClick={() => router.push("/signup")} 
            variant="default" 
            size="xl" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white border-purple-500 flex items-center justify-center gap-2"
          >
            {t('landing.getStarted')}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Trust Indicator with Glass Effect */}
        <div className="glass-card rounded-xl p-4 max-w-xs text-center animate-slide-up stagger-3">
          <p className="caption text-muted-foreground">
            Trusted by 50,000+ smart savers
          </p>
        </div>
      </div>
    </div>;
};
export default Index;