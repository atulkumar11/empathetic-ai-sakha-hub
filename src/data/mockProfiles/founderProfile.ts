
import { FounderProfile } from "@/types/user";
import { UserRole, SubscriptionType } from "@/types/user/base";
import { v4 as uuidv4 } from "uuid";

export const mockFounderProfile: FounderProfile = {
  id: uuidv4(),
  name: "Priya Mehta",
  email: "priya.mehta@edumatch.com",
  phoneNumber: "+919876543212",
  role: UserRole.Founder,
  personalityType: "Creative Builder",
  subscription: {
    planId: "premium-001",
    planType: SubscriptionType.Premium,
    startDate: "2024-12-05",
    endDate: "2025-12-05"
  },
  joinDate: "2024-12-05",
  lastActive: "2025-04-07",
  startupName: "EduMatch",
  industry: "EdTech",
  foundingYear: "2024",
  teamSize: 4,
  funding: "Seed",
  stage: "Early Traction",
  mvpStatus: 80,
  pitchDeckReady: true,
  startupStage: "Product-Market Fit",
  startupGoal: "Series A Funding",
  mvpCompletion: 80,
  pitchDeckStatus: 100,
  goals: [
    {
      id: uuidv4(),
      title: "Secure Series A",
      description: "Raise $1.5M in Series A funding",
      progress: 35,
      status: "in-progress",
      dueDate: "2025-09-30",
      targetDate: new Date("2025-09-30")
    },
    {
      id: uuidv4(),
      title: "User Growth",
      description: "Reach 50,000 active users",
      progress: 60,
      status: "in-progress",
      dueDate: "2025-06-15",
      targetDate: new Date("2025-06-15")
    }
  ],
  areasOfInterest: [
    {
      id: uuidv4(),
      name: "Growth Marketing",
      level: "Intermediate"
    },
    {
      id: uuidv4(),
      name: "Financial Modeling",
      level: "Beginner"
    }
  ]
};
