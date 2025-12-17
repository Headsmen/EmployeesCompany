import { baseApi } from '@/shared/api';
import type { User } from '../model/user';

export const userApi = {
  getCurrentUser: async (): Promise<User> => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await baseApi.get<User>(`/users/${userId}`);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await baseApi.get<User>('/auth_me');
    return response.data;
  },
};