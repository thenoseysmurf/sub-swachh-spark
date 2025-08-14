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
    mobile: "",
    otp: "",
    email: "",
    syncUpiCards: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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
    router.push("/dashboard");
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

          {/* Mobile Number Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input 
                id="mobile" 
                type="tel" 
                placeholder="Enter 10-digit mobile number" 
                value={formData.mobile} 
                onChange={e => setFormData(prev => ({
                  ...prev,
                  mobile: e.target.value
                }))} 
                className={errors.mobile ? "border-destructive" : ""} 
                maxLength={10}
                disabled={otpSent}
              />
              {errors.mobile && <p className="text-sm text-destructive">{errors.mobile}</p>}
            </div>

            <Button 
              onClick={handleSendOTP} 
              className="w-full" 
              variant="primary" 
              size="lg"
              disabled={otpSent || !formData.mobile}
            >
              {otpSent ? "OTP Sent ✓" : "Send OTP"}
            </Button>
          </div>

          {/* OTP Section */}
          {otpSent && (
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input 
                  id="otp" 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  value={formData.otp} 
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    otp: e.target.value
                  }))} 
                  className={errors.otp ? "border-destructive" : ""} 
                  maxLength={6}
                  disabled={otpVerified}
                />
                {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
              </div>

              <Button 
                onClick={handleVerifyOTP} 
                className="w-full" 
                variant="primary" 
                size="lg"
                disabled={otpVerified || !formData.otp}
              >
                {otpVerified ? "Verification Done ✓" : "Submit"}
              </Button>
            </div>
          )}

          {/* Email Section */}
          {otpVerified && (
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email ID</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={formData.email} 
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))} 
                  className={errors.email ? "border-destructive" : ""} 
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="syncUpiCards" 
                    checked={formData.syncUpiCards} 
                    onCheckedChange={checked => setFormData(prev => ({
                      ...prev,
                      syncUpiCards: !!checked
                    }))} 
                  />
                  <Label htmlFor="syncUpiCards" className="text-sm leading-relaxed">
                    Sync my UPI ID & Cards to this account
                  </Label>
                </div>
              </div>

              <Button 
                onClick={handleOnboard} 
                className="w-full" 
                variant="primary" 
                size="lg"
                disabled={!formData.email}
              >
                Onboard me
              </Button>
            </div>
          )}

          <div className="text-center">
            <p className="body-sm text-muted-foreground">
              Already have an account?{" "}
              <button type="button" onClick={() => router.push("/login")} className="text-primary font-medium underline">
                Sign In
              </button>
            </p>
          </div>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}