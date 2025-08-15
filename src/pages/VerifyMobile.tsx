import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { WidgetCard } from "@/components/ui/widget-card";
import { Loader2, CheckCircle2, CreditCard, Smartphone, Link, Shield } from "lucide-react";

export default function VerifyMobile() {
  const router = useRouter();
  const [step, setStep] = useState<"scanning" | "results">("scanning");
  const [foundSources, setFoundSources] = useState({ upiIds: 2, cards: 1 });

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

  const handleAddManually = () => {
    router.push("/profile-setup");
  };

  return (
    <MobileLayout 
      title="Linked Accounts Discovery" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2">
          {["scanning", "results"].map((s, i) => (
            <div 
              key={s}
              className={`h-2 w-8 rounded-full transition-colors ${
                ["scanning", "results"].indexOf(step) >= i 
                  ? "bg-primary" 
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
            <Link className="w-6 h-6 text-primary" />
          </div>
          <h1 className="heading-lg text-foreground">Find Your Payment Methods</h1>
          <p className="body-lg text-muted-foreground max-w-sm mx-auto">
            We're scanning for UPI IDs and cards linked to your account to discover active subscriptions
          </p>
        </div>

        {step === "scanning" && (
          <WidgetCard className="text-center py-12 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
              </div>
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary relative z-10" />
            </div>
            <div>
              <h2 className="heading-lg mb-2">Scanning Linked Accounts</h2>
              <p className="body-sm text-muted-foreground">
                Securely connecting to discover your payment methods...
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                Bank Grade Security
              </div>
            </div>
          </WidgetCard>
        )}

        {step === "results" && (
          <div className="space-y-4">
            <WidgetCard variant="savings" className="text-center space-y-4">
              <CheckCircle2 className="h-8 w-8 mx-auto" />
              <div>
                <h2 className="heading-lg">Discovery Complete!</h2>
                <p className="body-lg">
                  Found {foundSources.upiIds} UPI IDs and {foundSources.cards} card linked to your account
                </p>
              </div>
            </WidgetCard>

            <WidgetCard className="space-y-4">
              <h3 className="heading-sm">Linked Payment Methods</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-success/5 to-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                    <Smartphone className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">UPI Accounts</p>
                    <p className="text-sm text-muted-foreground">{foundSources.upiIds} active UPI IDs detected</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-success font-medium">Connected ✓</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Payment Cards</p>
                    <p className="text-sm text-muted-foreground">{foundSources.cards} active card linked</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary font-medium">Connected ✓</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mt-6">
                <p className="text-sm text-muted-foreground text-center">
                  These payment methods will be used to automatically detect and track your active subscriptions
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <Button onClick={handleContinue} className="w-full" variant="primary" size="lg">
                  Continue to Profile Setup
                </Button>
                
                <Button 
                  onClick={handleAddManually} 
                  variant="outline" 
                  className="w-full"
                >
                  Add More Payment Methods
                </Button>
              </div>
            </WidgetCard>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}