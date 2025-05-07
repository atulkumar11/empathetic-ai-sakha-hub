
import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { motion } from "framer-motion";

interface DialogHeaderProps {
  title: string;
  description?: string;
  onClose: () => void;
}

const ExamDialogHeader: React.FC<DialogHeaderProps> = ({ title, description, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <DialogHeader className="pb-6">
        <DialogTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-violet-500 font-display">
          {title}
        </DialogTitle>
        {description && <DialogDescription className="text-base mt-2">{description}</DialogDescription>}
      </DialogHeader>
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
      >
        <X className="h-5 w-5 text-gray-500 hover:text-violet-700" />
      </Button>
    </motion.div>
  );
};

export default ExamDialogHeader;
