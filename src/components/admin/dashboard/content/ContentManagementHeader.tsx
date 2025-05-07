
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud, FilePlus, Tag, Wand2, FlaskConical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ContentManagementHeaderProps {
  handleUpload: () => void;
  handleCreateContent: () => void;
  handleTagManagement: () => void;
  handlePromptTuning: () => void;
  handleContentGeneration: () => void;
}

const ContentManagementHeader = ({
  handleUpload,
  handleCreateContent,
  handleTagManagement,
  handlePromptTuning,
  handleContentGeneration
}: ContentManagementHeaderProps) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedContentFormat, setSelectedContentFormat] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };
  
  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedExam || !selectedSubject || !selectedType || !selectedContentFormat || !uploadFile) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields and select a file",
        variant: "destructive"
      });
      return;
    }
    
    // Mock file upload
    toast({
      title: "Upload Started",
      description: `Uploading ${uploadFile.name}...`
    });
    
    // Simulate upload process
    setTimeout(() => {
      toast({
        title: "Upload Complete",
        description: `${uploadFile.name} has been uploaded successfully and is being processed.`
      });
      setIsUploadOpen(false);
      resetForm();
    }, 2000);
  };
  
  const resetForm = () => {
    setSelectedExam("");
    setSelectedSubject("");
    setSelectedType("");
    setSelectedContentFormat("");
    setUploadFile(null);
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div>
        <h3 className="text-lg font-medium">Content Repository</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage educational content across different formats</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UploadCloud size={16} />
              Upload Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Educational Content</DialogTitle>
              <DialogDescription>
                Upload content with metadata to categorize it appropriately
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exam">Exam Goal</Label>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger id="exam">
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iit-jee">IIT JEE</SelectItem>
                    <SelectItem value="neet">NEET</SelectItem>
                    <SelectItem value="upsc">UPSC</SelectItem>
                    <SelectItem value="cat">CAT</SelectItem>
                    <SelectItem value="gate">GATE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Content Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="syllabus">Syllabus</SelectItem>
                    <SelectItem value="study-material">Study Material</SelectItem>
                    <SelectItem value="past-paper">Past Paper</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="format">Content Format</Label>
                <Select value={selectedContentFormat} onValueChange={setSelectedContentFormat}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concept-cards">Concept Cards</SelectItem>
                    <SelectItem value="flashcards">Flashcards</SelectItem>
                    <SelectItem value="practice-exam">Practice Exam</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input id="file" type="file" onChange={handleFileChange} />
                <p className="text-xs text-gray-500">Supported formats: PDF, DOCX, XLSX, MP4, PNG, JPG (max 50MB)</p>
              </div>
              
              <DialogFooter>
                <Button type="submit">Upload Content</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        <Button variant="outline" className="gap-2" onClick={handleCreateContent}>
          <FilePlus size={16} />
          Create
        </Button>
        
        <Button variant="outline" className="gap-2" onClick={handleTagManagement}>
          <Tag size={16} />
          Tags
        </Button>
        
        <Button variant="outline" className="gap-2" onClick={handlePromptTuning}>
          <Wand2 size={16} />
          Prompts
        </Button>
        
        <Button variant="outline" className="gap-2" onClick={handleContentGeneration}>
          <FlaskConical size={16} />
          Test Generation
        </Button>
      </div>
    </div>
  );
};

export default ContentManagementHeader;
