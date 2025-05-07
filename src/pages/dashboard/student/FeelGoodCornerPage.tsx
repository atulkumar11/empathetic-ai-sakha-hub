
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoodType } from '@/types/user/base';
import { Heart, ThumbsUp, BookOpen, MessageSquare, Music, Video, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Quote {
  text: string;
  author: string;
}

interface Affirmation {
  text: string;
  category: string;
}

interface MoodLog {
  id: number;
  mood: MoodType;
  note: string;
  timestamp: string;
}

interface DiscussionPost {
  id: number;
  author: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  timestamp: string;
  replies: Array<{
    id: number;
    author: string;
    authorAvatar?: string;
    content: string;
    timestamp: string;
  }>;
}

const FeelGoodCornerPage = () => {
  const [activeTab, setActiveTab] = useState('quotes');
  const [currentMood, setCurrentMood] = useState<MoodType>('okay');
  const [moodNote, setMoodNote] = useState('');
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [discussions, setDiscussions] = useState<DiscussionPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    // Mock data for quotes
    const mockQuotes: Quote[] = [
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
      { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
      { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
      { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
    ];
    
    // Mock data for affirmations
    const mockAffirmations: Affirmation[] = [
      { text: "I am capable of solving difficult problems.", category: "Academic" },
      { text: "My mind is clear and focused.", category: "Study" },
      { text: "I am prepared for my exams and confident in my abilities.", category: "Exam" },
      { text: "I learn from my mistakes and grow stronger.", category: "Growth" },
      { text: "I have the power to achieve my goals.", category: "Motivation" },
      { text: "I am getting better every day.", category: "Progress" }
    ];
    
    // Mock data for mood logs
    const mockMoodLogs: MoodLog[] = [
      { id: 1, mood: "happy", note: "Solved a challenging problem set today!", timestamp: "2023-04-01T10:30:00Z" },
      { id: 2, mood: "stressed", note: "Worried about upcoming physics exam.", timestamp: "2023-03-28T18:45:00Z" },
      { id: 3, mood: "motivated", note: "Set new goals for the semester after meeting with advisor.", timestamp: "2023-03-25T14:20:00Z" },
      { id: 4, mood: "tired", note: "Long study session, but made good progress.", timestamp: "2023-03-22T22:10:00Z" }
    ];
    
    // Mock data for discussions
    const mockDiscussions: DiscussionPost[] = [
      {
        id: 1,
        author: "Aman Kumar",
        authorAvatar: "/avatars/01.png",
        content: "What strategies do you use to stay motivated during long study sessions?",
        likes: 8,
        timestamp: "2023-04-02T09:15:00Z",
        replies: [
          {
            id: 101,
            author: "Priya Singh",
            authorAvatar: "/avatars/02.png",
            content: "I use the Pomodoro technique - 25 minutes of focused study followed by a 5 minute break. Works wonders for me!",
            timestamp: "2023-04-02T09:45:00Z"
          },
          {
            id: 102,
            author: "Rahul Sharma",
            authorAvatar: "/avatars/03.png",
            content: "I create a study playlist with instrumental music. The right background sound helps me stay in the zone.",
            timestamp: "2023-04-02T10:20:00Z"
          }
        ]
      },
      {
        id: 2,
        author: "Neha Gupta",
        authorAvatar: "/avatars/04.png",
        content: "Anyone else feel overwhelmed by the JEE syllabus? I'm trying to find a better way to organize my study plan.",
        likes: 12,
        timestamp: "2023-04-01T14:30:00Z",
        replies: [
          {
            id: 201,
            author: "Vikram Iyer",
            authorAvatar: "/avatars/05.png",
            content: "Breaking it down into weekly goals helped me a lot. Start with your weakest subjects and allocate more time to them.",
            timestamp: "2023-04-01T15:05:00Z"
          }
        ]
      }
    ];
    
    setQuotes(mockQuotes);
    setAffirmations(mockAffirmations);
    setMoodLogs(mockMoodLogs);
    setDiscussions(mockDiscussions);
    
    // Try to get saved mood from local storage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
    }
  }, []);
  
  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    
    // Save to localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
    
    toast({
      title: "Mood Updated",
      description: `Your mood has been updated to ${mood}.`
    });
  };
  
  const handleSaveMoodLog = () => {
    if (!moodNote.trim()) {
      toast({
        title: "Empty Note",
        description: "Please enter a note about how you're feeling.",
        variant: "destructive"
      });
      return;
    }
    
    const newLog: MoodLog = {
      id: Date.now(),
      mood: currentMood,
      note: moodNote,
      timestamp: new Date().toISOString()
    };
    
    setMoodLogs([newLog, ...moodLogs]);
    setMoodNote('');
    
    toast({
      title: "Mood Logged",
      description: "Your mood and note have been saved."
    });
  };
  
  const handlePostDiscussion = () => {
    if (!newPost.trim()) {
      toast({
        title: "Empty Post",
        description: "Please enter some content for your post.",
        variant: "destructive"
      });
      return;
    }
    
    const newDiscussion: DiscussionPost = {
      id: Date.now(),
      author: "You",
      content: newPost,
      likes: 0,
      timestamp: new Date().toISOString(),
      replies: []
    };
    
    setDiscussions([newDiscussion, ...discussions]);
    setNewPost('');
    
    toast({
      title: "Post Added",
      description: "Your post has been added to the discussion."
    });
  };
  
  const handleLikePost = (postId: number) => {
    setDiscussions(discussions.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };
  
  const getMoodEmoji = (mood: MoodType) => {
    switch(mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'neutral': return '😐';
      case 'motivated': return '💪';
      case 'anxious': return '😰';
      case 'stressed': return '😓';
      case 'tired': return '😴';
      case 'focused': return '🧠';
      case 'overwhelmed': return '😵';
      case 'curious': return '🤔';
      case 'okay': return '👍';
      default: return '😊';
    }
  };
  
  const getRandomItem = <T extends Quote | Affirmation>(items: T[]): T | undefined => {
    if (!items.length) return undefined;
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a moment to relax, reflect, and refresh your mind"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="overflow-hidden col-span-1 lg:col-span-2">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Mood Tracker
            </CardTitle>
            <CardDescription>Keep track of your emotional well-being and see patterns over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">How are you feeling today?</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2 mb-4">
                {(['happy', 'sad', 'neutral', 'motivated', 'anxious', 'stressed', 'tired', 'focused', 'overwhelmed', 'curious', 'okay'] as MoodType[]).map((mood) => (
                  <Button
                    key={mood}
                    variant={currentMood === mood ? "default" : "outline"}
                    className={`flex flex-col items-center h-auto py-2 ${currentMood === mood ? "bg-gradient-to-r from-pink-500 to-orange-500" : ""}`}
                    onClick={() => handleMoodChange(mood)}
                  >
                    <span className="text-xl mb-1">{getMoodEmoji(mood)}</span>
                    <span className="text-xs capitalize">{mood}</span>
                  </Button>
                ))}
              </div>
              
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a note about how you're feeling... (optional)"
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500"
                  onClick={handleSaveMoodLog}
                >
                  Save Mood Log
                </Button>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Your Mood History</h3>
              <div className="space-y-4">
                {moodLogs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No mood logs yet. Start tracking how you feel!
                  </p>
                ) : (
                  moodLogs.map(log => (
                    <Card key={log.id} className="bg-gray-50 dark:bg-gray-800/50">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="text-2xl">{getMoodEmoji(log.mood)}</div>
                            <div>
                              <p className="font-medium capitalize">{log.mood}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(log.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{log.note}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daily Inspiration</CardTitle>
            <CardDescription>Find motivation for your study journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="quotes" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full mb-4">
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
                <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quotes" className="space-y-4">
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                  <CardContent className="pt-6">
                    <blockquote className="border-l-4 border-purple-500 pl-4 italic">
                      <p className="text-lg mb-2">{getRandomItem(quotes)?.text}</p>
                      <footer className="text-sm text-muted-foreground">
                        — {getRandomItem(quotes)?.author}
                      </footer>
                    </blockquote>
                  </CardContent>
                </Card>
                
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {quotes.map((quote, index) => (
                      <Card key={index} className="border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-4">
                          <blockquote>
                            <p className="text-sm mb-2">{quote.text}</p>
                            <footer className="text-xs text-muted-foreground">
                              — {quote.author}
                            </footer>
                          </blockquote>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="affirmations" className="space-y-4">
                <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-lg font-medium mb-2">{getRandomItem(affirmations)?.text}</p>
                      <p className="text-sm text-muted-foreground">
                        {getRandomItem(affirmations)?.category} Affirmation
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {affirmations.map((affirmation, index) => (
                      <Card key={index} className="border border-gray-200 dark:border-gray-700">
                        <CardContent className="p-4">
                          <div>
                            <p className="text-sm mb-1">{affirmation.text}</p>
                            <p className="text-xs text-muted-foreground">
                              {affirmation.category} Affirmation
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-4">
                <h3 className="font-medium mb-3">Helpful Resources</h3>
                <div className="space-y-3">
                  <Card className="border border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full">
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Study Break Activities</h4>
                        <p className="text-sm text-muted-foreground">Quick activities to refresh your mind between study sessions</p>
                        <Button variant="link" className="text-blue-600 dark:text-blue-400 p-0 h-auto mt-1">Read More</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-purple-200 dark:border-purple-800">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-full">
                        <Music className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Concentration Playlists</h4>
                        <p className="text-sm text-muted-foreground">Curated music to help you focus during study sessions</p>
                        <Button variant="link" className="text-purple-600 dark:text-purple-400 p-0 h-auto mt-1">Listen Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-green-200 dark:border-green-800">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full">
                        <Video className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Mindfulness Videos</h4>
                        <p className="text-sm text-muted-foreground">Short guided meditation videos to reduce stress</p>
                        <Button variant="link" className="text-green-600 dark:text-green-400 p-0 h-auto mt-1">Watch Videos</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-orange-200 dark:border-orange-800">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-full">
                        <Coffee className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Healthy Study Snacks</h4>
                        <p className="text-sm text-muted-foreground">Brain food ideas to keep your energy up</p>
                        <Button variant="link" className="text-orange-600 dark:text-orange-400 p-0 h-auto mt-1">Get Recipes</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Student Discussion Forum
          </CardTitle>
          <CardDescription>Share your experiences and support fellow students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Textarea
              placeholder="Share your thoughts, experiences, or ask a question..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] mb-3"
            />
            <Button 
              onClick={handlePostDiscussion}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Post to Forum
            </Button>
          </div>
          
          <div className="space-y-6">
            {discussions.map((post) => (
              <Card key={post.id} className="border border-gray-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{post.author}</h4>
                        <span className="text-xs text-muted-foreground">{formatDate(post.timestamp)}</span>
                      </div>
                      <p className="mt-1 text-sm">{post.content}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleLikePost(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {post.replies.length > 0 && (
                    <div className="ml-12 mt-4 space-y-4">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.authorAvatar} />
                            <AvatarFallback>{reply.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h5 className="font-medium text-sm">{reply.author}</h5>
                              <span className="text-xs text-muted-foreground">{formatDate(reply.timestamp)}</span>
                            </div>
                            <p className="mt-1 text-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerPage;
