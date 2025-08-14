import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "@/hooks/useRouter";
import { WidgetCard } from "@/components/ui/widget-card";
import { Check } from "lucide-react";

const categories = [
  { id: "ott", label: "OTT Platforms", icon: "🎬" },
  { id: "fitness", label: "Fitness & Health", icon: "💪" },
  { id: "cloud", label: "Cloud Storage", icon: "☁️" },
  { id: "edtech", label: "Education", icon: "📚" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "productivity", label: "Productivity", icon: "⚡" },
  { id: "news", label: "News & Media", icon: "📰" }
];


export default function ProfileSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "John Doe", // Pre-filled from signup
    age: "",
    city: "",
    categories: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.city) newErrors.city = "City is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Continue to alerts configuration
    router.push("/configure-alerts");
  };

  return (
    <MobileLayout 
      title="Profile Setup" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <p className="body-lg text-muted-foreground">
            Let's personalize your savings journey.
          </p>
        </div>

        <WidgetCard className="space-y-6">
          <div className="text-center">
            <h2 className="heading-lg">Tell Us About Yourself</h2>
            <p className="body-sm text-muted-foreground mt-1">
              We'll customize recommendations for you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
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

            {/* Categories */}
            <div className="space-y-4">
              <div>
                <Label>Subscription Categories of Interest</Label>
                <p className="text-sm text-muted-foreground">
                  Select categories you're interested in (optional)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`
                      relative p-4 rounded-lg border-2 transition-all text-left
                      ${formData.categories.includes(category.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                      }
                    `}
                  >
                    {formData.categories.includes(category.id) && (
                      <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                    )}
                    <div className="text-lg mb-1">{category.icon}</div>
                    <p className="text-sm font-medium">{category.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" variant="primary" size="lg">
              Save & Continue
            </Button>
          </form>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}