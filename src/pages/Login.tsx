import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { useRouter } from "@/hooks/useRouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { WidgetCard } from "@/components/ui/widget-card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function Login() {
  const router = useRouter();
  const { t } = useLanguage();
  const [pin, setPin] = useState("");

  const handleKeypadPress = (value: string) => {
    if (value === "delete") {
      setPin(prev => prev.slice(0, -1));
    } else if (value === "submit") {
      if (pin.length === 4) {
        // Simulate PIN verification
        router.push("/dashboard");
      }
    } else if (pin.length < 4) {
      setPin(prev => prev + value);
    }
  };

  return (
    <MobileLayout showBackButton={false}>
      <div className="px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="heading-xl text-primary">{t('auth.login.title')}</h1>
          <p className="body-lg text-muted-foreground">{t('auth.login.subtitle')}</p>
        </div>

        {/* PIN Form */}
        <WidgetCard className="space-y-6">
          <div className="text-center space-y-4">
            <p className="body-lg text-foreground">Hi, Onkar Bhagwan Jadhav</p>
            <p className="body-sm text-muted-foreground">Enter your PIN</p>
            
            {/* PIN Input */}
            <div className="flex justify-center">
              <InputOTP 
                maxLength={4} 
                value={pin}
                onChange={setPin}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 border-2 rounded-lg bg-background/50" />
                  <InputOTPSlot index={1} className="w-12 h-12 border-2 rounded-lg bg-background/50 ml-2" />
                  <InputOTPSlot index={2} className="w-12 h-12 border-2 rounded-lg bg-background/50 ml-2" />
                  <InputOTPSlot index={3} className="w-12 h-12 border-2 rounded-lg bg-background/50 ml-2" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeypadPress(num.toString())}
                className="h-14 w-14 rounded-full bg-background/10 hover:bg-background/20 text-xl font-medium text-foreground transition-colors mx-auto"
              >
                {num}
              </button>
            ))}
            
            {/* Bottom row */}
            <button
              type="button"
              onClick={() => handleKeypadPress("delete")}
              className="h-14 w-14 rounded-full bg-background/10 hover:bg-background/20 text-foreground transition-colors mx-auto flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleKeypadPress("0")}
              className="h-14 w-14 rounded-full bg-background/10 hover:bg-background/20 text-xl font-medium text-foreground transition-colors mx-auto"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleKeypadPress("submit")}
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors mx-auto flex items-center justify-center"
              disabled={pin.length !== 4}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
          
          <div className="text-center">
            <button type="button" className="text-sm text-primary underline">
              Forgot PIN?
            </button>
          </div>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}