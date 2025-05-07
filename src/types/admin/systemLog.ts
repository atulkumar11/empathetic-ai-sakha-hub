
export interface SystemLog {
  id: string;
  event: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  details: Record<string, any>;
}
