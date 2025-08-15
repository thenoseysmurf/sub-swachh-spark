import { MobileLayout } from "@/components/ui/mobile-layout";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/widget-card";
import { useRouter } from "@/hooks/useRouter";
import { useParams } from "react-router-dom";
import { Film, Heart, GraduationCap, Tag, Play, Music, Dumbbell, BookOpen, Coffee, ShoppingBag } from "lucide-react";

const categoriesData = {
  1: {
    name: "Entertainment",
    icon: Film,
    apps: [
      {
        name: "Netflix",
        icon: "N",
        amount: 199,
        purchaseDate: "10th Aug",
        lastActiveDate: "14th Aug 2025",
        status: "active"
      },
      {
        name: "Prime Video", 
        icon: "P",
        amount: 1499,
        purchaseDate: "1st Apr 2025",
        lastActiveDate: "1st July 2025",
        status: "inactive"
      }
    ]
  },
  2: {
    name: "Fitness",
    icon: Heart,
    apps: [
      {
        name: "Nike Training",
        icon: "N",
        amount: 299,
        purchaseDate: "15th Mar",
        lastActiveDate: "20th Aug 2025",
        status: "active"
      },
      {
        name: "MyFitnessPal",
        icon: "M",
        amount: 199,
        purchaseDate: "1st Jan 2025",
        lastActiveDate: "10th Aug 2025",
        status: "active"
      }
    ]
  },
  3: {
    name: "Education",
    icon: GraduationCap,
    apps: [
      {
        name: "Skillshare",
        icon: "S",
        amount: 299,
        purchaseDate: "5th Feb",
        lastActiveDate: "12th Aug 2025",
        status: "active"
      },
      {
        name: "Coursera",
        icon: "C",
        amount: 399,
        purchaseDate: "20th Jan 2025",
        lastActiveDate: "15th July 2025",
        status: "inactive"
      }
    ]
  },
  4: {
    name: "Others",
    icon: Tag,
    apps: [
      {
        name: "Zomato Pro",
        icon: "Z",
        amount: 299,
        purchaseDate: "1st Mar",
        lastActiveDate: "18th Aug 2025",
        status: "active"
      },
      {
        name: "Amazon Prime",
        icon: "A",
        amount: 199,
        purchaseDate: "10th Feb 2025",
        lastActiveDate: "16th Aug 2025",
        status: "active"
      }
    ]
  }
};

export default function CategoryDetail() {
  const router = useRouter();
  const { categoryId } = useParams();
  
  const category = categoriesData[parseInt(categoryId || "1") as keyof typeof categoriesData];
  
  if (!category) {
    return (
      <MobileLayout title="Category Not Found" onBack={() => router.back()}>
        <div className="px-4 pt-8 text-center">
          <p className="text-muted-foreground">Category not found</p>
        </div>
      </MobileLayout>
    );
  }

  const Icon = category.icon;

  return (
    <MobileLayout title="Analytics" onBack={() => router.back()}>
      <div className="px-4 pt-2 pb-8 space-y-6">
        {/* Category Header */}
        <WidgetCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <Icon className="h-5 w-5 text-background" />
              </div>
              <h2 className="text-lg font-semibold">{category.name}</h2>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Spends</Button>
              <Button variant="outline" size="sm">Savings</Button>
            </div>
          </div>
        </WidgetCard>

        {/* Apps Table */}
        <WidgetCard className="p-0">
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-border bg-muted/20">
              <div className="text-sm font-medium text-muted-foreground">App</div>
              <div className="text-sm font-medium text-muted-foreground">Subscription Amount</div>
              <div className="text-sm font-medium text-muted-foreground">Purchase Date</div>
              <div className="text-sm font-medium text-muted-foreground">Last Active Date</div>
            </div>
            
            {/* Table Rows */}
            {category.apps.map((app, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-background">{app.icon}</span>
                  </div>
                  <span className="text-sm font-medium truncate">{app.name}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm font-medium">₹ {app.amount}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">{app.purchaseDate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{app.lastActiveDate}</span>
                  <div className={`w-2 h-2 rounded-full ${app.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </MobileLayout>
  );
}