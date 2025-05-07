
import { useState, useEffect } from 'react';
import { 
  UserProfileType, 
  UserRole, 
  Gender, 
  SignupType, 
  StudyPace, 
  StudyPreferenceType, 
  MoodType, 
  PaymentMethod,
  BillingHistory,
  SubscriptionType
} from '@/types/user/base';

// Mock data for demonstration
const generateMockUserProfile = (role: UserRole): UserProfileType => {
  if (role === UserRole.Admin) {
    return {
      id: 'admin-123',
      name: 'Admin User',
      email: 'admin@prepzr.com',
      role: UserRole.Admin,
      bio: 'System administrator',
      phoneNumber: '+1 555-123-4567',
      recentActivity: {
        lastLogin: new Date(),
        completedTasks: 15
      }
    };
  } else {
    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: 'card1',
        type: 'card',
        lastFour: '4242',
        expiryDate: '12/24',
        isDefault: true,
        cardType: 'Visa'
      },
      {
        id: 'upi1',
        type: 'upi',
        isDefault: false,
        upiId: 'user@okicici'
      }
    ];
    
    const mockBillingHistory: BillingHistory[] = [
      {
        id: 'inv1',
        date: '2023-12-01',
        amount: 999,
        status: 'paid',
        invoiceUrl: '#',
        planName: 'Pro Plan (Monthly)'
      },
      {
        id: 'inv2',
        date: '2023-11-01',
        amount: 999,
        status: 'paid',
        invoiceUrl: '#',
        planName: 'Pro Plan (Monthly)'
      }
    ];
    
    return {
      id: 'student-123',
      name: 'John Student',
      email: 'john@student.com',
      role: UserRole.Student,
      signupType: SignupType.Email,
      examPreparation: 'JEE Advanced 2025',
      avatar: '',
      bio: 'Passionate student preparing for engineering entrance exams.',
      phoneNumber: '+91 98765 43210',
      personalityType: 'Analytical learner',
      location: 'Mumbai, India',
      gender: Gender.Male,
      grade: '12th Grade',
      goals: [
        { id: 'g1', title: 'Complete Physics syllabus', targetDate: '2023-12-31', progress: 65, targetYear: '2025' },
        { id: 'g2', title: 'Score 95+ in Mock Tests', targetDate: '2023-11-30', progress: 40, targetYear: '2025' }
      ],
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      studyPreferences: {
        pace: StudyPace.Moderate,
        hoursPerDay: 4,
        preferredTimeStart: '18:00',
        preferredTimeEnd: '22:00',
        preferenceType: StudyPreferenceType.Solo
      },
      preferences: {
        studyReminders: true,
        emailNotifications: true,
        darkMode: false
      },
      recentActivity: {
        lastLogin: new Date(),
        lastStudySession: new Date(Date.now() - 86400000),
        completedTasks: 42
      },
      subscription: {
        type: 'pro_monthly',
        startDate: '2023-11-01',
        endDate: '2024-11-01',
        isActive: true,
        planType: 'pro_monthly',
        features: [
          'Unlimited Concept Cards (via Study Plan)',
          'Unlimited Flashcards',
          'Unlimited Practice Exams',
          'Create Custom Cards (via credits)',
          '2 Academic Advisor plans/month',
          'Full + Mood-Based Smart Study Plan',
          'Unlimited AI Tutor (Fair Use)',
          'Surrounding Influence',
          'Feel Good Corner'
        ],
        memberLimit: 0
      },
      studyStreak: 12,
      mood: MoodType.Motivated,
      paymentMethods: mockPaymentMethods,
      billingHistory: mockBillingHistory
    };
  }
};

export const useUserProfile = (role: UserRole = UserRole.Student) => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get mock profile based on role
        const mockProfile = generateMockUserProfile(role);
        
        setUserProfile(mockProfile);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [role]);
  
  // Function to update user profile
  const updateUserProfile = (updates: Partial<UserProfileType>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  };

  return { userProfile, loading, error, updateUserProfile };
};
