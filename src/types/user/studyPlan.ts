
// Define the type for a study plan subject with priority
export interface StudyPlanSubject {
  id: string;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  color?: string;
  progress?: number;
  proficiency?: "weak" | "moderate" | "strong";
  topics?: { id?: string; name: string; completed: boolean; status?: "pending" | "completed" | "skipped" | "in-progress" }[];
  hoursPerWeek?: number;
  priority?: "low" | "medium" | "high";
  completed: boolean;
  status?: "pending" | "completed" | "skipped" | "in-progress";
  isWeakSubject?: boolean; // Added field to identify weak subjects
}

// Define the type for a new study plan
export interface NewStudyPlan {
  id?: string;
  name?: string;
  goal: string;
  examGoal?: string;
  subjects: StudyPlanSubject[];
  weeklyHours?: number;
  startDate?: string;
  endDate?: string;
  examDate: string | Date; // Allow Date type
  status: "active" | "completed" | "archived";
  progress?: number;
  createdAt?: string;
  learningPace?: "slow" | "moderate" | "fast";
  // Added fields for onboarding data
  userDemographics?: {
    age?: number;
    educationLevel?: string;
    city?: string;
  };
  studyPreferences?: {
    personalityType?: "analytical" | "creative" | "imagination" | "practical" | "visual" | "auditory" | "kinesthetic";
    mood?: "happy" | "motivated" | "focused" | "neutral" | "tired" | "anxious" | "stressed" | "sad";
    studyPace?: "aggressive" | "balanced" | "relaxed";
    dailyStudyHours?: number;
    breakFrequency?: "frequently" | "occasionally" | "rarely" | "pomodoro";
    stressManagement?: string;
    studyEnvironment?: string;
    preferredStudyTime?: "morning" | "afternoon" | "evening" | "night";
  };
  contactInfo?: {
    mobileNumber?: string; // For login authentication
  };
}

// Define the type for a study plan
export interface StudyPlan extends NewStudyPlan {
  id: string;
  createdAt: string;
}

// Define the type for a task in a study plan
export interface StudyTask {
  id: string;
  name: string;
  completed: boolean;
  subjectId: string;
  dueDate: string;
  priority?: "low" | "medium" | "high";
  difficulty?: "easy" | "medium" | "hard";
}
