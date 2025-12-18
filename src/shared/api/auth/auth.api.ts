import { baseApi } from '../base-api';
import type { LoginCredentials, RegisterData, AuthResponse } from './auth.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await baseApi.get(`/Users?email=${credentials.email}`);
    const users = response.data;

    if (!users || users.length === 0) {
      throw new Error('User not found');
    }

    const user = users[0];

    if (user.password !== credentials.password) {
      throw new Error('Invalid password');
    }

    const token = `mock-token-${btoa(user.email)}-${Date.now()}`;

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const existingUsers = await baseApi.get(`/Users?email=${data.email}`);
    if (existingUsers.data && existingUsers.data.length > 0) {
      throw new Error('User with this email already exists');
    }

    const response = await baseApi.post('/Users', {
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
      role: 'user'
    });

    const user = response.data;

    const token = `mock-token-${btoa(user.email)}-${Date.now()}`;

    return {
      user,
      token
    };
  },

  logout: async (): Promise<void> => {
    // await baseApi.post('/logout');
  }
};
