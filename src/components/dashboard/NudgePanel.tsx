
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { BellRing, Check, Clock, Star, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NudgeData } from '@/types/nudge';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NudgePanelProps {
  nudges: NudgeData[];
  markAsRead: (id: string) => void;
  className?: string;
}

export default function NudgePanel({ nudges, markAsRead, className = '' }: NudgePanelProps) {
  const [showAll, setShowAll] = useState(false);
  const displayNudges = showAll ? nudges : nudges.slice(0, 3);
  
  const getBackgroundColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': 
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30';
      case 'medium': 
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30';
      case 'low': 
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30';
    }
  };
  
  const getIconColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': 
        return 'text-red-600 dark:text-red-400';
      case 'medium': 
        return 'text-amber-600 dark:text-amber-400';
      case 'low': 
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };
  
  const getBadgeColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': 
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/30';
      case 'medium': 
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/30';
      case 'low': 
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30';
    }
  };

  const getPriorityText = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
    }
  };
  
  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'recently';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <BellRing className="h-5 w-5 mr-2 text-primary" />
            Nudges & Reminders
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            {nudges.length} new
          </Badge>
        </div>
        <CardDescription>Stay updated with personalized recommendations</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {displayNudges.length > 0 ? (
          <AnimatePresence initial={false} mode="popLayout">
            <div className="space-y-3">
              {displayNudges.map((nudge) => (
                <motion.div
                  key={nudge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn("p-3 rounded-lg border", getBackgroundColor(nudge.priority))}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className={cn("h-9 w-9 rounded-full flex items-center justify-center", 
                                        nudge.priority === 'high' ? 'bg-white dark:bg-red-900/40' : 
                                        'bg-white/80 dark:bg-gray-800/40')}>
                        {nudge.icon || <Star className={cn("h-5 w-5", getIconColor(nudge.priority))} />}
                      </div>
                      <div>
                        <div className="font-medium mb-0.5 flex items-center">
                          {nudge.title}
                          <Badge variant="outline" className={cn("ml-2 text-xs", getBadgeColor(nudge.priority))}>
                            {getPriorityText(nudge.priority)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {nudge.description}
                          {nudge.message && (
                            <p className="mt-1 text-xs italic">"{nudge.message}"</p>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1 opacity-70" />
                          {formatTimeAgo(nudge.createdAt)}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => markAsRead(nudge.id)}
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  </div>
                  
                  {(nudge.action || nudge.actionLabel) && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm font-medium"
                        asChild
                      >
                        <a href={nudge.actionUrl || '#'} className="text-primary flex items-center">
                          {nudge.actionLabel || 'Take Action'}
                          <Star className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Check className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <p>No new nudges or reminders.</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        )}
        
        {nudges.length > 3 && (
          <Button 
            variant="ghost" 
            className="w-full mt-3"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show All (${nudges.length})`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
