import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { CheckCircle2, TrendingUp } from "lucide-react";

export default function ActionConfirmation() {
  const router = useRouter();

  // Get action type and service name from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const actionType = urlParams.get('action') || 'cancelled';
  const serviceName = urlParams.get('service') || 'Netflix';

  // Mock data - in real app, this would come from the previous action
  const actionData = {
    type: actionType === 'pause' ? 'paused' : 'cancelled',
    serviceName: serviceName,
    monthlyAmount: 199,
    annualSavings: 2388,
    canUndo: true
  };


  return (
    <MobileLayout 
      title="Action Complete" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-8 space-y-6">
        {/* Success Message */}
        <WidgetCard variant={actionData.type === "paused" ? "savings" : "savings"} className="text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 mx-auto" />
          <div>
            <h2 className="heading-xl mb-2">
              {actionData.type === "cancelled" ? "Subscription Cancelled! 🎉" : "Subscription Paused! ⏸️"}
            </h2>
            <p className="body-lg">
              {actionData.type === "cancelled" 
                ? `Your ${actionData.serviceName} subscription has been permanently cancelled.`
                : `Your ${actionData.serviceName} subscription is now temporarily paused.`
              }
            </p>
          </div>
        </WidgetCard>

        {/* Savings Widget */}
        <WidgetCard variant="gradient" className="text-center space-y-4">
          <TrendingUp className="h-12 w-12 mx-auto opacity-90" />
          <div>
            <h3 className="heading-lg mb-2">
              {actionData.type === "cancelled" ? "Money Saved" : "Savings While Paused"}
            </h3>
            <p className="text-3xl font-bold">₹{actionData.annualSavings.toLocaleString()}</p>
            <p className="text-sm opacity-90 mt-1">
              {actionData.type === "cancelled" 
                ? `No more ₹${actionData.monthlyAmount} monthly charges!`
                : `Saving ₹${actionData.monthlyAmount} per month while paused`
              }
            </p>
          </div>
        </WidgetCard>

        {/* Action Summary */}
        <WidgetCard className="space-y-4">
          <h3 className="heading-sm">What Happens Next?</h3>
          
          <div className="space-y-3">
            {actionData.type === "cancelled" ? (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Service Access Continues</p>
                    <p className="text-sm text-muted-foreground">
                      You can continue using {actionData.serviceName} until your current billing period ends.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Billing Cancelled</p>
                    <p className="text-sm text-muted-foreground">
                      Your payment method will no longer be charged for this subscription.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Service Paused</p>
                    <p className="text-sm text-muted-foreground">
                      {actionData.serviceName} access is temporarily suspended. Resume anytime.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Billing Paused</p>
                    <p className="text-sm text-muted-foreground">
                      No charges will occur while your subscription is paused.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </WidgetCard>

      </div>
    </MobileLayout>
  );
}