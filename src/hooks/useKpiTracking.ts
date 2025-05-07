
import { useState, useEffect } from 'react';
import { UserRole } from '@/types/user/base';

export interface KpiData {
  id: string;
  title: string;
  value: number;
  unit?: string;
  icon: string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
}

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  read?: boolean;
  actionUrl?: string;
  actionText?: string;
}

export function useKpiTracking(userRole: UserRole) {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  
  useEffect(() => {
    // Simulate fetching KPI data
    setTimeout(() => {
      if (userRole === UserRole.Student) {
        setKpis([
          {
            id: '1',
            title: 'Study Streak',
            value: 7,
            unit: 'days',
            icon: '🔥',
            change: 2,
            changeType: 'positive'
          },
          {
            id: '2',
            title: 'Weekly Progress',
            value: 75,
            unit: '%',
            icon: '📊',
            change: 5,
            changeType: 'positive'
          },
          {
            id: '3',
            title: 'Concepts Mastered',
            value: 42,
            icon: '🧠',
            change: 3,
            changeType: 'positive'
          },
          {
            id: '4',
            title: 'Avg. Score',
            value: 85,
            unit: '%',
            icon: '📝',
            change: 2,
            changeType: 'negative'
          }
        ]);
        
        setNudges([
          {
            id: '1',
            title: 'Physics Test Tomorrow',
            description: 'Don\'t forget to review your notes for tomorrow\'s test',
            priority: 'high',
            createdAt: new Date().toISOString(),
            actionUrl: '/dashboard/student/concepts',
            actionText: 'Review Concepts'
          },
          {
            id: '2',
            title: 'New Recommended Resources',
            description: 'Check out these new study materials based on your performance',
            priority: 'medium',
            createdAt: new Date().toISOString()
          }
        ]);
      } else if (userRole === UserRole.Admin) {
        setKpis([
          {
            id: '1',
            title: 'Total Users',
            value: 2450,
            icon: '👥',
            change: 12,
            changeType: 'positive'
          },
          {
            id: '2',
            title: 'Weekly Active',
            value: 1280,
            icon: '📊',
            change: 5,
            changeType: 'positive'
          },
          {
            id: '3',
            title: 'Revenue',
            value: 15800,
            unit: '$',
            icon: '💰',
            change: 8,
            changeType: 'positive'
          },
          {
            id: '4',
            title: 'Conversion',
            value: 12.5,
            unit: '%',
            icon: '📈',
            change: 2,
            changeType: 'negative'
          }
        ]);
        
        setNudges([
          {
            id: '1',
            title: 'New Support Tickets',
            description: '3 new tickets require your attention',
            priority: 'high',
            createdAt: new Date().toISOString(),
            actionUrl: '/admin/support',
            actionText: 'View Tickets'
          },
          {
            id: '2',
            title: 'System Update',
            description: 'New system update available for deployment',
            priority: 'medium',
            createdAt: new Date().toISOString()
          }
        ]);
      }
    }, 1000);
  }, [userRole]);
  
  const markNudgeAsRead = (id: string) => {
    setNudges(prevNudges => 
      prevNudges.map(nudge => 
        nudge.id === id ? { ...nudge, read: true } : nudge
      )
    );
  };
  
  return {
    kpis,
    nudges,
    markNudgeAsRead
  };
}
