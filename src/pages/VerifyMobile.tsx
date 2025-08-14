import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/hooks/useRouter";
import { WidgetCard } from "@/components/ui/widget-card";
import { Loader2, CheckCircle2, CreditCard, Smartphone } from "lucide-react";

export default function VerifyMobile() {
  const router = useRouter();
  const [step, setStep] = useState<"send" | "verify" | "fetching" | "results">("send");
  const [mobile, setMobile] = useState("9876543210"); // Prefilled from signup/login
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [foundSources, setFoundSources] = useState({ upiIds: 2, cards: 1 });

  const handleSendOTP = () => {
    if (!mobile) {
      setError("Mobile number is required");
      return;
    }
    setError("");
    setStep("verify");
  };

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setError("");
    setStep("fetching");
    
    // Simulate API fetching
    setTimeout(() => {
      setStep("results");
    }, 2000);
  };

  const handleContinue = () => {
    router.push("/profile-setup");
  };

  const handleAddManually = () => {
    // For now, still continue to profile setup
    router.push("/profile-setup");
  };

  return (
    <MobileLayout 
      title="Secure Verification" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2">
          {["send", "verify", "fetching", "results"].map((s, i) => (
            <div 
              key={s}
              className={`h-2 w-8 rounded-full transition-colors ${
                ["send", "verify", "fetching", "results"].indexOf(step) >= i 
                  ? "bg-primary" 
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="text-center space-y-2">
          <p className="body-lg text-muted-foreground">
            Securing your account & finding your subscriptions…
          </p>
        </div>

        {step === "send" && (
          <WidgetCard className="space-y-6">
            <div className="text-center">
              <h2 className="heading-lg">Verify Mobile Number</h2>
              <p className="body-sm text-muted-foreground mt-1">
                We'll send you a verification code
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength={10}
                  placeholder="Enter mobile number"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <Button onClick={handleSendOTP} className="w-full" variant="primary" size="lg">
                Get OTP
              </Button>
            </div>
          </WidgetCard>
        )}

        {step === "verify" && (
          <WidgetCard className="space-y-6">
            <div className="text-center">
              <h2 className="heading-lg">Enter Verification Code</h2>
              <p className="body-sm text-muted-foreground mt-1">
                Code sent to +91 {mobile.slice(-4).padStart(4, "X")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">6-Digit OTP</Label>
                <Input
                  id="otp"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  placeholder="Enter OTP"
                  className="text-center text-lg tracking-widest"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <Button onClick={handleVerifyOTP} className="w-full" variant="primary" size="lg">
                Verify & Continue
              </Button>

              <div className="text-center">
                <button type="button" className="text-sm text-muted-foreground underline">
                  Didn't receive code? Resend
                </button>
              </div>
            </div>
          </WidgetCard>
        )}

        {step === "fetching" && (
          <WidgetCard className="text-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <div>
              <h2 className="heading-lg">Finding Your Subscriptions</h2>
              <p className="body-sm text-muted-foreground mt-1">
                Scanning linked payment methods...
              </p>
            </div>
          </WidgetCard>
        )}

        {step === "results" && (
          <div className="space-y-4">
            <WidgetCard variant="savings" className="text-center space-y-4">
              <CheckCircle2 className="h-8 w-8 mx-auto" />
              <div>
                <h2 className="heading-lg">Great News!</h2>
                <p className="body-lg">
                  We found {foundSources.upiIds} UPI IDs and {foundSources.cards} Card linked to your number.
                </p>
              </div>
            </WidgetCard>

            <WidgetCard className="space-y-4">
              <h3 className="heading-sm">Payment Sources Found</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">UPI IDs</p>
                    <p className="text-sm text-muted-foreground">{foundSources.upiIds} accounts found</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Cards</p>
                    <p className="text-sm text-muted-foreground">{foundSources.cards} card found</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleContinue} className="w-full" variant="primary" size="lg">
                  Continue Setup
                </Button>
                
                <Button 
                  onClick={handleAddManually} 
                  variant="outline" 
                  className="w-full"
                >
                  Add More Sources Manually
                </Button>
              </div>
            </WidgetCard>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}