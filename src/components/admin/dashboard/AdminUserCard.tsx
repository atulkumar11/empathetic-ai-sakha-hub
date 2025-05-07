
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, MessageSquare, FileText, ArrowRight } from "lucide-react";

interface AdminUserCardProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
    lastActive?: string;
  };
  onSettingsClick?: () => void;
  onMessageClick?: () => void;
  onActivityClick?: () => void;
}

const AdminUserCard: React.FC<AdminUserCardProps> = ({ 
  user,
  onSettingsClick,
  onMessageClick,
  onActivityClick
}) => {
  return (
    <Card className="overflow-hidden">
      {/* Card header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-white text-purple-600">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-white">
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-sm text-white/90">{user.role}</p>
            <p className="text-xs text-white/70 mt-1">{user.email}</p>
          </div>
        </div>
      </div>
      
      {/* Solid background content area */}
      <CardContent className="p-4 bg-white dark:bg-gray-800">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>Last active: {user.lastActive || 'Today, 10:42 AM'}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={onSettingsClick}
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Settings</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={onMessageClick}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Message</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={onActivityClick}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Activity</span>
          </Button>
        </div>
        
        <Button 
          className="w-full mt-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          size="sm"
          onClick={onActivityClick}
        >
          View Full Profile <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminUserCard;
