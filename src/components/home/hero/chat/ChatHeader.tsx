
import { motion } from "framer-motion";
import PrepzrLogo from "@/components/common/PrepzrLogo";

const ChatHeader = () => {
  return (
    <motion.div 
      className="flex items-center p-3 border-b bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-full p-1 mr-2">
        <PrepzrLogo width={20} height={20} />
      </div>
      <div>
        <h3 className="font-semibold text-sm text-blue-700 dark:text-blue-300">PREPZR AI Tutor</h3>
        <p className="text-xs text-blue-500/70 dark:text-blue-400/70">Online • 24/7 Support</p>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
