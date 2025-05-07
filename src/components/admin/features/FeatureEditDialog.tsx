
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Feature, PlanType } from "@/services/featureService";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FeatureEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature;
  onSave: (editedFeature: Feature) => void;
}

const FeatureEditDialog: React.FC<FeatureEditDialogProps> = ({ isOpen, onClose, feature, onSave }) => {
  const [editedFeature, setEditedFeature] = useState<Feature>(feature);
  const [activeTab, setActiveTab] = useState("general");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedFeature(prev => ({ ...prev, [name]: value }));
  };

  const handleTogglePremium = (checked: boolean) => {
    setEditedFeature(prev => ({ ...prev, isPremium: checked }));
  };

  const handleSave = () => {
    onSave(editedFeature);
  };

  const handleFreeLimitTypeChange = (value: string) => {
    if (value === "none") {
      setEditedFeature(prev => ({ ...prev, freeAccessLimit: undefined }));
      return;
    }

    setEditedFeature(prev => ({
      ...prev,
      freeAccessLimit: {
        type: value as "time" | "usage" | "content",
        limit: prev.freeAccessLimit?.limit || 0
      }
    }));
  };

  const handleFreeLimitValueChange = (value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    setEditedFeature(prev => ({
      ...prev,
      freeAccessLimit: prev.freeAccessLimit 
        ? { ...prev.freeAccessLimit, limit: numValue }
        : { type: "usage", limit: numValue }
    }));
  };

  const handleAllowedPlanToggle = (plan: PlanType) => {
    setEditedFeature(prev => {
      const currentPlans = prev.allowedPlans || [];
      const planIndex = currentPlans.indexOf(plan);
      
      if (planIndex >= 0) {
        // Remove the plan
        const newPlans = [...currentPlans];
        newPlans.splice(planIndex, 1);
        return { ...prev, allowedPlans: newPlans.length ? newPlans : undefined };
      } else {
        // Add the plan
        return { ...prev, allowedPlans: [...currentPlans, plan] };
      }
    });
  };

  const isPlanAllowed = (plan: PlanType): boolean => {
    if (!editedFeature.allowedPlans) return true; // If not specified, all plans are allowed
    return editedFeature.allowedPlans.includes(plan);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border shadow-lg dark:border-gray-700">
        <DialogHeader>
          <DialogTitle>Edit Feature</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="access">Free Access Limits</TabsTrigger>
            <TabsTrigger value="plans">Allowed Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                name="title"
                value={editedFeature.title}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={editedFeature.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="path" className="text-right">Path</Label>
              <Input
                id="path"
                name="path"
                value={editedFeature.path}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subscription" className="text-right">Subscription</Label>
              <div className="flex items-center gap-2 col-span-3">
                <Switch
                  id="subscription"
                  checked={editedFeature.isPremium}
                  onCheckedChange={handleTogglePremium}
                />
                <span>{editedFeature.isPremium ? 'Premium' : 'Basic'}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="access" className="space-y-4">
            <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-4">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription>
                Configure limits for users on the free plan. These limits will be enforced until users upgrade.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="limitType" className="text-right">Limit Type</Label>
              <Select 
                value={editedFeature.freeAccessLimit ? editedFeature.freeAccessLimit.type : "none"}
                onValueChange={handleFreeLimitTypeChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select limit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No limit</SelectItem>
                  <SelectItem value="time">Time-based limit</SelectItem>
                  <SelectItem value="usage">Usage-based limit</SelectItem>
                  <SelectItem value="content">Content-based limit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {editedFeature.freeAccessLimit && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="limitValue" className="text-right">Limit Value</Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="limitValue"
                    type="number"
                    min="0"
                    value={editedFeature.freeAccessLimit.limit}
                    onChange={(e) => handleFreeLimitValueChange(e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">
                    {editedFeature.freeAccessLimit.type === "time" ? "days" : 
                     editedFeature.freeAccessLimit.type === "usage" ? "uses" :
                     "percent"}
                  </span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-4">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription>
                Specify which subscription plans can access this feature. If none are selected, all plans have access.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-3">
              {Object.values(PlanType).map((plan) => (
                <div key={plan} className="flex items-center space-x-2">
                  <Switch 
                    id={`plan-${plan}`}
                    checked={isPlanAllowed(plan)}
                    onCheckedChange={() => handleAllowedPlanToggle(plan)}
                  />
                  <Label htmlFor={`plan-${plan}`} className="capitalize">{plan} Plan</Label>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureEditDialog;
