import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { WidgetCard } from "@/components/ui/widget-card";
import { Loader2, CheckCircle2, CreditCard, Smartphone, Link, Shield, X } from "lucide-react";
export default function VerifyMobile() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState<"scanning" | "results">("scanning");
  const [upiAccounts, setUpiAccounts] = useState([{
    id: "1",
    name: "user@paytm",
    provider: "Paytm"
  }, {
    id: "2",
    name: "user@phonepe",
    provider: "PhonePe"
  }]);
  const [paymentCards, setPaymentCards] = useState([{
    id: "1",
    name: "HDFC Credit Card",
    last4: "4567",
    type: "Credit"
  }]);
  const removeUpiAccount = (id: string) => {
    setUpiAccounts(accounts => accounts.filter(account => account.id !== id));
  };
  const removePaymentCard = (id: string) => {
    setPaymentCards(cards => cards.filter(card => card.id !== id));
  };
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
  return <MobileLayout title="Linked Accounts" onBack={() => router.back()} showBottomNav={false}>
      <div className="px-4 py-3 space-y-3">
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2">
          {["scanning", "results"].map((s, i) => <div key={s} className={`h-2 w-8 rounded-full transition-colors ${["scanning", "results"].indexOf(step) >= i ? "bg-primary" : "bg-muted"}`} />)}
        </div>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-2">
            <Link className="w-5 h-5 text-primary" />
          </div>
          <h1 className="heading-md text-foreground">Your Payment Methods</h1>
          <p className="body-sm text-muted-foreground max-w-sm mx-auto">Linking for UPI IDs and Cards for subscriptions</p>
        </div>

        {step === "scanning" && <WidgetCard className="text-center py-8 space-y-4">
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
          </WidgetCard>}

        {step === "results" && <div className="space-y-3">

            <WidgetCard className="space-y-3">
              <h3 className="text-sm font-medium">Linked Payment Methods</h3>
              
              <div className="space-y-2">
                {upiAccounts.map(upi => <div key={upi.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-success/5 to-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10">
                      <Smartphone className="h-4 w-4 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{upi.name}</p>
                      <p className="text-xs text-muted-foreground">{upi.provider}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeUpiAccount(upi.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>)}

                {paymentCards.map(card => <div key={card.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{card.name}</p>
                      <p className="text-xs text-muted-foreground">**** {card.last4}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removePaymentCard(card.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>)}
              </div>

              

              <Button onClick={handleContinue} className="w-full" variant="primary">
                Continue to Profile Setup
              </Button>
            </WidgetCard>
          </div>}
      </div>
    </MobileLayout>;
}