import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "@/hooks/useRouter";
import { WidgetCard } from "@/components/ui/widget-card";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    acceptTerms: false,
    acceptPrivacy: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.acceptTerms) newErrors.terms = "Please accept Terms & Conditions";
    if (!formData.acceptPrivacy) newErrors.privacy = "Please accept Privacy Policy";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call - check for duplicate
    if (formData.mobile === "9999999999") {
      setErrors({ mobile: "This mobile number is already registered" });
      return;
    }

    // Success - go to mobile verification
    router.push("/verify-mobile");
  };

  return (
    <MobileLayout showBackButton={false}>
      <div className="px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="heading-xl text-primary">Subscription Swachh</h1>
          <p className="body-lg text-muted-foreground">Start your subscription clean-up today!</p>
        </div>

        {/* Form */}
        <WidgetCard className="space-y-6">
          <div className="text-center">
            <h2 className="heading-lg">Create Account</h2>
            <p className="body-sm text-muted-foreground mt-1">Join thousands saving money monthly</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                className={errors.mobile ? "border-destructive" : ""}
                maxLength={10}
              />
              {errors.mobile && <p className="text-sm text-destructive">{errors.mobile}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, acceptTerms: !!checked }))
                  }
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I accept the{" "}
                  <button type="button" className="text-primary underline">
                    Terms & Conditions
                  </button>
                </Label>
              </div>
              {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, acceptPrivacy: !!checked }))
                  }
                />
                <Label htmlFor="privacy" className="text-sm leading-relaxed">
                  I accept the{" "}
                  <button type="button" className="text-primary underline">
                    Privacy Policy
                  </button>
                </Label>
              </div>
              {errors.privacy && <p className="text-sm text-destructive">{errors.privacy}</p>}
            </div>

            <Button type="submit" className="w-full" variant="primary" size="lg">
              Create Account
            </Button>
          </form>

          <div className="text-center">
            <p className="body-sm text-muted-foreground">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => router.push("/login")}
                className="text-primary font-medium underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}