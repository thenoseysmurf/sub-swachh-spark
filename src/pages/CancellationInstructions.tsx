import { MobileLayout } from "@/components/ui/mobile-layout";
import { WidgetCard } from "@/components/ui/widget-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { 
  ExternalLink, 
  CheckCircle, 
  Smartphone, 
  Globe,
  MessageCircle
} from "lucide-react";

export default function CancellationInstructions() {
  const router = useRouter();

  const openNetflixApp = () => {
    window.open("https://netflix.com/cancelplan", "_blank");
  };

  return (
    <MobileLayout 
      title="Cancellation Guide" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <WidgetCard className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-600 rounded-xl mx-auto flex items-center justify-center text-white text-2xl font-bold">
            N
          </div>
          <div>
            <h2 className="heading-lg">Cancel Netflix</h2>
            <p className="text-muted-foreground">Follow these simple steps</p>
          </div>
        </WidgetCard>

        {/* Instructions */}
        <div className="space-y-4">
          <h3 className="heading-sm">How to Cancel Your Subscription</h3>
          
          {/* Method 1: Mobile App */}
          <WidgetCard className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Via Netflix App</h4>
              </div>
            </div>
            <div className="pl-11 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Open the Netflix app on your phone</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Tap your profile icon in the top right</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Select "Account" from the menu</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Scroll down and tap "Cancel Membership"</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Confirm your cancellation</span>
              </div>
            </div>
          </WidgetCard>

          {/* Method 2: Website */}
          <WidgetCard className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Via Netflix Website</h4>
              </div>
            </div>
            <div className="pl-11 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Go to netflix.com and sign in</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Click your profile icon and select "Account"</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Under "Membership & Billing", click "Cancel Membership"</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Follow the prompts to complete cancellation</span>
              </div>
            </div>
          </WidgetCard>

          {/* Important Notes */}
          <WidgetCard className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <div className="space-y-3">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200">Important Notes</h4>
              <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                <li>• You can continue watching until your current billing period ends</li>
                <li>• No cancellation fees apply</li>
                <li>• You can reactivate anytime by signing in</li>
                <li>• Your viewing history and preferences will be saved</li>
              </ul>
            </div>
          </WidgetCard>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="primary" 
            className="w-full justify-start" 
            size="lg"
            onClick={openNetflixApp}
          >
            <ExternalLink className="h-5 w-5 mr-3" />
            Open Netflix to Cancel
            <span className="ml-auto text-sm">Direct link</span>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start" 
            size="lg"
            onClick={() => router.push("/action-confirmation")}
          >
            <MessageCircle className="h-5 w-5 mr-3" />
            I've Cancelled My Subscription
            <span className="ml-auto text-sm text-muted-foreground">Confirm</span>
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}