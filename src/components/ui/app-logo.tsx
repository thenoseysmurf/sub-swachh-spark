import { cn } from "@/lib/utils";
import netflixLogo from "@/assets/logos/netflix.png";
import spotifyLogo from "@/assets/logos/spotify.png";
import zomatoLogo from "@/assets/logos/zomato.png";
import adobeLogo from "@/assets/logos/adobe.png";
import disneyLogo from "@/assets/logos/disney-hotstar.png";
import gymLogo from "@/assets/logos/gym.png";
import primeVideoLogo from "@/assets/logos/prime-video.png";
import youtubePremiumLogo from "@/assets/logos/youtube-premium.png";
import nikeTrainingLogo from "@/assets/logos/nike-training.png";
import myFitnessPalLogo from "@/assets/logos/myfitnesspal.png";
import headspaceLogo from "@/assets/logos/headspace.png";
import skillshareLogo from "@/assets/logos/skillshare.png";
import courseraLogo from "@/assets/logos/coursera.png";
import duolingoLogo from "@/assets/logos/duolingo.png";
import amazonPrimeLogo from "@/assets/logos/amazon-prime.png";
import { Music, Tv, Coffee, Palette, Dumbbell, Star, Play, Heart, BookOpen, GraduationCap, ShoppingBag } from "lucide-react";

interface AppLogoProps {
  appName: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const logoMap: Record<string, string> = {
  "Netflix": netflixLogo,
  "Spotify Premium": spotifyLogo,
  "Spotify": spotifyLogo,
  "Zomato Pro": zomatoLogo,
  "Zomato": zomatoLogo,
  "Adobe Creative Cloud": adobeLogo,
  "Adobe": adobeLogo,
  "Disney+ Hotstar": disneyLogo,
  "Disney": disneyLogo,
  "Gym Membership": gymLogo,
  "Gym": gymLogo,
  "Prime Video": primeVideoLogo,
  "YouTube Premium": youtubePremiumLogo,
  "Nike Training": nikeTrainingLogo,
  "MyFitnessPal": myFitnessPalLogo,
  "Headspace": headspaceLogo,
  "Skillshare": skillshareLogo,
  "Coursera": courseraLogo,
  "Duolingo": duolingoLogo,
  "Amazon Prime": amazonPrimeLogo,
};

const iconMap: Record<string, any> = {
  "Netflix": Tv,
  "Spotify Premium": Music,
  "Spotify": Music,
  "Zomato Pro": Coffee,
  "Zomato": Coffee,
  "Adobe Creative Cloud": Palette,
  "Adobe": Palette,
  "Disney+ Hotstar": Tv,
  "Disney": Tv,
  "Gym Membership": Dumbbell,
  "Gym": Dumbbell,
  "Prime Video": Play,
  "YouTube Premium": Play,
  "Nike Training": Dumbbell,
  "MyFitnessPal": Heart,
  "Headspace": Heart,
  "Skillshare": BookOpen,
  "Coursera": GraduationCap,
  "Duolingo": BookOpen,
  "Amazon Prime": ShoppingBag,
};

export function AppLogo({ appName, className, size = "md" }: AppLogoProps) {
  const logo = logoMap[appName];
  const IconComponent = iconMap[appName] || Star;
  
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  if (logo) {
    return (
      <img 
        src={logo} 
        alt={`${appName} logo`}
        className={cn(
          sizeClasses[size],
          "rounded-lg object-contain",
          className
        )}
      />
    );
  }

  // Fallback to icon if no logo is available
  return (
    <div className={cn(
      sizeClasses[size],
      "rounded-lg bg-secondary flex items-center justify-center",
      className
    )}>
      <IconComponent className="h-4 w-4 text-secondary-foreground" />
    </div>
  );
}