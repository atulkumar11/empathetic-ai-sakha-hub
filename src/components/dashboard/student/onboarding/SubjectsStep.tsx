import React from 'react';
import SubjectItem from './subject-step/SubjectItem';
import type { NewStudyPlanSubject } from '@/types/user/studyPlan';

interface SubjectsStepProps {
  subjects: NewStudyPlanSubject[];
  setSubjects: (subjects: NewStudyPlanSubject[]) => void;
  examType: string;
  strongSubjects?: string[];
  weakSubjects?: string[];
  handleToggleSubject?: (subject: string, type: 'strong' | 'weak') => void;
}

const SubjectsStep: React.FC<SubjectsStepProps> = ({ 
  subjects,
  setSubjects,
  examType,
  strongSubjects = [],
  weakSubjects = [],
  handleToggleSubject
}) => {
  const getSubjectsForExam = (exam: string): {name: string, topics: string[]}[] => {
    const defaultSubjects = [
      { name: "Physics", topics: ["Mechanics", "Thermodynamics", "Electrostatics"] },
      { name: "Chemistry", topics: ["Organic", "Inorganic", "Physical"] },
      { name: "Mathematics", topics: ["Calculus", "Algebra", "Geometry"] },
    ];
    
    switch (exam.toLowerCase()) {
      case 'neet':
        return [
          { name: "Biology", topics: ["Zoology", "Botany"] },
          { name: "Physics", topics: ["Mechanics", "Optics"] },
          { name: "Chemistry", topics: ["Organic", "Inorganic"] },
        ];
      case 'upsc':
        return [
          { name: "General Studies", topics: ["History", "Geography", "Polity"] },
          { name: "Current Affairs", topics: ["National", "International"] },
          { name: "Optional Subject", topics: ["Subject 1", "Subject 2"] },
        ];
      case 'cat':
        return [
          { name: "Quantitative Ability", topics: ["Algebra", "Arithmetic"] },
          { name: "Data Interpretation", topics: ["Charts", "Graphs"] },
          { name: "Verbal Ability", topics: ["Reading Comprehension", "Grammar"] },
          { name: "Logical Reasoning", topics: ["Syllogisms", "Puzzles"] },
        ];
      case 'bank po':
      case 'banking':
        return [
          { name: "English Language", topics: ["Grammar", "Comprehension"] },
          { name: "Quantitative Aptitude", topics: ["Arithmetic", "Data Interpretation"] },
          { name: "Reasoning", topics: ["Logical", "Verbal"] },
          { name: "General Awareness", topics: ["Banking", "Current Affairs"] },
        ];
      case 'gate':
        return [
          { name: "Engineering Mathematics", topics: ["Calculus", "Linear Algebra"] },
          { name: "Subject Specific", topics: ["Core Concepts", "Advanced Topics"] },
          { name: "General Aptitude", topics: ["Verbal", "Numerical"] },
        ];
      case 'clat':
        return [
          { name: "English", topics: ["Grammar", "Comprehension"] },
          { name: "Legal Reasoning", topics: ["Case Laws", "Legal Knowledge"] },
          { name: "Logical Reasoning", topics: ["Arguments", "Deductions"] },
          { name: "Current Affairs", topics: ["National", "International"] },
        ];
      default:
        if (exam.toLowerCase().includes('iit') || exam.toLowerCase().includes('jee')) {
          return defaultSubjects;
        }
        return defaultSubjects;
    }
  };

  const handleSubjectSelect = (subjectName: string, proficiency: 'weak' | 'moderate' | 'strong') => {
    if (handleToggleSubject && (proficiency === 'weak' || proficiency === 'strong')) {
      handleToggleSubject(subjectName, proficiency);
      return;
    }
    
    const existingIndex = subjects.findIndex(s => s.name === subjectName);
    
    if (existingIndex >= 0) {
      const updatedSubjects = [...subjects];
      updatedSubjects[existingIndex] = { name: subjectName, proficiency };
      setSubjects(updatedSubjects);
    } else {
      setSubjects([...subjects, { name: subjectName, proficiency }]);
    }
  };

  const isProficiencySelected = (subjectName: string, proficiency: 'weak' | 'moderate' | 'strong') => {
    if (proficiency === 'weak' && weakSubjects && weakSubjects.includes(subjectName)) {
      return true;
    }
    
    if (proficiency === 'strong' && strongSubjects && strongSubjects.includes(subjectName)) {
      return true;
    }
    
    const subject = subjects.find(s => s.name === subjectName);
    return subject && subject.proficiency === proficiency;
  };

  const availableSubjects = getSubjectsForExam(examType);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Select Your Subjects</h2>
        <p className="text-muted-foreground">
          Rate your proficiency in each subject so we can optimize your study plan
        </p>
      </div>

      <div className="space-y-6">
        {availableSubjects.map((subject, idx) => (
          <SubjectItem
            key={idx}
            name={subject.name}
            topics={subject.topics}
            isProficiencySelected={(proficiency) => isProficiencySelected(subject.name, proficiency)}
            onProficiencySelect={(proficiency) => handleSubjectSelect(subject.name, proficiency)}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectsStep;
