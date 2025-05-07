
import { DoctorProfile } from "@/types/user";
import { UserRole, SubscriptionType } from "@/types/user/base";
import { v4 as uuidv4 } from "uuid";

export const mockDoctorProfile: DoctorProfile = {
  id: uuidv4(),
  name: "Dr. Aisha Sharma",
  email: "dr.aisha.sharma@maxhealthcare.com",
  phoneNumber: "+919876543210",
  role: UserRole.Doctor,
  personalityType: "Analytical Problem Solver",
  subscription: SubscriptionType.Premium,
  joinDate: "2025-02-10",
  lastActive: "2025-04-07",
  specialization: "Neurology",
  qualifications: [
    "MBBS - AIIMS",
    "MD - Neurology",
    "Fellowship - Cognitive Neuroscience"
  ],
  researchInterests: [
    "Alzheimer's Disease",
    "Neuroplasticity",
    "Cognitive Enhancement"
  ],
  publications: 14,
  institution: "Max Healthcare Institute",
  yearsOfPractice: 8,
  certifications: [
    "Advanced Neurology",
    "Clinical Research",
    "Medical Education"
  ],
  researchTopic: "Neural Biomarkers for Early Alzheimer's Detection",
  thesisTitle: "Cognitive Reserve and Neurodegenerative Progression",
  clinicalInterest: "Memory Disorders",
  researchPhase: "Clinical Trials",
  goals: [
    {
      id: uuidv4(),
      title: "Complete Research Paper",
      description: "Finish and submit paper on neural biomarkers",
      progress: 65,
      status: "in-progress",
      dueDate: "2025-06-15",
      targetDate: new Date("2025-06-15")
    },
    {
      id: uuidv4(),
      title: "Conference Presentation",
      description: "Present findings at International Neurology Conference",
      progress: 40,
      status: "not-started",
      dueDate: "2025-08-20",
      targetDate: new Date("2025-08-20")
    }
  ],
  areasOfInterest: [
    {
      id: uuidv4(),
      name: "Machine Learning in Diagnostics",
      level: "Intermediate"
    },
    {
      id: uuidv4(),
      name: "Clinical Research",
      level: "Advanced"
    }
  ]
};
