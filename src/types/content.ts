
/**
 * Content Management System Type Definitions
 */

export interface ContentFile {
  id: string;
  name: string;
  type: ContentType;
  subject: string;
  examType: string;
  uploadDate: string;
  size: string;
  tags: string[];
}

export type ContentType = 'study-material' | 'syllabus' | 'practice' | 'exam-material' | 'all';

export interface ContentUploaderProps {
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  selectedFile: File | null;
  onFileRemove: () => void;
  uploading: boolean;
  uploadProgress: number;
}

export interface ContentBrowserProps {
  files: ContentFile[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export interface ContentManagementHookReturn {
  uploading: boolean;
  uploadProgress: number;
  selectedFile: File | null;
  uploadedFiles: ContentFile[];
  searchTerm: string;
  currentTab: ContentType;
  filteredFiles: ContentFile[];
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: () => void;
  handleUpload: () => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTab: React.Dispatch<React.SetStateAction<ContentType>>;
}

export interface FileRowProps {
  file: ContentFile;
  onDownload: (fileName: string) => void;
  onView: (fileId: string) => void;
  onTagFile: (fileId: string) => void;
}

export interface FilesTableProps {
  files: ContentFile[];
  onDownload: (fileName: string) => void;
  onView: (fileId: string) => void;
  onTagFile: (fileId: string) => void;
}

export interface EmptyStateProps {
  searchTerm: string;
}
