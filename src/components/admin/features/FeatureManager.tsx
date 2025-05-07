
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Check, X, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample feature data that matches student dashboard features
const featureData = [
  {
    id: "feature-1",
    name: "Student Dashboard",
    description: "Core student dashboard interface",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-15"
  },
  {
    id: "feature-2",
    name: "Concept Cards",
    description: "Study concepts with interactive cards",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-12"
  },
  {
    id: "feature-3",
    name: "Flashcards",
    description: "Memorize with smart flashcards",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-10"
  },
  {
    id: "feature-4",
    name: "Academic Advisor",
    description: "AI-powered academic guidance",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-08"
  },
  {
    id: "feature-5",
    name: "Practice Exams",
    description: "Take practice tests and track progress",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-05"
  },
  {
    id: "feature-6",
    name: "Mood-Based Learning",
    description: "Adapt learning based on student mood",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-03"
  },
  {
    id: "feature-7",
    name: "Study Plans",
    description: "Create and manage study plans",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-10-01"
  },
  {
    id: "feature-8",
    name: "Welcome Tour",
    description: "Onboarding tour for new students",
    status: "active",
    availableIn: ["student"],
    lastUpdated: "2023-09-28"
  }
];

const FeatureManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Filter features based on search query
  const filteredFeatures = featureData.filter(feature => 
    feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle feature status toggle
  const handleToggleFeature = (featureId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `Feature ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `Feature has been ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`
    });
    
    // In a real app, you would update the feature status in the database
    console.log(`Feature ${featureId} status changed to ${newStatus}`);
  };
  
  // Handle feature selection
  const handleSelectFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };
  
  // Handle bulk actions
  const handleBulkAction = (action: 'activate' | 'deactivate') => {
    if (selectedFeatures.length === 0) {
      toast({
        title: "No features selected",
        description: "Please select features to perform this action.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: `Features ${action === 'activate' ? 'Activated' : 'Deactivated'}`,
      description: `${selectedFeatures.length} features have been ${action === 'activate' ? 'activated' : 'deactivated'}.`
    });
    
    // In a real app, you would update the features status in the database
    setSelectedFeatures([]);
  };
  
  // Handle adding a new feature
  const handleAddFeature = () => {
    toast({
      title: "Create New Feature",
      description: "Feature creation form will open."
    });
    // In a real app, you would open a modal or navigate to a form
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Feature Management</h2>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search features..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-[250px]"
            />
          </div>
          <Button onClick={handleAddFeature}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Student Dashboard Features</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction('activate')}
                disabled={selectedFeatures.length === 0}
              >
                <Check className="h-4 w-4 mr-1" /> Activate
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction('deactivate')}
                disabled={selectedFeatures.length === 0}
              >
                <X className="h-4 w-4 mr-1" /> Deactivate
              </Button>
            </div>
          </div>
          <CardDescription>
            Manage features available on the student dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Feature</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeatures.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature.id)}
                      onChange={() => handleSelectFeature(feature.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{feature.name}</p>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                      {feature.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{feature.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`feature-toggle-${feature.id}`}
                          checked={feature.status === 'active'}
                          onCheckedChange={() => handleToggleFeature(feature.id, feature.status)}
                        />
                        <Label htmlFor={`feature-toggle-${feature.id}`} className="sr-only">
                          Toggle {feature.name}
                        </Label>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredFeatures.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No features found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-gray-500">
            Showing {filteredFeatures.length} of {featureData.length} features
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeatureManager;
