
export interface StudentData {
  id: string;
  name: string;
  email: string;
  role: string;
  examType?: string;
  registrationDate?: string;
  phoneNumber?: string;
  completedOnboarding?: boolean;
  goals?: string[];
  moodScore?: number;
  studyHours?: number;
  engagementScore?: number;
  subjectsSelected?: string[];
  testScores?: {
    subject: string;
    score: number;
    date: string;
  }[];
  // Properties needed by admin components
  status?: "active" | "inactive" | "pending";
  joinedDate?: string; // Changed from Date to string
  lastActive?: string; // Changed from Date to string
  examPrep?: string;
  subjects?: string[];
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  };
}
