
import { ReactNode } from 'react';

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  message?: string;
  action?: string;
  actionLabel?: string;
  actionUrl?: string;
  icon?: ReactNode;
}
