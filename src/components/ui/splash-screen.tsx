import React, { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showScreen, setShowScreen] = useState(true);
  const appName = "PocketWise";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScreen(false);
      setTimeout(onComplete, 500); // Allow fade out animation to complete
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-background transition-opacity duration-500 ${showScreen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Money Bill Watermark Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <DollarSign 
              className="w-16 h-16 text-success rotate-12 opacity-30" 
              style={{ 
                transform: `rotate(${Math.random() * 45 - 22.5}deg) scale(${0.8 + Math.random() * 0.4})` 
              }} 
            />
          </div>
        ))}
      </div>

      {/* Animated App Name */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center space-x-1">
          {appName.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block text-6xl font-bold text-foreground animate-bounce-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '0.8s',
                backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--success)))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        
        {/* Subtitle */}
        <p className="mt-4 text-muted-foreground animate-fade-in" style={{ animationDelay: '1.5s' }}>
          Smart Money Management
        </p>
        
        {/* Loading indicator */}
        <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-1 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};