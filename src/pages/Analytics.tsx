import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { 
  Film,
  Heart,
  GraduationCap,
  Tag,
  Plus,
  X
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Entertainment",
    icon: Film,
    spends: 2340,
    savings: 890,
    periods: [true, true, false, true] // representing 4 time periods
  },
  {
    id: 2,
    name: "Fitness",
    icon: Heart,
    spends: 1250,
    savings: 450,
    periods: [false, true, true, false]
  },
  {
    id: 3,
    name: "Education",
    icon: GraduationCap,
    spends: 980,
    savings: 320,
    periods: [true, false, true, true]
  },
  {
    id: 4,
    name: "Others",
    icon: Tag,
    spends: 750,
    savings: 180,
    periods: [false, false, true, false]
  }
];

export default function Analytics() {
  const router = useRouter();
  
  const totalSpends = categories.reduce((sum, cat) => sum + cat.spends, 0);
  const totalSavings = categories.reduce((sum, cat) => sum + cat.savings, 0);

  return (
    <MobileLayout 
      title="Analytics" 
      onBack={() => router.back()}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Top Widgets */}
        <div className="grid grid-cols-2 gap-4">
          <WidgetCard variant="gradient" className="text-center py-4">
            <p className="text-sm opacity-90 mb-1">Total Spends (monthly)</p>
            <p className="text-xl font-bold">₹{totalSpends.toLocaleString()}</p>
          </WidgetCard>
          
          <WidgetCard variant="savings" className="text-center py-4">
            <p className="text-sm opacity-90 mb-1">Potential Savings (annually)</p>
            <p className="text-xl font-bold">₹{(totalSavings * 12).toLocaleString()}</p>
          </WidgetCard>
        </div>

        {/* Category Sections */}
        <div className="space-y-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <WidgetCard key={category.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Spends
                    </Button>
                    <Button variant="outline" size="sm">
                      Savings
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    {category.periods.map((active, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 border-2 border-muted-foreground rounded ${
                          active ? 'bg-primary' : 'bg-background'
                        } flex items-center justify-center`}
                      >
                        {!active && <X className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    ))}
                    <button className="w-6 h-6 border-2 border-muted-foreground rounded bg-background flex items-center justify-center hover:bg-muted">
                      <Plus className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </WidgetCard>
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
}