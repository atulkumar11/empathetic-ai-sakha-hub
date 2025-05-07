
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText,
  Book,
  FileSpreadsheet,
  GraduationCap
} from "lucide-react";
import { ContentType } from "@/types/content";

// Import the new component files
import ContentManagementHeader from "./content/ContentManagementHeader";
import ContentSummaryCards from "./content/ContentSummaryCards";
import TabContentApprovalQueue from "./content/TabContentApprovalQueue";
import TabContentStudyMaterials from "./content/TabContentStudyMaterials";
import TabContentPrompts from "./content/TabContentPrompts";

const ContentManagementTab = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("queue");
  
  const handleUpload = () => {
    toast({
      title: "Upload Content",
      description: "Upload panel opened for content files",
      variant: "default"
    });
  };
  
  const handleCreateContent = () => {
    toast({
      title: "Create Content",
      description: "Content creation wizard launched",
      variant: "default"
    });
  };
  
  const handleManageContent = (contentType: string) => {
    toast({
      title: `Manage ${contentType}`,
      description: `Opening ${contentType} management interface`,
      variant: "default"
    });
  };
  
  const handleEditPrompt = (promptType: string) => {
    toast({
      title: "Edit Prompt",
      description: `Opening prompt editor for ${promptType}`,
      variant: "default"
    });
  };
  
  const handleManageAllPrompts = () => {
    toast({
      title: "Manage All Prompts",
      description: "Opening comprehensive prompt management interface",
      variant: "default"
    });
  };

  const handleTestContentGeneration = () => {
    toast({
      title: "Testing Content Generation",
      description: "Connecting to Flask environment to test content generation...",
      variant: "default"
    });
    
    // Simulate testing process
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: "Content generation algorithm tested successfully",
        variant: "default"
      });
    }, 2000);
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Saving Settings",
      description: "Content management settings have been saved",
      variant: "default"
    });
  };
  
  const handleResetSettings = () => {
    toast({
      title: "Reset Settings",
      description: "Content management settings have been reset to defaults",
      variant: "default"
    });
  };
  
  const handleContentAction = (action: string, title: string) => {
    toast({
      title: `${action} Content`,
      description: `${action} action performed on "${title}"`,
      variant: "default"
    });
  };

  const handleTagManagement = () => {
    toast({
      title: "Tag Management",
      description: "Tag management feature opened."
    });
  };

  const handlePromptTuning = () => {
    toast({
      title: "Prompt Tuning",
      description: "GPT Prompt tuning dialog opened."
    });
  };

  // This function converts string to ContentType to fix the type mismatch
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <ContentManagementHeader 
        handleUpload={handleUpload}
        handleCreateContent={handleCreateContent}
        handleTagManagement={handleTagManagement}
        handlePromptTuning={handlePromptTuning}
        handleContentGeneration={handleTestContentGeneration}
      />
      
      <Card>
        <CardContent className="pt-6">
          <ContentSummaryCards handleManageContent={handleManageContent} />

          <Tabs defaultValue="queue" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4 grid w-full grid-cols-3 gap-2">
              <TabsTrigger value="queue">Approval Queue</TabsTrigger>
              <TabsTrigger value="studyMaterials">Study Materials</TabsTrigger>
              <TabsTrigger value="prompts">GPT Prompt Tuner</TabsTrigger>
            </TabsList>

            {/* Approval Queue Tab */}
            <TabsContent value="queue">
              <TabContentApprovalQueue handleContentAction={handleContentAction} />
            </TabsContent>

            {/* Study Materials Tab */}
            <TabsContent value="studyMaterials">
              <TabContentStudyMaterials 
                handleUpload={handleUpload} 
                handleContentAction={handleContentAction} 
              />
            </TabsContent>

            {/* GPT Prompt Tuner Tab */}
            <TabsContent value="prompts">
              <TabContentPrompts 
                handleEditPrompt={handleEditPrompt}
                handleManageAllPrompts={handleManageAllPrompts}
                handleTestContentGeneration={handleTestContentGeneration}
                handleSaveSettings={handleSaveSettings}
                handleResetSettings={handleResetSettings}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementTab;
