
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  currentImage?: string;
  userName: string;
  onImageUpload: (image: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, userName, onImageUpload }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 2MB",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };
  
  const handleUpload = () => {
    if (selectedFile) {
      onImageUpload(selectedFile);
      setIsDialogOpen(false);
      setPreviewImage(null);
      setSelectedFile(null);
    }
  };
  
  const openDialog = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const userInitials = userName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div>
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={currentImage} />
          <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm" className="mt-4" onClick={openDialog}>
          <Upload className="mr-2 h-4 w-4" />
          Change Photo
        </Button>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Profile Picture</DialogTitle>
            <DialogDescription>
              Choose a new profile picture to upload. Image must be less than 2MB.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {previewImage ? (
              <div className="flex justify-center">
                <Avatar className="h-40 w-40">
                  <AvatarImage src={previewImage} />
                  <AvatarFallback className="text-4xl">{userInitials}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Drag and drop an image, or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileSelect}
                />
              </div>
            )}
            
            {previewImage && (
              <div className="text-center">
                <Button variant="outline" size="sm" onClick={() => {
                  setPreviewImage(null);
                  setSelectedFile(null);
                }}>
                  Remove
                </Button>
              </div>
            )}
            
            {!previewImage && (
              <div className="text-center">
                <label className="cursor-pointer">
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    Select a file
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
