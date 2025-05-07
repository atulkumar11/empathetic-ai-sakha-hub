
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Book, 
  FileCode, 
  Upload, 
  Check, 
  X, 
  Edit, 
  Plus, 
  Search, 
  Filter,
  Save,
  Zap,
  RotateCcw,
  Tag,
  Library,
  PenTool
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
  
  const handleManageContent = (contentType) => {
    toast({
      title: `Manage ${contentType}`,
      description: `Opening ${contentType} management interface`,
      variant: "default"
    });
  };
  
  const handleEditPrompt = (promptType) => {
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
  
  const handleContentAction = (action, title) => {
    toast({
      title: `${action} Content`,
      description: `${action} action performed on "${title}"`,
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management System (CMS)</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleUpload}>
            <Upload size={16} />
            <span>Upload</span>
          </Button>
          <Button className="flex items-center gap-2" onClick={handleCreateContent}>
            <Plus size={16} />
            <span>Create Content</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content & Knowledge Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Concept Cards</span>
                <Badge>238</Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Auto-generated topic concepts</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Route: /api/content/conceptcard</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7"
                  onClick={() => handleManageContent("Concept Cards")}
                >
                  Manage
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Flashcards</span>
                <Badge>1,546</Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Auto-generated topic flashcards</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Route: /api/content/flashcard</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7"
                  onClick={() => handleManageContent("Flashcards")}
                >
                  Manage
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Exam Papers</span>
                <Badge>42</Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Based on past pattern & syllabus</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Route: /api/content/exam</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7"
                  onClick={() => handleManageContent("Exam Papers")}
                >
                  Manage
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Study Materials</span>
                <Badge>89</Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">View + tag uploaded resources</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Route: /api/content/library</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7"
                  onClick={() => handleManageContent("Study Materials")}
                >
                  Manage
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="queue" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 grid w-full grid-cols-3 gap-2">
              <TabsTrigger value="queue">Approval Queue</TabsTrigger>
              <TabsTrigger value="studyMaterials">Study Materials</TabsTrigger>
              <TabsTrigger value="prompts">GPT Prompt Tuner</TabsTrigger>
            </TabsList>

            {/* Approval Queue Tab */}
            <TabsContent value="queue">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-4">
                <h3 className="font-medium">Content Approval Queue</h3>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Search content..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter size={16} />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { 
                          type: 'concept', 
                          title: 'Newton\'s Laws of Motion', 
                          subject: 'Physics', 
                          date: new Date(2023, 5, 12), 
                          status: 'pending' 
                        },
                        { 
                          type: 'flashcard', 
                          title: 'Periodic Table Elements', 
                          subject: 'Chemistry', 
                          date: new Date(2023, 5, 14), 
                          status: 'approved' 
                        },
                        { 
                          type: 'exam', 
                          title: 'Practice Test: Calculus', 
                          subject: 'Mathematics', 
                          date: new Date(2023, 5, 15), 
                          status: 'pending' 
                        },
                        { 
                          type: 'concept', 
                          title: 'Cellular Respiration', 
                          subject: 'Biology', 
                          date: new Date(2023, 5, 16), 
                          status: 'rejected' 
                        },
                      ].map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {item.type === 'concept' && <Book size={16} className="text-blue-500" />}
                              {item.type === 'flashcard' && <FileText size={16} className="text-green-500" />}
                              {item.type === 'exam' && <FileCode size={16} className="text-amber-500" />}
                              <span className="capitalize">{item.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.date.toLocaleDateString()}</TableCell>
                          <TableCell>
                            {item.status === 'approved' && (
                              <Badge className="bg-green-100 text-green-800">Approved</Badge>
                            )}
                            {item.status === 'pending' && (
                              <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                            )}
                            {item.status === 'rejected' && (
                              <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleContentAction("Edit", item.title)}
                              >
                                <Edit size={14} />
                              </Button>
                              {item.status === 'pending' && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-green-600"
                                    onClick={() => handleContentAction("Approve", item.title)}
                                  >
                                    <Check size={14} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-red-600"
                                    onClick={() => handleContentAction("Reject", item.title)}
                                  >
                                    <X size={14} />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Study Materials Tab */}
            <TabsContent value="studyMaterials">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h3 className="font-medium">Study Materials Repository</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex items-center gap-2" onClick={handleUpload}>
                      <Upload size={16} />
                      <span>Upload Materials</span>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="mb-2 block">Filter by Subject</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="computer_science">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Filter by Exam Goal</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Exam Goals</SelectItem>
                        <SelectItem value="neet">NEET</SelectItem>
                        <SelectItem value="jee">JEE</SelectItem>
                        <SelectItem value="upsc">UPSC</SelectItem>
                        <SelectItem value="gate">GATE</SelectItem>
                        <SelectItem value="cat">CAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Material Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select material type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="study_material">Study Material</SelectItem>
                        <SelectItem value="syllabus">Syllabus</SelectItem>
                        <SelectItem value="exam_material">Exam Material</SelectItem>
                        <SelectItem value="previous_papers">Previous Year Papers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border overflow-hidden mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Exam Goal</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          title: "JEE Physics Formula Sheet",
                          type: "study_material",
                          subject: "Physics",
                          examGoal: "JEE",
                          tags: ["formulas", "quick-reference", "mechanics"]
                        },
                        {
                          title: "NEET Biology Syllabus 2024",
                          type: "syllabus",
                          subject: "Biology",
                          examGoal: "NEET",
                          tags: ["syllabus", "official", "2024"]
                        },
                        {
                          title: "CAT Quantitative Aptitude Notes",
                          type: "study_material",
                          subject: "Mathematics",
                          examGoal: "CAT",
                          tags: ["aptitude", "shortcuts", "practice"]
                        },
                        {
                          title: "UPSC Previous Year Paper 2023",
                          type: "previous_papers",
                          subject: "General Studies",
                          examGoal: "UPSC",
                          tags: ["2023", "solved", "paper"]
                        },
                        {
                          title: "GATE Computer Science MCQ Bank",
                          type: "exam_material",
                          subject: "Computer Science",
                          examGoal: "GATE",
                          tags: ["mcq", "practice", "database"]
                        }
                      ].map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {item.type.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.examGoal}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8"
                                onClick={() => handleContentAction("View", item.title)}
                              >
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleContentAction("Tag", item.title)}
                              >
                                <Tag size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* GPT Prompt Tuner Tab */}
            <TabsContent value="prompts">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage base prompts for GPT-based content generation and responses
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border p-4 rounded-md bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                      <Book size={16} className="text-blue-500" />
                      Concept Card Creator
                    </h3>
                    <Textarea 
                      className="min-h-[100px] mb-3 mt-2" 
                      placeholder="Create a concept card for {topic} targeted at {exam_type} students..."
                      defaultValue="Create a concept card for {topic} targeted at {exam_type} students. The concept card should include: 1) A clear definition, 2) Key principles or rules, 3) 2-3 practical examples, 4) Common misconceptions, 5) Connections to other related concepts. Format the content in a structured way that's easy to understand for students preparing for {exam_type}."
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditPrompt("Concept Card Creator")}
                      className="flex items-center gap-2"
                    >
                      <PenTool size={14} />
                      Edit Prompt
                    </Button>
                  </div>
                  
                  <div className="border p-4 rounded-md bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                      <FileText size={16} className="text-green-500" />
                      Flashcard Generator
                    </h3>
                    <Textarea 
                      className="min-h-[100px] mb-3 mt-2" 
                      placeholder="Create a set of flashcards about {topic} with {difficulty_level}..."
                      defaultValue="Create a set of flashcards about {topic} with {difficulty_level} difficulty. Generate 10 question-answer pairs that cover the most important aspects of {topic}. Each flashcard should have a concise question on one side and a clear, comprehensive answer on the other side. Include key terms, definitions, formulas, or principles as appropriate for the subject."
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPrompt("Flashcard Generator")}
                      className="flex items-center gap-2"
                    >
                      <PenTool size={14} />
                      Edit Prompt
                    </Button>
                  </div>
                  
                  <div className="border p-4 rounded-md bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                      <FileCode size={16} className="text-amber-500" />
                      Practice Exam Creator
                    </h3>
                    <Textarea 
                      className="min-h-[100px] mb-3 mt-2" 
                      placeholder="Create a practice exam for {subject} based on {exam_pattern}..."
                      defaultValue="Create a practice exam for {subject} based on {exam_pattern} with {number_of_questions} questions at {difficulty_level} difficulty. Include a mix of multiple choice, short answer, and problem-solving questions that test key concepts and analytical skills. Provide a detailed answer key with explanations for each question. The exam should mirror the format and style of {exam_pattern}."
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPrompt("Practice Exam Creator")}
                      className="flex items-center gap-2"
                    >
                      <PenTool size={14} />
                      Edit Prompt
                    </Button>
                  </div>
                  
                  <div className="border p-4 rounded-md bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                      <Library size={16} className="text-purple-500" />
                      Study Guide Generator
                    </h3>
                    <Textarea 
                      className="min-h-[100px] mb-3 mt-2" 
                      placeholder="Create a comprehensive study guide for {topic}..."
                      defaultValue="Create a comprehensive study guide for {topic} targeted at {exam_type} preparation. Include: 1) An overview of the topic, 2) Key concepts and definitions, 3) Important formulas or principles, 4) Step-by-step examples of problem solving, 5) Common questions with answers, 6) Tips and strategies for mastering the topic, 7) References to additional resources. Format the guide in a clear, structured manner with sections and subsections."
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPrompt("Study Guide Generator")}
                      className="flex items-center gap-2"
                    >
                      <PenTool size={14} />
                      Edit Prompt
                    </Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={handleTestContentGeneration}
                    >
                      <Zap size={16} />
                      Test Content Generation Algorithm
                    </Button>
                    <Button onClick={handleManageAllPrompts}>
                      Manage All Prompts
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      className="flex-1"
                      onClick={handleSaveSettings}
                    >
                      <Save size={16} className="mr-2" /> Save Settings
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleResetSettings}
                    >
                      <RotateCcw size={16} className="mr-2" /> Reset to Defaults
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementTab;
