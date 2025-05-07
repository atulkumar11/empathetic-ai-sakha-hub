
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Settings, Save } from "lucide-react";

// Import all the personalization components
import LearningStyleSection from "../personalization/LearningStyleSection";
import AdaptiveDifficultySection from "../personalization/AdaptiveDifficultySection";
import StudyPlanSection from "../personalization/StudyPlanSection";
import FeelGoodSection from "../personalization/FeelGoodSection";
import AIModelConfiguration from "../personalization/AIModelConfiguration";
import SurroundingInfluencesSection from "../personalization/SurroundingInfluencesSection";
import LearningPulseSection from "../personalization/LearningPulseSection";
import DoubtResponderSection from "../personalization/DoubtResponderSection";
import TutorChatSection from "../personalization/TutorChatSection";
import MoodSuggestionSection from "../personalization/MoodSuggestionSection";
import PeerCommunitySection from "../personalization/PeerCommunitySection";

const AIPersonalizationTab = () => {
  const { toast } = useToast();

  const handleOptimizeAI = () => {
    toast({
      title: "AI Optimization",
      description: "Connecting to Flask environment for AI optimization...",
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "AI Optimization Complete",
        description: "AI models have been optimized successfully",
        variant: "default"
      });
    }, 2000);
  };

  const handleSyncData = () => {
    toast({
      title: "Syncing Data",
      description: "Syncing personalization data with Flask environment...",
      variant: "default"
    });
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      toast({
        title: "Data Synced",
        description: "All personalization data has been synchronized",
        variant: "default"
      });
    }, 1500);
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "All AI personalization settings have been saved successfully",
      variant: "default"
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">AI Personalization Engine</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Configure and manage AI models for personalized learning
          </p>
        </div>
        
        <div className="flex gap-2 self-end sm:self-auto">
          <Button 
            variant="outline" 
            onClick={handleSyncData}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            <span>Sync Data</span>
          </Button>
          
          <Button 
            onClick={handleOptimizeAI}
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700 flex items-center gap-2"
          >
            <Settings size={16} />
            <span>Optimize AI</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <LearningStyleSection />
        <AdaptiveDifficultySection />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StudyPlanSection />
        <FeelGoodSection />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SurroundingInfluencesSection />
        <LearningPulseSection />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DoubtResponderSection />
        <TutorChatSection />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MoodSuggestionSection />
        <PeerCommunitySection />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={() => {
            toast({
              title: "Settings Reset",
              description: "AI personalization settings have been reset to defaults",
              variant: "default"
            });
          }}
        >
          Reset to Defaults
        </Button>
        <Button 
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700"
          onClick={handleSaveSettings}
        >
          <Save size={16} className="mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default AIPersonalizationTab;
