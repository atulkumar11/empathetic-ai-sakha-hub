
import { UserProfileType, UserRole } from "./base";

export interface ProfessionalProfile extends UserProfileType {
  lastActive?: string;
}

export interface EmployeeProfile extends ProfessionalProfile {
  role: UserRole.Employee;
  jobTitle?: string;
  workExperience?: number;
  skills?: string[];
  company?: string;
  industry?: string;
  careerGoal?: string;
  projectsCompleted?: number;
  trainingCompleted?: number;
  experienceLevel?: string;
  skillsToGrow?: string[];
  productivityScore?: number;
}

export interface DoctorProfile extends ProfessionalProfile {
  role: UserRole.Doctor;
  specialty?: string;
  hospital?: string;
  licenseNumber?: string;
  patientsServed?: number;
  yearsOfPractice?: number;
  consultationHours?: string;
  researchPublications?: number;
  certifications?: string[];
  educationalInterests?: string[];
}

export interface FounderProfile extends ProfessionalProfile {
  role: UserRole.Founder;
  startupName?: string;
  industry?: string;
  foundingYear?: string;
  teamSize?: number;
  funding?: string;
  stage?: string;
  mvpStatus?: number;
  pitchDeckReady?: boolean;
  startupStage?: string;
  startupGoal?: string;
  mvpCompletion?: number;
  pitchDeckStatus?: number;
}
