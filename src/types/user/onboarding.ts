
import { UserRole, PersonalityType, MoodType } from './base';

export interface OnboardingData {
  role: UserRole;
  age?: number;
  grade?: string;
  location?: string;
  examGoal?: string; // Changed from ExamGoal to string
  jobTitle?: string;
  experience?: string;
  industry?: string;
  skills?: string[];
  specialization?: string;
  institution?: string;
  researchTopic?: string;
  startupStage?: string;
  teamSize?: number;
  startupGoal?: string;
  personalityType?: PersonalityType;
  mood?: MoodType;
  sleepSchedule?: string;
  focusHours?: number;
  stressManagement?: string;
  breakRoutine?: string;
  interests?: string[];
  name?: string;
  phoneNumber?: string;
}
