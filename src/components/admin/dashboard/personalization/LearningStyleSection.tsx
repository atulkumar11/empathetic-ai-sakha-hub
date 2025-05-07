
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const LearningStyleSection = () => {
  const { toast } = useToast();
  
  const handleViewClusters = () => {
    toast({
      title: "Learning Style Clusters",
      description: "Opening learning style clustering visualization",
      variant: "default"
    });
  };
  
  const handleAdjustQuestions = () => {
    toast({
      title: "Adjust Questions",
      description: "Opening question adjustment interface for learning style detection",
      variant: "default"
    });
  };
  
  const handleConfigure = () => {
    toast({
      title: "Configure Learning Styles",
      description: "Opening configuration panel for learning style detection",
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "Configuration Saved",
        description: "Learning style detection configuration updated",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Learning Style Detection</span>
          <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Learning Style Distribution</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Visual:</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold">42%</span>
                  <span className="text-xs text-green-600">+5%</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Auditory:</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold">28%</span>
                  <span className="text-xs text-red-600">-2%</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Reading:</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold">15%</span>
                  <span className="text-xs text-green-600">+1%</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Kinesthetic:</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold">15%</span>
                  <span className="text-xs text-red-600">-4%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleViewClusters}>View Clusters</Button>
            <Button variant="outline" size="sm" onClick={handleAdjustQuestions}>Adjust Questions</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningStyleSection;
