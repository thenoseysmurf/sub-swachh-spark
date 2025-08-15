import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { Zap } from "lucide-react";

const Index = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="px-6 py-16 flex flex-col items-center justify-center min-h-screen space-y-12">
        {/* App Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 flex items-center justify-center shadow-2xl">
            <Zap className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center text-white space-y-6 max-w-sm">
          <h1 className="text-4xl font-bold tracking-tight">
            Subscription<br />Swachh
          </h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Take control of your subscriptions.<br />
            Save thousands every year.
          </p>
        </div>

        {/* Savings Display */}
        <div className="text-center space-y-3">
          <div className="text-6xl font-bold text-green-400">
            ₹25,000+
          </div>
          <p className="text-white/80 text-lg">Average yearly savings</p>
        </div>

        {/* CTA Button */}
        <div className="w-full max-w-sm">
          <Button 
            onClick={() => router.push("/signup")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-2xl text-lg shadow-lg"
          >
            Get Started
          </Button>
        </div>

        {/* Trust Indicator */}
        <div className="text-center">
          <p className="text-white/70 text-sm">
            Trusted by 50,000+ users
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
