
// Basic user types to be extended by specific user roles

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  loginCount?: number;
  goals?: Goal[];
  subscription?: SubscriptionType | { 
    planType: SubscriptionType;
    expiryDate?: string; 
  };
}

export interface Goal {
  id: string;
  title: string;
  targetDate?: string;
  progress?: number;
}

export enum UserRole {
  Student = "student",
  Parent = "parent",
  Teacher = "teacher",
  Admin = "admin"
}

export enum MoodType {
  MOTIVATED = "motivated",
  FOCUSED = "focused",
  STRESSED = "stressed",
  TIRED = "tired",
  CONFUSED = "confused"
}

export enum SubscriptionType {
  FREE = "free",
  PREMIUM = "premium",
  PREMIUM_PLUS = "premium_plus",
  TRIAL = "trial"
}
