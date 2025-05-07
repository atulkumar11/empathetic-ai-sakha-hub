
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdaptiveDifficultySection = () => {
  const { toast } = useToast();
  
  const handleTuneEngine = () => {
    toast({
      title: "Tune Adaptive Engine",
      description: "Opening adaptive difficulty engine tuning interface",
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "Engine Tuned",
        description: "Adaptive difficulty engine has been fine-tuned",
        variant: "default"
      });
    }, 2000);
  };
  
  const handleAdjustThresholds = () => {
    toast({
      title: "Adjust Thresholds",
      description: "Opening threshold adjustment interface for adaptive difficulty",
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Adaptive Difficulty Engine</span>
          <Button variant="outline" size="sm" onClick={handleTuneEngine}>Tune</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium">Current Model</h3>
              <p className="text-sm text-gray-600 mt-1">GPT-4 + Reinforcement</p>
              <div className="mt-2 text-sm">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span>
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium">Performance</h3>
              <p className="text-2xl font-bold text-primary mt-1">92%</p>
              <p className="text-sm text-gray-600">Target accuracy</p>
            </div>
          </div>
          <Button size="sm" onClick={handleAdjustThresholds}>Adjust Thresholds</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptiveDifficultySection;
