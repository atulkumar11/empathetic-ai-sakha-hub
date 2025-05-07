
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Laugh, MessageSquare, Puzzle, Flag, Filter, 
  ThumbsUp, ThumbsDown, BarChart2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const FeelGoodSection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("stats");
  
  // Feature toggle states
  const [featuresEnabled, setFeaturesEnabled] = useState({
    humor: true,
    puzzles: true,
    doodles: true,
    quotes: false
  });
  
  const [sentimentModelEnabled, setSentimentModelEnabled] = useState(true);
  const [moodEngineEnabled, setMoodEngineEnabled] = useState(true);
  const [contentFilteringEnabled, setContentFilteringEnabled] = useState(true);
  
  const handleManage = () => {
    toast({
      title: "Feel-Good Corner",
      description: "Opening feel-good content management interface",
      variant: "default"
    });
  };
  
  const handleUploadContent = () => {
    toast({
      title: "Upload Content",
      description: "Opening content upload interface for feel-good corner",
      variant: "default"
    });
  };
  
  const handleReviewFlagged = () => {
    toast({
      title: "Review Flagged Content",
      description: "Opening flagged content review interface",
      variant: "default"
    });
  };

  const handleToggleContent = (contentType: string, enabled: boolean) => {
    setFeaturesEnabled(prev => ({
      ...prev,
      [contentType]: enabled
    }));
    
    toast({
      title: `${contentType} ${enabled ? 'Enabled' : 'Disabled'}`,
      description: `${contentType} content is now ${enabled ? 'enabled' : 'disabled'} in the Feel-Good Corner`,
      variant: "default"
    });
  };
  
  const handleConfigureFeature = (featureName: string) => {
    toast({
      title: `Configure ${featureName}`,
      description: `Opening configuration panel for ${featureName}`,
      variant: "default"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Laugh className="text-purple-400" size={20} />
            <span>Feel-Good Corner</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleManage}>Manage</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stats" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Content Engagement</h3>
                  <span className="text-sm text-green-600">+12% this week</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="text-xl font-bold">285</div>
                    <div className="text-xs text-gray-600">Memes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">142</div>
                    <div className="text-xs text-gray-600">Puzzles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">364</div>
                    <div className="text-xs text-gray-600">Jokes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">98</div>
                    <div className="text-xs text-gray-600">Doodles</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">User Sentiment Impact</h3>
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <div className="flex items-end h-full">
                    <div className="w-1/4 h-[70%] bg-gradient-to-t from-purple-500 to-purple-300 rounded-tl-md"></div>
                    <div className="w-1/4 h-[40%] bg-gradient-to-t from-blue-500 to-blue-300"></div>
                    <div className="w-1/4 h-[85%] bg-gradient-to-t from-purple-500 to-purple-300"></div>
                    <div className="w-1/4 h-[55%] bg-gradient-to-t from-blue-500 to-blue-300 rounded-tr-md"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>Stress Relief</span>
                  <span>Focus</span>
                  <span>Mood Boost</span>
                  <span>Motivation</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Content Types</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-md">
                    <Laugh size={18} className="text-yellow-500" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Humor & Jokes</p>
                      <p className="text-xs text-gray-600">Based on emotional state</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="humor-toggle"
                        checked={featuresEnabled.humor}
                        onCheckedChange={(checked) => handleToggleContent('humor', checked)} 
                      />
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleConfigureFeature('Humor & Jokes')}>Configure</Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-md">
                    <Puzzle size={18} className="text-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Puzzles</p>
                      <p className="text-xs text-gray-600">Mental refreshers</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="puzzles-toggle"
                        checked={featuresEnabled.puzzles}
                        onCheckedChange={(checked) => handleToggleContent('puzzles', checked)} 
                      />
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleConfigureFeature('Puzzles')}>Configure</Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-md">
                    <MessageSquare size={18} className="text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Doodles</p>
                      <p className="text-xs text-gray-600">Visual relaxation</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="doodles-toggle"
                        checked={featuresEnabled.doodles}
                        onCheckedChange={(checked) => handleToggleContent('doodles', checked)} 
                      />
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleConfigureFeature('Doodles')}>Configure</Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-md">
                    <Flag size={18} className="text-purple-500" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Quotes</p>
                      <p className="text-xs text-gray-600">Motivational</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="quotes-toggle"
                        checked={featuresEnabled.quotes}
                        onCheckedChange={(checked) => handleToggleContent('quotes', checked)} 
                      />
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleConfigureFeature('Quotes')}>Configure</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={handleUploadContent}>Upload Content</Button>
                <Button variant="outline" size="sm" onClick={handleReviewFlagged} className="flex items-center gap-1">
                  <Flag size={14} className="text-red-500" />
                  Review Flagged
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Model Configuration</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <BarChart2 size={18} className="text-purple-500" />
                      <span className="font-medium text-sm">Sentiment Model v2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2 mr-2">
                        <Switch 
                          id="sentiment-model-toggle"
                          checked={sentimentModelEnabled}
                          onCheckedChange={setSentimentModelEnabled} 
                        />
                        <Label htmlFor="sentiment-model-toggle" className="text-xs text-gray-600">
                          {sentimentModelEnabled ? '78% Accuracy' : 'Disabled'}
                        </Label>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs"
                        onClick={() => handleConfigureFeature('Sentiment Model')}
                        disabled={!sentimentModelEnabled}
                      >
                        Tune
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Filter size={18} className="text-blue-500" />
                      <span className="font-medium text-sm">Mood Engine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2 mr-2">
                        <Switch 
                          id="mood-engine-toggle"
                          checked={moodEngineEnabled}
                          onCheckedChange={setMoodEngineEnabled} 
                        />
                        <Label htmlFor="mood-engine-toggle" className="text-xs text-green-600">
                          {moodEngineEnabled ? 'Active' : 'Inactive'}
                        </Label>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs"
                        onClick={() => handleConfigureFeature('Mood Engine')}
                        disabled={!moodEngineEnabled}
                      >
                        Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <ThumbsUp size={18} className="text-green-500" />
                      <span className="font-medium text-sm">Content Filtering</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2 mr-2">
                        <Switch 
                          id="content-filtering-toggle"
                          checked={contentFilteringEnabled}
                          onCheckedChange={setContentFilteringEnabled} 
                        />
                        <Label htmlFor="content-filtering-toggle" className="text-xs text-amber-600">
                          {contentFilteringEnabled ? 'Needs Review' : 'Disabled'}
                        </Label>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs"
                        onClick={() => handleConfigureFeature('Content Filtering')}
                        disabled={!contentFilteringEnabled}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Usage Logs",
                    description: "Viewing Feel-Good Corner usage logs",
                    variant: "default"
                  });
                }}>View Usage Logs</Button>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700" onClick={() => {
                  toast({
                    title: "Settings Saved",
                    description: "Feel-Good Corner settings have been saved",
                    variant: "default"
                  });
                }}>
                  Save Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeelGoodSection;
