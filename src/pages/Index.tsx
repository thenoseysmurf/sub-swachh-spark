import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { PiggyBank } from "lucide-react";
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
        {/* Modern Logo and App Name */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="relative mx-auto w-fit">
            <div className="glass-card w-20 h-20 rounded-2xl flex items-center justify-center border border-border-accent/20">
              <PiggyBank className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="heading-lg text-foreground font-bold tracking-tight">
            PocketWise
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
            variant="glass" 
            size="xl" 
            className="w-full"
          >
            {t('landing.getStarted')}
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