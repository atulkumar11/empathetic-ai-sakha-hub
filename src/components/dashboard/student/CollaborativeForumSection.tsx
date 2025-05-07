
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Plus, MessageCircle, Calendar, Clock, ThumbsUp, Users, Crown } from "lucide-react";

export const CollaborativeForumSection = () => {
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      topic: "Understanding Quantum Mechanics",
      subject: "Physics",
      concept: "Wave-Particle Duality",
      creator: "Alex Johnson",
      participants: 8,
      messages: 23,
      lastActive: "2 hours ago",
      premium: true
    },
    {
      id: 2,
      topic: "Constitutional Law Interpretation",
      subject: "Law",
      concept: "Judicial Review",
      creator: "Sarah Williams",
      participants: 12,
      messages: 45,
      lastActive: "1 day ago",
      premium: false
    },
    {
      id: 3,
      topic: "Advanced Calculus Problems",
      subject: "Mathematics",
      concept: "Integration Techniques",
      creator: "Michael Chen",
      participants: 6,
      messages: 17,
      lastActive: "3 hours ago",
      premium: true
    },
    {
      id: 4,
      topic: "Cellular Respiration",
      subject: "Biology",
      concept: "Krebs Cycle",
      creator: "Priya Patel",
      participants: 9,
      messages: 31,
      lastActive: "5 hours ago",
      premium: false
    }
  ]);

  const [newDiscussion, setNewDiscussion] = useState({
    topic: "",
    subject: "",
    concept: "",
    participants: []
  });

  const handleCreateDiscussion = () => {
    // In a real app, this would handle the creation of a new discussion
    console.log("Creating new discussion:", newDiscussion);
    // Reset form
    setNewDiscussion({
      topic: "",
      subject: "",
      concept: "",
      participants: []
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Collaborative Forum</h2>
          <p className="text-muted-foreground">Connect and learn with peers in focused discussion groups</p>
        </div>
        <Button className="bg-gradient-to-r from-violet-500 to-purple-600">
          <Plus className="mr-2 h-4 w-4" /> Create Discussion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{discussion.topic}</CardTitle>
                {discussion.premium && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    <Crown className="h-3 w-3 mr-1" /> Premium
                  </Badge>
                )}
              </div>
              <CardDescription>
                {discussion.subject} · {discussion.concept}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${discussion.creator}`} />
                  <AvatarFallback>{discussion.creator[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">Started by {discussion.creator}</span>
              </div>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{discussion.participants}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{discussion.messages}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{discussion.lastActive}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Join Discussion
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Create New Discussion</CardTitle>
          <CardDescription>Start a collaborative learning session with peers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium">Discussion Topic</label>
            <Input
              id="topic"
              placeholder="Enter the main topic of discussion"
              value={newDiscussion.topic}
              onChange={(e) => setNewDiscussion({...newDiscussion, topic: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input
                id="subject"
                placeholder="e.g., Physics, Mathematics"
                value={newDiscussion.subject}
                onChange={(e) => setNewDiscussion({...newDiscussion, subject: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="concept" className="text-sm font-medium">Concept/Topic</label>
              <Input
                id="concept"
                placeholder="Specific concept within the subject"
                value={newDiscussion.concept}
                onChange={(e) => setNewDiscussion({...newDiscussion, concept: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="participants" className="text-sm font-medium">Invite Participants (Optional)</label>
            <Input
              id="participants"
              placeholder="Enter user IDs separated by commas"
            />
            <p className="text-xs text-muted-foreground">
              Users will need to approve joining the discussion
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateDiscussion} className="w-full bg-gradient-to-r from-violet-500 to-purple-600">
            Create Discussion Group
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
