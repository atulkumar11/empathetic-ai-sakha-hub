
import { getFeatures } from "@/pages/dashboard/student/utils/FeatureManager";
import { ReactNode } from "react";

export enum PlanType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Group = "group", 
  Institute = "institute",
  Corporate = "corporate"
}

export enum SubscriptionInterval {
  Monthly = "monthly",
  Yearly = "yearly"
}

export interface Feature {
  title: string;
  description: string;
  path: string;
  isPremium: boolean;
  icon: ReactNode;
  freeAccessLimit?: {
    type: "time" | "usage" | "content",
    limit: number // days, count, or percentage
  };
  allowedPlans?: PlanType[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  interval: SubscriptionInterval;
  features: string[]; // Feature titles
  maxUsers?: number; // For group, institute, corporate plans
  description: string;
  trialDays?: number; // Adding trial period
}

export const featureService = {
  getAllFeatures: async (): Promise<Feature[]> => {
    return getFeatures();
  },
  
  updateFeature: async (updatedFeature: Feature): Promise<Feature> => {
    return updatedFeature;
  },
  
  toggleFeaturePremium: async (featureTitle: string, isPremium: boolean): Promise<boolean> => {
    return true;
  },

  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    return [
      {
        id: "free-plan",
        name: "Free Trial",
        type: PlanType.Free,
        price: 0,
        interval: SubscriptionInterval.Monthly,
        features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision"],
        description: "7-day trial access to essential features",
        trialDays: 7
      },
      {
        id: "basic-plan",
        name: "Basic Plan",
        type: PlanType.Basic,
        price: 499,
        interval: SubscriptionInterval.Monthly,
        features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications"],
        description: "Full access to standard features"
      },
      {
        id: "premium-plan",
        name: "Premium Plan",
        type: PlanType.Premium,
        price: 999,
        interval: SubscriptionInterval.Monthly,
        features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications", "Motivation Coach", "Mental Health Zone", "My Materials Vault", "Live Tutors", "Collaborative Forum"],
        description: "Complete access to all features including premium content"
      },
      {
        id: "group-plan",
        name: "Group Plan",
        type: PlanType.Group,
        price: 3999,
        interval: SubscriptionInterval.Monthly,
        maxUsers: 5,
        features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications", "Motivation Coach"],
        description: "Shared access for 5 users with premium features"
      },
      {
        id: "institute-plan",
        name: "Institute Plan",
        type: PlanType.Institute,
        price: 19999,
        interval: SubscriptionInterval.Monthly,
        maxUsers: 50,
        features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications", "Motivation Coach", "Mental Health Zone", "My Materials Vault", "Live Tutors"],
        description: "Institutional access for up to 50 students with admin dashboard"
      },
      {
        id: "corporate-plan",
        name: "Corporate Plan",
        type: PlanType.Corporate,
        price: 49999,
        interval: SubscriptionInterval.Monthly,
        maxUsers: 100,
        features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications", "Motivation Coach", "Mental Health Zone", "My Materials Vault", "Live Tutors", "Collaborative Forum"],
        description: "Enterprise access for employees and their families with complete features"
      }
    ];
  },

  updateSubscriptionPlan: async (updatedPlan: SubscriptionPlan): Promise<SubscriptionPlan> => {
    return updatedPlan;
  }
};
