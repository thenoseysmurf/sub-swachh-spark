import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { CheckCircle2, TrendingUp } from "lucide-react";

export default function ActionConfirmation() {
  const router = useRouter();

  // Mock data - in real app, this would come from the previous action
  const actionData = {
    type: "cancelled", // or "paused"
    serviceName: "Netflix",
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
        <WidgetCard variant="savings" className="text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 mx-auto" />
          <div>
            <h2 className="heading-xl mb-2">
              {actionData.type === "cancelled" ? "Subscription Cancelled! 🎉" : "Subscription Paused! ⏸️"}
            </h2>
            <p className="body-lg">
              {actionData.type === "cancelled" 
                ? `Your ${actionData.serviceName} subscription has been cancelled successfully.`
                : `Your ${actionData.serviceName} subscription is now paused. Resume anytime!`
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
                    <p className="font-medium">Access Until Billing End</p>
                    <p className="text-sm text-muted-foreground">
                      Continue using {actionData.serviceName} until your current billing period ends.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">No More Charges</p>
                    <p className="text-sm text-muted-foreground">
                      Your payment method will not be charged from next billing cycle.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Service Temporarily Paused</p>
                    <p className="text-sm text-muted-foreground">
                      {actionData.serviceName} access is paused. Resume anytime from your subscriptions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Billing Paused</p>
                    <p className="text-sm text-muted-foreground">
                      No charges while subscription is paused.
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