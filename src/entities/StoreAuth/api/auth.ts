import axios from "axios";
import type { AxiosInstance } from "axios";
import type { LoginCredentials, RegisterData, AuthResponse, User } from "../model/types";

// Создаем настроенный instance axios
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Interceptor для добавления токена к запросам
axiosInstance.interceptors.request.use(
    (config) => {
        const authData = localStorage.getItem('auth-storage');
        if (authData) {
            try {
                const { state } = JSON.parse(authData);
                if (state?.token) {
                    config.headers.Authorization = `Bearer ${state.token}`;
                }
            } catch (error) {
                console.error('Error parsing auth token:', error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor для обработки ответов и ошибок
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Токен недействителен - очищаем хранилище
            localStorage.removeItem('auth-storage');
            window  .location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/register', userData);
        return response.data;
    },

    getProfile: async (): Promise<User> => {
        const response = await axiosInstance.get<User>('/auth/profile');
        return response.data;
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post('/auth/logout');
        localStorage.removeItem('auth-storage');
    }
};