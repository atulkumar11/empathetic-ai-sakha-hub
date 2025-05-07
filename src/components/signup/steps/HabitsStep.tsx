
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

interface HabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const HabitsStep: React.FC<HabitsStepProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    focusHours: "2",
    preferredStudyTime: "morning",
    studyPace: "balanced",
    dailyStudyHours: "3",
    stressManagement: "exercise",
    stressManagementCustom: "",
    studyPreference: "quiet",
    studyPreferenceCustom: ""
  });
  
  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <Label htmlFor="dailyStudyHours">Daily study hours</Label>
        <Select 
          value={formData.dailyStudyHours}
          onValueChange={(value) => handleChange("dailyStudyHours", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select daily study hours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 hour</SelectItem>
            <SelectItem value="2">2 hours</SelectItem>
            <SelectItem value="3">3 hours</SelectItem>
            <SelectItem value="4">4 hours</SelectItem>
            <SelectItem value="5">5 hours</SelectItem>
            <SelectItem value="6">6+ hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Preferred study time</Label>
        <RadioGroup 
          value={formData.preferredStudyTime}
          onValueChange={(value) => handleChange("preferredStudyTime", value)}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <RadioGroupItem value="morning" id="morning" />
            <Label htmlFor="morning" className="cursor-pointer">Morning</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <RadioGroupItem value="afternoon" id="afternoon" />
            <Label htmlFor="afternoon" className="cursor-pointer">Afternoon</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <RadioGroupItem value="evening" id="evening" />
            <Label htmlFor="evening" className="cursor-pointer">Evening</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <RadioGroupItem value="night" id="night" />
            <Label htmlFor="night" className="cursor-pointer">Night</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Preferred study pace</Label>
        <RadioGroup 
          value={formData.studyPace}
          onValueChange={(value) => handleChange("studyPace", value)}
          className="grid grid-cols-1 gap-2"
        >
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <RadioGroupItem value="aggressive" id="aggressive" />
            <Label htmlFor="aggressive" className="cursor-pointer">Aggressive (intense study sessions)</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <RadioGroupItem value="balanced" id="balanced" />
            <Label htmlFor="balanced" className="cursor-pointer">Balanced (moderate pace)</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <RadioGroupItem value="relaxed" id="relaxed" />
            <Label htmlFor="relaxed" className="cursor-pointer">Relaxed (gradual learning)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>How do you manage stress?</Label>
        <Select 
          value={formData.stressManagement}
          onValueChange={(value) => handleChange("stressManagement", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select stress management technique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exercise">Physical exercise</SelectItem>
            <SelectItem value="meditation">Meditation/Breathing</SelectItem>
            <SelectItem value="breaks">Regular breaks</SelectItem>
            <SelectItem value="music">Listening to music</SelectItem>
            <SelectItem value="talking">Talking to friends/family</SelectItem>
            <SelectItem value="custom">Other (specify)</SelectItem>
          </SelectContent>
        </Select>
        
        {formData.stressManagement === "custom" && (
          <Input 
            value={formData.stressManagementCustom} 
            onChange={(e) => handleChange("stressManagementCustom", e.target.value)} 
            placeholder="Please specify"
            className="mt-2"
          />
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
      >
        Continue
      </Button>
    </motion.form>
  );
};

export default HabitsStep;
