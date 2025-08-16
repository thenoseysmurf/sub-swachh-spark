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
    
    // Landing Page
    'landing.title': 'Take Control of Your Subscriptions',
    'landing.subtitle': 'Track, manage, and optimize all your recurring payments in one smart dashboard',
    'landing.getStarted': 'Get Started',
    'landing.signIn': 'Sign In',
    'landing.features.track': 'Track All Subscriptions',
    'landing.features.trackDesc': 'Never lose track of your recurring payments again',
    'landing.features.save': 'Save Money',
    'landing.features.saveDesc': 'Identify unused subscriptions and cancel them instantly',
    'landing.features.alerts': 'Smart Alerts',
    'landing.features.alertsDesc': 'Get notified before renewals so you stay in control',
    
    // Auth Pages
    'auth.signup.title': 'Create Account',
    'auth.signup.subtitle': 'Join thousands who are saving money',
    'auth.signup.name': 'Full Name',
    'auth.signup.email': 'Email Address',
    'auth.signup.password': 'Password',
    'auth.signup.confirmPassword': 'Confirm Password',
    'auth.signup.mobile': 'Mobile Number',
    'auth.signup.agreeToTerms': 'I agree to the Terms of Service and Privacy Policy',
    'auth.signup.syncAccounts': 'Sync my bank accounts for automatic subscription detection',
    'auth.signup.createAccount': 'Create Account',
    'auth.signup.alreadyHaveAccount': 'Already have an account?',
    'auth.signup.signIn': 'Sign in',
    'auth.signup.verifyMobile': 'Verify Mobile',
    'auth.signup.otpSent': 'We have sent a 6-digit OTP to your mobile number',
    'auth.signup.enterOtp': 'Enter the OTP below',
    'auth.signup.resendOtp': 'Resend OTP',
    'auth.signup.verify': 'Verify',
    
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to your account',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.forgotPassword': 'Forgot Password?',
    'auth.login.signIn': 'Sign In',
    'auth.login.dontHaveAccount': 'Don\'t have an account?',
    'auth.login.signUp': 'Sign up',
    
    // Profile Setup
    'profile.title': 'Complete Your Profile',
    'profile.subtitle': 'Help us personalize your experience',
    'profile.name': 'Full Name',
    'profile.age': 'Age',
    'profile.monthlyIncome': 'Monthly Income (₹)',
    'profile.spendingGoal': 'Monthly Spending Goal (₹)',
    'profile.categories': 'Subscription Categories',
    'profile.continue': 'Continue',
    
    // Filters
    'filters.all': 'All',
    'filters.inactive': 'Inactive',
    'filters.paused': 'Paused',
    
    // Categories
    'category.ott': 'OTT',
    'category.music': 'Music',
    'category.productivity': 'Productivity',
    'category.food': 'Food',
    'category.fitness': 'Fitness',
    'category.education': 'Education',
    
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
    
    // Analytics
    'analytics.title': 'Analytics',
    'analytics.overview': 'Spending Overview',
    'analytics.monthlyTrend': 'Monthly Trend',
    'analytics.categoryBreakdown': 'Category Breakdown',
    'analytics.totalSpend': 'Total Spend',
    'analytics.avgMonthly': 'Avg Monthly',
    'analytics.activeSubscriptions': 'Active Subscriptions',
    'analytics.deadSpend': 'Dead Spend',
    
    // Dead Spend Detector
    'deadSpend.title': 'Dead Spend Detector',
    'deadSpend.subtitle': 'Identify unused subscriptions',
    'deadSpend.potentialSavings': 'Potential Monthly Savings',
    'deadSpend.unusedSubscriptions': 'Unused Subscriptions',
    'deadSpend.lastUsed': 'Last used',
    'deadSpend.neverUsed': 'Never used',
    'deadSpend.cancel': 'Cancel',
    'deadSpend.daysAgo': 'days ago',
    
    // Manage Subscription
    'manage.title': 'Manage Subscription',
    'manage.details': 'Subscription Details',
    'manage.nextBilling': 'Next Billing',
    'manage.amount': 'Amount',
    'manage.status': 'Status',
    'manage.active': 'Active',
    'manage.paused': 'Paused',
    'manage.cancelled': 'Cancelled',
    'manage.pauseSubscription': 'Pause Subscription',
    'manage.cancelSubscription': 'Cancel Subscription',
    'manage.resumeSubscription': 'Resume Subscription',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.recent': 'Recent Notifications',
    'notifications.markAllRead': 'Mark All Read',
    'notifications.noNotifications': 'No new notifications',
    
    // Common
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
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
    
    // Landing Page
    'landing.title': 'अपने सब्स्क्रिप्शन पर नियंत्रण रखें',
    'landing.subtitle': 'एक स्मार्ट डैशबोर्ड में अपने सभी आवर्तक भुगतानों को ट्रैक, प्रबंधित और अनुकूलित करें',
    'landing.getStarted': 'शुरू करें',
    'landing.signIn': 'साइन इन करें',
    'landing.features.track': 'सभी सब्स्क्रिप्शन ट्रैक करें',
    'landing.features.trackDesc': 'अपने आवर्तक भुगतानों का ट्रैक फिर कभी न खोएं',
    'landing.features.save': 'पैसे बचाएं',
    'landing.features.saveDesc': 'अप्रयुक्त सब्स्क्रिप्शन की पहचान करें और उन्हें तुरंत रद्द करें',
    'landing.features.alerts': 'स्मार्ट अलर्ट',
    'landing.features.alertsDesc': 'नवीकरण से पहले सूचना पाएं ताकि आप नियंत्रण में रहें',
    
    // Auth Pages
    'auth.signup.title': 'खाता बनाएं',
    'auth.signup.subtitle': 'हजारों लोगों के साथ जुड़ें जो पैसे बचा रहे हैं',
    'auth.signup.name': 'पूरा नाम',
    'auth.signup.email': 'ईमेल पता',
    'auth.signup.password': 'पासवर्ड',
    'auth.signup.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.signup.mobile': 'मोबाइल नंबर',
    'auth.signup.agreeToTerms': 'मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं',
    'auth.signup.syncAccounts': 'स्वचालित सब्स्क्रिप्शन का पता लगाने के लिए मेरे बैंक खाते सिंक करें',
    'auth.signup.createAccount': 'खाता बनाएं',
    'auth.signup.alreadyHaveAccount': 'क्या पहले से खाता है?',
    'auth.signup.signIn': 'साइन इन करें',
    'auth.signup.verifyMobile': 'मोबाइल सत्यापित करें',
    'auth.signup.otpSent': 'हमने आपके मोबाइल नंबर पर 6 अंकों का OTP भेजा है',
    'auth.signup.enterOtp': 'नीचे OTP दर्ज करें',
    'auth.signup.resendOtp': 'OTP दोबारा भेजें',
    'auth.signup.verify': 'सत्यापित करें',
    
    'auth.login.title': 'वापस आपका स्वागत है',
    'auth.login.subtitle': 'अपने खाते में साइन इन करें',
    'auth.login.email': 'ईमेल',
    'auth.login.password': 'पासवर्ड',
    'auth.login.forgotPassword': 'पासवर्ड भूल गए?',
    'auth.login.signIn': 'साइन इन करें',
    'auth.login.dontHaveAccount': 'कोई खाता नहीं है?',
    'auth.login.signUp': 'साइन अप करें',
    
    // Profile Setup
    'profile.title': 'अपनी प्रोफाइल पूरी करें',
    'profile.subtitle': 'अपने अनुभव को व्यक्तिगत बनाने में हमारी सहायता करें',
    'profile.name': 'पूरा नाम',
    'profile.age': 'उम्र',
    'profile.monthlyIncome': 'मासिक आय (₹)',
    'profile.spendingGoal': 'मासिक खर्च लक्ष्य (₹)',
    'profile.categories': 'सब्स्क्रिप्शन श्रेणियां',
    'profile.continue': 'जारी रखें',
    
    // Filters
    'filters.all': 'सभी',
    'filters.inactive': 'निष्क्रिय',
    'filters.paused': 'रोक दिया गया',
    
    // Categories
    'category.ott': 'ओटीटी',
    'category.music': 'संगीत',
    'category.productivity': 'उत्पादकता',
    'category.food': 'भोजन',
    'category.fitness': 'फिटनेस',
    'category.education': 'शिक्षा',
    
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
    
    // Analytics
    'analytics.title': 'एनालिटिक्स',
    'analytics.overview': 'खर्च अवलोकन',
    'analytics.monthlyTrend': 'मासिक प्रवृत्ति',
    'analytics.categoryBreakdown': 'श्रेणी विश्लेषण',
    'analytics.totalSpend': 'कुल खर्च',
    'analytics.avgMonthly': 'औसत मासिक',
    'analytics.activeSubscriptions': 'सक्रिय सब्स्क्रिप्शन',
    'analytics.deadSpend': 'बंद खर्च',
    
    // Dead Spend Detector
    'deadSpend.title': 'बंद खर्च डिटेक्टर',
    'deadSpend.subtitle': 'अप्रयुक्त सब्स्क्रिप्शन की पहचान करें',
    'deadSpend.potentialSavings': 'संभावित मासिक बचत',
    'deadSpend.unusedSubscriptions': 'अप्रयुक्त सब्स्क्रिप्शन',
    'deadSpend.lastUsed': 'अंतिम बार उपयोग',
    'deadSpend.neverUsed': 'कभी उपयोग नहीं किया',
    'deadSpend.cancel': 'रद्द करें',
    'deadSpend.daysAgo': 'दिन पहले',
    
    // Manage Subscription
    'manage.title': 'सब्स्क्रिप्शन प्रबंधित करें',
    'manage.details': 'सब्स्क्रिप्शन विवरण',
    'manage.nextBilling': 'अगली बिलिंग',
    'manage.amount': 'राशि',
    'manage.status': 'स्थिति',
    'manage.active': 'सक्रिय',
    'manage.paused': 'रोका गया',
    'manage.cancelled': 'रद्द',
    'manage.pauseSubscription': 'सब्स्क्रिप्शन रोकें',
    'manage.cancelSubscription': 'सब्स्क्रिप्शन रद्द करें',
    'manage.resumeSubscription': 'सब्स्क्रिप्शन फिर से शुरू करें',
    
    // Notifications
    'notifications.title': 'सूचनाएं',
    'notifications.recent': 'हाल की सूचनाएं',
    'notifications.markAllRead': 'सभी पढ़े गए के रूप में चिह्नित करें',
    'notifications.noNotifications': 'कोई नई सूचनाएं नहीं',
    
    // Common
    'common.back': 'वापस',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.continue': 'जारी रखें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफल',
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
  const [language, setLanguageState] = useState<Language>(() => {
    // Load saved language from localStorage or default to 'en'
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

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