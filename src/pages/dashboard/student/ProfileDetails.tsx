
import React, { useState } from "react";
import { UserProfileType } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Edit, MapPin, School, User, Phone, Mail } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userProfile, onUpdateProfile }) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: userProfile.name || "",
      email: userProfile.email || "",
      phone: userProfile.phone || "",
      location: userProfile.location || "",
      examPreparation: userProfile.examPreparation || "",
      personalityType: userProfile.personalityType || "",
      gender: userProfile.gender || ""
    }
  });
  
  const handleUpdateProfile = (data: any) => {
    try {
      // In a real app, this would send updates to the server
      onUpdateProfile(data);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setEditMode(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Profile Details</h2>
        <Button
          variant="outline"
          onClick={() => setEditMode(!editMode)}
        >
          <Edit className="h-4 w-4 mr-1.5" />
          {editMode ? "Cancel" : "Edit Profile"}
        </Button>
      </div>
      
      {editMode ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2 text-muted-foreground" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="City, State" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <School className="h-5 w-5 mr-2 text-muted-foreground" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="examPreparation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Preparation</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select exam" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="JEE Main">JEE Main</SelectItem>
                            <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
                            <SelectItem value="NEET">NEET</SelectItem>
                            <SelectItem value="UPSC">UPSC</SelectItem>
                            <SelectItem value="GATE">GATE</SelectItem>
                            <SelectItem value="CAT">CAT</SelectItem>
                            <SelectItem value="Bank PO">Bank PO</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="personalityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Learning Personality Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Visual Learner">Visual Learner</SelectItem>
                            <SelectItem value="Auditory Learner">Auditory Learner</SelectItem>
                            <SelectItem value="Kinesthetic Learner">Kinesthetic Learner</SelectItem>
                            <SelectItem value="Reading/Writing Learner">Reading/Writing Learner</SelectItem>
                            <SelectItem value="Logical Learner">Logical Learner</SelectItem>
                            <SelectItem value="Social Learner">Social Learner</SelectItem>
                            <SelectItem value="Solitary Learner">Solitary Learner</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2 text-muted-foreground" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Full Name</div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userProfile.name || "Not specified"}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Email Address</div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userProfile.email || "Not specified"}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Phone Number</div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userProfile.phone || "Not specified"}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Location</div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userProfile.location || "Not specified"}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Gender</div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium capitalize">{userProfile.gender || "Not specified"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <School className="h-5 w-5 mr-2 text-muted-foreground" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Exam Preparation</div>
                  <div className="flex items-center gap-1.5">
                    <School className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userProfile.examPreparation || "Not specified"}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Learning Personality Type</div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userProfile.personalityType || "Not specified"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
