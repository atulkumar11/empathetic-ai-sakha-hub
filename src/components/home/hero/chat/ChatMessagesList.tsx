
import { ChatMessage } from "./index";
import type { ChatMessageProps } from "./ChatMessage";

interface ChatMessagesListProps {
  messages: Array<Omit<ChatMessageProps, "index">>;
}

const ChatMessagesList = ({ messages }: ChatMessagesListProps) => {
  return (
    <div className="chat-container p-6 bg-gray-50 h-[280px] overflow-y-auto">
      {messages.map((msg, index) => (
        <ChatMessage 
          key={index} 
          type={msg.type} 
          content={msg.content} 
          index={index} 
        />
      ))}
    </div>
  );
};

export default ChatMessagesList;
