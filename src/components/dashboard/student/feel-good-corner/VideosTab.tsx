
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Video } from "./types";

// Mock data
const mockVideos = [
  { id: 1, title: "When Physics Goes Wrong", thumbnail: "https://source.unsplash.com/random/300x200?comedy", duration: "0:30" },
  { id: 2, title: "Funny Animal Bloopers", thumbnail: "https://source.unsplash.com/random/300x200?animals", duration: "0:27" },
  { id: 3, title: "Study Break Comedy", thumbnail: "https://source.unsplash.com/random/300x200?laugh", duration: "0:30" },
];

interface VideosTabProps {
  initialVideos?: Video[];
}

const VideosTab: React.FC<VideosTabProps> = ({ initialVideos = mockVideos }) => {
  const { toast } = useToast();

  const handlePlayVideo = (id: number) => {
    toast({
      title: "Video playing",
      description: "Enjoy your 30-second laugh break!",
    });
  };
  
  return (
    <motion.div 
      key="videos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="space-y-4">
        <h3 className="font-medium">30-Second Laugh Break</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mockVideos.map((video) => (
            <motion.div 
              key={video.id} 
              className="rounded-lg overflow-hidden border bg-white shadow-sm"
              whileHover={{ y: -2, scale: 1.01 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: video.id * 0.15 }}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white w-10 h-10"
                    onClick={() => handlePlayVideo(video.id)}
                  >
                    <Play className="h-5 w-5 text-violet-700" />
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2 bg-black/50">
                  {video.duration}
                </Badge>
              </div>
              <div className="p-2">
                <h4 className="text-sm font-medium">{video.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Videos are curated based on your preferences and age group.
        </p>
      </div>
    </motion.div>
  );
};

export default VideosTab;
