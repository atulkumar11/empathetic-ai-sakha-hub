
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Book, 
  Code, 
  Server, 
  Database, 
  HelpCircle, 
  Search,
  Download,
  ExternalLink,
  ChevronRight,
  Brain
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const DocumentationTab = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("getting-started");

  const handleDocumentView = (docName: string) => {
    toast({
      title: "Opening Document",
      description: `Opening "${docName}" documentation`,
      variant: "default"
    });
  };

  const handleDocumentDownload = (docName: string) => {
    toast({
      title: "Downloading Document",
      description: `Downloading "${docName}" documentation`,
      variant: "default"
    });
  };

  const filterDocuments = (documents: any[], query: string) => {
    if (!query) return documents;
    
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) || 
      doc.description.toLowerCase().includes(query.toLowerCase()) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    );
  };

  // Document lists for different tabs
  const gettingStartedDocs = [
    {
      title: "Platform Overview",
      description: "Complete overview of the Sakha AI platform architecture",
      date: "Updated 1 week ago",
      tags: ["overview", "architecture"]
    },
    {
      title: "Quick Start Guide",
      description: "Quick guide to get started with Sakha AI admin panel",
      date: "Updated 2 days ago",
      tags: ["guide", "setup"]
    },
    {
      title: "Admin Panel Navigation",
      description: "Learn to navigate the admin interface efficiently",
      date: "Updated 3 weeks ago",
      tags: ["navigation", "ui"]
    },
    {
      title: "User Management Basics",
      description: "Guide to basic student and user management operations",
      date: "Updated 1 month ago",
      tags: ["users", "management"]
    }
  ];

  const aiModelDocs = [
    {
      title: "AI Models Overview",
      description: "Overview of all AI models used in Sakha platform",
      date: "Updated 2 weeks ago",
      tags: ["ai", "models", "overview"]
    },
    {
      title: "Learning Style Detection",
      description: "Technical details on learning style detection model",
      date: "Updated 1 month ago",
      tags: ["learning", "detection", "model"]
    },
    {
      title: "Smart Study Planner",
      description: "How the AI study planner algorithm works",
      date: "Updated 3 weeks ago",
      tags: ["study", "planner", "algorithm"]
    },
    {
      title: "Mood Analysis System",
      description: "Technical documentation for the mood analysis model",
      date: "Updated 2 months ago",
      tags: ["mood", "sentiment", "analysis"]
    },
    {
      title: "Model Tuning Guide",
      description: "How to fine-tune AI models through the admin interface",
      date: "Updated 1 week ago",
      tags: ["tuning", "training", "models"]
    }
  ];

  const contentManagementDocs = [
    {
      title: "Content Types Overview",
      description: "Overview of all content types supported in Sakha",
      date: "Updated 3 weeks ago",
      tags: ["content", "types"]
    },
    {
      title: "Study Material Guidelines",
      description: "Guidelines for creating and uploading study materials",
      date: "Updated 1 month ago",
      tags: ["guidelines", "materials"]
    },
    {
      title: "Content Approval Process",
      description: "Understanding the content approval workflow",
      date: "Updated 2 weeks ago",
      tags: ["approval", "workflow"]
    },
    {
      title: "AI Content Generation",
      description: "How to use AI to generate educational content",
      date: "Updated 5 days ago",
      tags: ["generation", "ai", "content"]
    }
  ];

  const technicalDocs = [
    {
      title: "System Architecture",
      description: "Complete technical architecture of Sakha platform",
      date: "Updated 1 month ago",
      tags: ["architecture", "system"]
    },
    {
      title: "Flask Backend Integration",
      description: "How the React frontend connects to Flask API",
      date: "Updated 2 weeks ago",
      tags: ["flask", "api", "backend"]
    },
    {
      title: "Database Schema",
      description: "Complete database schema documentation",
      date: "Updated 3 weeks ago",
      tags: ["database", "schema"]
    },
    {
      title: "API Documentation",
      description: "Full API reference for Sakha platform",
      date: "Updated 1 week ago",
      tags: ["api", "reference"]
    },
    {
      title: "Security Practices",
      description: "Security protocols and practices implemented",
      date: "Updated 2 months ago",
      tags: ["security", "practices"]
    }
  ];

  const filteredDocs = {
    'getting-started': filterDocuments(gettingStartedDocs, searchQuery),
    'ai-model': filterDocuments(aiModelDocs, searchQuery),
    'content-management': filterDocuments(contentManagementDocs, searchQuery),
    'technical': filterDocuments(technicalDocs, searchQuery)
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Documentation Center</CardTitle>
            <CardDescription>
              Browse technical documentation, guides, and resources
            </CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search documentation..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="getting-started" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="getting-started" className="flex items-center gap-2">
              <Book size={16} />
              <span className="hidden sm:inline">Getting Started</span>
              <span className="inline sm:hidden">Intro</span>
            </TabsTrigger>
            <TabsTrigger value="ai-model" className="flex items-center gap-2">
              <Brain size={16} />
              <span className="hidden sm:inline">AI Model Management</span>
              <span className="inline sm:hidden">AI Models</span>
            </TabsTrigger>
            <TabsTrigger value="content-management" className="flex items-center gap-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Content Management</span>
              <span className="inline sm:hidden">Content</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <Code size={16} />
              <span className="hidden sm:inline">Technical Documentation</span>
              <span className="inline sm:hidden">Tech Docs</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="getting-started">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs['getting-started'].length > 0 ? (
                filteredDocs['getting-started'].map((doc, index) => (
                  <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{doc.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                        </div>
                        <Book className="h-8 w-8 text-pink-500 opacity-80" />
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500">{doc.date}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-pink-600" onClick={() => handleDocumentDownload(doc.title)}>
                            <Download size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => handleDocumentView(doc.title)}>
                            <span>View</span>
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 py-8 text-center">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 font-medium">No documents found</h3>
                  <p className="text-sm text-gray-500">Try a different search term</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ai-model">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs['ai-model'].length > 0 ? (
                filteredDocs['ai-model'].map((doc, index) => (
                  <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{doc.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                        </div>
                        <Brain className="h-8 w-8 text-purple-500 opacity-80" />
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500">{doc.date}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-purple-600" onClick={() => handleDocumentDownload(doc.title)}>
                            <Download size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => handleDocumentView(doc.title)}>
                            <span>View</span>
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 py-8 text-center">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 font-medium">No documents found</h3>
                  <p className="text-sm text-gray-500">Try a different search term</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="content-management">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs['content-management'].length > 0 ? (
                filteredDocs['content-management'].map((doc, index) => (
                  <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{doc.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                        </div>
                        <FileText className="h-8 w-8 text-pink-500 opacity-80" />
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500">{doc.date}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-pink-600" onClick={() => handleDocumentDownload(doc.title)}>
                            <Download size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => handleDocumentView(doc.title)}>
                            <span>View</span>
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 py-8 text-center">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 font-medium">No documents found</h3>
                  <p className="text-sm text-gray-500">Try a different search term</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="technical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs['technical'].length > 0 ? (
                filteredDocs['technical'].map((doc, index) => (
                  <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{doc.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                        </div>
                        {doc.title.includes("Database") ? (
                          <Database className="h-8 w-8 text-purple-500 opacity-80" />
                        ) : doc.title.includes("API") ? (
                          <Server className="h-8 w-8 text-purple-500 opacity-80" />
                        ) : (
                          <Code className="h-8 w-8 text-purple-500 opacity-80" />
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500">{doc.date}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-purple-600" onClick={() => handleDocumentDownload(doc.title)}>
                            <Download size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => handleDocumentView(doc.title)}>
                            <span>View</span>
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 py-8 text-center">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 font-medium">No documents found</h3>
                  <p className="text-sm text-gray-500">Try a different search term</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 border-t pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-medium">Need more help?</h3>
              <p className="text-sm text-gray-500">
                Contact our technical support team for personalized assistance
              </p>
            </div>
            <Button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700">
              <ExternalLink size={16} className="mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationTab;
