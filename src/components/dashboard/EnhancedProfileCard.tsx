
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { File, Upload } from 'lucide-react';

interface SkillRating {
  name: string;
  level: number;
  category?: string;
}

interface EnhancedProfileCardProps {
  profile: UserProfileBase;
  onUploadImage?: (file: File) => void;
  showPeerRanking?: boolean;
  skills?: SkillRating[];
  currentMood?: MoodType | string;
  onMoodChange?: (mood: MoodType) => void;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({ 
  profile, 
  onUploadImage,
  showPeerRanking = false,
  skills = [],
  currentMood,
  onMoodChange
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadHover, setUploadHover] = useState(false);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage) {
      onUploadImage(file);
    }
  };
  
  // Function to generate user initials from name
  const getInitials = (name: string): string => {
    if (!name) return '';
    
    const names = name.trim().split(' ');
    
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'teacher':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'parent':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getSubscriptionBadge = () => {
    const subscription = typeof profile.subscription === 'string' 
      ? profile.subscription 
      : profile.subscription?.planType || 'free';

    switch (subscription) {
      case 'premium':
        return (
          <Badge variant="outline" className="bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 border-amber-400">
            Premium
          </Badge>
        );
      case 'basic':
        return (
          <Badge variant="outline" className="bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 border-blue-400">
            Basic
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
            Free
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 px-6">
        <div className="relative flex flex-col items-center">
          {/* Avatar with optional upload functionality */}
          <div 
            className={cn(
              "relative mb-4 rounded-full overflow-hidden", 
              onUploadImage && "cursor-pointer hover:opacity-90 transition-opacity"
            )}
            onClick={onUploadImage ? handleUploadClick : undefined}
            onMouseEnter={() => setUploadHover(true)}
            onMouseLeave={() => setUploadHover(false)}
          >
            <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-md">
              {profile.avatar ? (
                <AvatarImage src={profile.avatar} alt={profile.name} />
              ) : (
                <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  {getInitials(profile.name)}
                </AvatarFallback>
              )}
            </Avatar>
            
            {onUploadImage && uploadHover && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          
          {/* Name and role */}
          <h3 className="font-bold text-xl mb-1">{profile.name}</h3>
          <div className="flex gap-2 mb-3">
            <Badge className={getRoleColor(profile.role)}>
              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </Badge>
            {getSubscriptionBadge()}
          </div>
          
          {/* Email */}
          <div className="text-sm text-muted-foreground mb-4">{profile.email}</div>
          
          {/* Stats */}
          <div className="w-full grid grid-cols-2 gap-2 text-center mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-2">
              <div className="text-2xl font-bold text-primary">
                {profile.loginCount || 0}
              </div>
              <div className="text-xs text-muted-foreground">Logins</div>
            </div>
            
            {showPeerRanking && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-2">
                <div className="text-2xl font-bold text-primary">
                  Top 15%
                </div>
                <div className="text-xs text-muted-foreground">Peer Ranking</div>
              </div>
            )}
          </div>
          
          {/* Skills (if provided) */}
          {skills && skills.length > 0 && (
            <div className="w-full mb-4">
              <h4 className="text-sm font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <Badge 
                    key={idx}
                    variant="outline" 
                    className="bg-gray-50 dark:bg-gray-800"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Current mood indicator if present */}
          {currentMood && (
            <div className="w-full mt-2">
              <h4 className="text-sm font-medium mb-2">Current Mood</h4>
              <div className={cn(
                "py-1 px-3 rounded-full text-sm text-center",
                currentMood === MoodType.Happy && "bg-yellow-100 text-yellow-800",
                currentMood === MoodType.Motivated && "bg-green-100 text-green-800",
                currentMood === MoodType.Focused && "bg-blue-100 text-blue-800",
                currentMood === MoodType.Calm && "bg-teal-100 text-teal-800",
                currentMood === MoodType.Tired && "bg-orange-100 text-orange-800",
                currentMood === MoodType.Confused && "bg-amber-100 text-amber-800",
                currentMood === MoodType.Anxious && "bg-purple-100 text-purple-800",
                currentMood === MoodType.Stressed && "bg-red-100 text-red-800",
                currentMood === MoodType.Overwhelmed && "bg-pink-100 text-pink-800",
                currentMood === MoodType.Neutral && "bg-gray-100 text-gray-800",
                currentMood === MoodType.Okay && "bg-indigo-100 text-indigo-800",
                currentMood === MoodType.Sad && "bg-blue-100 text-blue-800",
              )}>
                {typeof currentMood === 'string' ? 
                  currentMood.charAt(0).toUpperCase() + currentMood.slice(1) : 
                  currentMood}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center py-4">
        {profile.role === 'student' && (
          <Button variant="outline" size="sm" className="w-full">
            <File className="mr-2 h-4 w-4" />
            View Full Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EnhancedProfileCard;
