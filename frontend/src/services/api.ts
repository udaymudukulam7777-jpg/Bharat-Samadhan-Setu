import axios from 'axios';
import { Problem, Solution, Project, User } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },
  register: async (data: any) => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },
  getMe: async () => {
    const res = await api.get<User>('/auth/me');
    return res.data;
  },
  demoLogin: async (roleName: string) => {
    const res = await api.post(`/auth/demo-login/${roleName}`);
    return res.data;
  },
  updateProfile: async (data: any) => {
    const res = await api.put<User>('/auth/profile', data);
    return res.data;
  },
};

export const problemsApi = {
  list: async (params?: { category?: string; state?: string; district?: string; status?: string }) => {
    const res = await api.get<Problem[]>('/problems', { params });
    return res.data;
  },
  getById: async (idOrCode: string | number) => {
    const res = await api.get<{ problem: Problem; dna?: any; priority?: any; similar?: any[] }>(`/problems/${idOrCode}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await api.post<Problem>('/problems', data);
    return res.data;
  },
  analyzeDraft: async (data: { title: string; description: string; category: string; district: string }) => {
    const res = await api.post('/problems/analyze-draft', data);
    return res.data;
  },
  support: async (problemId: number, data?: { comment?: string; is_directly_affected?: boolean }) => {
    const res = await api.post(`/problems/${problemId}/support`, data || {});
    return res.data;
  },
  verify: async (problemId: number, data: any) => {
    const res = await api.post(`/problems/${problemId}/verify`, data);
    return res.data;
  },
};

export const matchingApi = {
  getMatches: async (problemIdOrCode: string | number) => {
    const res = await api.get(`/matching/${problemIdOrCode}`);
    return res.data;
  },
};

export const solutionsApi = {
  list: async (params?: { problem_id?: number; status?: string }) => {
    const res = await api.get<Solution[]>('/solutions', { params });
    return res.data;
  },
  getById: async (idOrCode: string | number) => {
    const res = await api.get<{ solution: Solution; problem: Problem; team: any }>(`/solutions/${idOrCode}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await api.post<Solution>('/solutions', data);
    return res.data;
  },
  gapAnalysis: async (solutionId: number) => {
    const res = await api.get(`/solutions/${solutionId}/gap-analysis`);
    return res.data;
  },
};

export const projectsApi = {
  list: async (params?: { status?: string }) => {
    const res = await api.get<Project[]>('/projects', { params });
    return res.data;
  },
  getById: async (idOrCode: string | number) => {
    const res = await api.get<any>(`/projects/${idOrCode}`);
    return res.data;
  },
  updateMilestone: async (milestoneId: number, data: any) => {
    const res = await api.patch(`/projects/milestones/${milestoneId}`, data);
    return res.data;
  },
};

export const governmentApi = {
  getDashboard: async () => {
    const res = await api.get('/government/dashboard');
    return res.data;
  },
};

export const universitiesApi = {
  getDashboard: async () => {
    const res = await api.get('/universities/dashboard');
    return res.data;
  },
};

export const industryApi = {
  getDashboard: async () => {
    const res = await api.get('/industry/dashboard');
    return res.data;
  },
};

export const impactApi = {
  getDashboard: async () => {
    const res = await api.get('/impact/dashboard');
    return res.data;
  },
  getMapData: async () => {
    const res = await api.get('/impact/map-data');
    return res.data;
  },
};

export const chatbotApi = {
  sendMessage: async (message: string, context?: any) => {
    const res = await api.post('/chatbot/message', { message, context });
    return res.data;
  },
};

export default api;
