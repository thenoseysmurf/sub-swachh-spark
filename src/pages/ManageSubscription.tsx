import { useState } from "react";
import { useParams } from "react-router-dom";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { 
  Calendar, 
  CreditCard, 
  Pause, 
  XCircle, 
  ExternalLink,
  AlertTriangle,
  History,
  Shield
} from "lucide-react";

const mockSubscription = {
  id: 1,
  name: "Netflix",
  plan: "Premium Plan",
  amount: 199,
  nextRenewal: "2024-08-20",
  lastRenewal: "2024-07-20",
  paymentMethod: "SBI Card ****1234",
  mandateId: "NETFLIX_12345",
  category: "OTT",
  description: "Video streaming service",
  website: "netflix.com",
  history: [
    { date: "2024-07-20", amount: 199, status: "paid" },
    { date: "2024-06-20", amount: 199, status: "paid" },
    { date: "2024-05-20", amount: 199, status: "paid" }
  ]
};

export default function ManageSubscription() {
  const { id } = useParams();
  const router = useRouter();
  const [actionType, setActionType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: string) => {
    setActionType(action);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (action === "guided_cancel") {
        // Navigate to instruction page
        router.push(`/cancellation-instructions/${id}`);
      } else {
        // For pause/cancel, go directly to confirmation
        router.push("/action-confirmation");
      }
    }, 1500);
  };

  const reportIssue = () => {
    // For demo, just show success
    alert("Issue reported successfully. Our team will help you cancel this subscription.");
  };

  return (
    <MobileLayout 
      title="Manage Subscription" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Subscription Header */}
        <WidgetCard className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-600 rounded-xl mx-auto flex items-center justify-center text-white text-2xl font-bold">
            N
          </div>
          <div>
            <h2 className="heading-lg">{mockSubscription.name}</h2>
            <p className="text-muted-foreground">{mockSubscription.plan}</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-3">
            <p className="text-2xl font-bold text-primary">₹{mockSubscription.amount}</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </div>
        </WidgetCard>

        {/* Subscription Details */}
        <WidgetCard className="space-y-4">
          <h3 className="heading-sm">Subscription Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Next Renewal</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(mockSubscription.nextRenewal).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">{mockSubscription.paymentMethod}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Mandate ID</p>
                <p className="text-sm text-muted-foreground font-mono">{mockSubscription.mandateId}</p>
              </div>
            </div>
          </div>
        </WidgetCard>

        {/* Action Message */}
        <div className="text-center">
          <p className="body-lg text-muted-foreground">
            Make your move — pause or cancel in a tap.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => handleAction("pause")}
            disabled={isLoading}
          >
            <Pause className="h-5 w-5 mr-3" />
            Pause Subscription
            <span className="ml-auto text-sm text-muted-foreground">Resume anytime</span>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground" 
            size="lg"
            onClick={() => handleAction("cancel")}
            disabled={isLoading}
          >
            <XCircle className="h-5 w-5 mr-3" />
            Cancel Subscription
            <span className="ml-auto text-sm">Instant</span>
          </Button>

          <Button 
            variant="primary" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => handleAction("guided_cancel")}
            disabled={isLoading}
          >
            <ExternalLink className="h-5 w-5 mr-3" />
            Guided Cancellation
            <span className="ml-auto text-sm">Via Netflix app</span>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={reportIssue}
            disabled={isLoading}
          >
            <AlertTriangle className="h-5 w-5 mr-3" />
            Report Issue
            <span className="ml-auto text-sm text-muted-foreground">Get help</span>
          </Button>
        </div>

        {/* Payment History */}
        <WidgetCard className="space-y-4">
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <h3 className="heading-sm">Recent Payments</h3>
          </div>
          
          <div className="space-y-3">
            {mockSubscription.history.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">₹{payment.amount}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 text-xs bg-success-light text-success-foreground rounded-full">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
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