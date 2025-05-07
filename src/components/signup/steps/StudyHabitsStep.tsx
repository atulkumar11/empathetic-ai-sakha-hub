
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

interface StudyHabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onSubmit }) => {
  const [breakFrequency, setBreakFrequency] = useState<string>("");
  const [stressManagement, setStressManagement] = useState<string>("");
  const [studyPreference, setStudyPreference] = useState<string>("");
  const [stressManagementCustom, setStressManagementCustom] = useState<string>("");
  const [studyPreferenceCustom, setStudyPreferenceCustom] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare habits data
    const habitsData: Record<string, string> = {
      breakFrequency,
      stressManagement: stressManagement === "other" ? stressManagementCustom : stressManagement,
      studyPreference: studyPreference === "other" ? studyPreferenceCustom : studyPreference,
    };
    
    onSubmit(habitsData);
  };

  // Ensure all required fields are filled
  const isFormValid = breakFrequency && stressManagement && studyPreference &&
    (stressManagement !== "other" || stressManagementCustom) &&
    (studyPreference !== "other" || studyPreferenceCustom);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-medium mb-1">Additional Study Preferences</h3>
        <p className="text-sm text-gray-500 mb-4">
          Let us understand more about your study habits to personalize your learning experience.
        </p>
      </div>

      <div className="space-y-4">
        {/* Break Frequency */}
        <div>
          <Label htmlFor="breakFrequency" className="text-base font-medium">
            Break Frequency
          </Label>
          <Select value={breakFrequency} onValueChange={setBreakFrequency}>
            <SelectTrigger id="breakFrequency" className="mt-2">
              <SelectValue placeholder="How often do you take breaks?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frequently">Frequently (every 30 mins)</SelectItem>
              <SelectItem value="occasionally">Occasionally (every 1-2 hours)</SelectItem>
              <SelectItem value="rarely">Rarely (study for 3+ hours straight)</SelectItem>
              <SelectItem value="pomodoro">Pomodoro technique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stress Management */}
        <div>
          <Label htmlFor="stressManagement" className="text-base font-medium">
            How do you manage study stress?
          </Label>
          <Select value={stressManagement} onValueChange={setStressManagement}>
            <SelectTrigger id="stressManagement" className="mt-2">
              <SelectValue placeholder="Select stress management technique" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exercise">Physical exercise</SelectItem>
              <SelectItem value="meditation">Meditation/Breathing techniques</SelectItem>
              <SelectItem value="music">Listening to music</SelectItem>
              <SelectItem value="breaks">Taking frequent breaks</SelectItem>
              <SelectItem value="talking">Talking to friends/family</SelectItem>
              <SelectItem value="other">Other (please specify)</SelectItem>
            </SelectContent>
          </Select>
          
          {stressManagement === "other" && (
            <Textarea
              value={stressManagementCustom}
              onChange={(e) => setStressManagementCustom(e.target.value)}
              placeholder="Please specify your stress management technique"
              className="mt-2"
            />
          )}
        </div>

        {/* Study Environment Preference */}
        <div>
          <Label htmlFor="studyPreference" className="text-base font-medium">
            Study Environment Preference
          </Label>
          <Select value={studyPreference} onValueChange={setStudyPreference}>
            <SelectTrigger id="studyPreference" className="mt-2">
              <SelectValue placeholder="Select preferred environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quiet">Quiet environment</SelectItem>
              <SelectItem value="background">Background noise/music</SelectItem>
              <SelectItem value="group">Group study</SelectItem>
              <SelectItem value="library">Library/Study room</SelectItem>
              <SelectItem value="outdoors">Outdoor setting</SelectItem>
              <SelectItem value="other">Other (please specify)</SelectItem>
            </SelectContent>
          </Select>
          
          {studyPreference === "other" && (
            <Textarea
              value={studyPreferenceCustom}
              onChange={(e) => setStudyPreferenceCustom(e.target.value)}
              placeholder="Please specify your study environment preference"
              className="mt-2"
            />
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600"
        disabled={!isFormValid}
      >
        Continue
      </Button>
    </motion.form>
  );
};

export default StudyHabitsStep;
