import { MobileLayout } from "@/components/ui/mobile-layout";
import { WidgetCard } from "@/components/ui/widget-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { ExternalLink, CheckCircle, Smartphone, Globe, MessageCircle } from "lucide-react";
export default function CancellationInstructions() {
  const router = useRouter();
  const openNetflixApp = () => {
    window.open("https://netflix.com/cancelplan", "_blank");
  };
  return <MobileLayout title="Cancellation Guide" onBack={() => router.back()}>
      <div className="px-4 py-3 space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto">
        {/* Header */}
        <WidgetCard className="text-center space-y-2">
          <div className="w-12 h-12 bg-red-600 rounded-lg mx-auto flex items-center justify-center text-white text-lg font-bold">
            N
          </div>
          <div>
            <h2 className="text-lg font-semibold">Cancel Netflix</h2>
            <p className="text-sm text-muted-foreground">Two quick methods</p>
          </div>
        </WidgetCard>

        {/* Instructions - Compact Grid */}
        <div className="grid grid-cols-1 gap-3">
          {/* Method 1: Mobile App */}
          <WidgetCard className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <Smartphone className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Netflix App</h4>
            </div>
            <div className="pl-8 space-y-1 text-xs text-muted-foreground">
              <p>• Profile icon → Account → Cancel Membership</p>
              <p>• Follow prompts to confirm cancellation</p>
            </div>
          </WidgetCard>

          {/* Method 2: Website */}
          <WidgetCard className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
              <Globe className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Netflix Website</h4>
            </div>
            <div className="pl-8 space-y-1 text-xs text-muted-foreground">
              <p>• Go to netflix.com → Account</p>
              <p>• Membership & Billing → Cancel Membership</p>
            </div>
          </WidgetCard>
        </div>

        {/* Important Notes - Compact */}
        <WidgetCard className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-amber-800 dark:text-amber-200">Key Points</h4>
            <div className="grid grid-cols-1 gap-1 text-xs text-amber-700 dark:text-amber-300">
              <p>• Continue watching until billing period ends</p>
              <p>• No cancellation fees • Reactivate anytime</p>
            </div>
          </div>
        </WidgetCard>

        {/* Action Button - Compact */}
        
      </div>
    </MobileLayout>;
}