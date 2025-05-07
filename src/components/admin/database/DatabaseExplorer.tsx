
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Database, Clock, RefreshCcw, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import databaseSyncService from "@/services/admin/databaseSync";

const DatabaseExplorer = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Load database modules
  useEffect(() => {
    const loadModules = async () => {
      try {
        setLoading(true);
        const data = await databaseSyncService.getDatabaseModules();
        setModules(data);
        if (data.length > 0) {
          setSelectedModule(data[0].id);
        }
      } catch (error) {
        console.error("Error loading database modules:", error);
        toast({
          title: "Failed to load database modules",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, [toast]);

  // Load tables when module is selected
  useEffect(() => {
    if (!selectedModule) return;

    const loadTables = async () => {
      try {
        setLoading(true);
        const data = await databaseSyncService.getTables(selectedModule);
        setTables(data);
      } catch (error) {
        console.error("Error loading tables:", error);
        toast({
          title: "Failed to load tables",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadTables();
  }, [selectedModule, toast]);

  // Filter tables based on search query
  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle syncing database
  const handleSync = async () => {
    try {
      setSyncing(true);
      await databaseSyncService.syncDatabase();
      toast({
        title: "Database sync complete",
        description: "All tables are now up to date"
      });
    } catch (error) {
      console.error("Error syncing database:", error);
      toast({
        title: "Sync failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Database Explorer</h2>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2"
          >
            <RefreshCcw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Database'}
          </Button>
        </div>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Database Modules</CardTitle>
          <CardDescription>
            Explore and manage the database tables that connect student and admin dashboards
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {loading && modules.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              Loading database modules...
            </div>
          ) : (
            <Tabs 
              value={selectedModule}
              onValueChange={setSelectedModule}
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
                {modules.map(module => (
                  <TabsTrigger key={module.id} value={module.id}>
                    {module.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {modules.map(module => (
                <TabsContent key={module.id} value={module.id}>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>{module.name}</CardTitle>
                        <Badge 
                          className={`${
                            module.status === 'active' 
                              ? 'bg-green-100 text-green-800 border-green-300' 
                              : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                          }`}
                        >
                          {module.status === 'active' ? 'Active' : 'Maintenance'}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Last synced: {new Date(module.lastSynced).toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input 
                            placeholder="Search tables..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-full md:w-[250px]"
                          />
                        </div>
                        <div className="text-sm text-gray-500">
                          {filteredTables.length} of {tables.length} tables
                        </div>
                      </div>
                      
                      {loading ? (
                        <div className="py-8 text-center text-gray-500">
                          Loading tables...
                        </div>
                      ) : (
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[300px]">Table Name</TableHead>
                                <TableHead>
                                  <div className="flex items-center">
                                    Row Count
                                    <ArrowUpDown className="h-3 w-3 ml-1" />
                                  </div>
                                </TableHead>
                                <TableHead>Last Modified</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredTables.map((table) => (
                                <TableRow key={table.id}>
                                  <TableCell className="font-medium flex items-center">
                                    <Database className="h-4 w-4 mr-2 text-gray-500" />
                                    {table.name}
                                  </TableCell>
                                  <TableCell>{table.rowCount.toLocaleString()}</TableCell>
                                  <TableCell>
                                    {new Date(table.lastModified).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm">View</Button>
                                    <Button variant="outline" size="sm">Query</Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                              
                              {filteredTables.length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    {searchQuery ? 'No tables match your search' : 'No tables available'}
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseExplorer;
