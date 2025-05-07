
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
import { 
  StudySession, 
  StudyHabit, 
  StudyHabitSettings, 
  StudyHabitAnalytics 
} from '@/types/admin/studyHabits';

// Study habits service for handling study habits data
const studyHabitsService = {
  // Get study habit settings
  async getStudyHabitSettings(): Promise<ApiResponse<StudyHabitSettings>> {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN.STUDY_HABITS.SETTINGS);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Update study habit settings
  async updateStudyHabitSettings(settings: Partial<StudyHabitSettings>): Promise<ApiResponse<StudyHabitSettings>> {
    const response = await apiClient.put(API_ENDPOINTS.ADMIN.STUDY_HABITS.SETTINGS, settings);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get study habit analytics
  async getStudyHabitAnalytics(): Promise<ApiResponse<StudyHabitAnalytics>> {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN.STUDY_HABITS.ANALYTICS);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get study sessions for a specific student
  async getStudentSessions(studentId: string, timeRange?: { start: Date, end: Date }): Promise<ApiResponse<StudySession[]>> {
    let endpoint = API_ENDPOINTS.ADMIN.STUDY_HABITS.SESSIONS(studentId);
    
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
  
  // Get study habit statistics for a specific student
  async getStudentHabits(studentId: string): Promise<ApiResponse<StudyHabit[]>> {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN.STUDY_HABITS.HABITS(studentId));
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Calculate consistency score for a student
  async calculateConsistencyScore(studentId: string): Promise<ApiResponse<{ consistencyScore: number }>> {
    const response = await apiClient.post(API_ENDPOINTS.ADMIN.STUDY_HABITS.CALCULATE_CONSISTENCY(studentId));
    return {
      success: true,
      data: response.data,
      error: null
    };
  }
};

export default studyHabitsService;
