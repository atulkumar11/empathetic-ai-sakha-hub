
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Mic, X, Maximize2, Minimize2 } from "lucide-react";

interface ChatAssistantProps {
  userType: string;
}

const ChatAssistant = ({ userType }: ChatAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot',
      content: `Welcome to your ${userType} dashboard! I'm Sakha, your AI companion. How can I assist you today?`
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { type: 'user', content: input }]);
    
    // Simulate bot response
    setTimeout(() => {
      let response;
      
      if (input.toLowerCase().includes("help")) {
        response = "I'd be happy to help! What specific area would you like assistance with?";
      } else if (input.toLowerCase().includes("feature")) {
        response = "As a premium user, you have access to all features including personalized recommendations, advanced analytics, and priority support.";
      } else {
        response = "I understand. Is there anything specific you'd like me to help you with today related to your goals?";
      }
      
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 1000);
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          className="floating-avatar"
          onClick={() => setIsOpen(true)}
        >
          <div className="relative">
            <div className="absolute w-full h-full rounded-full animate-pulse bg-sakha-light-blue/50"></div>
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI" 
              className="w-10 h-10 object-cover relative z-10"
            />
          </div>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div 
          className={`fixed z-50 bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
            isExpanded 
              ? "inset-4 md:inset-16" 
              : "bottom-4 right-4 w-80 md:w-96 h-[500px]"
          }`}
        >
          {/* Chat Header */}
          <div className="p-3 bg-gradient-to-r from-sakha-blue to-sakha-purple text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                alt="Sakha AI" 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="font-medium text-sm">Sakha AI Assistant</h3>
                <p className="text-xs opacity-80">Your personal AI companion</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </Button>
              <Button 
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[calc(100%-104px)] p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`mb-4 p-3 rounded-lg max-w-[85%] ${
                  msg.type === 'user' 
                    ? 'ml-auto bg-sakha-blue text-white' 
                    : 'bg-gray-100'
                }`}
              >
                <p>{msg.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-sakha-blue hover:bg-sakha-blue/10"
              >
                <Mic size={20} />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Sakha anything..."
                className="flex-1"
              />
              <Button
                className="bg-sakha-blue text-white hover:bg-sakha-blue/90"
                size="icon"
                onClick={handleSendMessage}
              >
                <MessageSquare size={18} />
              </Button>
            </div>
            
            {input.length === 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setInput("Help me with my study plan")}
                >
                  Help me with my study plan
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setInput("What features do I have access to?")}
                >
                  What features do I have access to?
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
