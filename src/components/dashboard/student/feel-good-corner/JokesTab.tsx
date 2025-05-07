
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Joke } from "./types";

// Mock data
const mockJokes = [
  { id: 1, content: "Why don't scientists trust atoms? Because they make up everything!", likes: 42, author: "PhysicsNerd" },
  { id: 2, content: "I told my wife she was drawing her eyebrows too high. She looked surprised.", likes: 38, author: "DadJokeMaster" },
  { id: 3, content: "Why did the scarecrow win an award? Because he was outstanding in his field!", likes: 27, author: "FarmLife" },
  { id: 4, content: "I'm reading a book about anti-gravity. It's impossible to put down!", likes: 35, author: "ScienceWiz" },
  { id: 5, content: "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.", likes: 31, author: "MathGeek" },
];

interface JokesTabProps {
  initialJokes?: Joke[];
}

const JokesTab: React.FC<JokesTabProps> = ({ initialJokes = mockJokes }) => {
  const { toast } = useToast();
  const [jokes, setJokes] = useState<Joke[]>(initialJokes);
  const [newJoke, setNewJoke] = useState("");
  const [likedJokes, setLikedJokes] = useState<number[]>([]);
  
  const handleSubmitJoke = () => {
    if (!newJoke.trim()) return;
    
    const newJokeObj = {
      id: jokes.length + 1,
      content: newJoke,
      likes: 0,
      author: "You"
    };
    
    setJokes([newJokeObj, ...jokes]);
    
    toast({
      title: "Joke submitted!",
      description: "Your joke has been added to the collection!",
    });
    
    setNewJoke("");
  };

  const handleLikeJoke = (id: number) => {
    if (likedJokes.includes(id)) {
      // Unlike
      setJokes(jokes.map(joke => 
        joke.id === id ? {...joke, likes: joke.likes - 1} : joke
      ));
      setLikedJokes(likedJokes.filter(jokeId => jokeId !== id));
    } else {
      // Like
      setJokes(jokes.map(joke => 
        joke.id === id ? {...joke, likes: joke.likes + 1} : joke
      ));
      setLikedJokes([...likedJokes, id]);
    }
  };
  
  return (
    <motion.div 
      key="jokes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Today's Top Jokes</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={() => setJokes([...mockJokes])}
          >
            <RefreshCcw size={12} className="mr-1" /> Refresh
          </Button>
        </div>
        
        <ScrollArea className="h-[280px] rounded border p-2">
          <div className="space-y-3">
            {jokes.map((joke) => (
              <motion.div 
                key={joke.id} 
                className="bg-white rounded-lg p-3 shadow-sm border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: joke.id * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-sm mb-2">{joke.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">by @{joke.author}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-7 gap-1 text-xs ${likedJokes.includes(joke.id) ? 'text-pink-500' : ''}`}
                    onClick={() => handleLikeJoke(joke.id)}
                  >
                    <ThumbsUp size={12} />
                    {joke.likes}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="pt-2">
          <p className="text-xs text-gray-500 mb-2">Share your own joke:</p>
          <div className="flex gap-2">
            <Textarea 
              value={newJoke} 
              onChange={(e) => setNewJoke(e.target.value)} 
              placeholder="Type your joke here..."
              className="text-sm min-h-[60px] resize-none"
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button 
              size="sm" 
              className="bg-violet-600 text-xs"
              onClick={handleSubmitJoke}
            >
              Share Joke
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JokesTab;
