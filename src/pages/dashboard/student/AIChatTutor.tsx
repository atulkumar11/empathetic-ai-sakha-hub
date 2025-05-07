
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfileType } from '@/types/user/base';
import { Send, BookOpen, History, Sparkles, Brain, LayoutList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AIChatTutorProps {
  userProfile: UserProfileType;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIChatTutor: React.FC<AIChatTutorProps> = ({ userProfile }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello ${userProfile.name}! I'm your 24/7 AI tutor. How can I help you with your studies today?`,
      timestamp: new Date()
    }
  ]);

  // Extract exam goal from user profile
  const examGoal = userProfile.examPreparation || userProfile.goals?.[0]?.title || 'JEE';

  // Sample subjects based on exam type
  const subjects = examGoal.includes('JEE') 
    ? ['Physics', 'Chemistry', 'Mathematics'] 
    : examGoal.includes('NEET') 
      ? ['Physics', 'Chemistry', 'Biology'] 
      : ['English', 'Mathematics', 'Science', 'Social Studies'];

  // Sample topics for each subject
  const topics = {
    'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics'],
    'Chemistry': ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Analytical Chemistry'],
    'Mathematics': ['Algebra', 'Calculus', 'Trigonometry', 'Geometry', 'Statistics'],
    'Biology': ['Human Physiology', 'Cell Biology', 'Genetics', 'Ecology', 'Evolution'],
    'English': ['Grammar', 'Comprehension', 'Writing', 'Literature'],
    'Science': ['Physics', 'Chemistry', 'Biology'],
    'Social Studies': ['History', 'Geography', 'Civics', 'Economics']
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, userMessage]);
    setMessage('');
    
    // Simulate AI response (in a real app, this would come from an API call)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I understand your question about "${message}". Here's how I can explain it...`,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <motion.div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold">24/7 AI Tutor</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Get instant help with your questions and doubts
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Left sidebar with subjects and topics */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-[600px] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardTitle className="text-lg">Study Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden h-full flex flex-col">
              <Tabs defaultValue="subjects" className="w-full h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="subjects" className="text-xs">
                    <BookOpen className="h-4 w-4 mr-1" /> Subjects
                  </TabsTrigger>
                  <TabsTrigger value="topics" className="text-xs">
                    <LayoutList className="h-4 w-4 mr-1" /> Topics
                  </TabsTrigger>
                  <TabsTrigger value="history" className="text-xs">
                    <History className="h-4 w-4 mr-1" /> History
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex-grow overflow-y-auto p-4">
                  <TabsContent value="subjects" className="m-0">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm text-gray-500">
                        For {examGoal}
                      </h3>
                      {subjects.map(subject => (
                        <Button
                          key={subject}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => setMessage(`Help me understand ${subject} concepts for ${examGoal}`)}
                        >
                          {subject}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="topics" className="m-0">
                    <div className="space-y-4">
                      {subjects.map(subject => (
                        <div key={subject} className="space-y-2">
                          <h3 className="font-medium text-sm text-gray-500">{subject}</h3>
                          <div className="flex flex-wrap gap-2">
                            {topics[subject as keyof typeof topics]?.map(topic => (
                              <Badge 
                                key={topic} 
                                variant="outline"
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => setMessage(`Explain ${topic} in ${subject}`)}
                              >
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="m-0">
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>Your recent chat history will appear here</p>
                      <div className="py-8 text-center">
                        <History className="h-12 w-12 mx-auto text-gray-300" />
                        <p className="mt-2">No recent history</p>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Main chat area */}
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-[600px] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" alt="AI Tutor" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">AI Tutor</CardTitle>
                    <p className="text-xs text-blue-100">Always online</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                  <Sparkles className="h-4 w-4 mr-1" />
                  New Chat
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 flex flex-col h-[calc(600px-56px)]">
              {/* Chat messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {chatMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.content}
                      <div 
                        className={`text-xs mt-1 ${
                          msg.type === 'user' ? 'text-indigo-200' : 'text-gray-500'
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your question here..." 
                    value={message} 
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setMessage("Help me solve this problem step by step")}
                    className="text-xs"
                  >
                    <Brain className="h-3 w-3 mr-1" />
                    Help me solve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setMessage("Explain this concept with examples")}
                    className="text-xs"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Explain with examples
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setMessage(`What topics should I focus on for ${examGoal}?`)}
                    className="text-xs"
                  >
                    Study tips
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChatTutor;
