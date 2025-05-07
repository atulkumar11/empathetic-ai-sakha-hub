
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Database, Layers, FileSpreadsheet, Book, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { downloadDatabaseSchemaAsCSV, getDatabaseSchemaCSV } from '@/utils/schema-export-csv';

const DatabaseSchemaCSVPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [schemaData, setSchemaData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTable, setCurrentTable] = useState<string>('');
  const [uniqueTables, setUniqueTables] = useState<string[]>([]);
  const [downloadStarted, setDownloadStarted] = useState(false);

  // Load and parse CSV data on component mount
  useEffect(() => {
    const loadSchema = () => {
      try {
        setLoading(true);
        // Get the CSV content
        const csvContent = getDatabaseSchemaCSV();
        
        // Parse the CSV into rows and columns (skip header row)
        const lines = csvContent.split('\n').filter(line => line.trim() !== '');
        const header = lines[0].split(',');
        const data = lines.slice(1).map(line => {
          // Handle commas within quoted strings properly
          let columns: string[] = [];
          let inQuote = false;
          let currentColumn = '';
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
              inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
              columns.push(currentColumn);
              currentColumn = '';
            } else {
              currentColumn += char;
            }
          }
          
          columns.push(currentColumn); // Add the last column
          return columns;
        });
        
        // Extract unique table names
        const tables = Array.from(new Set(data.map(row => row[0])));
        
        setSchemaData(data);
        setUniqueTables(tables);
        setCurrentTable(tables[0]); // Set first table as default
        
      } catch (error) {
        console.error("Error loading schema:", error);
        toast({
          title: "Error Loading Schema",
          description: "Could not load database schema information.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadSchema();
  }, [toast]);

  // Handle download action
  const handleDownload = () => {
    try {
      downloadDatabaseSchemaAsCSV();
      setDownloadStarted(true);
      toast({
        title: "Download Started",
        description: "Database schema CSV is being downloaded."
      });
      
      // Reset download started flag after 3 seconds
      setTimeout(() => setDownloadStarted(false), 3000);
    } catch (error) {
      console.error("Error downloading schema:", error);
      toast({
        title: "Download Failed",
        description: "Could not download database schema CSV.",
        variant: "destructive"
      });
    }
  };

  // Navigate to Flask developer guide
  const goToFlaskGuide = () => {
    navigate('/admin/flask-guide');
  };

  // Filter data for the currently selected table
  const filteredData = schemaData.filter(row => row[0] === currentTable);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Database Schema</h1>
            <p className="text-gray-600 mt-1">Complete database structure for the PREPZR application</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleDownload} 
              size="lg"
              className="gap-2"
              variant={downloadStarted ? "outline" : "default"}
            >
              {downloadStarted ? (
                <>
                  <FileSpreadsheet size={18} className="text-green-500" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Download CSV</span>
                </>
              )}
            </Button>

            <Button
              onClick={goToFlaskGuide}
              size="lg" 
              className="gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <Book size={18} />
              <span>Flask Implementation Guide</span>
            </Button>
            
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <ExternalLink size={20} className="text-indigo-600" />
            Connect Database Schema with Flask Implementation
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Our detailed Flask implementation guide provides step-by-step instructions for building backend services 
            based on this database schema. Click on the "Flask Implementation Guide" button to access comprehensive 
            documentation for developers.
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading database schema...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Tables Sidebar */}
            <div className="md:col-span-1">
              <Card className="sticky top-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database size={18} />
                    Tables
                  </CardTitle>
                  <CardDescription>{uniqueTables.length} tables in database</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[70vh] overflow-y-auto px-2">
                  <div className="space-y-1">
                    {uniqueTables.map(table => (
                      <Button
                        key={table}
                        variant={currentTable === table ? "default" : "ghost"}
                        className={`w-full justify-start ${currentTable === table ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : ''}`}
                        onClick={() => setCurrentTable(table)}
                      >
                        <span className="truncate">{table}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Table Details */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers size={18} />
                      Table: <span className="font-mono">{currentTable}</span>
                    </CardTitle>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {filteredData.length} fields
                    </div>
                  </div>
                  <CardDescription className="flex items-center justify-between">
                    <span>Fields and data types for the {currentTable} table</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-purple-600 hover:text-purple-700 flex items-center gap-1"
                      onClick={goToFlaskGuide}
                    >
                      <Book size={14} />
                      Flask Implementation for {currentTable}
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-1/6">Field</TableHead>
                          <TableHead className="w-1/6">Type</TableHead>
                          <TableHead className="w-2/6">Description</TableHead>
                          <TableHead className="w-2/6">Related Feature</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium font-mono">{row[1]}</TableCell>
                            <TableCell className="text-sm">{row[2]}</TableCell>
                            <TableCell>
                              {/* Handle quoted descriptions */}
                              {row[3]?.startsWith('"') && row[3]?.endsWith('"') 
                                ? row[3].slice(1, -1) 
                                : row[3]}
                            </TableCell>
                            <TableCell>{row[4]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseSchemaCSVPage;
