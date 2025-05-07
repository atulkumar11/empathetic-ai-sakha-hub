
import { useState, useEffect } from 'react';
import { TodaysPlanData, TimelineView } from '@/types/student/todaysPlan';

// Mock data for today's plan
const mockTodayPlan: TodaysPlanData = {
  id: "plan-1",
  date: new Date().toISOString(),
  streak: 4,
  completedTasks: 3,
  totalTasks: 7,
  timeAllocation: {
    concepts: 70,
    flashcards: 25,
    practiceExams: 45,
    revision: 20,
    total: 160
  },
  concepts: [
    {
      id: "c1",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      topic: "Mechanics",
      duration: 25,
      status: "pending",
      difficulty: "Medium"
    },
    {
      id: "c2",
      title: "Motion Kinematics",
      subject: "Physics",
      topic: "Mechanics",
      duration: 20,
      status: "completed",
      difficulty: "Easy"
    }
  ],
  flashcards: [
    {
      id: "f1",
      title: "Force & Motion Flashcards",
      subject: "Physics",
      duration: 15,
      status: "pending",
      cardCount: 20
    }
  ],
  practiceExams: [
    {
      id: "p1",
      title: "Physics Mini Test",
      subject: "Physics",
      duration: 30,
      status: "pending",
      questionCount: 15
    },
    {
      id: "p2",
      title: "Chemistry Quick Quiz",
      subject: "Chemistry",
      duration: 15,
      status: "completed",
      questionCount: 10
    }
  ],
  recommendations: [
    {
      id: "r1",
      type: "concept",
      title: "Wave Optics",
      description: "Master the concepts of wave optics",
      reason: "Complements your current study of Physics"
    },
    {
      id: "r2",
      type: "flashcard",
      title: "Chemical Elements Deck",
      description: "Review periodic table elements",
      reason: "You've been consistently improving in Chemistry"
    }
  ],
  tomorrowPreview: {
    totalTasks: 5,
    focusArea: "Mathematics",
    difficulty: "moderate",
    concepts: 2,
    flashcards: 2,
    practiceExams: 1
  },
  subjectBreakdown: {
    "Physics": {
      concepts: [
        {
          id: "c1",
          title: "Newton's Laws",
          status: "pending",
          timeEstimate: "25"
        },
        {
          id: "c2",
          title: "Motion Kinematics",
          status: "pending",
          timeEstimate: "20"
        }
      ],
      flashcards: [
        {
          id: "f1",
          deckName: "Force & Motion",
          status: "pending",
          timeEstimate: "15"
        }
      ],
      practiceExams: [
        {
          id: "p1",
          examName: "Mini Test",
          status: "pending",
          timeEstimate: "30"
        }
      ]
    },
    "Chemistry": {
      concepts: [
        {
          id: "c3",
          title: "Periodic Table",
          status: "pending",
          timeEstimate: "25"
        }
      ],
      flashcards: [
        {
          id: "f2",
          deckName: "Chemical Elements",
          status: "pending",
          timeEstimate: "10"
        }
      ],
      practiceExams: [
        {
          id: "p2",
          examName: "Quick Quiz",
          status: "pending",
          timeEstimate: "15"
        }
      ]
    }
  },
  backlogTasks: [
    {
      id: "bl1",
      subject: "History",
      title: "Revolt of 1857 Flashcards",
      type: "flashcard",
      timeEstimate: 15,
      status: "overdue",
      daysOverdue: 1
    },
    {
      id: "bl2",
      subject: "Math",
      title: "Quadratic Equations Concept",
      type: "concept",
      timeEstimate: 30,
      status: "overdue",
      daysOverdue: 2
    }
  ]
};

export const useTodaysPlan = (examGoal = "IIT-JEE", userName = "Student") => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planData, setPlanData] = useState<TodaysPlanData | null>(null);
  const [activeView, setActiveView] = useState<TimelineView>('list');

  // Fetch today's plan data
  useEffect(() => {
    const fetchPlanData = () => {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      setTimeout(() => {
        try {
          // Simulate API response
          const data = {
            ...mockTodayPlan,
            examGoal: examGoal || "IIT-JEE",
            userName: userName || "Student"
          };
          setPlanData(data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch today's plan. Please try again later.");
          setLoading(false);
        }
      }, 800);
    };

    fetchPlanData();
  }, [examGoal, userName]);

  // Refresh data
  const refreshData = () => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      try {
        // Simulate API response with slightly different data
        const updatedData = {
          ...mockTodayPlan,
          examGoal: examGoal || "IIT-JEE",
          userName: userName || "Student"
        };
        setPlanData(updatedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to refresh data. Please try again later.");
        setLoading(false);
      }
    }, 800);
  };

  // Mark task as completed
  const markTaskCompleted = (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => {
    if (!planData) return;
    
    setPlanData(prev => {
      if (!prev) return null;
      
      const updated = {...prev};
      
      if (type === 'concept') {
        updated.concepts = updated.concepts.map(c => {
          if (c.id === id) {
            return {...c, status: 'completed'};
          }
          return c;
        });
      } else if (type === 'flashcard') {
        updated.flashcards = updated.flashcards.map(f => {
          if (f.id === id) {
            return {...f, status: 'completed'};
          }
          return f;
        });
      } else if (type === 'practice-exam') {
        updated.practiceExams = updated.practiceExams.map(p => {
          if (p.id === id) {
            return {...p, status: 'completed'};
          }
          return p;
        });
      }
      
      // Update completion count
      let completedCount = 0;
      completedCount += updated.concepts.filter(c => c.status === 'completed').length;
      completedCount += updated.flashcards.filter(f => f.status === 'completed').length;
      completedCount += updated.practiceExams.filter(p => p.status === 'completed').length;
      
      updated.completedTasks = completedCount;
      
      return updated;
    });
  };

  // Add bookmark
  const addBookmark = (title: string, type: 'concept' | 'flashcard' | 'exam') => {
    if (!planData || !planData.smartExtras) return;
    
    setPlanData(prev => {
      if (!prev || !prev.smartExtras) return prev;
      
      return {
        ...prev,
        smartExtras: {
          ...prev.smartExtras,
          bookmarks: [
            ...prev.smartExtras.bookmarks,
            {
              id: `b${prev.smartExtras.bookmarks.length + 1}`,
              title,
              type,
              addedOn: new Date().toISOString()
            }
          ]
        }
      };
    });
  };

  // Add note
  const addNote = (content: string) => {
    if (!planData || !planData.smartExtras) return;
    
    setPlanData(prev => {
      if (!prev || !prev.smartExtras) return prev;
      
      return {
        ...prev,
        smartExtras: {
          ...prev.smartExtras,
          notes: [
            ...prev.smartExtras.notes,
            {
              id: `n${prev.smartExtras.notes.length + 1}`,
              content,
              createdAt: new Date().toISOString()
            }
          ]
        }
      };
    });
  };

  return {
    loading,
    error,
    planData,
    activeView,
    setActiveView,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote
  };
};
