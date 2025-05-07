
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const StudyPlanSection = () => {
  const { toast } = useToast();
  
  const handleViewPlans = () => {
    toast({
      title: "Study Plans",
      description: "Opening study plan management interface",
      variant: "default"
    });
  };
  
  const handleAdjustTemplates = () => {
    toast({
      title: "Adjust Plan Templates",
      description: "Opening template adjustment interface for study plans",
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "Templates Updated",
        description: "Study plan templates have been updated successfully",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Study Plan Generator</span>
          <Button variant="outline" size="sm" onClick={handleViewPlans}>View Plans</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Plan Generation Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Plans Generated:</span>
                <p className="font-bold">845</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Adherence:</span>
                <p className="font-bold">74%</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Modifications:</span>
                <p className="font-bold">186</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <span className="text-sm text-gray-600">Avg Rating:</span>
                <p className="font-bold">4.2/5</p>
              </div>
            </div>
          </div>
          <Button size="sm" onClick={handleAdjustTemplates}>Adjust Plan Templates</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlanSection;
