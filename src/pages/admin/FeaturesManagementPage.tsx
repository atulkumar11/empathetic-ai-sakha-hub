
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Edit, Search, Filter, Download, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import FeatureEditDialog from "@/components/admin/features/FeatureEditDialog";
import { featureService, Feature, PlanType } from "@/services/featureService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FeaturesManagementPage = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [planFilter, setPlanFilter] = useState<PlanType | "all">("all");
  const [premiumFilter, setPremiumFilter] = useState<"all" | "premium" | "free">("all");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const data = await featureService.getAllFeatures();
        setFeatures(data);
      } catch (error) {
        console.error("Failed to load features:", error);
        toast({
          title: "Error",
          description: "Failed to load features",
          variant: "destructive"
        });
      }
    };
    
    loadFeatures();
  }, [toast]);

  const filteredFeatures = features.filter(feature => {
    // Text search
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Plan filter
    const matchesPlan = planFilter === "all" || 
                       !feature.allowedPlans || 
                       feature.allowedPlans.includes(planFilter as PlanType);
    
    // Premium filter
    const matchesPremium = premiumFilter === "all" ||
                          (premiumFilter === "premium" && feature.isPremium) ||
                          (premiumFilter === "free" && !feature.isPremium);

    // Tab filter
    const hasFreeLimits = !!feature.freeAccessLimit;
    const matchesTab = activeTab === "all" ||
                      (activeTab === "premium" && feature.isPremium) ||
                      (activeTab === "free" && !feature.isPremium) ||
                      (activeTab === "limited" && hasFreeLimits);
    
    return matchesSearch && matchesPlan && matchesPremium && matchesTab;
  });

  const handleToggleFeature = async (index: number, isPremium: boolean) => {
    try {
      const updatedFeatures = [...features];
      updatedFeatures[index] = {...updatedFeatures[index], isPremium};
      
      await featureService.toggleFeaturePremium(updatedFeatures[index].title, isPremium);
      setFeatures(updatedFeatures);
      
      toast({
        title: "Feature Updated",
        description: `${updatedFeatures[index].title} is now ${isPremium ? 'premium' : 'basic'}.`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature",
        variant: "destructive"
      });
    }
  };

  const handleEditFeature = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsEditDialogOpen(true);
  };

  const handleSaveFeature = async (editedFeature: Feature) => {
    try {
      await featureService.updateFeature(editedFeature);
      
      const updatedFeatures = features.map(f => 
        f.title === editedFeature.title ? editedFeature : f
      );
      setFeatures(updatedFeatures);
      
      toast({
        title: "Feature Updated",
        description: `Changes to ${editedFeature.title} have been saved.`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save feature changes",
        variant: "destructive"
      });
    } finally {
      setIsEditDialogOpen(false);
      setSelectedFeature(null);
    }
  };

  const getAccessDescription = (feature: Feature) => {
    if (!feature.freeAccessLimit) return "Full Access";
    
    switch (feature.freeAccessLimit.type) {
      case "time":
        return `${feature.freeAccessLimit.limit} days free access`;
      case "usage":
        return `${feature.freeAccessLimit.limit} free uses`;
      case "content":
        return `${feature.freeAccessLimit.limit}% free content`;
      default:
        return "Limited Access";
    }
  };

  const getPlanBadges = (feature: Feature) => {
    if (!feature.allowedPlans || feature.allowedPlans.length === 0) {
      return <Badge variant="outline">All Plans</Badge>;
    }
    
    return (
      <div className="flex flex-wrap gap-1">
        {feature.allowedPlans.map(plan => (
          <Badge key={plan} variant="outline" className="capitalize">{plan}</Badge>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Feature Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage features and subscriptions for student dashboard
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Features</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="limited">Limited Access</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search features..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={premiumFilter} onValueChange={(value: "all" | "premium" | "free") => setPremiumFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="premium">Premium Only</SelectItem>
              <SelectItem value="free">Free Only</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={planFilter} onValueChange={(value) => setPlanFilter(value as PlanType | "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value={PlanType.Free}>Free Plan</SelectItem>
              <SelectItem value={PlanType.Basic}>Basic Plan</SelectItem>
              <SelectItem value={PlanType.Premium}>Premium Plan</SelectItem>
              <SelectItem value={PlanType.Group}>Group Plan</SelectItem>
              <SelectItem value={PlanType.Institute}>Institute Plan</SelectItem>
              <SelectItem value={PlanType.Corporate}>Corporate Plan</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Platform Features</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Feature</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Access Type</TableHead>
                <TableHead>Free Limit</TableHead>
                <TableHead>Allowed Plans</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeatures.map((feature, index) => {
                const featureIndex = features.findIndex(f => f.title === feature.title);
                return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                        {feature.icon}
                      </div>
                      <span>{feature.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{feature.description}</TableCell>
                  <TableCell className="text-sm text-gray-500">{feature.path}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={feature.isPremium} 
                        onCheckedChange={(checked) => handleToggleFeature(featureIndex, checked)}
                      />
                      <span>{feature.isPremium ? 'Premium' : 'Basic'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {feature.freeAccessLimit ? (
                      <Badge variant="secondary">
                        {getAccessDescription(feature)}
                      </Badge>
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getPlanBadges(feature)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditFeature(feature)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedFeature && (
        <FeatureEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          feature={selectedFeature}
          onSave={handleSaveFeature}
        />
      )}
    </AdminLayout>
  );
};

export default FeaturesManagementPage;
