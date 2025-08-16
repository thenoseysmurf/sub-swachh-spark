import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "@/hooks/useRouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { WidgetCard } from "@/components/ui/widget-card";
import { Check } from "lucide-react";



export default function ProfileSetup() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "Nish Calmers", // Pre-filled from signup
    age: "25",
    city: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.city) newErrors.city = "City is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save profile data to localStorage
    localStorage.setItem("userProfile", JSON.stringify(formData));

    // Continue to alerts configuration
    router.push("/configure-alerts");
  };

  return (
    <MobileLayout 
      title={t('profile.title')} 
      onBack={() => router.back()}
      showBottomNav={false}
    >
      <div className="px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <p className="body-lg text-muted-foreground">
            {t('profile.subtitle')}
          </p>
        </div>

        <WidgetCard className="space-y-6">
          <div className="text-center">
            <h2 className="heading-lg">{t('profile.title')}</h2>
            <p className="body-sm text-muted-foreground mt-1">
              {t('profile.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('profile.name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">{t('profile.age')}</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="25"
                    className={errors.age ? "border-destructive" : ""}
                  />
                  {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Mumbai"
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                </div>
              </div>

            </div>


            <Button type="submit" className="w-full" variant="primary" size="lg">
              {t('common.continue')}
            </Button>
          </form>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}