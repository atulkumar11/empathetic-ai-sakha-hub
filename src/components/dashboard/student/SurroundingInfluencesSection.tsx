
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CustomProgress } from "@/components/ui/custom-progress";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  ChevronUp, 
  ChevronDown, 
  Share2, 
  MessageCircle, 
  PlusCircle,
  ArrowRight,
  MapPin,
  Tv,
  Home,
  Send,
  Brain,
  Target,
  LineChart,
  Heart,
  Clock
} from "lucide-react";

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

interface InfluenceFactors {
  title: string;
  icon: React.ReactNode;
  value: number;
  change: number;
  insight: string;
  color: string;
  trend: 'up' | 'down' | 'neutral';
  sakhaFeedback: string;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed,
}) => {
  const [showStoryDialog, setShowStoryDialog] = useState(false);
  const [story, setStory] = useState("");
  const [showCommunityStories, setShowCommunityStories] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  // Mock data for the influences based on the 6 factors
  const influenceFactors: InfluenceFactors[] = [
    {
      title: "Peer Pulse",
      icon: <Users size={18} className="text-blue-500" />,
      value: 75,
      change: 12,
      trend: "up",
      insight: "Your completion rate is 15% higher than your peer group",
      color: "bg-blue-500",
      sakhaFeedback: "You're in sync with 80% of your peers on Physics topics. Consider joining the group discussion on Thermodynamics!"
    },
    {
      title: "Doubt & Distraction",
      icon: <Brain size={18} className="text-purple-500" />,
      value: 42,
      change: -8,
      trend: "down",
      insight: "Distractions decreased this week - great improvement!",
      color: "bg-purple-500",
      sakhaFeedback: "You've raised fewer doubts this week. Don't hesitate to ask questions - it's a sign of growth!"
    },
    {
      title: "Confidence Meter",
      icon: <LineChart size={18} className="text-green-500" />,
      value: 68,
      change: 5,
      trend: "up",
      insight: "Your self-assessment is getting closer to your actual performance",
      color: "bg-green-500",
      sakhaFeedback: "Your confidence in Chemistry is rising! You scored 15% higher than you predicted."
    },
    {
      title: "Self-Direction",
      icon: <Target size={18} className="text-amber-500" />,
      value: 83,
      change: 7,
      trend: "up",
      insight: "You've completed 83% of self-assigned tasks this week",
      color: "bg-amber-500",
      sakhaFeedback: "You followed through on 5/6 study sessions. Want help planning the next challenge?"
    },
    {
      title: "Aspirations",
      icon: <GraduationCap size={18} className="text-indigo-500" />,
      value: 35,
      change: 15,
      trend: "up",
      insight: "You're exploring more career paths related to your subjects",
      color: "bg-indigo-500",
      sakhaFeedback: "You've explored Engineering careers 3 times. Would you like to hear from a recent IIT graduate?"
    },
    {
      title: "Support System",
      icon: <Heart size={18} className="text-pink-500" />,
      value: 62,
      change: -3,
      trend: "down",
      insight: "Your mood has been mostly positive with some fluctuations",
      color: "bg-pink-500",
      sakhaFeedback: "Your mood has dipped slightly. Would you like some stress-relief activities or a quick chat with Sakha?"
    }
  ];
  
  // Mock community stories
  const communityStories = [
    {
      id: "story1",
      author: "Ravi K.",
      content: "Creating a dedicated study space at home transformed my learning experience. I converted a small corner of my room with proper lighting, a comfortable chair, and zero distractions. My concentration has improved by 70%!",
      timestamp: "2 hours ago",
      likes: 24
    },
    {
      id: "story2",
      author: "Priya M.",
      content: "My family constantly interrupted my study time, affecting my preparation for NEET. I had an honest conversation with them about my goals and we set up 'do not disturb' hours. It's been a game-changer for my focus!",
      timestamp: "1 day ago",
      likes: 37
    },
    {
      id: "story3",
      author: "Aditya S.",
      content: "The competitive atmosphere at my coaching center was causing extreme anxiety. I started supplementing with online courses where I could learn at my own pace. Now I get the best of both worlds!",
      timestamp: "3 days ago",
      likes: 56
    }
  ];
  
  const handlePostStory = () => {
    if (!story.trim()) {
      toast({
        title: "Story cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Story posted!",
      description: "Thank you for sharing your experience.",
    });
    
    setStory("");
    setShowStoryDialog(false);
    
    // Here you would typically save the story to your backend
    // For now, we'll just simulate by storing it to localStorage
    const existingStories = JSON.parse(localStorage.getItem("influenceStories") || "[]");
    existingStories.push({
      id: Date.now().toString(),
      author: "You",
      content: story,
      timestamp: "Just now",
      likes: 0
    });
    localStorage.setItem("influenceStories", JSON.stringify(existingStories));
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-lg">Surrounding Influences</CardTitle>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs bg-white dark:bg-gray-800 border-blue-200"
                onClick={() => setShowCommunityStories(true)}
              >
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                Community Stories
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs bg-white dark:bg-gray-800 border-blue-200"
                onClick={() => setShowStoryDialog(true)}
              >
                <Share2 className="h-3.5 w-3.5 mr-1" />
                Share Your Story
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
                className="text-xs"
              >
                {influenceMeterCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <AnimatePresence>
          {!influenceMeterCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="p-4">
                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Detailed Metrics</TabsTrigger>
                    <TabsTrigger value="sakha">Sakha's Feedback</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {influenceFactors.map((factor, index) => (
                        <motion.div 
                          key={factor.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                              {factor.icon}
                            </div>
                            <h3 className="font-medium text-sm">{factor.title}</h3>
                            
                            <Badge 
                              variant="outline" 
                              className={`ml-auto ${
                                factor.trend === 'up' 
                                  ? 'text-green-700 bg-green-50 dark:bg-green-900/20' 
                                  : factor.trend === 'down' 
                                    ? 'text-red-700 bg-red-50 dark:bg-red-900/20' 
                                    : 'text-gray-700 bg-gray-50 dark:bg-gray-700'
                              }`}
                            >
                              {factor.change > 0 ? '+' : ''}{factor.change}%
                            </Badge>
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                              <span className="text-xs font-medium">{factor.value}%</span>
                            </div>
                            <CustomProgress 
                              value={factor.value} 
                              className="h-1.5" 
                              indicatorClassName={factor.color}
                            />
                          </div>
                          
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                            {factor.insight}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Weekly Influence Summary</span>
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Your environment is mostly positive this week! Your peer engagement and self-direction have improved significantly. 
                        Consider addressing the slight dip in your support system by connecting with study groups or mentors.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details">
                    <div className="space-y-6">
                      {influenceFactors.map((factor, index) => (
                        <div key={factor.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                              {factor.icon}
                            </div>
                            <div>
                              <h3 className="font-medium">{factor.title}</h3>
                              <p className="text-xs text-gray-500">Updated today</p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`ml-auto ${
                                factor.trend === 'up' 
                                  ? 'text-green-700 bg-green-50 dark:bg-green-900/20' 
                                  : factor.trend === 'down' 
                                    ? 'text-red-700 bg-red-50 dark:bg-red-900/20' 
                                    : 'text-gray-700 bg-gray-50 dark:bg-gray-700'
                              }`}
                            >
                              {factor.change > 0 ? '+' : ''}{factor.change}%
                            </Badge>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Current Level</span>
                              <span className="font-medium">{factor.value}%</span>
                            </div>
                            <CustomProgress 
                              value={factor.value} 
                              className="h-2" 
                              indicatorClassName={factor.color}
                            />
                          </div>
                          
                          {index % 2 === 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3">
                                <h4 className="text-xs font-medium mb-1">Quantitative Data</h4>
                                <ul className="text-xs space-y-1">
                                  {index === 0 && (
                                    <>
                                      <li>• Peer completion: 60%</li>
                                      <li>• Peer average score: 72%</li>
                                      <li>• Engagement overlap: 85%</li>
                                    </>
                                  )}
                                  {index === 2 && (
                                    <>
                                      <li>• Self-rating vs actual: +15%</li>
                                      <li>• Confidence trend: Improving</li>
                                      <li>• Subject confidence: Chemistry ↑</li>
                                    </>
                                  )}
                                  {index === 4 && (
                                    <>
                                      <li>• Career exploration: 8 sessions</li>
                                      <li>• Mentor interactions: 3</li>
                                      <li>• Aspirational content: 12 views</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3">
                                <h4 className="text-xs font-medium mb-1">Qualitative Insights</h4>
                                <ul className="text-xs space-y-1">
                                  {index === 0 && (
                                    <>
                                      <li>• Learning style matches peers</li>
                                      <li>• Group discussions beneficial</li>
                                      <li>• Compare notes more often</li>
                                    </>
                                  )}
                                  {index === 2 && (
                                    <>
                                      <li>• Growing clarity in goals</li>
                                      <li>• Better self-assessment</li>
                                      <li>• NEET readiness improving</li>
                                    </>
                                  )}
                                  {index === 4 && (
                                    <>
                                      <li>• Interest in medical research</li>
                                      <li>• Drawn to teaching fields</li>
                                      <li>• Looking for role models</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3">
                                <h4 className="text-xs font-medium mb-1">Quantitative Data</h4>
                                <ul className="text-xs space-y-1">
                                  {index === 1 && (
                                    <>
                                      <li>• Doubts raised: 5/week</li>
                                      <li>• Distraction time: 45 min/day</li>
                                      <li>• Forum posts: 3</li>
                                    </>
                                  )}
                                  {index === 3 && (
                                    <>
                                      <li>• Study plan adherence: 83%</li>
                                      <li>• Task completion: 78%</li>
                                      <li>• Initiative score: 8.5/10</li>
                                    </>
                                  )}
                                  {index === 5 && (
                                    <>
                                      <li>• Mood rating: 3.8/5</li>
                                      <li>• Consistent logging: 86%</li>
                                      <li>• Support check-ins: 4</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3">
                                <h4 className="text-xs font-medium mb-1">Qualitative Insights</h4>
                                <ul className="text-xs space-y-1">
                                  {index === 1 && (
                                    <>
                                      <li>• Confidence improving in asking</li>
                                      <li>• Evening distractions higher</li>
                                      <li>• Mobile is primary distractor</li>
                                    </>
                                  )}
                                  {index === 3 && (
                                    <>
                                      <li>• Setting achievable goals</li>
                                      <li>• Good follow-through habits</li>
                                      <li>• Morning planning effective</li>
                                    </>
                                  )}
                                  {index === 5 && (
                                    <>
                                      <li>• Journal shows minor stress</li>
                                      <li>• Family support consistent</li>
                                      <li>• Weekend mood improvement</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sakha">
                    <div className="grid grid-cols-1 gap-4">
                      {influenceFactors.map((factor) => (
                        <motion.div
                          key={factor.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center">
                              <span className="font-medium">S</span>
                            </div>
                            <div>
                              <h3 className="font-medium mb-1 flex items-center">
                                <span className="mr-2">About your {factor.title}</span>
                                {factor.icon}
                              </h3>
                              <p className="text-sm">{factor.sakhaFeedback}</p>
                              <div className="mt-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mr-2 text-xs bg-white/80 dark:bg-gray-800/50"
                                >
                                  Tell Me More
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-xs bg-white/80 dark:bg-gray-800/50"
                                >
                                  Ask Sakha
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30 mt-2">
                        <h3 className="font-medium mb-2">Sakha's Weekly Summary</h3>
                        <p className="text-sm">
                          You're making excellent progress! Your confidence is growing, and your self-direction skills are impressive. 
                          I notice you might benefit from more peer collaboration and support. Would you like me to suggest some study groups 
                          or stress-management techniques?
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            Yes, Show Me Options
                          </Button>
                          <Button variant="outline" size="sm">
                            Maybe Later
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      
      {/* Share Story Dialog */}
      <Dialog open={showStoryDialog} onOpenChange={setShowStoryDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Share Your Story</DialogTitle>
            <DialogDescription>
              Let others know how external factors are affecting your studies. Your story might help someone else!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Type your story here... What's influencing your study habits right now?"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={5}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter className="flex flex-row items-center space-x-2 justify-end">
            <Button variant="outline" onClick={() => setShowStoryDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handlePostStory}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <Send className="h-4 w-4 mr-1" />
              Post Story
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Community Stories Dialog */}
      <Dialog open={showCommunityStories} onOpenChange={setShowCommunityStories}>
        <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Community Stories</DialogTitle>
            <DialogDescription>
              Learn how others are managing their surrounding influences
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {communityStories.map((story) => (
              <div key={story.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-medium">
                      {story.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{story.author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{story.timestamp}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {story.likes} helpful
                  </Badge>
                </div>
                <p className="text-sm">{story.content}</p>
                <div className="flex items-center justify-end mt-3 gap-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <MessageCircle className="h-3.5 w-3.5 mr-1" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                    <ArrowRight className="h-3.5 w-3.5 mr-1" />
                    Apply to My Situation
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setShowStoryDialog(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Share Your Story
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SurroundingInfluencesSection;
