
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Joke {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  setup: string;
  punchline: string;
  category: string;
  likes: number;
  timestamp?: string;
}

const mockJokes: Joke[] = [
  {
    id: '1',
    user: { name: 'Rahul K.', avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png' },
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!",
    category: 'Science',
    likes: 89,
    timestamp: '2 days ago'
  },
  {
    id: '2',
    user: { name: 'Anjali T.', avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png' },
    setup: "What did the mathematics book say to the pencil?",
    punchline: "I've got a lot of problems!",
    category: 'Math',
    likes: 76,
    timestamp: '3 days ago'
  },
  {
    id: '3',
    user: { name: 'Priya M.', avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png' },
    setup: "What did the biology student say when class finished?",
    punchline: "It's time to go homo sapien!",
    category: 'Science',
    likes: 45,
    timestamp: '5 days ago'
  },
];

export const JokesPanel: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>(mockJokes);
  const [showPunchline, setShowPunchline] = useState<Record<string, boolean>>({});
  const [likedJokes, setLikedJokes] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const togglePunchline = (id: string) => {
    setShowPunchline(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLike = (id: string) => {
    if (likedJokes[id]) return;

    setJokes(prevJokes => 
      prevJokes.map(joke => 
        joke.id === id ? { ...joke, likes: joke.likes + 1 } : joke
      )
    );

    setLikedJokes(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleShareJoke = (joke: Joke) => {
    const jokeText = `${joke.setup} - ${joke.punchline}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Funny Joke from PREPZR',
        text: jokeText,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Joke shared successfully!",
          description: "You've shared the joke with your friends.",
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        fallbackShare(jokeText);
      });
    } else {
      fallbackShare(jokeText);
    }
  };

  const fallbackShare = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Joke copied to clipboard",
          description: "You can now paste and share it with your friends.",
        });
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        toast({
          title: "Couldn't copy joke",
          description: "Please try selecting and copying the text manually.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Community Jokes</h3>
        <Button variant="outline" size="sm">Share Your Joke</Button>
      </div>
      
      <div className="space-y-4">
        {jokes.map((joke) => (
          <Card key={joke.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarImage src={joke.user.avatar} alt={joke.user.name} />
                <AvatarFallback>{joke.user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{joke.user.name}</p>
                <p className="text-xs text-muted-foreground">{joke.timestamp}</p>
              </div>
              <Badge variant="outline" className="ml-auto">{joke.category}</Badge>
            </div>
            
            <p className="text-lg font-medium mb-2">{joke.setup}</p>
            
            {showPunchline[joke.id] ? (
              <p className="italic text-primary">{joke.punchline}</p>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary" 
                onClick={() => togglePunchline(joke.id)}
              >
                Reveal punchline
              </Button>
            )}
            
            <div className="flex justify-end mt-3 gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleShareJoke(joke)}
                className="flex items-center gap-1"
              >
                <Share size={16} />
                <span>Share</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex items-center gap-1 ${likedJokes[joke.id] ? 'text-primary' : ''}`}
                onClick={() => handleLike(joke.id)}
                disabled={likedJokes[joke.id]}
              >
                <ThumbsUp size={16} />
                <span>{joke.likes}</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JokesPanel;
