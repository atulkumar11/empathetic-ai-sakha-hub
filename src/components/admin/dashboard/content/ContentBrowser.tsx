import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  ContentBrowserProps, 
  EmptyStateProps, 
  FilesTableProps, 
  FileRowProps 
} from "@/types/content";
import { FileText } from "lucide-react";

const ContentBrowser = ({ files, searchTerm, setSearchTerm }: ContentBrowserProps) => {
  const { toast } = useToast();
  
  const handleDownload = (fileName: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${fileName}...`
    });
  };
  
  const handleView = (fileId: string) => {
    toast({
      title: "File viewer opened",
      description: `Viewing file ID: ${fileId}`
    });
  };
  
  const handleTagFile = (fileId: string) => {
    toast({
      title: "Tag editor opened",
      description: `Add or edit tags for file ID: ${fileId}`
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by file name, subject, or tag"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>
      
      {files.length === 0 ? (
        <EmptyState searchTerm={searchTerm} />
      ) : (
        <FilesTable 
          files={files}
          onDownload={handleDownload}
          onView={handleView}
          onTagFile={handleTagFile}
        />
      )}
    </div>
  );
};

const EmptyState = ({ searchTerm }: EmptyStateProps) => (
  <div className="text-center py-8">
    <FileText className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 font-semibold">No files found</h3>
    <p className="text-sm text-gray-500">
      {searchTerm 
        ? "Try changing your search terms" 
        : "Upload files to get started"}
    </p>
  </div>
);

const FilesTable = ({ files, onDownload, onView, onTagFile }: FilesTableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4 font-medium">File Name</th>
          <th className="text-left py-3 px-4 font-medium">Subject</th>
          <th className="text-left py-3 px-4 font-medium">Exam Type</th>
          <th className="text-left py-3 px-4 font-medium">Upload Date</th>
          <th className="text-left py-3 px-4 font-medium">Size</th>
          <th className="text-left py-3 px-4 font-medium">Tags</th>
          <th className="text-right py-3 px-4 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <FileRow 
            key={file.id}
            file={file}
            onDownload={onDownload}
            onView={onView}
            onTagFile={onTagFile}
          />
        ))}
      </tbody>
    </table>
  </div>
);

const FileRow = ({ file, onDownload, onView, onTagFile }: FileRowProps) => (
  <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
    <td className="py-3 px-4">{file.name}</td>
    <td className="py-3 px-4">{file.subject}</td>
    <td className="py-3 px-4">{file.examType}</td>
    <td className="py-3 px-4">{file.uploadDate}</td>
    <td className="py-3 px-4">{file.size}</td>
    <td className="py-3 px-4">
      <div className="flex flex-wrap gap-1">
        {file.tags.map((tag: string, i: number) => (
          <span 
            key={i} 
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </td>
    <td className="py-3 px-4 text-right">
      <div className="flex justify-end gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onView(file.id)}
        >
          <Search size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDownload(file.name)}
        >
          <Download size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onTagFile(file.id)}
        >
          <Tag size={16} />
        </Button>
      </div>
    </td>
  </tr>
);

export default ContentBrowser;
