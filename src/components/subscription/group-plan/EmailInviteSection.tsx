
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailInviteSectionProps {
  emails: string[];
  maxInvites: number;
  onAddEmail: (email: string) => void;
  onRemoveEmail: (email: string) => void;
}

const EmailInviteSection = ({ emails, maxInvites, onAddEmail, onRemoveEmail }: EmailInviteSectionProps) => {
  const [currentEmail, setCurrentEmail] = useState('');
  const { toast } = useToast();
  const remainingInvites = maxInvites - emails.length;

  const handleAddEmail = () => {
    if (!currentEmail.trim()) return;
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(currentEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (emails.includes(currentEmail)) {
      toast({
        title: "Duplicate Email",
        description: "This email has already been added",
        variant: "destructive",
      });
      return;
    }
    
    onAddEmail(currentEmail);
    setCurrentEmail('');
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Invite Members ({emails.length}/{maxInvites})</Label>
        <span className="text-sm text-purple-600 dark:text-purple-400">
          {remainingInvites} invite{remainingInvites !== 1 ? 's' : ''} remaining
        </span>
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder="colleague@example.com"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddEmail()}
          disabled={emails.length >= maxInvites}
          className="border-purple-200 dark:border-purple-900 focus:border-purple-300 dark:focus:border-purple-700"
        />
        <Button
          onClick={handleAddEmail}
          disabled={emails.length >= maxInvites || !currentEmail.trim()}
          className="bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Add
        </Button>
      </div>

      <ScrollArea className="h-[200px]">
        <AnimatePresence>
          {emails.map((email) => (
            <motion.div
              key={email}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-lg px-4 py-2 mb-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm">{email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveEmail(email)}
                className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
    </motion.div>
  );
};

export default EmailInviteSection;
