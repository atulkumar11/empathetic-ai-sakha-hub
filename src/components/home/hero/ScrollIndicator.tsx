
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div 
      className="flex justify-center mt-12 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <Button 
        variant="ghost" 
        className="text-violet-500 flex flex-col items-center gap-1 relative group"
        onClick={() => window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })}
      >
        <span className="text-sm font-medium group-hover:text-violet-700 transition-colors">Explore More</span>
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <motion.div 
            className="absolute -inset-1 rounded-full bg-violet-100 opacity-70"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
          <ChevronDown size={18} className="relative z-10"/>
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default ScrollIndicator;
