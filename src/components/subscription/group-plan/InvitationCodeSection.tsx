
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface InvitationCodeSectionProps {
  codes: string[];
  maxInvites: number;
}

const InvitationCodeSection = ({ codes, maxInvites }: InvitationCodeSectionProps) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const copyInviteCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    
    setTimeout(() => {
      setCopiedCodeIndex(null);
    }, 2000);
    
    toast({
      title: "Code Copied!",
      description: "Invitation code copied to clipboard",
    });
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Label className="text-base font-medium">Access Codes</Label>
      <ScrollArea className="h-[200px] rounded-lg border border-purple-200 dark:border-purple-900 p-1">
        <div className="space-y-2 p-2">
          <AnimatePresence>
            {codes.slice(0, maxInvites - 1).map((code, index) => (
              <motion.div
                key={code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-lg px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <code className="font-mono text-sm text-purple-700 dark:text-purple-300">
                  {code}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyInviteCode(code, index)}
                  className="flex items-center space-x-1 hover:bg-purple-100 dark:hover:bg-purple-900"
                >
                  {copiedCodeIndex === index ? (
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copiedCodeIndex === index ? "Copied" : "Copy"}</span>
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default InvitationCodeSection;
