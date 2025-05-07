
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from './apiConfig';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor to handle common errors
axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle 401 errors (unauthorized)
  if (error.response && error.response.status === 401) {
    // Clear auth token
    localStorage.removeItem('authToken');
    
    // Redirect to login page if not already there
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }
  
  // Handle other errors
  const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
  console.error('API Error:', errorMessage);
  
  return Promise.reject(error);
});

// Create apiClient object with HTTP methods and the setAuthToken function
const apiClient = {
  get: axiosInstance.get.bind(axiosInstance),
  post: axiosInstance.post.bind(axiosInstance),
  put: axiosInstance.put.bind(axiosInstance),
  delete: axiosInstance.delete.bind(axiosInstance),
  patch: axiosInstance.patch.bind(axiosInstance),
  head: axiosInstance.head.bind(axiosInstance),
  options: axiosInstance.options.bind(axiosInstance),
  setAuthToken: (token: string | null) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  },
  defaults: axiosInstance.defaults,
  interceptors: axiosInstance.interceptors
};

export default apiClient;
