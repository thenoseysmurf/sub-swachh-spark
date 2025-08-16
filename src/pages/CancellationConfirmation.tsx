import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { AlertTriangle, ExternalLink } from "lucide-react";

// Mock subscription data - in real app this would come from API
const mockSubscription = {
  id: 1,
  name: "Netflix",
  plan: "Premium Plan", 
  amount: 199,
  yearlyAmount: 2388,
  nextRenewal: "2024-08-20",
  category: "OTT"
};

export default function CancellationConfirmation() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmCancellation = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to confirmation with cancellation success
      router.push(`/action-confirmation?action=cancelled&service=${mockSubscription.name}&savings=${mockSubscription.yearlyAmount}`);
    }, 1500);
  };

  const handleKeepSubscription = () => {
    router.push(`/subscription/${id}`);
  };

  const handleCancellationGuide = () => {
    router.push(`/cancellation-instructions/${id}`);
  };

  return (
    <MobileLayout title="Cancel Netflix?" onBack={() => router.back()} showBottomNav={false}>
      <div className="px-4 py-6 space-y-6">
        
        {/* Warning Message */}
        <WidgetCard className="bg-destructive/10 border-destructive/20">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="font-semibold text-destructive">Are you sure?</p>
              <p className="text-sm text-muted-foreground">
                You'll lose access to Netflix immediately and your data might be deleted.
              </p>
            </div>
          </div>
        </WidgetCard>

        {/* Subscription Info */}
        <WidgetCard className="text-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{mockSubscription.name}</h3>
              <p className="text-sm text-muted-foreground">₹{mockSubscription.amount}/month</p>
            </div>
          </div>
        </WidgetCard>

        {/* Confirmation Question */}
        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold">
            Do you want to cancel this subscription?
          </h2>

          <div className="space-y-3">
            {/* Yes, Cancel Button */}
            <Button 
              variant="destructive" 
              size="lg" 
              className="w-full h-14 text-base font-semibold"
              onClick={handleConfirmCancellation}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Yes, Cancel Subscription"}
            </Button>

            {/* No, Keep Button */}
            <Button 
              variant="secondary" 
              size="lg" 
              className="w-full h-12"
              onClick={handleKeepSubscription}
              disabled={isLoading}
            >
              No, Keep Subscription
            </Button>
          </div>
        </div>

        {/* Cancellation Guide Link */}
        <div className="pt-4 border-t border-border">
          <Button 
            variant="ghost" 
            className="w-full justify-center text-primary hover:text-primary-foreground"
            onClick={handleCancellationGuide}
            disabled={isLoading}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Cancellation Guide
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Need help? Follow the official cancellation guide
          </p>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <WidgetCard className="text-center p-6">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Processing your request...</p>
            </WidgetCard>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
