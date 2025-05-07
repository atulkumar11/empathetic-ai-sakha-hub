
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  SmilePlus, AlertCircle, Bell, Settings, 
  Lightbulb, Heart, BellRing, Edit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const MoodSuggestionSection = () => {
  const { toast } = useToast();
  
  const handleConfigure = () => {
    toast({
      title: "Configure Mood Suggestions",
      description: "Opening configuration interface for mood-based suggestions",
      variant: "default"
    });
  };
  
  const handleTrackAlerts = () => {
    toast({
      title: "Mood Alerts Tracking",
      description: "Opening mood alerts tracking dashboard",
      variant: "default"
    });
  };
  
  const handleTuneEngine = () => {
    toast({
      title: "Tune Emotion Model",
      description: "Starting the tuning process for the lightweight emotion model",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SmilePlus className="text-pink-500" size={20} />
            <span>Mood-Based Suggestions</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Mood Triggers</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-500" />
                  <div>
                    <p className="text-sm font-medium">High Stress Detection</p>
                    <p className="text-xs text-gray-600">Triggers relaxation prompts</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-amber-500" />
                  <div>
                    <p className="text-sm font-medium">Low Motivation</p>
                    <p className="text-xs text-gray-600">Triggers inspirational content</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Positive Mood</p>
                    <p className="text-xs text-gray-600">Triggers productivity suggestions</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <Settings size={16} className="text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Custom Trigger</p>
                    <p className="text-xs text-gray-600">Mood score below 4/10</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Suggestion Templates</h3>
              <Button size="sm" variant="outline" className="h-7 text-xs">Add New</Button>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-amber-500" />
                    <span className="text-sm font-medium">Break Suggestion</span>
                  </div>
                  <Badge variant="secondary">High stress</Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  "I notice you've been studying for 2 hours straight. How about taking a short 5-minute break?"
                </p>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" className="h-7 text-xs flex items-center gap-1">
                    <Edit size={12} /> Edit
                  </Button>
                </div>
              </div>
              
              <div className="p-2 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <BellRing size={16} className="text-blue-500" />
                    <span className="text-sm font-medium">Motivation Boost</span>
                  </div>
                  <Badge variant="secondary">Low motivation</Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  "Remember why you started! You're already 65% through your study plan for the week."
                </p>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" className="h-7 text-xs flex items-center gap-1">
                    <Edit size={12} /> Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Emotion Model</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Model Version</p>
                <p className="font-medium">Lightweight v2.1</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="font-medium">82%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Latency</p>
                <p className="font-medium">0.3s</p>
              </div>
            </div>
            <div className="mt-3 space-x-2 flex">
              <Button variant="outline" size="sm" onClick={handleTuneEngine} className="flex-1">
                Tune Engine
              </Button>
              <Button variant="outline" size="sm" onClick={handleTrackAlerts} className="flex-1">
                Track Alerts
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSuggestionSection;
