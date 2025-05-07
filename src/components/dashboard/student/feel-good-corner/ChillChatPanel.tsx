
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizontal, Gift, Music, ChevronDown, RefreshCcw } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface ChillChatPanelProps {
  onLike: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'other';
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
}

const botResponses = [
  "What are you studying for today?",
  "Taking any breaks between study sessions is important!",
  "What's your favorite subject to learn about?",
  "Did you know that regular breaks improve memory retention?",
  "Music can help with concentration. Got any study playlists?",
  "Remember to stay hydrated while studying!",
  "What's your dream college or career goal?",
  "Sometimes a walk outside can refresh your mind.",
  "Group study can be really effective - tried it?",
  "How do you handle stress before big exams?"
];

const otherUsers = [
  { name: "Rahul", avatar: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png" },
  { name: "Aditya", avatar: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png" },
  { name: "Priya", avatar: "/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png" },
  { name: "Sneha", avatar: "" }
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Welcome to PREPZR Chill Chat! This is a space to relax and chat with other students.",
    sender: 'bot',
    senderName: 'PREPZR Bot',
    timestamp: new Date(Date.now() - 86400000)
  },
  {
    id: '2',
    text: "Hi everyone! How's your study session going?",
    sender: 'other',
    senderName: otherUsers[0].name,
    senderAvatar: otherUsers[0].avatar,
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: '3',
    text: "Just finished my physics revision. Taking a quick break!",
    sender: 'other',
    senderName: otherUsers[1].name,
    senderAvatar: otherUsers[1].avatar,
    timestamp: new Date(Date.now() - 1800000)
  },
  {
    id: '4',
    text: "Anyone struggling with organic chemistry? The mechanisms are so tricky!",
    sender: 'other',
    senderName: otherUsers[2].name,
    senderAvatar: otherUsers[2].avatar,
    timestamp: new Date(Date.now() - 900000)
  }
];

const ChillChatPanel: React.FC<ChillChatPanelProps> = ({ onLike }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(7);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      senderName: 'You',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot/other user responding
    setIsTyping(true);
    setTimeout(() => {
      const willBotRespond = Math.random() > 0.5;
      
      if (willBotRespond) {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'bot',
          senderName: 'PREPZR Bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
        const otherUserMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `I'm working on ${Math.random() > 0.5 ? 'biology' : 'mathematics'} right now. It's ${Math.random() > 0.5 ? 'going well!' : 'quite challenging.'}`,
          sender: 'other',
          senderName: randomUser.name,
          senderAvatar: randomUser.avatar,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, otherUserMessage]);
      }
      
      setIsTyping(false);
    }, 1500);
  };

  const refreshChat = () => {
    setOnlineUsers(Math.floor(Math.random() * 5) + 5);
    toast({
      title: "Chat refreshed",
      description: "Connected with the latest messages.",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Chill Chat</h2>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {onlineUsers} online
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={refreshChat} className="flex items-center gap-1">
          <RefreshCcw className="h-3.5 w-3.5" />
          <span>Refresh</span>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="border-b p-3 flex justify-between items-center bg-muted/30">
            <CardTitle className="text-base">Student Chat</CardTitle>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {message.sender !== 'user' && (
                      <Avatar className="h-8 w-8">
                        {message.sender === 'bot' ? (
                          <AvatarImage src="/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png" />
                        ) : (
                          <AvatarImage src={message.senderAvatar} />
                        )}
                        <AvatarFallback>{message.senderName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div>
                      <div className="flex gap-2 items-center mb-1">
                        <span className="text-xs text-muted-foreground">
                          {message.sender !== 'user' ? message.senderName : formatTime(message.timestamp)}
                        </span>
                        {message.sender !== 'user' && (
                          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                        )}
                      </div>
                      
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : message.sender === 'bot'
                            ? 'bg-slate-100 border border-slate-200 text-slate-800'
                            : 'bg-blue-50 border border-blue-100 text-blue-800'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 animate-pulse">
                    Someone is typing...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-3 border-t flex gap-2">
            <Button variant="outline" size="icon" className="shrink-0">
              <Gift className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <Music className="h-4 w-4" />
            </Button>
            <Input 
              placeholder="Type your message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="shrink-0">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-2">
        <Button variant="ghost" onClick={onLike}>
          I'm enjoying this chat!
        </Button>
      </div>
    </div>
  );
};

export default ChillChatPanel;
