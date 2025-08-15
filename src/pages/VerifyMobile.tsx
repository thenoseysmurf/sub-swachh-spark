import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { WidgetCard } from "@/components/ui/widget-card";
import { Loader2, CheckCircle2, CreditCard, Smartphone, Link, Shield, X } from "lucide-react";

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
      showBottomNav={false}
    >
      <div className="px-4 py-3 space-y-3">
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

        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-2">
            <Link className="w-5 h-5 text-primary" />
          </div>
          <h1 className="heading-md text-foreground">Find Your Payment Methods</h1>
          <p className="body-sm text-muted-foreground max-w-sm mx-auto">
            Scanning for UPI IDs and cards to discover active subscriptions
          </p>
        </div>

        {step === "scanning" && (
          <WidgetCard className="text-center py-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 rounded-full"></div>
              </div>
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary relative z-10" />
            </div>
            <div>
              <h2 className="heading-md mb-1">Scanning Linked Accounts</h2>
              <p className="body-sm text-muted-foreground">
                Securely connecting to discover your payment methods...
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs text-muted-foreground">Bank Grade Security</span>
            </div>
          </WidgetCard>
        )}

        {step === "results" && (
          <div className="space-y-3">
            <WidgetCard variant="savings" className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Accounts Discovered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold">{upiAccounts.length}</div>
                    <div className="text-xs opacity-80">UPI IDs</div>
                  </div>
                  <div className="w-px h-6 bg-success/30"></div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{paymentCards.length}</div>
                    <div className="text-xs opacity-80">Cards</div>
                  </div>
                </div>
              </div>
            </WidgetCard>

            <WidgetCard className="space-y-3">
              <h3 className="text-sm font-medium">Linked Payment Methods</h3>
              
              <div className="space-y-2">
                {upiAccounts.map((upi) => (
                  <div key={upi.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-success/5 to-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10">
                      <Smartphone className="h-4 w-4 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{upi.name}</p>
                      <p className="text-xs text-muted-foreground">{upi.provider}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}

                {paymentCards.map((card) => (
                  <div key={card.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{card.name}</p>
                      <p className="text-xs text-muted-foreground">**** {card.last4}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground text-center">
                  Linked accounts are used to auto-detect active subscriptions
                </p>
              </div>

              <Button onClick={handleContinue} className="w-full" variant="primary">
                Continue to Profile Setup
              </Button>
            </WidgetCard>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}