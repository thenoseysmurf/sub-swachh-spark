import { useState } from "react";
import { MobileLayout } from "@/components/ui/mobile-layout";
import { WidgetCard } from "@/components/ui/widget-card";
import { AppLogo } from "@/components/ui/app-logo";
import { useRouter } from "@/hooks/useRouter";
import { Bell, Calendar, Clock } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    appName: "Netflix",
    message: "Your subscription for Netflix is getting renewed in 3 days",
    daysRemaining: 3,
    amount: 199,
    renewalDate: "2024-08-20",
    isRead: false
  },
  {
    id: 2,
    appName: "Spotify Premium", 
    message: "Your subscription for Spotify Premium is getting renewed in 1 day",
    daysRemaining: 1,
    amount: 119,
    renewalDate: "2024-08-18",
    isRead: false
  },
  {
    id: 3,
    appName: "Adobe Creative Cloud",
    message: "Your subscription for Adobe Creative Cloud is getting renewed in 14 days",
    daysRemaining: 14,
    amount: 1675,
    renewalDate: "2024-09-01",
    isRead: true
  }
];

export default function Notifications() {
  const router = useRouter();
  const [notifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <MobileLayout showBackButton={true} title="Notifications" showBottomNav={true}>
      <div className="px-4 py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="glass-nav p-4 rounded-xl -mx-4 mb-6 animate-slide-down">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <h1 className="heading-lg">Notifications</h1>
              </div>
              <p className="caption text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} new notifications` : "You're all caught up!"}
              </p>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 animate-slide-up stagger-1">
          {notifications.map((notification, index) => (
            <WidgetCard 
              key={notification.id}
              variant={notification.daysRemaining <= 3 ? "warning" : "default"}
              interactive
              className={`animate-slide-up ${!notification.isRead ? 'border-primary/30' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <AppLogo appName={notification.appName} size="md" />
                    <div className="flex-1">
                      <h4 className="heading-xs text-foreground">{notification.appName}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="heading-sm text-foreground font-semibold">₹{notification.amount}</span>
                        <span className={`caption px-2 py-1 rounded-full ${
                          notification.daysRemaining <= 3 
                            ? 'bg-warning/10 text-warning' 
                            : 'bg-success/10 text-success'
                        }`}>
                          {notification.daysRemaining} days
                        </span>
                      </div>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </div>
                
                <p className="body-sm text-foreground">{notification.message}</p>
                
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span className="caption">
                      {new Date(notification.renewalDate).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span className="caption">2 hours ago</span>
                  </div>
                </div>
              </div>
            </WidgetCard>
          ))}
          
          {notifications.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="body-md text-muted-foreground">No notifications yet</p>
              <p className="caption text-muted-foreground">We'll notify you about upcoming renewals</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}