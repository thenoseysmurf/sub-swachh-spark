import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/hooks/useRouter";
import { WidgetCard } from "@/components/ui/widget-card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    pin: ""
  });
  const [loginType, setLoginType] = useState<"password" | "otp">("password");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleKeypadPress = (value: string) => {
    if (value === "delete") {
      setFormData(prev => ({ ...prev, pin: prev.pin.slice(0, -1) }));
    } else if (value === "submit") {
      if (formData.pin.length === 4) {
        handleSubmit(new Event("submit") as any);
      }
    } else if (formData.pin.length < 4) {
      setFormData(prev => ({ ...prev, pin: prev.pin + value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.identifier) newErrors.identifier = "Mobile number or email is required";
    if (loginType === "password" && !formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call
    if (loginType === "otp") {
      // OTP login always goes to mobile verification
      router.push("/verify-mobile");
    } else {
      // Password login - check if user has linked sources
      // For demo: if mobile is 8888888888, user has sources (go to dashboard)
      // Otherwise go to verification
      if (formData.identifier === "8888888888") {
        router.push("/dashboard");
      } else {
        router.push("/verify-mobile");
      }
    }
  };

  return (
    <MobileLayout showBackButton={false}>
      <div className="px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="heading-xl text-primary">Welcome Back!</h1>
          <p className="body-lg text-muted-foreground">Let's get you back in control.</p>
        </div>

        {/* Form */}
        <WidgetCard className="space-y-6">
          <div className="text-center">
            <h2 className="heading-lg">Sign In</h2>
            <p className="body-sm text-muted-foreground mt-1">Access your subscription dashboard</p>
          </div>

          {/* Login Type Toggle */}
          <div className="flex rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => setLoginType("password")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                loginType === "password" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground"
              }`}
            >
              4 digit PIN/FACE ID
            </button>
            <button
              type="button"
              onClick={() => setLoginType("otp")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                loginType === "otp" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground"
              }`}
            >
              OTP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Mobile Number or Email</Label>
              <Input
                id="identifier"
                placeholder="Enter mobile number or email"
                value={formData.identifier}
                onChange={(e) => setFormData(prev => ({ ...prev, identifier: e.target.value }))}
                className={errors.identifier ? "border-destructive" : ""}
              />
              {errors.identifier && <p className="text-sm text-destructive">{errors.identifier}</p>}
            </div>

            {loginType === "password" && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="body-lg text-foreground">Hi, {formData.identifier || "User"}</p>
                  <p className="body-sm text-muted-foreground">Enter your PIN</p>
                  
                  {/* PIN Input */}
                  <div className="flex justify-center">
                    <InputOTP 
                      maxLength={4} 
                      value={formData.pin}
                      onChange={(value) => setFormData(prev => ({ ...prev, pin: value }))}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
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
                    disabled={formData.pin.length !== 4}
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
              </div>
            )}

            <Button type="submit" className="w-full" variant="primary" size="lg">
              {loginType === "otp" ? "Send OTP" : "Sign In"}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <p className="body-sm text-muted-foreground">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={() => router.push("/signup")}
                className="text-primary font-medium underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}
