
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';

// AI service for handling AI-related API calls
const aiService = {
  // Get personalized content recommendations
  async getPersonalizedContent(userId: string, contentType: string, count: number = 5): Promise<ApiResponse<any[]>> {
    const endpoint = `${API_ENDPOINTS.AI.PERSONALIZE}?userId=${userId}&type=${contentType}&count=${count}`;
    const response = await apiClient.get(endpoint);
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Detect learning style
  async detectLearningStyle(userId: string, interactionData: any): Promise<ApiResponse<any>> {
    const response = await apiClient.post(API_ENDPOINTS.AI.LEARNING_STYLE, {
      userId,
      interactionData
    });
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Generate study plan based on user data
  async generateStudyPlan(userId: string, preferences: any): Promise<ApiResponse<any>> {
    const response = await apiClient.post(API_ENDPOINTS.AI.GENERATE_PLAN, {
      userId,
      preferences
    });
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get response to student doubt
  async getDoubtResponse(userId: string, question: string, subject: string, topic: string): Promise<ApiResponse<any>> {
    const response = await apiClient.post(API_ENDPOINTS.AI.DOUBT_RESPONSE, {
      userId,
      question,
      subject,
      topic
    });
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Send message to AI tutor
  async sendTutorChatMessage(userId: string, message: string, context?: any): Promise<ApiResponse<any>> {
    const response = await apiClient.post(API_ENDPOINTS.AI.TUTOR_CHAT, {
      userId,
      message,
      context
    });
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get mood-based content suggestions
  async getMoodSuggestions(userId: string, mood: number): Promise<ApiResponse<any>> {
    const response = await apiClient.post(API_ENDPOINTS.AI.MOOD_SUGGESTIONS, {
      userId,
      mood
    });
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Analyze time saved by personalized study plans
  async analyzeTimeSaved(userId: string, timeRange?: { start: Date, end: Date }): Promise<ApiResponse<{ hoursSaved: number, efficiencyGain: number }>> {
    let endpoint = API_ENDPOINTS.AI.TIME_SAVED_ANALYSIS;
    
    if (timeRange) {
      const startDate = timeRange.start.toISOString();
      const endDate = timeRange.end.toISOString();
      endpoint += `?userId=${userId}&start=${startDate}&end=${endDate}`;
    } else {
      endpoint += `?userId=${userId}`;
    }
    
    const response = await apiClient.get(endpoint);
    
    return {
      success: true,
      data: response.data,
      error: null
    };
  }
};

export default aiService;
