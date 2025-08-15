import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { useRouter } from "@/hooks/useRouter";
import { Loader2, CheckCircle2, CreditCard, Smartphone, Link, Shield, X, Sparkles } from "lucide-react";

export default function VerifyMobile() {
  const router = useRouter();
  const [step, setStep] = useState<"scanning" | "results">("scanning");
  const [upiAccounts] = useState([
    { id: "1", name: "user@paytm", provider: "Paytm" },
    { id: "2", name: "user@phonepe", provider: "PhonePe" }
  ]);
  const [paymentCards] = useState([
    { id: "1", name: "HDFC Credit Card", last4: "4567", type: "Credit" }
  ]);

  useEffect(() => {
    // Auto start scanning when component mounts
    const timer = setTimeout(() => {
      setStep("results");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    router.push("/profile-setup");
  };

  return (
    <MobileLayout 
      title="Linked Accounts" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-3 space-y-3">
        {/* Enhanced Progress indicator */}
        <div className="flex justify-center animate-slide-down">
          <ProgressIndicator 
            value={step === "results" ? 100 : 50} 
            variant="gradient" 
            size="sm" 
            className="w-24" 
            animated 
          />
        </div>

        <div className="text-center space-y-1 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary mb-2 animate-pulse-glow">
            <Link className="w-6 h-6 text-white" />
          </div>
          <h1 className="heading-md text-gradient">Find Your Payment Methods</h1>
          <p className="body-sm text-muted-foreground max-w-sm mx-auto">
            Scanning for UPI IDs and cards to discover active subscriptions
          </p>
        </div>

        {step === "scanning" && (
          <EnhancedCard variant="glass" padding="lg" className="text-center animate-scale-in">
            <div className="space-y-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-16 h-16 border-4 border-primary/20 rounded-full animate-spin" />
                <Loader2 className="h-8 w-8 animate-spin text-primary z-10" />
              </div>
              <div>
                <h2 className="heading-sm mb-2 text-gradient">Scanning Linked Accounts</h2>
                <p className="body-sm text-muted-foreground">
                  Securely connecting to discover your payment methods...
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-success">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium">Bank Grade Security</span>
              </div>
            </div>
          </EnhancedCard>
        )}

        {step === "results" && (
          <div className="space-y-3">
            <EnhancedCard variant="success" padding="default" className="animate-bounce-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 animate-bounce" />
                  <span className="text-sm font-semibold">Accounts Discovered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-xl font-bold">
                      <AnimatedCounter value={upiAccounts.length} />
                    </div>
                    <div className="text-xs opacity-80">UPI IDs</div>
                  </div>
                  <div className="w-px h-6 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-xl font-bold">
                      <AnimatedCounter value={paymentCards.length} />
                    </div>
                    <div className="text-xs opacity-80">Cards</div>
                  </div>
                </div>
              </div>
            </EnhancedCard>

            <EnhancedCard variant="floating" padding="default" className="space-y-3 animate-slide-up">
              <h3 className="text-sm font-semibold">Linked Payment Methods</h3>
              
              <div className="space-y-2">
                {upiAccounts.map((upi, index) => (
                  <div 
                    key={upi.id} 
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-success/10 to-success/5 rounded-lg border border-success/20 hover-lift animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/20">
                      <Smartphone className="h-4 w-4 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{upi.name}</p>
                      <p className="text-xs text-muted-foreground">{upi.provider}</p>
                    </div>
                    <EnhancedButton variant="ghost" size="icon" className="h-6 w-6 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </EnhancedButton>
                  </div>
                ))}

                {paymentCards.map((card, index) => (
                  <div 
                    key={card.id} 
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 hover-lift animate-slide-up"
                    style={{ animationDelay: `${(upiAccounts.length + index) * 0.1}s` }}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{card.name}</p>
                      <p className="text-xs text-muted-foreground">**** {card.last4}</p>
                    </div>
                    <EnhancedButton variant="ghost" size="icon" className="h-6 w-6 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </EnhancedButton>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-3 animate-fade-in">
                <p className="text-xs text-muted-foreground text-center">
                  Linked accounts are used to auto-detect active subscriptions
                </p>
              </div>

              <EnhancedButton 
                onClick={handleContinue} 
                variant="gradient" 
                size="lg"
                className="w-full animate-bounce-in"
                icon={<Sparkles />}
              >
                Continue to Profile Setup
              </EnhancedButton>
            </EnhancedCard>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}