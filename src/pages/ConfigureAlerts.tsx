import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "@/hooks/useRouter";
import { WidgetCard } from "@/components/ui/widget-card";
import { Check, Bell, MessageSquare, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const alertDays = [
  { value: 7, label: "7 days before" },
  { value: 5, label: "5 days before" },
  { value: 2, label: "2 days before" },
  { value: 1, label: "1 day before" }
];

const channels = [
  { id: "push", label: "Push Notifications", icon: Bell },
  { id: "sms", label: "SMS", icon: MessageSquare },
  { id: "email", label: "Email", icon: Mail }
];

export default function ConfigureAlerts() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    alertDays: [7, 2], // Pre-selected defaults
    channels: ["push"], // Default to push only
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00"
    }
  });

  const toggleAlertDay = (day: number) => {
    setSettings(prev => ({
      ...prev,
      alertDays: prev.alertDays.includes(day)
        ? prev.alertDays.filter(d => d !== day)
        : [...prev.alertDays, day].sort((a, b) => b - a)
    }));
  };

  const toggleChannel = (channelId: string) => {
    setSettings(prev => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter(c => c !== channelId)
        : [...prev.channels, channelId]
    }));
  };

  const handleSave = () => {
    // Show success toast
    toast({
      title: "Settings saved!",
      description: "Your alert preferences have been configured.",
      variant: "default"
    });

    // Navigate to dashboard after short delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <MobileLayout 
      title="Smart Alerts" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <p className="body-lg text-muted-foreground">
            We'll nudge you before renewals — you stay in control.
          </p>
        </div>

        <WidgetCard className="space-y-6">
          <div className="text-center">
            <h2 className="heading-lg">Configure Alerts</h2>
            <p className="body-sm text-muted-foreground mt-1">
              Stay informed about upcoming renewals
            </p>
          </div>

          {/* Alert Timing */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Pre-renewal Alerts</Label>
              <p className="text-sm text-muted-foreground">
                When should we remind you before renewals?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {alertDays.map((day) => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleAlertDay(day.value)}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all text-center
                    ${settings.alertDays.includes(day.value)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                    }
                  `}
                >
                  {settings.alertDays.includes(day.value) && (
                    <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                  )}
                  <p className="text-sm font-medium">{day.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Alert Channels */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Alert Channels</Label>
              <p className="text-sm text-muted-foreground">
                How should we notify you?
              </p>
            </div>

            <div className="space-y-3">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => toggleChannel(channel.id)}
                    className={`
                      w-full flex items-center space-x-3 p-4 rounded-lg border-2 transition-all
                      ${settings.channels.includes(channel.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="flex-1 text-left font-medium">{channel.label}</span>
                    {settings.channels.includes(channel.id) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Quiet Hours</Label>
                <p className="text-sm text-muted-foreground">
                  Pause notifications during these hours
                </p>
              </div>
              <Switch
                checked={settings.quietHours.enabled}
                onCheckedChange={(enabled) => 
                  setSettings(prev => ({
                    ...prev,
                    quietHours: { ...prev.quietHours, enabled }
                  }))
                }
              />
            </div>

            {settings.quietHours.enabled && (
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {settings.quietHours.start} - {settings.quietHours.end}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    No alerts during these hours
                  </p>
                </div>
              </div>
            )}
          </div>

          <Button onClick={handleSave} className="w-full" variant="primary" size="lg">
            Save Settings
          </Button>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}