
import { useState } from "react";
import { SendHorizonal, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputBarProps {
  onSendMessage: (message: string) => void;
}

const ChatInputBar = ({ onSendMessage }: ChatInputBarProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full flex-shrink-0 border-gray-300 hover:bg-violet-50"
        >
          <Mic className="h-5 w-5 text-gray-500" />
        </Button>
        <div className="relative w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your exam preparation..."
            className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-violet-100"
            onClick={handleSendMessage}
          >
            <SendHorizonal className="h-5 w-5 text-violet-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInputBar;
