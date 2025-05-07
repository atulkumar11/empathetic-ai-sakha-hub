
import { ReactNode } from "react";
import { MessageSquare, Calendar, Activity, Brain, BookOpen, Heart, Target, 
  Code, Video, Users, Bell, CreditCard, GraduationCap, Smile, Globe, UserCircle } from "lucide-react";
import { Feature } from "@/services/featureService";

export const getFeatures = (): Feature[] => {
  return [
    {
      icon: <MessageSquare />,
      title: "24/7 Tutor",
      description: "Get instant help with any subject. Ask questions and receive detailed explanations.",
      path: "/dashboard/student/tutor",
      isPremium: false,
      freeAccessLimit: {
        type: "usage",
        limit: 5 // 5 questions per day
      }
    },
    {
      icon: <Calendar />,
      title: "Academic Advisor",
      description: "Get personalized study plans based on your goals and schedule.",
      path: "/dashboard/student/academic",
      isPremium: false,
      freeAccessLimit: {
        type: "usage",
        limit: 3 // 3 plans
      }
    },
    {
      icon: <Activity />,
      title: "Motivation Coach",
      description: "Track your mood and habits. Get daily motivation to stay on track.",
      path: "/dashboard/student/motivation",
      isPremium: true,
    },
    {
      icon: <Brain />,
      title: "Flashcards & Revision",
      description: "Built-in flashcard system to improve memorization and revision.",
      path: "/dashboard/student/flashcards",
      isPremium: false,
      freeAccessLimit: {
        type: "content",
        limit: 50 // 50% of content
      }
    },
    {
      icon: <BookOpen />,
      title: "Practice Exams",
      description: "Take subject-specific mock tests and track your progress.",
      path: "/dashboard/student/exams",
      isPremium: false,
      freeAccessLimit: {
        type: "content",
        limit: 30 // 30% of exams
      }
    },
    {
      icon: <Target />,
      title: "Goal Tracking",
      description: "Set and track your academic goals with AI-powered insights.",
      path: "/dashboard/student/goals",
      isPremium: false,
      freeAccessLimit: {
        type: "usage",
        limit: 3 // 3 goals
      }
    },
    {
      icon: <Heart />,
      title: "Mental Health Zone",
      description: "Track mood, manage stress, and prevent burnout.",
      path: "/dashboard/student/wellness",
      isPremium: true,
    },
    {
      icon: <Code />,
      title: "My Materials Vault",
      description: "Upload and organize your study materials with AI tagging.",
      path: "/dashboard/student/materials",
      isPremium: true,
    },
    {
      icon: <Video />,
      title: "Live Tutors",
      description: "Connect with expert tutors for personalized 1:1 sessions.",
      path: "/dashboard/student/live-tutors",
      isPremium: true,
    },
    {
      icon: <Users />,
      title: "Collaborative Forum",
      description: "Join or create study groups with peers preparing for similar exams.",
      path: "/dashboard/student/forum",
      isPremium: true,
    },
    {
      icon: <Video />,
      title: "Video Library",
      description: "Access curated educational videos for your exam preparation.",
      path: "/dashboard/student/videos",
      isPremium: false,
      freeAccessLimit: {
        type: "content",
        limit: 20 // 20% of videos
      }
    },
    {
      icon: <Bell />,
      title: "Smart Notifications",
      description: "Get personalized reminders via app, SMS, email, or WhatsApp.",
      path: "/dashboard/student/notifications",
      isPremium: false,
      freeAccessLimit: {
        type: "usage",
        limit: 5 // 5 notifications per day
      }
    },
    // Adding the missing features requested by the user
    {
      icon: <GraduationCap />,
      title: "Concept Card",
      description: "Browse and study key concepts in an easy-to-understand card format.",
      path: "/dashboard/student/concepts",
      isPremium: false,
      freeAccessLimit: {
        type: "content",
        limit: 40 // 40% of content
      }
    },
    {
      icon: <Smile />,
      title: "Mood Tracker",
      description: "Log your daily mood and receive personalized support based on your emotional state.",
      path: "/dashboard/student/mood",
      isPremium: true,
    },
    {
      icon: <Globe />,
      title: "Surrounding Influence",
      description: "Analyze and optimize your study environment and social influences.",
      path: "/dashboard/student/influences",
      isPremium: true,
    },
    {
      icon: <UserCircle />,
      title: "Profile Analytics",
      description: "In-depth analytics about your studying patterns, strengths, and areas to improve.",
      path: "/dashboard/student/profile-analytics",
      isPremium: true,
    }
  ];
};
