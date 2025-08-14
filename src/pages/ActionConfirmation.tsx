import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { CheckCircle2, TrendingUp, Undo2 } from "lucide-react";

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

  const handleUndo = () => {
    // Simulate undo action
    alert("Subscription restored successfully!");
    router.push("/dashboard");
  };

  return (
    <MobileLayout 
      title="Action Complete" 
      showBackButton={false}
    >
      <div className="px-4 py-8 space-y-6">
        {/* Success Message */}
        <WidgetCard variant="savings" className="text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 mx-auto" />
          <div>
            <h2 className="heading-xl mb-2">Nice! 🎉</h2>
            <p className="body-lg">
              You've successfully {actionData.type} your {actionData.serviceName} subscription.
            </p>
          </div>
        </WidgetCard>

        {/* Savings Widget */}
        <WidgetCard variant="gradient" className="text-center space-y-4">
          <TrendingUp className="h-12 w-12 mx-auto opacity-90" />
          <div>
            <h3 className="heading-lg mb-2">Annual Savings</h3>
            <p className="text-3xl font-bold">₹{actionData.annualSavings.toLocaleString()}</p>
            <p className="text-sm opacity-90 mt-1">
              That's ₹{actionData.monthlyAmount} saved every month!
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
                    <p className="font-medium">Service Access</p>
                    <p className="text-sm text-muted-foreground">
                      You can continue using Netflix until your current billing period ends.
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
                    <p className="font-medium">Subscription Paused</p>
                    <p className="text-sm text-muted-foreground">
                      Your service is temporarily paused. Resume anytime from your dashboard.
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

        {/* Action Buttons */}
        <div className="space-y-3">
          {actionData.canUndo && (
            <Button 
              variant="outline" 
              className="w-full" 
              size="lg"
              onClick={handleUndo}
            >
              <Undo2 className="h-4 w-4 mr-2" />
              Undo {actionData.type === "cancelled" ? "Cancellation" : "Pause"}
            </Button>
          )}

          <Button 
            variant="primary" 
            className="w-full" 
            size="lg"
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Tips */}
        <WidgetCard className="bg-primary/5 border-primary/20">
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">💡 Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
              Keep track of your savings! You can view your total savings and spending trends in the Analytics section.
            </p>
          </div>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}