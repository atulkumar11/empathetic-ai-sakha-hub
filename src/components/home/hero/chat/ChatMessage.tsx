
import { motion } from "framer-motion";
import { User } from "lucide-react";

export interface ChatMessageProps {
  type: "user" | "bot";
  content: string;
  index: number;
}

const ChatMessage = ({ type, content, index }: ChatMessageProps) => {
  return (
    <motion.div 
      className={type === "user" ? "user-message" : "bot-message"}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <div className="flex items-center gap-2 mb-1">
        {type === "bot" ? (
          <div className="avatar-eyes w-6 h-6 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full relative overflow-hidden">
            <img 
              src="/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png" 
              alt="Sakha AI" 
              className="w-6 h-6 rounded-full"
            />
          </div>
        ) : (
          <User size={16} className="text-white" />
        )}
        <span className="text-xs font-medium">
          {type === "bot" ? "Sakha AI" : "You"}
        </span>
      </div>
      <p>{content}</p>
    </motion.div>
  );
};

export default ChatMessage;
