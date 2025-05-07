
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  content: string;
  isBot?: boolean;
  type?: "bot" | "user"; // For backwards compatibility
}

const ChatMessage = ({ content, isBot = false, type }: ChatMessageProps) => {
  // If isBot is provided directly, use it, otherwise determine from type
  const isBotMessage = isBot !== undefined ? isBot : type === "bot";
  
  return (
    <motion.div 
      className={`flex mb-5 ${isBotMessage ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isBotMessage && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mr-3"
        >
          <Avatar className="h-9 w-9 border-2 border-purple-100 shadow-md">
            <AvatarImage src="/lovable-uploads/6bd65589-a748-4b63-a28b-12521c233a7e.png" alt="Sakha AI" />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm">S</AvatarFallback>
          </Avatar>
        </motion.div>
      )}
      
      <motion.div 
        className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
          isBotMessage 
            ? "bg-white border border-purple-100 rounded-tl-none" 
            : "bg-gradient-to-r from-purple-600 to-violet-700 text-white rounded-tr-none"
        }`}
        initial={{ x: isBotMessage ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <p className={`${isBotMessage ? "text-gray-800" : "text-white"} text-sm md:text-base`}>
          {content}
        </p>
      </motion.div>
      
      {!isBotMessage && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-3"
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center text-white text-sm shadow-md border-2 border-purple-100">
            <span className="font-medium">You</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
