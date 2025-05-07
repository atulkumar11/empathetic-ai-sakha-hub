
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationToggleButtonProps {
  hideTabsNav: boolean;
  onToggleTabsNav: () => void;
}

const NavigationToggleButton: React.FC<NavigationToggleButtonProps> = ({
  hideTabsNav,
  onToggleTabsNav
}) => {
  return (
    <div className="flex items-center justify-end mb-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={hideTabsNav ? 'show' : 'hide'}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 bg-white shadow-sm hover:bg-violet-50 border-violet-200 text-violet-700"
            onClick={onToggleTabsNav}
          >
            {hideTabsNav ? 
              <><ChevronRight width={15} height={15} /> Show Navigation</> : 
              <><X width={15} height={15} /> Hide Navigation</>
            }
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NavigationToggleButton;
