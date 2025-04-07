
import { mockStudentProfile } from './studentProfile';
import { mockEmployeeProfile } from './employeeProfile';
import { mockDoctorProfile } from './doctorProfile';
import { mockFounderProfile } from './founderProfile';
import { UserRole, UserProfileType, ExamGoal } from '@/types/user';

// New exam goals as string literals as per updated type
export const examGoals: ExamGoal[] = [
  "IIT JEE",
  "NEET",
  "MBA",
  "CUET UG", 
  "UPSC",
  "CLAT",
  "BANK PO"
];

// Additional exam goal details for UI/UX
export const examGoalDetails = [
  {
    id: "iit-jee",
    name: "IIT JEE",
    description: "Joint Entrance Examination for Indian Institutes of Technology",
    commonExamDate: "May 2026",
    recommendedHours: 6
  },
  {
    id: "neet",
    name: "NEET",
    description: "National Eligibility cum Entrance Test for Medical Colleges",
    commonExamDate: "June 2026",
    recommendedHours: 6
  },
  {
    id: "mba",
    name: "MBA",
    description: "Master of Business Administration Entrance Exams",
    commonExamDate: "December 2025",
    recommendedHours: 4
  },
  {
    id: "cuet-ug",
    name: "CUET UG",
    description: "Common University Entrance Test for Undergraduate Programs",
    commonExamDate: "April 2026",
    recommendedHours: 5
  },
  {
    id: "upsc",
    name: "UPSC",
    description: "Union Public Service Commission Examinations",
    commonExamDate: "June 2026",
    recommendedHours: 8
  },
  {
    id: "clat",
    name: "CLAT",
    description: "Common Law Admission Test",
    commonExamDate: "May 2026",
    recommendedHours: 5
  },
  {
    id: "bank-po",
    name: "BANK PO",
    description: "Bank Probationary Officer Exams",
    commonExamDate: "November 2025",
    recommendedHours: 6
  }
];

// Study pace options
export const studyPaceOptions = [
  { id: "aggressive", name: "Aggressive", description: "Maximum coverage, intensive pace" },
  { id: "balanced", name: "Balanced", description: "Steady, consistent learning pace" },
  { id: "relaxed", name: "Relaxed", description: "Flexible, less intensive pace" }
];

// Study time preferences
export const studyTimePreferences = [
  { id: "morning", name: "Morning", icon: "🌅", timeRange: "5:00 AM - 11:00 AM" },
  { id: "afternoon", name: "Afternoon", icon: "🌞", timeRange: "11:00 AM - 4:00 PM" },
  { id: "evening", name: "Evening", icon: "🌇", timeRange: "4:00 PM - 9:00 PM" },
  { id: "night", name: "Night", icon: "🌙", timeRange: "9:00 PM - 5:00 AM" }
];

export const getMockProfileByRole = (role: UserRole): UserProfileType => {
  switch (role) {
    case "Student":
      return mockStudentProfile;
    case "Employee":
      return mockEmployeeProfile;
    case "Doctor":
      return mockDoctorProfile;
    case "Founder":
      return mockFounderProfile;
    default:
      return mockStudentProfile;
  }
};

export {
  mockStudentProfile,
  mockEmployeeProfile,
  mockDoctorProfile,
  mockFounderProfile
};
