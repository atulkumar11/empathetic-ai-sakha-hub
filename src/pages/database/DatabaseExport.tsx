
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Download, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { downloadDatabaseSchemaCSV } from '@/utils/database-schema-export';
import { Link } from 'react-router-dom';

const DatabaseExport = () => {
  const { toast } = useToast();
  const [exportSuccess, setExportSuccess] = React.useState(false);

  // Auto-download the CSV when the page loads
  useEffect(() => {
    handleDownloadCSV();
  }, []);

  const handleDownloadCSV = () => {
    try {
      downloadDatabaseSchemaCSV();
      toast({
        title: "Database Export Successful",
        description: "The database schema CSV has been downloaded to your device",
      });
      setExportSuccess(true);
    } catch (error) {
      console.error("Error downloading database schema:", error);
      toast({
        title: "Export Failed",
        description: "Failed to download database schema. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardTitle className="text-xl">Database Schema Export</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            {exportSuccess ? (
              <div className="flex flex-col items-center justify-center space-y-3">
                <Check className="text-green-500" size={48} />
                <h3 className="text-lg font-medium">Download Complete!</h3>
                <p className="text-sm text-gray-600">
                  Your database schema CSV has been downloaded. If the download didn't start automatically, click the button below to download again.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3">
                <FileSpreadsheet size={48} className="text-blue-500" />
                <h3 className="text-lg font-medium">Preparing Your CSV...</h3>
                <p className="text-sm text-gray-600">
                  Your download should start automatically. If it doesn't, click the button below.
                </p>
              </div>
            )}
          </div>

          <Button 
            onClick={handleDownloadCSV} 
            className="w-full gap-2"
          >
            <Download size={16} />
            {exportSuccess ? "Download Again" : "Manual Download"}
          </Button>

          <div className="flex justify-between pt-4">
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="outline">Admin Login</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseExport;
