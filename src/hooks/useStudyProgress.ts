
import React, { useState, useEffect } from "react";
import { SubjectProgress, StudyStreak } from "@/types/user";
import { getAllSubjectsProgress, getStudyStreak } from "@/data/mockProgressData";

export function useStudyProgress() {
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [studyStreak, setStudyStreak] = useState<StudyStreak | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSubject, setSelectedSubject] = useState<SubjectProgress | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = () => {
      setLoading(true);

      setTimeout(() => {
        const subjectsData = getAllSubjectsProgress();
        const streakData = getStudyStreak();
        
        setSubjects(subjectsData);
        setStudyStreak(streakData);
        
        // Set first subject as default selected
        if (subjectsData.length > 0) {
          setSelectedSubject(subjectsData[0]);
        }
        
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, []);

  const selectSubject = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  return {
    subjects,
    studyStreak,
    loading,
    selectedSubject,
    selectSubject
  };
}
