
import { UserProfileBase, UserRole, MoodType } from "@/types/user/base";

export function getMockProfileByRole(role: UserRole): UserProfileBase {
  switch (role) {
    case UserRole.Student:
      return {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: UserRole.Student,
        loginCount: 3,
        goals: [
          {
            id: "1",
            title: "IIT-JEE",
            targetDate: "2024-04-10"
          }
        ],
        mood: MoodType.Motivated,
        streak: 12,
        studyHours: 28,
        conceptsLearned: 48,
        testsCompleted: 24
      };
    case UserRole.Teacher:
      return {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: UserRole.Teacher,
        loginCount: 25,
        goals: [
          {
            id: "1",
            title: "Improve student pass rate",
            targetDate: "2024-05-20"
          }
        ]
      };
    case UserRole.Parent:
      return {
        id: "3",
        name: "Robert Johnson",
        email: "robert@example.com",
        role: UserRole.Parent,
        loginCount: 8,
        goals: [
          {
            id: "1",
            title: "Monitor child's progress",
          }
        ]
      };
    case UserRole.Admin:
      return {
        id: "4",
        name: "Admin User",
        email: "admin@example.com",
        role: UserRole.Admin,
        loginCount: 42,
      };
    default:
      return {
        id: "0",
        name: "Unknown User",
        email: "unknown@example.com",
        role: UserRole.Student,
        loginCount: 1,
      };
  }
}
