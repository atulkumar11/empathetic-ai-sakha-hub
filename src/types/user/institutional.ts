
import { UserRole, SubscriptionType } from "./base";

export interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "member" | "leader" | "school_admin" | "corporate_admin";
  status: "active" | "inactive" | "pending";
  joinedDate?: string;
  invitationCode?: string;
  avatar?: string;
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  };
}

export interface InstitutionalBatch {
  id: string;
  name: string;
  description?: string;
  type: "school" | "corporate";
  createdAt: string;
  members: BatchMember[];
  adminId: string;
  adminName: string;
  adminEmail: string;
  maxMembers: number;
  activeMembersCount: number;
  batchCode: string;
  subscription: {
    planType: SubscriptionType.School | SubscriptionType.Corporate;
    startDate: string;
    endDate: string;
  };
}

export interface BatchProgress {
  batchId: string;
  averageProgress: number;
  activeMembersPercentage: number;
  topPerformers: {
    memberId: string;
    name: string;
    progress: number;
  }[];
  lowEngagementMembers: {
    memberId: string;
    name: string;
    lastActive?: string;
  }[];
  completionRate: number;
  totalStudyHours: number;
}
