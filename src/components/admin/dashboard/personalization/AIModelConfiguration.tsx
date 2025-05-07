
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AIModelConfiguration = () => {
  const { toast } = useToast();
  
  const handleConfigureModel = (modelName: string) => {
    toast({
      title: `Configure ${modelName}`,
      description: `Opening configuration panel for ${modelName}`,
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "Model Configured",
        description: `${modelName} has been configured successfully`,
        variant: "default"
      });
    }, 1500);
  };
  
  const handleTuneModel = () => {
    toast({
      title: "Tune Model",
      description: "Connecting to Flask environment for model tuning...",
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "Model Tuned",
        description: "Mood Analysis model has been tuned successfully",
        variant: "default"
      });
    }, 2000);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">AI Module</th>
            <th className="text-left py-3 px-4 font-medium">Current Model</th>
            <th className="text-left py-3 px-4 font-medium">Accuracy</th>
            <th className="text-left py-3 px-4 font-medium">Latency</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">Learning Style Detector</td>
            <td className="py-3 px-4">GPT-4 + Custom Classifier</td>
            <td className="py-3 px-4">92%</td>
            <td className="py-3 px-4">1.2s</td>
            <td className="py-3 px-4">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
            </td>
            <td className="py-3 px-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleConfigureModel("Learning Style Detector")}
              >
                Configure
              </Button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">Study Planner</td>
            <td className="py-3 px-4">GPT-4 + Scheduling Algorithm</td>
            <td className="py-3 px-4">86%</td>
            <td className="py-3 px-4">2.4s</td>
            <td className="py-3 px-4">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
            </td>
            <td className="py-3 px-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleConfigureModel("Study Planner")}
              >
                Configure
              </Button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">Mood Analysis</td>
            <td className="py-3 px-4">Sentiment Model v2</td>
            <td className="py-3 px-4">78%</td>
            <td className="py-3 px-4">0.8s</td>
            <td className="py-3 px-4">
              <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Needs Tuning</span>
            </td>
            <td className="py-3 px-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleTuneModel}
              >
                Tune Model
              </Button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">Doubt Resolver</td>
            <td className="py-3 px-4">GPT-4 + KB Integration</td>
            <td className="py-3 px-4">94%</td>
            <td className="py-3 px-4">1.8s</td>
            <td className="py-3 px-4">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
            </td>
            <td className="py-3 px-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleConfigureModel("Doubt Resolver")}
              >
                Configure
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AIModelConfiguration;
