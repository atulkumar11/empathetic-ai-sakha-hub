
import { Question } from "./QuestionStep";
import { UserRole } from "@/types/user/base";

export const getQuestionsByRole = (role: UserRole): Question[] => {
  switch (role) {
    case UserRole.Student:
      return studentQuestions;
    case UserRole.Employee:
      return employeeQuestions;
    case UserRole.Doctor:
      return doctorQuestions;
    case UserRole.Founder:
      return founderQuestions;
    default:
      return studentQuestions;
  }
};

export const studentQuestions: Question[] = [
  {
    id: "study-style",
    question: "Let's understand your study style to better guide you. Take this short quiz?",
    options: [
      { id: "planner", label: "I plan ahead and follow schedules" },
      { id: "flexible", label: "I go with the flow and adapt" },
      { id: "mixed", label: "I use a mix of structure and flexibility" },
      { id: "pressure", label: "I work best under pressure" }
    ]
  },
  {
    id: "learning-preference",
    question: "How do you prefer to learn new concepts?",
    options: [
      { id: "visual", label: "Visual aids (charts, videos, diagrams)" },
      { id: "reading", label: "Reading text and taking notes" },
      { id: "practice", label: "Solving problems and practicing" },
      { id: "discussion", label: "Discussing with others" }
    ]
  }
];

export const employeeQuestions: Question[] = [
  {
    id: "working-style",
    question: "Let's understand your working style to better guide you. Take this short quiz?",
    options: [
      { id: "planner", label: "I plan ahead and follow schedules" },
      { id: "flexible", label: "I go with the flow and adapt" },
      { id: "mixed", label: "I use a mix of structure and flexibility" },
      { id: "pressure", label: "I work best under pressure" }
    ]
  },
  {
    id: "experience-level",
    question: "What's your experience level?",
    options: [
      { id: "entry", label: "Entry level (0-2 years)" },
      { id: "mid", label: "Mid-level (3-5 years)" },
      { id: "senior", label: "Senior (5-10 years)" },
      { id: "lead", label: "Leadership (10+ years)" }
    ]
  }
];

export const doctorQuestions: Question[] = [
  {
    id: "study-style",
    question: "Let's understand your study style to better guide you. Take this short quiz?",
    options: [
      { id: "planner", label: "I plan ahead and follow schedules" },
      { id: "flexible", label: "I go with the flow and adapt" },
      { id: "mixed", label: "I use a mix of structure and flexibility" },
      { id: "pressure", label: "I work best under pressure" }
    ]
  },
  {
    id: "specialty",
    question: "What's your medical specialty or area of interest?",
    options: [
      { id: "internal", label: "Internal Medicine" },
      { id: "surgery", label: "Surgery" },
      { id: "pediatrics", label: "Pediatrics" },
      { id: "other", label: "Other Specialty" }
    ]
  }
];

export const founderQuestions: Question[] = [
  {
    id: "working-style",
    question: "Let's understand your working style to better guide you. Take this short quiz?",
    options: [
      { id: "planner", label: "I plan ahead and follow schedules" },
      { id: "flexible", label: "I go with the flow and adapt" },
      { id: "mixed", label: "I use a mix of structure and flexibility" },
      { id: "pressure", label: "I work best under pressure" }
    ]
  },
  {
    id: "startup-stage",
    question: "What stage is your startup in?",
    options: [
      { id: "idea", label: "Idea phase" },
      { id: "mvp", label: "Building MVP" },
      { id: "early", label: "Early traction" },
      { id: "growth", label: "Growth phase" }
    ]
  }
];
