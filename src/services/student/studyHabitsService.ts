
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
import { StudySession, StudyHabit } from '@/types/admin/studyHabits';

// Student study habits service
const studentStudyHabitsService = {
  // Start a study session
  async startStudySession(studentId: string, sessionData: Partial<StudySession>): Promise<ApiResponse<StudySession>> {
    const response = await apiClient.post(API_ENDPOINTS.STUDENTS.STUDY_SESSIONS(studentId), {
      ...sessionData,
      startTime: new Date(),
      completed: false
    });
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // End a study session
  async endStudySession(studentId: string, sessionId: string, data: { moodAfter?: number, notes?: string }): Promise<ApiResponse<StudySession>> {
    const response = await apiClient.put(`${API_ENDPOINTS.STUDENTS.STUDY_SESSIONS(studentId)}/${sessionId}/end`, {
      ...data,
      endTime: new Date(),
      completed: true
    });
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get active study session
  async getActiveSession(studentId: string): Promise<ApiResponse<StudySession | null>> {
    const response = await apiClient.get(`${API_ENDPOINTS.STUDENTS.STUDY_SESSIONS(studentId)}/active`);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get study session history
  async getSessionHistory(studentId: string, timeRange?: { start: Date, end: Date }): Promise<ApiResponse<StudySession[]>> {
    let endpoint = `${API_ENDPOINTS.STUDENTS.STUDY_SESSIONS(studentId)}/history`;
    
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
  
  // Get study habit statistics
  async getStudyHabits(studentId: string): Promise<ApiResponse<StudyHabit[]>> {
    const response = await apiClient.get(API_ENDPOINTS.STUDENTS.STUDY_HABITS(studentId));
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get study consistency score
  async getConsistencyScore(studentId: string): Promise<ApiResponse<{ consistencyScore: number, isConsistent: boolean }>> {
    const response = await apiClient.get(`${API_ENDPOINTS.STUDENTS.STUDY_HABITS(studentId)}/consistency-score`);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get study streak
  async getStudyStreak(studentId: string): Promise<ApiResponse<{ currentStreak: number, bestStreak: number }>> {
    const response = await apiClient.get(`${API_ENDPOINTS.STUDENTS.STUDY_HABITS(studentId)}/streak`);
    return {
      success: true,
      data: response.data,
      error: null
    };
  }
};

export default studentStudyHabitsService;
