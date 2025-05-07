
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
import { 
  StudentProfile, 
  StudentGoal, 
  OnboardingData, 
  StudyPlan,
  MoodLog
} from '@/types/admin';

// Student service for handling student-related API calls
const studentService = {
  // Get student profile
  async getProfile(studentId: string): Promise<ApiResponse<StudentProfile>> {
    const response = await apiClient.get(API_ENDPOINTS.STUDENTS.PROFILE(studentId));
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Update student profile
  async updateProfile(studentId: string, profileData: Partial<StudentProfile>): Promise<ApiResponse<StudentProfile>> {
    const response = await apiClient.patch(API_ENDPOINTS.STUDENTS.PROFILE(studentId), profileData);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get student goals
  async getGoals(studentId: string): Promise<ApiResponse<StudentGoal[]>> {
    const response = await apiClient.get(API_ENDPOINTS.STUDENTS.GOALS(studentId));
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Create student goal
  async createGoal(studentId: string, goalData: Partial<StudentGoal>): Promise<ApiResponse<StudentGoal>> {
    const response = await apiClient.post(API_ENDPOINTS.STUDENTS.GOALS(studentId), goalData);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Update student goal
  async updateGoal(studentId: string, goalId: string, goalData: Partial<StudentGoal>): Promise<ApiResponse<StudentGoal>> {
    const response = await apiClient.patch(`${API_ENDPOINTS.STUDENTS.GOALS(studentId)}/${goalId}`, goalData);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get onboarding data
  async getOnboardingData(studentId: string): Promise<ApiResponse<OnboardingData>> {
    const response = await apiClient.get(API_ENDPOINTS.STUDENTS.ONBOARDING(studentId));
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Save onboarding data
  async saveOnboardingData(studentId: string, onboardingData: Partial<OnboardingData>): Promise<ApiResponse<OnboardingData>> {
    const response = await apiClient.post(API_ENDPOINTS.STUDENTS.ONBOARDING(studentId), onboardingData);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get study plan
  async getStudyPlan(studentId: string): Promise<ApiResponse<StudyPlan>> {
    const response = await apiClient.get(API_ENDPOINTS.STUDENTS.STUDY_PLAN(studentId));
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Generate new study plan
  async generateStudyPlan(studentId: string, preferences: Record<string, any>): Promise<ApiResponse<StudyPlan>> {
    const response = await apiClient.post(API_ENDPOINTS.STUDENTS.STUDY_PLAN(studentId), preferences);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Update study plan
  async updateStudyPlan(studentId: string, planId: string, planData: Partial<StudyPlan>): Promise<ApiResponse<StudyPlan>> {
    const response = await apiClient.patch(`${API_ENDPOINTS.STUDENTS.STUDY_PLAN(studentId)}/${planId}`, planData);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Record mood log
  async recordMood(studentId: string, moodData: Partial<MoodLog>): Promise<ApiResponse<MoodLog>> {
    const response = await apiClient.post(API_ENDPOINTS.STUDENTS.MOOD_LOGS(studentId), moodData);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get mood logs
  async getMoodLogs(studentId: string, timeRange?: { start: Date, end: Date }): Promise<ApiResponse<MoodLog[]>> {
    let endpoint = API_ENDPOINTS.STUDENTS.MOOD_LOGS(studentId);
    
    if (timeRange) {
      const startDate = timeRange.start.toISOString();
      const endDate = timeRange.end.toISOString();
      endpoint += `?start=${startDate}&end=${endDate}`;
    }
    
    const response = await apiClient.get(endpoint);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Submit doubt/question
  async submitDoubt(studentId: string, question: string, subject: string, topic: string): Promise<ApiResponse<any>> {
    const response = await apiClient.post(API_ENDPOINTS.STUDENTS.DOUBTS(studentId), {
      question,
      subject,
      topic
    });
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  }
};

export default studentService;
