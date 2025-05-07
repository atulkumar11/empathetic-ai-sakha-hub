
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ContentType, ContentFile, ContentManagementHookReturn } from "@/types/content";

export const useContentManagement = (): ContentManagementHookReturn => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentTab, setCurrentTab] = useState<ContentType>("study-material");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Ensure the sample data strictly follows ContentType
  const [uploadedFiles, setUploadedFiles] = useState<ContentFile[]>([
    {
      id: "file1",
      name: "NEET Biology Notes.pdf",
      type: "study-material",
      subject: "Biology",
      examType: "NEET",
      uploadDate: "2025-03-31",
      size: "4.2 MB",
      tags: ["notes", "biology", "neet"]
    },
    {
      id: "file2",
      name: "JEE Advanced Physics Formula Sheet.pdf",
      type: "syllabus",
      subject: "Physics",
      examType: "JEE Advanced",
      uploadDate: "2025-03-29",
      size: "2.1 MB",
      tags: ["formulas", "physics", "jee"]
    },
    {
      id: "file3",
      name: "CAT Quantitative Aptitude Question Bank.pdf",
      type: "practice",
      subject: "Mathematics",
      examType: "CAT",
      uploadDate: "2025-03-25",
      size: "8.7 MB",
      tags: ["questions", "mathematics", "cat"]
    },
    {
      id: "file4",
      name: "UPSC Previous Year Papers (2024).pdf",
      type: "exam-material",
      subject: "General Studies",
      examType: "UPSC",
      uploadDate: "2025-03-20",
      size: "12.4 MB",
      tags: ["previous-papers", "upsc"]
    }
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileRemove = () => {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Ensure we create a new file with the correct ContentType
          const newFile: ContentFile = {
            id: `file${uploadedFiles.length + 1}`,
            name: selectedFile.name,
            type: currentTab,
            subject: "Subject",
            examType: "Exam Type",
            uploadDate: new Date().toISOString().split('T')[0],
            size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
            tags: ["new"]
          };
          
          setUploadedFiles(prev => [newFile, ...prev]);
          setSelectedFile(null);
          
          toast({
            title: "File uploaded successfully",
            description: `${selectedFile.name} has been uploaded.`,
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const filteredFiles = uploadedFiles.filter(file => 
    (currentTab === "all" || file.type === currentTab) && 
    (file.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     file.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return {
    uploading,
    uploadProgress,
    selectedFile,
    uploadedFiles,
    searchTerm,
    currentTab,
    filteredFiles,
    handleFileSelect,
    handleFileRemove,
    handleUpload,
    setSearchTerm,
    setCurrentTab
  };
};
