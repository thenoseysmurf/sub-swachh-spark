import { useState, useRef, useEffect } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "@/hooks/useRouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { WidgetCard } from "@/components/ui/widget-card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Check, Shield, Smartphone, Mail } from "lucide-react";
export default function Signup() {
  const router = useRouter();
  const { t } = useLanguage();
  const otpRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
    email: "",
    syncUpiCards: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  useEffect(() => {
    if (otpSent && otpRef.current) {
      setTimeout(() => {
        otpRef.current?.focus();
      }, 100);
    }
  }, [otpSent]);
  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.mobile || formData.mobile.length !== 10) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setOtpSent(true);
    setFormData(prev => ({ ...prev, otp: "123456" }));
  };
  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.otp || formData.otp.length !== 6) {
      newErrors.otp = "Please enter a valid 6-digit OTP";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setOtpVerified(true);
  };
  const handleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    router.push("/verify-mobile");
  };
  const getStepProgress = () => {
    if (otpVerified) return 100;
    if (otpSent) return 66;
    return 33;
  };
  return <MobileLayout showBackButton={false} showBottomNav={false}>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/30 px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-card mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="heading-xl text-foreground">{t('auth.signup.title')}</h1>
          <p className="body-lg text-muted-foreground max-w-sm mx-auto">{t('auth.signup.subtitle')}</p>
        </div>

        {/* Progress Indicator */}
        

        {/* Form Container */}
        <div className="max-w-sm mx-auto space-y-6">
          {/* Step 1: Mobile Number */}
          <WidgetCard className={`transition-all duration-300 ${!otpSent ? 'ring-2 ring-primary/20' : 'opacity-75'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${otpSent ? 'bg-success text-white' : 'bg-primary/10 text-primary'}`}>
                {otpSent ? <Check className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="font-medium text-foreground">{t('auth.signup.verifyMobile')}</h3>
                <p className="text-sm text-muted-foreground">{t('auth.signup.otpSent')}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="mobile" className="sr-only">Mobile Number</Label>
              <div className="flex gap-2">
                <div className="flex">
                  <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md text-sm text-muted-foreground">
                    +91
                  </div>
                  <Input id="mobile" type="tel" placeholder={t('auth.signup.mobile')} value={formData.mobile} onChange={e => setFormData(prev => ({
                    ...prev,
                    mobile: e.target.value
                  }))} className={`${errors.mobile ? "border-destructive" : ""} flex-1 rounded-l-none`} maxLength={10} disabled={otpSent} />
                </div>
                <Button onClick={handleSendOTP} variant={otpSent ? "outline" : "primary"} size="sm" disabled={otpSent || !formData.mobile} className="whitespace-nowrap px-4">
                  {otpSent ? "Sent ✓" : t('auth.signup.resendOtp')}
                </Button>
              </div>
              {errors.mobile && <p className="text-sm text-destructive flex items-center gap-1">{errors.mobile}</p>}
            </div>
          </WidgetCard>

          {/* Step 2: OTP Verification */}
          {otpSent && <WidgetCard className={`transition-all duration-300 animate-slide-up ${!otpVerified ? 'ring-2 ring-primary/20' : 'opacity-75'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${otpVerified ? 'bg-success text-white' : 'bg-primary/10 text-primary'}`}>
                  {otpVerified ? <Check className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{t('auth.signup.enterOtp')}</h3>
                  <p className="text-sm text-muted-foreground">{t('auth.signup.otpSent')}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="otp" className="sr-only">OTP Code</Label>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-center">
                    <InputOTP
                      ref={otpRef}
                      maxLength={6}
                      value={formData.otp}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        otp: value
                      }))}
                      disabled={otpVerified || !otpSent}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button onClick={handleVerifyOTP} variant={otpVerified ? "outline" : "primary"} size="sm" disabled={otpVerified || !formData.otp || !otpSent} className="w-full">
                    {otpVerified ? "Done ✓" : t('auth.signup.verify')}
                  </Button>
                </div>
                {errors.otp && <p className="text-sm text-destructive flex items-center gap-1 justify-center">{errors.otp}</p>}
              </div>
            </WidgetCard>}

          {/* Step 3: Email & Final Setup */}
          {otpVerified && <WidgetCard className="transition-all duration-300 animate-slide-up ring-2 ring-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{t('profile.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('profile.subtitle')}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">{t('auth.signup.email')}</Label>
                  <Input id="email" type="email" placeholder={t('auth.signup.email')} value={formData.email} onChange={e => setFormData(prev => ({
                ...prev,
                email: e.target.value
              }))} className={errors.email ? "border-destructive" : ""} disabled={!otpVerified} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox id="syncUpiCards" checked={formData.syncUpiCards} onCheckedChange={checked => setFormData(prev => ({
                  ...prev,
                  syncUpiCards: !!checked
                }))} disabled={!otpVerified} className="mt-0.5" />
                    <div className="space-y-1">
                      <Label htmlFor="syncUpiCards" className="text-sm font-medium leading-none">
                        {t('auth.signup.syncAccounts')}
                      </Label>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t('auth.signup.syncAccounts')}
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleOnboard} className="w-full" variant="primary" size="lg" disabled={!formData.email || !otpVerified}>
                  {t('auth.signup.createAccount')}
                </Button>
              </div>
            </WidgetCard>}

          {/* Sign In Link */}
          <div className="text-center pt-4">
            <p className="body-sm text-muted-foreground">
              {t('auth.signup.alreadyHaveAccount')}{" "}
              <button type="button" onClick={() => router.push("/login")} className="text-primary font-medium hover:underline transition-colors">
                {t('auth.signup.signIn')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>;
}