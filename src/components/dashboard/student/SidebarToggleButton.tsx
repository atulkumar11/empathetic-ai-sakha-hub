
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarToggleButtonProps {
  hideSidebar: boolean;
  onToggle: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
  hideSidebar,
  onToggle
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-20 z-40 hidden md:flex bg-white shadow-md hover:bg-gray-100"
        onClick={onToggle}
      >
        {hideSidebar ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </Button>
    </motion.div>
  );
};

export default SidebarToggleButton;
