import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/hooks/useRouter";
import { WidgetCard } from "@/components/ui/widget-card";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  });
  const [loginType, setLoginType] = useState<"password" | "otp">("password");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                
                <div className="text-right">
                  <button type="button" className="text-sm text-primary underline">
                    Forgot Password?
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
