
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChatHeader, 
  ChatMessagesList, 
  ChatInputBar,
  ChatSignupCTA
} from "./chat";

interface ChatMessage {
  type: "user" | "bot";
  content: string;
}

const ChatInterface = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      type: "bot", 
      content: "Hi, I'm PREPZR AI Tutor – your personal exam companion. I'll help you ace your exams with personalized study plans and continuous support!" 
    }
  ]);

  const handleSendMessage = (message: string) => {
    // Add user message
    setChatMessages([...chatMessages, { type: "user", content: message }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: "bot", 
        content: "I'd be happy to help with your exam preparation! To create a personalized study plan for you, would you like to sign up so I can tailor my responses to your specific exam goals?" 
      }]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-blue-100">
      <ChatHeader />
      <ChatMessagesList messages={chatMessages} />
      <ChatInputBar onSendMessage={handleSendMessage} />
      <ChatSignupCTA />
    </div>
  );
};

export default ChatInterface;
