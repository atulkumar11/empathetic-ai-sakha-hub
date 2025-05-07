
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface BatchNameInputProps {
  batchName: string;
  onChange: (value: string) => void;
}

const BatchNameInput = ({ batchName, onChange }: BatchNameInputProps) => {
  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Label htmlFor="batch-name" className="text-base font-medium">
        Batch Name
      </Label>
      <Input 
        id="batch-name"
        placeholder="Enter a meaningful name for your batch"
        value={batchName}
        onChange={(e) => onChange(e.target.value)}
        className="border-purple-200 dark:border-purple-900 focus:border-purple-300 dark:focus:border-purple-700 transition-all hover:border-purple-300 dark:hover:border-purple-700"
      />
    </motion.div>
  );
};

export default BatchNameInput;
