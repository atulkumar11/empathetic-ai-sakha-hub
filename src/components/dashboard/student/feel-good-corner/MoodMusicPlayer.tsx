
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, ThumbsUp
} from 'lucide-react';

interface MoodMusicPlayerProps {
  onLike: () => void;
}

const MoodMusicPlayer: React.FC<MoodMusicPlayerProps> = ({ onLike }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const tracks = [
    { 
      title: "Calm Waters", 
      artist: "Mindful Melodies", 
      duration: "3:45", 
      mood: "Relaxing",
      coverUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-relaxing-in-nature-522.mp3"
    },
    { 
      title: "Focus Flow", 
      artist: "Study Beats", 
      duration: "4:12", 
      mood: "Concentrative",
      coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
    },
    { 
      title: "Energy Boost", 
      artist: "Motivation Mix", 
      duration: "3:28", 
      mood: "Energizing",
      coverUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
    }
  ];
  
  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(tracks[currentTrack].audioUrl);
      audioRef.current.volume = volume[0] / 100;
      
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('ended', () => {
        nextTrack();
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', nextTrack);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    // Update audio source when track changes
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = tracks[currentTrack].audioUrl;
      audioRef.current.load();
      setCurrentTime(0);
      
      if (wasPlaying) {
        audioRef.current.play().catch(error => console.error("Playback error:", error));
      }
    }
  }, [currentTrack]);
  
  useEffect(() => {
    // Update volume when slider changes
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);
  
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Playback error:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };
  
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };
  
  const handleTrackProgress = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioRef.current && duration > 0) {
      const progressBar = e.currentTarget;
      const clickPositionInBar = e.clientX - progressBar.getBoundingClientRect().left;
      const percentageClicked = clickPositionInBar / progressBar.offsetWidth;
      const newTime = percentageClicked * duration;
      
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="flex flex-col space-y-4">
      <Card className="overflow-hidden">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-black">
          <img 
            src={tracks[currentTrack].coverUrl} 
            alt={`Cover for ${tracks[currentTrack].title}`}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold">{tracks[currentTrack].title}</h3>
              <p className="text-muted-foreground">{tracks[currentTrack].artist}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {tracks[currentTrack].mood}
                </span>
                <span className="text-sm text-muted-foreground">
                  {tracks[currentTrack].duration}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={prevTrack}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button 
                className="h-14 w-14 rounded-full"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={nextTrack}>
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <div 
              className="h-1 w-full bg-gray-200 rounded-full cursor-pointer"
              onClick={handleTrackProgress}
            >
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <Volume2 className="h-5 w-5 text-muted-foreground" />
            <Slider
              value={volume}
              min={0}
              max={100}
              step={1}
              className="w-32"
              onValueChange={setVolume}
            />
            <span className="text-xs text-muted-foreground">{volume[0]}%</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Music designed to match and enhance your mood
        </p>
        <Button variant="outline" onClick={onLike}>
          <ThumbsUp className="h-4 w-4 mr-2" /> Like This Activity
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {tracks.map((track, index) => (
          <Card 
            key={index} 
            className={`overflow-hidden cursor-pointer transition-all ${
              currentTrack === index ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setCurrentTrack(index)}
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={track.coverUrl} 
                alt={`Cover for ${track.title}`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium">{track.title}</h4>
              <p className="text-sm text-muted-foreground">{track.artist}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  {track.mood}
                </span>
                <span className="text-xs text-muted-foreground">{track.duration}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoodMusicPlayer;
