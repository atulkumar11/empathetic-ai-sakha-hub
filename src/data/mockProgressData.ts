
import { SubjectProgress, StudyStreak } from "@/types/user";

// Mock data for subject progress
export const mockSubjectsProgress: SubjectProgress[] = [
  {
    id: "s1",
    name: "Physics",
    progress: 75,
    lastWeekProgress: 68,
    color: "#3b82f6", // blue
    topics: [
      { id: "t1", name: "Mechanics", completed: true, masteryLevel: 85, lastPracticed: "2025-05-10" },
      { id: "t2", name: "Thermodynamics", completed: true, masteryLevel: 78, lastPracticed: "2025-05-08" },
      { id: "t3", name: "Electromagnetism", completed: false, masteryLevel: 65, lastPracticed: "2025-05-05" },
      { id: "t4", name: "Optics", completed: false, masteryLevel: 45, lastPracticed: "2025-05-01" },
      { id: "t5", name: "Modern Physics", completed: false, masteryLevel: 30, lastPracticed: "2025-04-28" }
    ],
    quizScores: [
      { id: "q1", title: "Mechanics Quiz", score: 42, maxScore: 50, date: "2025-05-09", timeTaken: 35 },
      { id: "q2", title: "Thermodynamics Review", score: 28, maxScore: 40, date: "2025-05-04", timeTaken: 28 },
      { id: "q3", title: "Weekly Assessment", score: 85, maxScore: 100, date: "2025-04-30", timeTaken: 55 }
    ],
    studyHours: [
      { date: "2025-05-11", hours: 2.5 },
      { date: "2025-05-10", hours: 1.5 },
      { date: "2025-05-09", hours: 3 },
      { date: "2025-05-08", hours: 2 },
      { date: "2025-05-07", hours: 1 },
      { date: "2025-05-06", hours: 2.5 },
      { date: "2025-05-05", hours: 2 }
    ]
  },
  {
    id: "s2",
    name: "Mathematics",
    progress: 60,
    lastWeekProgress: 52,
    color: "#8b5cf6", // purple
    topics: [
      { id: "t6", name: "Algebra", completed: true, masteryLevel: 90, lastPracticed: "2025-05-11" },
      { id: "t7", name: "Calculus", completed: true, masteryLevel: 75, lastPracticed: "2025-05-09" },
      { id: "t8", name: "Trigonometry", completed: false, masteryLevel: 60, lastPracticed: "2025-05-06" },
      { id: "t9", name: "Coordinate Geometry", completed: false, masteryLevel: 40, lastPracticed: "2025-05-02" }
    ],
    quizScores: [
      { id: "q4", title: "Algebra Test", score: 48, maxScore: 50, date: "2025-05-10", timeTaken: 32 },
      { id: "q5", title: "Calculus Quiz", score: 35, maxScore: 50, date: "2025-05-05", timeTaken: 40 },
      { id: "q6", title: "Monthly Assessment", score: 78, maxScore: 100, date: "2025-04-29", timeTaken: 60 }
    ],
    studyHours: [
      { date: "2025-05-11", hours: 3 },
      { date: "2025-05-10", hours: 2 },
      { date: "2025-05-09", hours: 2.5 },
      { date: "2025-05-08", hours: 1.5 },
      { date: "2025-05-07", hours: 2 },
      { date: "2025-05-06", hours: 1.5 },
      { date: "2025-05-05", hours: 2.5 }
    ]
  },
  {
    id: "s3",
    name: "Chemistry",
    progress: 42,
    lastWeekProgress: 35,
    color: "#10b981", // green
    topics: [
      { id: "t10", name: "Organic Chemistry", completed: true, masteryLevel: 65, lastPracticed: "2025-05-08" },
      { id: "t11", name: "Inorganic Chemistry", completed: false, masteryLevel: 40, lastPracticed: "2025-05-04" },
      { id: "t12", name: "Physical Chemistry", completed: false, masteryLevel: 30, lastPracticed: "2025-04-30" }
    ],
    quizScores: [
      { id: "q7", title: "Organic Chemistry Quiz", score: 32, maxScore: 50, date: "2025-05-07", timeTaken: 38 },
      { id: "q8", title: "Weekly Assessment", score: 65, maxScore: 100, date: "2025-04-28", timeTaken: 55 }
    ],
    studyHours: [
      { date: "2025-05-11", hours: 1.5 },
      { date: "2025-05-10", hours: 1 },
      { date: "2025-05-09", hours: 2 },
      { date: "2025-05-08", hours: 2.5 },
      { date: "2025-05-07", hours: 1 },
      { date: "2025-05-06", hours: 1.5 },
      { date: "2025-05-05", hours: 1 }
    ]
  },
  {
    id: "s4",
    name: "Biology",
    progress: 28,
    lastWeekProgress: 20,
    color: "#f43f5e", // red
    topics: [
      { id: "t13", name: "Cell Biology", completed: true, masteryLevel: 70, lastPracticed: "2025-05-09" },
      { id: "t14", name: "Genetics", completed: false, masteryLevel: 35, lastPracticed: "2025-05-03" },
      { id: "t15", name: "Human Physiology", completed: false, masteryLevel: 25, lastPracticed: "2025-04-29" },
      { id: "t16", name: "Ecology", completed: false, masteryLevel: 15, lastPracticed: "2025-04-25" }
    ],
    quizScores: [
      { id: "q9", title: "Cell Biology Test", score: 38, maxScore: 50, date: "2025-05-08", timeTaken: 35 },
      { id: "q10", title: "Monthly Assessment", score: 58, maxScore: 100, date: "2025-04-27", timeTaken: 60 }
    ],
    studyHours: [
      { date: "2025-05-11", hours: 1 },
      { date: "2025-05-10", hours: 0.5 },
      { date: "2025-05-09", hours: 1.5 },
      { date: "2025-05-08", hours: 1 },
      { date: "2025-05-07", hours: 0.5 },
      { date: "2025-05-06", hours: 1 },
      { date: "2025-05-05", hours: 0.5 }
    ]
  }
];

// Mock data for study streak
export const mockStudyStreak: StudyStreak = {
  current: 5,
  longest: 12,
  thisWeek: [2.5, 3.5, 4, 3, 2, 4.5, 3],
  lastMonth: [
    2, 3, 2.5, 1.5, 2, 3, 4,
    3, 2, 1.5, 3, 4, 3.5, 2,
    0, 1, 3, 4, 3, 2.5, 3,
    2, 3, 4, 3.5, 4, 3, 2.5, 3, 2
  ]
};

// Helper function to get progress data for a specific subject
export function getSubjectProgressById(subjectId: string): SubjectProgress | undefined {
  return mockSubjectsProgress.find(subject => subject.id === subjectId);
}

// Helper function to get all subjects
export function getAllSubjectsProgress(): SubjectProgress[] {
  return mockSubjectsProgress;
}

// Helper function to get study streak data
export function getStudyStreak(): StudyStreak {
  return mockStudyStreak;
}

