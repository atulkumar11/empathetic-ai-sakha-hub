
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserProfileType, Gender, SignupType, StudyPreferenceType, StudyPace } from "@/types/user/base";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  GraduationCap,
  Clock
} from "lucide-react";
import { useForm } from "react-hook-form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProfileOverviewProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

export function ProfileOverview({ userProfile, onUpdateProfile }: ProfileOverviewProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const form = useForm({
    defaultValues: {
      name: userProfile.name || "",
      email: userProfile.email || "",
      phoneNumber: userProfile.phoneNumber || "",
      bio: userProfile.bio || "",
      examPreparation: userProfile.examPreparation || "",
      location: userProfile.location || "",
      personalityType: userProfile.personalityType || "",
      gender: userProfile.gender || Gender.PreferNotToSay,
      grade: userProfile.grade || "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // In a real app, we would upload this to a server
        // For now, we'll just update it directly in the profile
        onUpdateProfile({
          ...userProfile,
          avatar: reader.result as string,
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data: any) => {
    onUpdateProfile({
      ...data
    });
    setIsEditing(false);
  };

  const getSignupTypeLabel = (type?: SignupType) => {
    if (!type) return "Email";
    
    switch (type) {
      case SignupType.Google:
        return "Google";
      case SignupType.Facebook:
        return "Facebook";
      case SignupType.Mobile:
        return "Mobile";
      case SignupType.Email:
      default:
        return "Email";
    }
  };

  const getStudyPaceLabel = (pace?: StudyPace) => {
    if (!pace) return "Moderate";
    
    switch (pace) {
      case StudyPace.Light:
        return "Light (1-2 hours/day)";
      case StudyPace.Intense:
        return "Intense (5+ hours/day)";
      case StudyPace.Moderate:
      default:
        return "Moderate (3-4 hours/day)";
    }
  };

  const getStudyTypeLabel = (type?: StudyPreferenceType) => {
    if (!type) return "Solo";
    
    switch (type) {
      case StudyPreferenceType.Group:
        return "Group Study";
      case StudyPreferenceType.AIAssisted:
        return "AI-Assisted";
      case StudyPreferenceType.Solo:
      default:
        return "Solo Study";
    }
  };

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Profile Information</h3>
        <Button 
          variant={isEditing ? "outline" : "default"} 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24 cursor-pointer border-2 border-primary">
                  {userProfile.avatar ? (
                    <AvatarImage src={userProfile.avatar} />
                  ) : (
                    <AvatarFallback className="text-xl bg-primary/10">
                      {getInitials(userProfile.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer"
                >
                  <User className="h-4 w-4" />
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="examPreparation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Preparation</FormLabel>
                    <FormControl>
                      <Input placeholder="Exam (e.g. JEE, NEET, UPSC)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
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
                        <SelectItem value={Gender.Male}>Male</SelectItem>
                        <SelectItem value={Gender.Female}>Female</SelectItem>
                        <SelectItem value={Gender.Other}>Other</SelectItem>
                        <SelectItem value={Gender.PreferNotToSay}>Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade/Class/Year</FormLabel>
                    <FormControl>
                      <Input placeholder="Grade/Class/Year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="personalityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personality Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Personality Type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about yourself..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start md:items-center md:flex-row flex-col gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/10">
                  {userProfile.avatar ? (
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  ) : (
                    <AvatarFallback className="text-xl bg-primary/10">
                      {getInitials(userProfile.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                  
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{userProfile.email}</span>
                  </div>
                  
                  {userProfile.phoneNumber && (
                    <div className="flex items-center text-sm text-muted-foreground space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{userProfile.phoneNumber}</span>
                    </div>
                  )}
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {userProfile.signupType && (
                      <Badge variant="outline">
                        {getSignupTypeLabel(userProfile.signupType)}
                      </Badge>
                    )}
                    {userProfile.examPreparation && (
                      <Badge variant="secondary">
                        {userProfile.examPreparation}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="personal-info">
              <AccordionTrigger className="text-lg font-semibold">
                Personal Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProfile.personalityType && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Personality Type</div>
                      <div>{userProfile.personalityType}</div>
                    </div>
                  )}
                  
                  {userProfile.location && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Location</div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" /> 
                        {userProfile.location}
                      </div>
                    </div>
                  )}
                  
                  {userProfile.gender && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Gender</div>
                      <div>
                        {userProfile.gender === Gender.Male ? 'Male' : 
                         userProfile.gender === Gender.Female ? 'Female' : 
                         userProfile.gender === Gender.Other ? 'Other' : 'Prefer not to say'}
                      </div>
                    </div>
                  )}
                  
                  {userProfile.grade && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Grade/Year</div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" /> 
                        {userProfile.grade}
                      </div>
                    </div>
                  )}
                  
                  {userProfile.bio && (
                    <div className="col-span-2 space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Bio</div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" /> 
                        <p>{userProfile.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="study-preferences">
              <AccordionTrigger className="text-lg font-semibold">
                Study Preferences
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProfile.studyPreferences ? (
                    <>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Study Pace</div>
                        <Badge>
                          {getStudyPaceLabel(userProfile.studyPreferences.pace)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">Study Preference</div>
                        <Badge variant="outline">
                          {getStudyTypeLabel(userProfile.studyPreferences.preferenceType)}
                        </Badge>
                      </div>
                      
                      {userProfile.studyPreferences.hoursPerDay && (
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Hours per Day</div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" /> 
                            {userProfile.studyPreferences.hoursPerDay} hours
                          </div>
                        </div>
                      )}
                      
                      {(userProfile.studyPreferences.preferredTimeStart && userProfile.studyPreferences.preferredTimeEnd) && (
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Preferred Study Time</div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" /> 
                            {userProfile.studyPreferences.preferredTimeStart} to {userProfile.studyPreferences.preferredTimeEnd}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">No study preferences set.</p>
                      <Button className="mt-2" variant="outline" onClick={() => setIsEditing(true)}>
                        Set Study Preferences
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="subjects-goals">
              <AccordionTrigger className="text-lg font-semibold">
                Subjects & Goals
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {userProfile.subjects && userProfile.subjects.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {userProfile.goals && userProfile.goals.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Goals</h4>
                      <div className="space-y-2">
                        {userProfile.goals.map((goal) => (
                          <Card key={goal.id} className="p-2 bg-background">
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium">{goal.title}</h5>
                                <div className="text-xs text-muted-foreground">
                                  Target: {goal.targetDate}
                                  {goal.targetYear && ` (${goal.targetYear})`}
                                </div>
                              </div>
                              <Badge variant={goal.progress >= 75 ? "success" : "secondary"}>
                                {goal.progress}% Complete
                              </Badge>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {(!userProfile.subjects || userProfile.subjects.length === 0) && 
                   (!userProfile.goals || userProfile.goals.length === 0) && (
                    <div>
                      <p className="text-muted-foreground">No subjects or goals set.</p>
                      <Button className="mt-2" variant="outline" onClick={() => setIsEditing(true)}>
                        Add Subjects & Goals
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
}
