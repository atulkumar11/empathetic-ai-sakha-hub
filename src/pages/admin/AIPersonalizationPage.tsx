
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Settings, 
  Sparkles, 
  BarChart3, 
  RefreshCcw, 
  Loader2,
  Save,
  BookOpen,
  CalendarDays,
  Clock,
  BadgeAlert,
  HardDrive,
  PanelTop,
  Goal,
  Calendar,
  GraduationCap,
  SpellCheck
} from "lucide-react";

const AIPersonalizationPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState<string | null>(null);
  
  const handleSaveSettings = (section: string) => {
    setLoading(section);
    setTimeout(() => {
      setLoading(null);
      toast({
        title: "Settings saved",
        description: `${section} settings have been saved successfully.`,
      });
    }, 1000);
  };
  
  const handleTestAlgorithm = (algorithm: string) => {
    setLoading(algorithm);
    setTimeout(() => {
      setLoading(null);
      toast({
        title: "Algorithm tested",
        description: `${algorithm} algorithm test completed successfully.`,
      });
    }, 1500);
  };
  
  const handleConfigureSettings = (feature: string) => {
    toast({
      title: "Configure Settings",
      description: `${feature} configuration dialog opened.`,
    });
  };
  
  const handleResetToDefault = (section: string) => {
    setLoading(`reset-${section}`);
    setTimeout(() => {
      setLoading(null);
      toast({
        title: "Settings reset",
        description: `${section} settings have been reset to default values.`,
      });
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI Personalization</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage AI models and personalization settings for student experience
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleResetToDefault("all")}>
            <RefreshCcw size={16} className="mr-2" />
            Reset All to Default
          </Button>
          <Button size="sm" onClick={() => handleSaveSettings("all")}>
            {loading === "all" ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <Save size={16} className="mr-2" />
            )}
            Save All Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="learning-style">
        <TabsList className="mb-4">
          <TabsTrigger value="learning-style" className="flex items-center gap-2">
            <Brain size={16} />
            <span>Learning Styles</span>
          </TabsTrigger>
          <TabsTrigger value="reinforcement" className="flex items-center gap-2">
            <SpellCheck size={16} />
            <span>Reinforcement</span>
          </TabsTrigger>
          <TabsTrigger value="planner" className="flex items-center gap-2">
            <Goal size={16} />
            <span>Goal Planner</span>
          </TabsTrigger>
          <TabsTrigger value="study-plan" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Study Plan</span>
          </TabsTrigger>
          <TabsTrigger value="difficulty" className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span>Difficulty</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Sparkles size={16} />
            <span>Suggestions</span>
          </TabsTrigger>
        </TabsList>

        {/* Learning Style Detection Tab */}
        <TabsContent value="learning-style">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Brain className="mr-2 text-primary" size={20} />
                  Learning Style Detection
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Allow Manual Override</span>
                    <Switch />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Key Learning Styles</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Visual Learning", enabled: true },
                        { name: "Auditory Learning", enabled: true },
                        { name: "Reading/Writing", enabled: true },
                        { name: "Kinesthetic", enabled: true },
                        { name: "Mixed Preference", enabled: true },
                      ].map((style) => (
                        <div key={style.name} className="flex items-center justify-between bg-muted/40 p-3 rounded-lg">
                          <div className="flex items-center">
                            <BookOpen size={16} className="mr-2 text-primary" />
                            <span>{style.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch checked={style.enabled} />
                            <Button variant="outline" size="sm" onClick={() => handleConfigureSettings(style.name)}>
                              <Settings size={14} className="mr-1" />
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Classification Settings</h3>
                    <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Classification Confidence</h4>
                          <div className="flex items-center">
                            <input 
                              type="range" 
                              className="w-full" 
                              min="0" 
                              max="100" 
                              defaultValue="75" 
                            />
                            <span className="ml-2 text-sm">75%</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Min. Questions Required</h4>
                          <input 
                            type="number" 
                            className="w-full p-2 border rounded" 
                            defaultValue="5" 
                            min="3" 
                            max="20" 
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Survey Frequency</h4>
                          <select className="w-full p-2 border rounded">
                            <option>Monthly</option>
                            <option>Bi-weekly</option>
                            <option>Weekly</option>
                          </select>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">AI Model</h4>
                          <select className="w-full p-2 border rounded">
                            <option>GPT-4</option>
                            <option>Custom Classifier</option>
                            <option>Hybrid Model</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <Button 
                        variant="secondary" 
                        className="w-full"
                        onClick={() => handleTestAlgorithm("Learning Style Classification")}
                      >
                        {loading === "Learning Style Classification" ? (
                          <Loader2 size={16} className="mr-2 animate-spin" />
                        ) : (
                          <RefreshCcw size={16} className="mr-2" />
                        )}
                        Test Classification Algorithm
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleResetToDefault("learning-style")}
                  >
                    {loading === "reset-learning-style" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <RefreshCcw size={16} className="mr-2" />
                    )}
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSaveSettings("learning-style")}
                  >
                    {loading === "learning-style" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Save size={16} className="mr-2" />
                    )}
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Concept Reinforcement Triggers Tab */}
        <TabsContent value="reinforcement">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <SpellCheck className="mr-2 text-primary" size={20} />
                  Concept Reinforcement Triggers
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Trigger Settings</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Time-Based Triggers", icon: <Clock size={16} className="mr-2 text-primary" /> },
                      { name: "Quiz Performance Triggers", icon: <BarChart3 size={16} className="mr-2 text-primary" /> },
                      { name: "Mistake-Based Triggers", icon: <BadgeAlert size={16} className="mr-2 text-primary" /> },
                    ].map((trigger) => (
                      <div key={trigger.name} className="flex items-center justify-between bg-muted/40 p-3 rounded-lg">
                        <div className="flex items-center">
                          {trigger.icon}
                          <span>{trigger.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch defaultChecked={trigger.name !== "Mistake-Based Triggers"} />
                          <Button variant="outline" size="sm" onClick={() => handleConfigureSettings(trigger.name)}>
                            <Settings size={14} className="mr-1" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Algorithm Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Reinforcement Interval (days)</h4>
                        <input 
                          type="range" 
                          className="w-full" 
                          min="1" 
                          max="30" 
                          defaultValue="7" 
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <span>1</span>
                          <span>7</span>
                          <span>30</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Performance Threshold (%)</h4>
                        <input 
                          type="range" 
                          className="w-full" 
                          min="0" 
                          max="100" 
                          defaultValue="70" 
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <span>0%</span>
                          <span>70%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium mb-2">AI Model</h4>
                        <select className="w-full p-2 border rounded">
                          <option>GPT-4</option>
                          <option>Custom Reinforcement Model</option>
                          <option>Hybrid Model</option>
                        </select>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Content Generation</h4>
                        <select className="w-full p-2 border rounded">
                          <option>Smart Mix</option>
                          <option>Fixed Sequence</option>
                          <option>Adaptive</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => handleTestAlgorithm("Reinforcement Algorithm")}
                    >
                      {loading === "Reinforcement Algorithm" ? (
                        <Loader2 size={16} className="mr-2 animate-spin" />
                      ) : (
                        <RefreshCcw size={16} className="mr-2" />
                      )}
                      Test Reinforcement Algorithm
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleResetToDefault("reinforcement")}
                  >
                    {loading === "reset-reinforcement" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <RefreshCcw size={16} className="mr-2" />
                    )}
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSaveSettings("reinforcement")}
                  >
                    {loading === "reinforcement" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Save size={16} className="mr-2" />
                    )}
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goal-Based Personal Planner Tab */}
        <TabsContent value="planner">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Goal className="mr-2 text-primary" size={20} />
                  Goal-Based Personal Planner
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Plan Structure Controls</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Exam-Specific Plans", enabled: true },
                      { name: "Milestone Creation", enabled: true },
                      { name: "Syllabus Coverage Analysis", enabled: true },
                      { name: "Performance-Based Adjustments", enabled: true },
                    ].map((control) => (
                      <div key={control.name} className="flex items-center justify-between bg-muted/40 p-3 rounded-lg">
                        <div className="flex items-center">
                          <GraduationCap size={16} className="mr-2 text-primary" />
                          <span>{control.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch checked={control.enabled} />
                          <Button variant="outline" size="sm" onClick={() => handleConfigureSettings(control.name)}>
                            <Settings size={14} className="mr-1" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium">Plan Generation Settings</h4>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Pace Options</h5>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="relaxed" defaultChecked />
                          <label htmlFor="relaxed">Relaxed</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="balanced" defaultChecked />
                          <label htmlFor="balanced">Balanced</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="intensive" defaultChecked />
                          <label htmlFor="intensive">Intensive</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Time Allocation</h5>
                      <select className="w-full p-2 border rounded">
                        <option>Dynamic</option>
                        <option>Fixed</option>
                        <option>User-defined</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium">AI Model Configuration</h4>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Model</h5>
                      <select className="w-full p-2 border rounded">
                        <option>GPT-4</option>
                        <option>Custom Planner Model</option>
                        <option>Hybrid Model</option>
                      </select>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Revision Strategy</h5>
                      <select className="w-full p-2 border rounded">
                        <option>Spaced Repetition</option>
                        <option>Performance-Based</option>
                        <option>Fixed Interval</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleTestAlgorithm("Goal-Based Planner Algorithm")}
                >
                  {loading === "Goal-Based Planner Algorithm" ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : (
                    <RefreshCcw size={16} className="mr-2" />
                  )}
                  Test AI Model - Goal-Based Planner Algorithm
                </Button>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleResetToDefault("planner")}
                  >
                    {loading === "reset-planner" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <RefreshCcw size={16} className="mr-2" />
                    )}
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSaveSettings("planner")}
                  >
                    {loading === "planner" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Save size={16} className="mr-2" />
                    )}
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily Smart Study Plan Tab */}
        <TabsContent value="study-plan">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="mr-2 text-primary" size={20} />
                  Daily Smart Study Plan
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium">Time Management</h4>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Session Duration (minutes)</h5>
                      <input 
                        type="range" 
                        className="w-full" 
                        min="15" 
                        max="120" 
                        defaultValue="45" 
                        step="15" 
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span>15</span>
                        <span>45</span>
                        <span>120</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Break Duration (minutes)</h5>
                      <input 
                        type="range" 
                        className="w-full" 
                        min="5" 
                        max="30" 
                        defaultValue="10" 
                        step="5" 
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span>5</span>
                        <span>10</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium">Content Prioritization</h4>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Priority Order</h5>
                      <ol className="space-y-2">
                        <li className="flex items-center justify-between bg-white/50 p-2 rounded">
                          <span>1. Weak Areas</span>
                          <button className="text-gray-500">⋮</button>
                        </li>
                        <li className="flex items-center justify-between bg-white/50 p-2 rounded">
                          <span>2. Exam-specific content</span>
                          <button className="text-gray-500">⋮</button>
                        </li>
                        <li className="flex items-center justify-between bg-white/50 p-2 rounded">
                          <span>3. Revision material</span>
                          <button className="text-gray-500">⋮</button>
                        </li>
                        <li className="flex items-center justify-between bg-white/50 p-2 rounded">
                          <span>4. New concepts</span>
                          <button className="text-gray-500">⋮</button>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                  <h4 className="font-medium">AI Model Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Model</h5>
                      <select className="w-full p-2 border rounded">
                        <option>GPT-4</option>
                        <option>Custom Study Plan Model</option>
                        <option>Hybrid Model</option>
                      </select>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Optimization Focus</h5>
                      <select className="w-full p-2 border rounded">
                        <option>Balanced</option>
                        <option>Time Efficiency</option>
                        <option>Content Coverage</option>
                        <option>Retention Maximization</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleTestAlgorithm("Daily Study Plan Algorithm")}
                >
                  {loading === "Daily Study Plan Algorithm" ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : (
                    <RefreshCcw size={16} className="mr-2" />
                  )}
                  Test AI Model - Daily Study Plan Algorithm
                </Button>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleResetToDefault("study-plan")}
                  >
                    {loading === "reset-study-plan" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <RefreshCcw size={16} className="mr-2" />
                    )}
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSaveSettings("study-plan")}
                  >
                    {loading === "study-plan" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Save size={16} className="mr-2" />
                    )}
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Adaptive Difficulty Engine Tab */}
        <TabsContent value="difficulty">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart3 className="mr-2 text-primary" size={20} />
                  Adaptive Difficulty Engine
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Difficulty Adjustment Controls</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Performance-Based Scaling", enabled: true },
                        { name: "Topic-Based Adjustment", enabled: true },
                        { name: "Confidence-Based Adjustment", enabled: true },
                        { name: "Time-Pressure Adjustment", enabled: false },
                      ].map((feature) => (
                        <div key={feature.name} className="flex items-center justify-between bg-muted/40 p-3 rounded-lg">
                          <div className="flex items-center">
                            <HardDrive size={16} className="mr-2 text-primary" />
                            <span>{feature.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch checked={feature.enabled} />
                            <Button variant="outline" size="sm" onClick={() => handleConfigureSettings(feature.name)}>
                              <Settings size={14} className="mr-1" />
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-4">Difficulty Presets</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: "Easy", description: "For beginners and foundation building" },
                        { name: "Medium", description: "For regular practice and consolidation" },
                        { name: "Hard", description: "For advanced preparation" },
                        { name: "Exam Simulation", description: "Matches actual exam difficulty" },
                      ].map((preset, index) => (
                        <div key={preset.name} className="flex items-center justify-between bg-muted/40 p-3 rounded-lg">
                          <div>
                            <div className="font-medium">{preset.name}</div>
                            <p className="text-xs text-gray-500">{preset.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="difficultyPreset" 
                              id={`preset-${index}`} 
                              defaultChecked={index === 1} 
                            />
                            <Button variant="outline" size="sm" onClick={() => handleConfigureSettings(preset.name)}>
                              <Settings size={14} className="mr-1" />
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium">Performance Thresholds</h4>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Increase Difficulty (%)</h5>
                      <input 
                        type="range" 
                        className="w-full" 
                        min="50" 
                        max="100" 
                        defaultValue="80" 
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span>50%</span>
                        <span>80%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Decrease Difficulty (%)</h5>
                      <input 
                        type="range" 
                        className="w-full" 
                        min="0" 
                        max="50" 
                        defaultValue="30" 
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span>0%</span>
                        <span>30%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium">AI Model Configuration</h4>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Model</h5>
                      <select className="w-full p-2 border rounded">
                        <option>GPT-4</option>
                        <option>Custom Difficulty Model</option>
                        <option>Hybrid Model</option>
                      </select>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Adjustment Strategy</h5>
                      <select className="w-full p-2 border rounded">
                        <option>Gradual</option>
                        <option>Stepwise</option>
                        <option>Adaptive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleTestAlgorithm("Difficulty Algorithm")}
                >
                  {loading === "Difficulty Algorithm" ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : (
                    <RefreshCcw size={16} className="mr-2" />
                  )}
                  Test Difficulty Algorithm
                </Button>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleResetToDefault("difficulty")}
                  >
                    {loading === "reset-difficulty" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <RefreshCcw size={16} className="mr-2" />
                    )}
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSaveSettings("difficulty")}
                  >
                    {loading === "difficulty" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Save size={16} className="mr-2" />
                    )}
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smart Suggestions Tab */}
        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="mr-2 text-primary" size={20} />
                  Smart Suggestions
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Suggestion Types</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Study Materials", enabled: true },
                      { name: "Time Management", enabled: true },
                      { name: "Learning Approach", enabled: true },
                      { name: "Break Reminders", enabled: true },
                      { name: "Motivation Boosters", enabled: true },
                    ].map((type) => (
                      <div key={type.name} className="flex items-center justify-between bg-muted/40 p-3 rounded-lg">
                        <div className="flex items-center">
                          <Sparkles size={16} className="mr-2 text-primary" />
                          <span>{type.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch checked={type.enabled} />
                          <Button variant="outline" size="sm" onClick={() => handleConfigureSettings(type.name)}>
                            <Settings size={14} className="mr-1" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium">Suggestion Frequency</h4>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Max Suggestions Per Day</h5>
                      <input 
                        type="number" 
                        className="w-full p-2 border rounded" 
                        defaultValue="5" 
                        min="1" 
                        max="20" 
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Suggestion Timing</h5>
                      <select className="w-full p-2 border rounded">
                        <option>Start of Session</option>
                        <option>During Session</option>
                        <option>End of Session</option>
                        <option>Mixed (Smart)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4 bg-muted/40 p-4 rounded-lg">
                    <h4 className="font-medium">Override Controls</h4>
                    <div>
                      <Button variant="outline" className="w-full" onClick={() => handleConfigureSettings("Override Rules")}>
                        <PanelTop size={16} className="mr-2" />
                        Manage Override Rules
                      </Button>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Override Threshold</h5>
                      <select className="w-full p-2 border rounded">
                        <option>High Priority Only</option>
                        <option>Medium & High Priority</option>
                        <option>All Suggestions</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleResetToDefault("suggestions")}
                  >
                    {loading === "reset-suggestions" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <RefreshCcw size={16} className="mr-2" />
                    )}
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSaveSettings("suggestions")}
                  >
                    {loading === "suggestions" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Save size={16} className="mr-2" />
                    )}
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AIPersonalizationPage;
