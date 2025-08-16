import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Dashboard
    'dashboard.welcome': 'Hi, {name}! 👋',
    'dashboard.welcomeSubtitle': 'Welcome to your dashboard',
    'dashboard.monthlySpend': 'Monthly Spend',
    'dashboard.deadSpend': 'Dead Spend',
    'dashboard.subscriptions': 'subscriptions',
    'dashboard.inactiveSubscriptions': 'inactive subs',
    'dashboard.monthlySpendTrend': 'Monthly Spend Trend',
    'dashboard.yourSubscriptions': 'Your Subscriptions',
    'dashboard.active': 'active',
    'dashboard.manage': 'Manage',
    'dashboard.noSubscriptionsFound': 'No subscriptions found',
    'dashboard.tryAdjustingFilters': 'Try adjusting your filters',
    
    // Filters
    'filters.all': 'All',
    'filters.inactive': 'Inactive',
    'filters.paused': 'Paused',
    
    // Categories
    'category.ott': 'OTT',
    'category.music': 'Music',
    'category.productivity': 'Productivity',
    'category.food': 'Food',
    
    // Settings Menu
    'settings.configureAlerts': 'Configure Alerts',
    'settings.language': 'Language',
    'settings.logout': 'Logout',
    'settings.english': 'English',
    'settings.hindi': 'Hindi',
    
    // Configure Alerts
    'alerts.title': 'Smart Alerts',
    'alerts.preRenewalAlerts': 'Pre-renewal Alerts',
    'alerts.alertChannels': 'Alert Channels',
    'alerts.quietHours': 'Quiet Hours',
    'alerts.saveSettings': 'Save Settings',
    'alerts.settingsSaved': 'Settings saved successfully!',
    'alerts.days': 'days before',
    'alerts.push': 'Push',
    'alerts.sms': 'SMS',
    'alerts.email': 'Email',
  },
  hi: {
    // Dashboard
    'dashboard.welcome': 'नमस्ते, {name}! 👋',
    'dashboard.welcomeSubtitle': 'आपके डैशबोर्ड में आपका स्वागत है',
    'dashboard.monthlySpend': 'मासिक खर्च',
    'dashboard.deadSpend': 'बंद खर्च',
    'dashboard.subscriptions': 'सब्स्क्रिप्शन',
    'dashboard.inactiveSubscriptions': 'निष्क्रिय सब्स्क्रिप्शन',
    'dashboard.monthlySpendTrend': 'मासिक खर्च प्रवृत्ति',
    'dashboard.yourSubscriptions': 'आपके सब्स्क्रिप्शन',
    'dashboard.active': 'सक्रिय',
    'dashboard.manage': 'प्रबंधित करें',
    'dashboard.noSubscriptionsFound': 'कोई सब्स्क्रिप्शन नहीं मिला',
    'dashboard.tryAdjustingFilters': 'फिल्टर समायोजित करने का प्रयास करें',
    
    // Filters
    'filters.all': 'सभी',
    'filters.inactive': 'निष्क्रिय',
    'filters.paused': 'रोक दिया गया',
    
    // Categories
    'category.ott': 'ओटीटी',
    'category.music': 'संगीत',
    'category.productivity': 'उत्पादकता',
    'category.food': 'भोजन',
    
    // Settings Menu
    'settings.configureAlerts': 'अलर्ट कॉन्फ़िगर करें',
    'settings.language': 'भाषा',
    'settings.logout': 'लॉगआउट',
    'settings.english': 'अंग्रेजी',
    'settings.hindi': 'हिंदी',
    
    // Configure Alerts
    'alerts.title': 'स्मार्ट अलर्ट',
    'alerts.preRenewalAlerts': 'नवीनीकरण पूर्व अलर्ट',
    'alerts.alertChannels': 'अलर्ट चैनल',
    'alerts.quietHours': 'शांत घंटे',
    'alerts.saveSettings': 'सेटिंग्स सेव करें',
    'alerts.settingsSaved': 'सेटिंग्स सफलतापूर्वक सेव हुईं!',
    'alerts.days': 'दिन पहले',
    'alerts.push': 'पुश',
    'alerts.sms': 'एसएमएस',
    'alerts.email': 'ईमेल',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, params?: { [key: string]: string }): string => {
    let translation = translations[language][key] || key;
    
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};