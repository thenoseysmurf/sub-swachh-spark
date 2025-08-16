import { useState } from "react";
import { useParams } from "react-router-dom";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, CreditCard, Pause, XCircle, ExternalLink, AlertTriangle, Shield } from "lucide-react";
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
  history: [{
    date: "2024-07-20",
    amount: 199,
    status: "paid"
  }, {
    date: "2024-06-20",
    amount: 199,
    status: "paid"
  }, {
    date: "2024-05-20",
    amount: 199,
    status: "paid"
  }]
};
export default function ManageSubscription() {
  const {
    id
  } = useParams();
  const router = useRouter();
  const { t } = useLanguage();
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
      } else if (action === "cancel") {
        // Navigate to cancellation confirmation
        router.push(`/cancellation-confirmation/${id}`);
      } else {
        // For pause, go directly to confirmation with action type
        router.push(`/action-confirmation?action=${action}&service=${mockSubscription.name}`);
      }
    }, 1500);
  };
  const reportIssue = () => {
    // For demo, just show success
    alert("Issue reported successfully. Our team will help you cancel this subscription.");
  };
  return <MobileLayout title={t('manage.title')} onBack={() => router.back()} showBottomNav={true}>
      <div className="px-4 py-2 space-y-3">
        {/* Subscription Header */}
        <WidgetCard className="text-center space-y-2">
          <div className="w-10 h-10 bg-red-600 rounded-lg mx-auto flex items-center justify-center text-white font-bold">
            N
          </div>
          <div>
            <h2 className="text-lg font-bold">{mockSubscription.name}</h2>
            <p className="text-sm text-muted-foreground">{mockSubscription.plan}</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-2">
            <p className="text-xl font-bold text-primary">₹{mockSubscription.amount}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
        </WidgetCard>

        {/* Subscription Details */}
        <WidgetCard className="space-y-2">
          <h3 className="text-sm font-semibold">{t('manage.details')}</h3>
          
          <div className="space-y-1.5">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">{t('manage.nextBilling')}</p>
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
        

        {/* Action Buttons */}
        <div className="space-y-1.5">
          <Button variant="outline" className="w-full justify-between h-12" onClick={() => handleAction("pause")} disabled={isLoading}>
            <div className="flex items-center">
              <Pause className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">{t('manage.pauseSubscription')}</p>
                
              </div>
            </div>
          </Button>

          

          <Button variant="outline" className="w-full justify-between h-12 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleAction("cancel")} disabled={isLoading}>
            <div className="flex items-center">
              <XCircle className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">{t('manage.cancelSubscription')}</p>
                
              </div>
            </div>
          </Button>

          <Button variant="ghost" className="w-full justify-center h-10 text-muted-foreground hover:text-foreground" onClick={reportIssue} disabled={isLoading}>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Need help? Report an issue
          </Button>
        </div>


        {isLoading && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <WidgetCard className="text-center p-6">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Processing your request...</p>
            </WidgetCard>
          </div>}
      </div>
    </MobileLayout>;
}