
// Mock subject data based on common exam goals
export const subjectsByGoal: Record<string, string[]> = {
  "IIT-JEE": ["Physics", "Chemistry", "Mathematics"],
  "NEET": ["Physics", "Chemistry", "Biology"],
  "UPSC": ["General Studies", "Current Affairs", "History", "Geography", "Polity", "Economy", "Environment", "Science & Tech"],
  "CAT": ["Quantitative Ability", "Verbal Ability", "Data Interpretation", "Logical Reasoning"],
  "GATE": ["Engineering Mathematics", "General Aptitude", "Subject Specific Paper"],
  "Bank PO": ["English Language", "Reasoning", "Quantitative Aptitude", "General Awareness", "Computer Knowledge"],
  "CLAT": ["English", "Current Affairs", "Legal Reasoning", "Logical Reasoning", "Quantitative Techniques"],
};

// Default subjects if goal not found
export const defaultSubjects = ["Mathematics", "Science", "English", "Social Studies"];

// Helper to find subjects for a goal
export const getSubjectsForGoal = (goalTitle: string): string[] => {
  const normalizedGoalTitle = Object.keys(subjectsByGoal).find(
    goal => goalTitle.toLowerCase().includes(goal.toLowerCase())
  );
  
  return normalizedGoalTitle ? 
    subjectsByGoal[normalizedGoalTitle] : 
    defaultSubjects;
};
