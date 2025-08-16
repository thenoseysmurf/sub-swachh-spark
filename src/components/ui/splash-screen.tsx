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
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero relative overflow-hidden transition-opacity duration-500 ${showScreen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated Background Elements - Same as landing page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/20 rounded-full animate-float blur-3xl"></div>
        <div className="absolute top-1/2 -right-8 w-64 h-64 bg-success/20 rounded-full animate-float blur-3xl" style={{
          animationDelay: '1s'
        }}></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-primary-light/20 rounded-full animate-float blur-3xl" style={{
          animationDelay: '2s'
        }}></div>
      </div>

      {/* Money Bill Watermark Background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
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
              className="w-16 h-16 text-white rotate-12 opacity-20" 
              style={{ 
                transform: `rotate(${Math.random() * 45 - 22.5}deg) scale(${0.8 + Math.random() * 0.4})` 
              }} 
            />
          </div>
        ))}
      </div>

      {/* Animated App Name */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center space-x-1 flex-wrap">
          {appName.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block text-6xl font-bold text-white opacity-0 transform scale-75 animate-letter-reveal"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '0.8s',
                animationFillMode: 'forwards',
                backgroundImage: 'linear-gradient(135deg, #ffffff, hsl(var(--primary-light)))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        
        {/* Subtitle */}
        <p className="mt-6 text-white/80 text-lg font-light opacity-0 animate-fade-in" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
          Smart Money Management
        </p>
        
        {/* Loading indicator */}
        <div className="mt-8 flex justify-center opacity-0 animate-fade-in" style={{ animationDelay: '2.8s', animationFillMode: 'forwards' }}>
          <div className="w-12 h-1 bg-white/40 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-primary to-primary-light animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};