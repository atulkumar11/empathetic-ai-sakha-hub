
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { ChatMessage } from "./types";

interface ChatTabProps {
  initialMessages?: ChatMessage[];
}

const ChatTab: React.FC<ChatTabProps> = ({ 
  initialMessages = [{text: "Hi there! I'm Sakha in chill mode. How can I brighten your day?", isUser: false}] 
}) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialMessages);
  
  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat
    setChatMessages([...chatMessages, {text: chatMessage, isUser: true}]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Did you hear about the guy who invented Lifesavers? He made a mint!",
        "Here's a fun fact: Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat!",
        "Want to recharge? Try this: Close your eyes and take three deep breaths, focusing only on the sensation of breathing.",
        "You know what? You're doing great today. Sometimes we don't hear that enough!",
        "Quick happiness hack: Try smiling for 10 seconds, even if forced. Your brain often can't tell the difference and will release feel-good chemicals!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, {text: randomResponse, isUser: false}]);
    }, 1000);
    
    setChatMessage("");
  };
  
  return (
    <motion.div 
      key="chat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="space-y-3">
        <h3 className="font-medium">Talk to Sakha - Chill Mode</h3>
        
        <ScrollArea className="h-[250px] rounded border p-2 bg-white">
          <div className="space-y-3">
            {chatMessages.map((msg, index) => (
              <motion.div 
                key={index}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`
                  max-w-[80%] rounded-lg p-2 px-3 
                  ${msg.isUser 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-gray-100 text-gray-800 border'
                  }
                `}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input 
            value={chatMessage} 
            onChange={(e) => setChatMessage(e.target.value)} 
            placeholder="Type something to brighten your day..."
            className="text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendChatMessage();
            }}
          />
          <Button 
            className="bg-violet-600" 
            size="icon"
            onClick={handleSendChatMessage}
          >
            <Send size={16} />
          </Button>
        </div>
        
        <div className="pt-1">
          <p className="text-xs text-gray-500">
            Try: "Tell me a joke" • "Share a fun fact" • "I need a motivation boost"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatTab;
