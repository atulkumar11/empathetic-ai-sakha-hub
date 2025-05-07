
import React from 'react';
import NudgePanel from './NudgePanel';
import { NudgeData } from '@/hooks/useKpiTracking';

interface NotificationsPanelProps {
  notifications: NudgeData[];
  markAsRead: (id: string) => void;
  showAll?: boolean;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ 
  notifications, 
  markAsRead,
  showAll = false
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
      <NudgePanel nudges={notifications} markAsRead={markAsRead} />
      
      {notifications.length === 0 && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No notifications at this time</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
