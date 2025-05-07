
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Brain,
  Heart,
  LineChart,
  MessagesSquare,
  Save,
  Settings,
  Timer,
  RefreshCw,
  HelpCircle,
  PanelLeft,
  Lock,
  Lightbulb
} from "lucide-react";

const AIPersonalizationTab = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("learning");
  
  // State for Learning Style Engine
  const [learningStyleEnabled, setLearningStyleEnabled] = useState(true);
  const [learningStyleModel, setLearningStyleModel] = useState("gpt-4");
  const [learningStyleConfidence, setLearningStyleConfidence] = useState([70]);
  const [learningAnalysisFrequency, setLearningAnalysisFrequency] = useState("daily");
  
  // State for Mood Engine
  const [moodEngineEnabled, setMoodEngineEnabled] = useState(true);
  const [moodEngineModel, setMoodEngineModel] = useState("sentimentanalyzer-2.1");
  const [moodEngineFrequency, setMoodEngineFrequency] = useState("session");
  const [moodEnginePromptLevel, setMoodEnginePromptLevel] = useState([60]);
  
  // State for Doubt Responder
  const [doubtResponderEnabled, setDoubtResponderEnabled] = useState(true);
  const [doubtResponderModel, setDoubtResponderModel] = useState("gpt-4");
  const [doubtResponderTone, setDoubtResponderTone] = useState("supportive");
  const [doubtMaxTokens, setDoubtMaxTokens] = useState("2048");
  
  // State for Content Personalization
  const [contentPersonalizationEnabled, setContentPersonalizationEnabled] = useState(true);
  const [contentPersonalizationModel, setContentPersonalizationModel] = useState("content-recommender-1.2");
  const [contentRecommendationFactor, setContentRecommendationFactor] = useState([50]);
  
  const handleSaveSettings = (section: string) => {
    toast({
      title: `${section} Settings Saved`,
      description: `Your ${section.toLowerCase()} settings have been updated successfully.`,
    });
  };
  
  const handleResetToDefaults = (section: string) => {
    toast({
      title: `${section} Settings Reset`,
      description: `${section} settings have been restored to defaults.`,
    });
    
    // Different reset logic based on the section
    switch(section) {
      case "Learning Style":
        setLearningStyleEnabled(true);
        setLearningStyleModel("gpt-4");
        setLearningStyleConfidence([70]);
        setLearningAnalysisFrequency("daily");
        break;
      case "Mood Engine":
        setMoodEngineEnabled(true);
        setMoodEngineModel("sentimentanalyzer-2.1");
        setMoodEngineFrequency("session");
        setMoodEnginePromptLevel([60]);
        break;
      case "Doubt Responder":
        setDoubtResponderEnabled(true);
        setDoubtResponderModel("gpt-4");
        setDoubtResponderTone("supportive");
        setDoubtMaxTokens("2048");
        break;
      case "Content Personalization":
        setContentPersonalizationEnabled(true);
        setContentPersonalizationModel("content-recommender-1.2");
        setContentRecommendationFactor([50]);
        break;
      default:
        break;
    }
  };
  
  const handleConfigureModel = (model: string) => {
    toast({
      title: "Configure Model",
      description: `Opening configuration panel for ${model}...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">AI Personalization</h2>
          <p className="text-muted-foreground">Configure the AI engines that power the personalized learning experience</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Learning Style</span>
          </TabsTrigger>
          <TabsTrigger value="mood" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Mood Engine</span>
          </TabsTrigger>
          <TabsTrigger value="doubt" className="flex items-center gap-2">
            <MessagesSquare className="h-4 w-4" />
            <span>Doubt Responder</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Content Personalization</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Learning Style Engine Tab */}
        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    Learning Style Engine
                  </CardTitle>
                  <CardDescription>
                    Configure the AI that detects and adapts to student learning styles
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Enable</span>
                  <Switch 
                    checked={learningStyleEnabled} 
                    onCheckedChange={setLearningStyleEnabled} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className={learningStyleEnabled ? "" : "opacity-50 pointer-events-none"}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>AI Model</Label>
                    <Select value={learningStyleModel} onValueChange={setLearningStyleModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4 (Advanced)</SelectItem>
                        <SelectItem value="gpt-3">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="custom-learning">Custom Learning Style Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1"
                      onClick={() => handleConfigureModel(learningStyleModel)}
                    >
                      <Settings className="h-3.5 w-3.5 mr-1" /> Configure Model
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Analysis Frequency</Label>
                    <RadioGroup value={learningAnalysisFrequency} onValueChange={setLearningAnalysisFrequency}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="session" id="session" />
                        <Label htmlFor="session">Every Session</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily">Daily Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly">Weekly Analysis</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex justify-between">
                      <Label>Confidence Threshold ({learningStyleConfidence}%)</Label>
                    </div>
                    <Slider
                      value={learningStyleConfidence}
                      onValueChange={setLearningStyleConfidence}
                      min={50}
                      max={95}
                      step={5}
                    />
                    <p className="text-sm text-gray-500">
                      Sets the minimum confidence level required before adapting content to a detected learning style.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-md bg-secondary/50 p-4">
                  <div className="flex gap-2 items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium">How Learning Style Detection Works</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        The Learning Style Engine analyzes student interactions, performance patterns, and content preferences to identify their dominant learning style (visual, auditory, reading/writing, or kinesthetic). This allows Sakha AI to deliver content formats that best match the student's natural learning preferences.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleResetToDefaults("Learning Style")}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  
                  <Button
                    onClick={() => handleSaveSettings("Learning Style")}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Mood Engine Tab */}
        <TabsContent value="mood">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    Mood Engine
                  </CardTitle>
                  <CardDescription>
                    Configure the AI that detects student mood and adapts the approach
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Enable</span>
                  <Switch 
                    checked={moodEngineEnabled} 
                    onCheckedChange={setMoodEngineEnabled} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className={moodEngineEnabled ? "" : "opacity-50 pointer-events-none"}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Mood Detection Model</Label>
                    <Select value={moodEngineModel} onValueChange={setMoodEngineModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sentimentanalyzer-2.1">Sentiment Analyzer 2.1</SelectItem>
                        <SelectItem value="emotiondetect-1.0">Emotion Detect 1.0</SelectItem>
                        <SelectItem value="mood-ml-custom">Custom Mood ML Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1"
                      onClick={() => handleConfigureModel(moodEngineModel)}
                    >
                      <Settings className="h-3.5 w-3.5 mr-1" /> Configure Model
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Detection Frequency</Label>
                    <RadioGroup value={moodEngineFrequency} onValueChange={setMoodEngineFrequency}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="continuous" id="continuous" />
                        <Label htmlFor="continuous">Continuous</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="session" id="session-mood" />
                        <Label htmlFor="session-mood">Every Session</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily-mood" />
                        <Label htmlFor="daily-mood">Daily</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex justify-between">
                      <Label>Prompt Intervention Level ({moodEnginePromptLevel}%)</Label>
                    </div>
                    <Slider
                      value={moodEnginePromptLevel}
                      onValueChange={setMoodEnginePromptLevel}
                      min={0}
                      max={100}
                      step={10}
                    />
                    <p className="text-sm text-gray-500">
                      Controls how proactively the system responds to detected mood changes.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <Badge className="bg-green-100 text-green-800 col-span-1 flex items-center justify-center h-10">
                    Enthusiastic
                  </Badge>
                  <Badge className="bg-amber-100 text-amber-800 col-span-1 flex items-center justify-center h-10">
                    Distracted
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 col-span-1 flex items-center justify-center h-10">
                    Confused
                  </Badge>
                  <Badge className="bg-red-100 text-red-800 col-span-1 flex items-center justify-center h-10">
                    Frustrated
                  </Badge>
                </div>
                
                <div className="rounded-md bg-secondary/50 p-4">
                  <div className="flex gap-2 items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium">How Mood Engine Works</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        The Mood Engine uses natural language processing and interaction patterns to assess a student's emotional state. It then adjusts content difficulty, pacing, and messaging tone to match the student's current mood, maximizing engagement and learning effectiveness.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleResetToDefaults("Mood Engine")}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  
                  <Button
                    onClick={() => handleSaveSettings("Mood Engine")}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Doubt Responder Tab */}
        <TabsContent value="doubt">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MessagesSquare className="h-5 w-5 text-blue-500" />
                    Doubt Responder
                  </CardTitle>
                  <CardDescription>
                    Configure how AI responds to student questions and doubts
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Enable</span>
                  <Switch 
                    checked={doubtResponderEnabled} 
                    onCheckedChange={setDoubtResponderEnabled} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className={doubtResponderEnabled ? "" : "opacity-50 pointer-events-none"}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Response Model</Label>
                    <Select value={doubtResponderModel} onValueChange={setDoubtResponderModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4 (Advanced)</SelectItem>
                        <SelectItem value="gpt-3">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="custom-edu">Custom Educational LLM</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1"
                      onClick={() => handleConfigureModel(doubtResponderModel)}
                    >
                      <Settings className="h-3.5 w-3.5 mr-1" /> Configure Model
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Response Tone</Label>
                    <RadioGroup value={doubtResponderTone} onValueChange={setDoubtResponderTone}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="supportive" id="supportive" />
                        <Label htmlFor="supportive">Supportive</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="instructive" id="instructive" />
                        <Label htmlFor="instructive">Instructive</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="socratic" id="socratic" />
                        <Label htmlFor="socratic">Socratic Method</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Max Response Tokens</Label>
                    <Input
                      id="maxTokens"
                      value={doubtMaxTokens}
                      onChange={(e) => setDoubtMaxTokens(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      Maximum length of AI responses
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Subject Area Options</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="subject-physics" className="rounded" defaultChecked />
                        <label htmlFor="subject-physics" className="text-sm">Physics</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="subject-chemistry" className="rounded" defaultChecked />
                        <label htmlFor="subject-chemistry" className="text-sm">Chemistry</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="subject-biology" className="rounded" defaultChecked />
                        <label htmlFor="subject-biology" className="text-sm">Biology</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="subject-math" className="rounded" defaultChecked />
                        <label htmlFor="subject-math" className="text-sm">Mathematics</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md bg-secondary/50 p-4">
                  <div className="flex gap-2 items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium">How Doubt Responder Works</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        The Doubt Responder uses advanced natural language processing to understand student questions and provide accurate, pedagogically sound answers. It adapts its explanations based on the student's detected learning style and academic level, ensuring concepts are explained in the most effective way for each individual.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleResetToDefaults("Doubt Responder")}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  
                  <Button
                    onClick={() => handleSaveSettings("Doubt Responder")}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Content Personalization Tab */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                    Content Personalization
                  </CardTitle>
                  <CardDescription>
                    Configure how AI personalizes content for each student
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Enable</span>
                  <Switch 
                    checked={contentPersonalizationEnabled} 
                    onCheckedChange={setContentPersonalizationEnabled} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className={contentPersonalizationEnabled ? "" : "opacity-50 pointer-events-none"}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Personalization Model</Label>
                    <Select value={contentPersonalizationModel} onValueChange={setContentPersonalizationModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="content-recommender-1.2">Content Recommender 1.2</SelectItem>
                        <SelectItem value="adaptive-content-engine">Adaptive Content Engine</SelectItem>
                        <SelectItem value="custom-recommender">Custom Recommendation Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1"
                      onClick={() => handleConfigureModel(contentPersonalizationModel)}
                    >
                      <Settings className="h-3.5 w-3.5 mr-1" /> Configure Model
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Content Types</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="content-concept" className="rounded" defaultChecked />
                        <label htmlFor="content-concept" className="text-sm">Concept Cards</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="content-practice" className="rounded" defaultChecked />
                        <label htmlFor="content-practice" className="text-sm">Practice Sets</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="content-video" className="rounded" defaultChecked />
                        <label htmlFor="content-video" className="text-sm">Video Content</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="content-interactive" className="rounded" defaultChecked />
                        <label htmlFor="content-interactive" className="text-sm">Interactive</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex justify-between">
                      <Label>Personalization Factor ({contentRecommendationFactor}%)</Label>
                    </div>
                    <Slider
                      value={contentRecommendationFactor}
                      onValueChange={setContentRecommendationFactor}
                      min={0}
                      max={100}
                      step={10}
                    />
                    <p className="text-sm text-gray-500">
                      Balance between curriculum-based recommendations and personalized suggestions.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-md bg-secondary/50 p-4">
                  <div className="flex gap-2 items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium">How Content Personalization Works</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        The Content Personalization engine analyzes student performance, interests, learning patterns, and goals to curate the most effective study materials. It creates a perfect balance between curriculum requirements and personalized content that matches the student's learning style and current educational needs.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleResetToDefaults("Content Personalization")}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  
                  <Button
                    onClick={() => handleSaveSettings("Content Personalization")}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIPersonalizationTab;
