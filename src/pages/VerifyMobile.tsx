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
            <WidgetCard variant="savings" className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                  <span className="text-sm font-medium">Accounts Discovered</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">{upiAccounts.length}</div>
                    <div className="text-xs opacity-80">UPI IDs</div>
                  </div>
                  <div className="w-px h-8 bg-success/30"></div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{paymentCards.length}</div>
                    <div className="text-xs opacity-80">Cards</div>
                  </div>
                </div>
              </div>
            </WidgetCard>

            <WidgetCard className="space-y-4">
              <h3 className="heading-sm">Linked Payment Methods</h3>
              
              <div className="space-y-3">
                {upiAccounts.map((upi) => (
                  <div key={upi.id} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-success/5 to-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                      <Smartphone className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{upi.name}</p>
                      <p className="text-sm text-muted-foreground">{upi.provider}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {paymentCards.map((card) => (
                  <div key={card.id} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{card.name}</p>
                      <p className="text-sm text-muted-foreground">**** {card.last4}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mt-6">
                <p className="text-sm text-muted-foreground text-center">
                  Linked accounts are used to Auto-detect active subscriptions
                </p>
              </div>

              <div className="pt-4">
                <Button onClick={handleContinue} className="w-full" variant="primary" size="lg">
                  Continue to Profile Setup
                </Button>
              </div>
            </WidgetCard>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}