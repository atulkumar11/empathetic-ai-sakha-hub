
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
import { 
  AdminDashboardStats,
  StudentData,
  ContentItem,
  SystemLog,
  AdminSettings,
  NotificationTemplate,
  FeelGoodContent
} from '@/types/admin';

// Admin service for handling admin-related API calls
const adminApiService = {
  // Get dashboard stats
  async getDashboardStats(): Promise<ApiResponse<AdminDashboardStats>> {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN.DASHBOARD);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get students with pagination
  async getStudents(page: number = 1, limit: number = 10, filters?: Record<string, any>): Promise<ApiResponse<{data: StudentData[], total: number}>> {
    let endpoint = `${API_ENDPOINTS.ADMIN.STUDENTS}?page=${page}&limit=${limit}`;
    
    // Add filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          endpoint += `&${key}=${encodeURIComponent(String(value))}`;
        }
      });
    }
    
    const response = await apiClient.get(endpoint);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get specific student
  async getStudent(id: string): Promise<ApiResponse<StudentData>> {
    const response = await apiClient.get(`${API_ENDPOINTS.ADMIN.STUDENTS}/${id}`);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get content items with type filter and pagination
  async getContent(type: string = '', page: number = 1, limit: number = 10): Promise<ApiResponse<{data: ContentItem[], total: number}>> {
    const endpoint = `${API_ENDPOINTS.ADMIN.CONTENT}?type=${type}&page=${page}&limit=${limit}`;
    const response = await apiClient.get(endpoint);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Approve content item
  async approveContent(contentId: string): Promise<ApiResponse<ContentItem>> {
    const response = await apiClient.post(`${API_ENDPOINTS.ADMIN.CONTENT}/${contentId}/approve`, {});
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get system logs with level filter and pagination
  async getSystemLogs(level: string = '', page: number = 1, limit: number = 10): Promise<ApiResponse<{data: SystemLog[], total: number}>> {
    const endpoint = `${API_ENDPOINTS.ADMIN.SYSTEM_LOGS}?level=${level}&page=${page}&limit=${limit}`;
    const response = await apiClient.get(endpoint);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get admin settings
  async getSettings(): Promise<ApiResponse<AdminSettings>> {
    const response = await apiClient.get(API_ENDPOINTS.ADMIN.SETTINGS);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Update admin settings
  async updateSettings(settings: Partial<AdminSettings>): Promise<ApiResponse<AdminSettings>> {
    const response = await apiClient.put(API_ENDPOINTS.ADMIN.SETTINGS, settings);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get notification templates
  async getNotificationTemplates(): Promise<ApiResponse<NotificationTemplate[]>> {
    const response = await apiClient.get(`${API_ENDPOINTS.ADMIN.NOTIFICATIONS}/templates`);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Create notification template
  async createNotificationTemplate(template: Partial<NotificationTemplate>): Promise<ApiResponse<NotificationTemplate>> {
    const response = await apiClient.post(`${API_ENDPOINTS.ADMIN.NOTIFICATIONS}/templates`, template);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Update notification template
  async updateNotificationTemplate(id: string, template: Partial<NotificationTemplate>): Promise<ApiResponse<NotificationTemplate>> {
    const response = await apiClient.put(`${API_ENDPOINTS.ADMIN.NOTIFICATIONS}/templates/${id}`, template);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Send test notification
  async sendTestNotification(templateId: string, userId: string): Promise<ApiResponse<boolean>> {
    const response = await apiClient.post(`${API_ENDPOINTS.ADMIN.NOTIFICATIONS}/test`, { templateId, userId });
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Get feel-good content
  async getFeelGoodContent(page: number = 1, limit: number = 10): Promise<ApiResponse<{data: FeelGoodContent[], total: number}>> {
    const endpoint = `${API_ENDPOINTS.ADMIN.CONTENT}/feel-good?page=${page}&limit=${limit}`;
    const response = await apiClient.get(endpoint);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Create feel-good content
  async createFeelGoodContent(content: Partial<FeelGoodContent>): Promise<ApiResponse<FeelGoodContent>> {
    const response = await apiClient.post(`${API_ENDPOINTS.ADMIN.CONTENT}/feel-good`, content);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // AI Personalization settings
  
  // Get learning style settings
  async getLearningStyleSettings(): Promise<ApiResponse<any>> {
    const response = await apiClient.get(`${API_ENDPOINTS.ADMIN.SETTINGS}/ai/learning-styles`);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Update learning style settings
  async updateLearningStyleSettings(settings: any): Promise<ApiResponse<any>> {
    const response = await apiClient.put(`${API_ENDPOINTS.ADMIN.SETTINGS}/ai/learning-styles`, settings);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Update doubt responder settings
  async updateDoubtResponderSettings(settings: any): Promise<ApiResponse<any>> {
    const response = await apiClient.put(`${API_ENDPOINTS.ADMIN.SETTINGS}/ai/doubt-responder`, settings);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  
  // Update mood engine settings
  async updateMoodEngineSettings(settings: any): Promise<ApiResponse<any>> {
    const response = await apiClient.put(`${API_ENDPOINTS.ADMIN.SETTINGS}/ai/mood-engine`, settings);
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
};

export default adminApiService;
