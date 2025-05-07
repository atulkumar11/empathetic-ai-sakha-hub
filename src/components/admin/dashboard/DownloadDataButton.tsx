
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  downloadStudentData, 
  downloadSystemLogs, 
  downloadDashboardStats,
  downloadExamResults
} from "@/utils/admin/downloadData";

type DataType = 'students' | 'logs' | 'stats' | 'exams';

interface DownloadDataButtonProps {
  dataType: DataType;
  data: any[] | any; // Array for students/logs/exams, object for stats
  isLoading?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const DownloadDataButton: React.FC<DownloadDataButtonProps> = ({
  dataType,
  data,
  isLoading = false,
  variant = 'outline',
  size = 'sm',
  className = ''
}) => {
  const { toast } = useToast();

  const getButtonLabel = () => {
    switch (dataType) {
      case 'students': return 'Export Students';
      case 'logs': return 'Export Logs';
      case 'stats': return 'Export Stats';
      case 'exams': return 'Export Exam Results';
      default: return 'Export Data';
    }
  };

  const handleDownload = () => {
    try {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        toast({
          title: "No Data to Export",
          description: "There is no data available for export.",
          variant: "destructive"
        });
        return;
      }

      switch (dataType) {
        case 'students':
          downloadStudentData(data);
          break;
        case 'logs':
          downloadSystemLogs(data);
          break;
        case 'stats':
          downloadDashboardStats(data);
          break;
        case 'exams':
          downloadExamResults(data);
          break;
      }

      toast({
        title: "Export Successful",
        description: `Your data has been exported to CSV successfully.`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error downloading data:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center gap-1.5 ${className}`}
      onClick={handleDownload}
      disabled={isLoading || !data || (Array.isArray(data) && data.length === 0)}
    >
      <Download className="h-4 w-4" />
      {getButtonLabel()}
    </Button>
  );
};

export default DownloadDataButton;
