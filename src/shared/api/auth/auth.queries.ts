import { useMutation } from '@tanstack/react-query';
import { authApi } from './auth.api';
import type { LoginCredentials, RegisterData } from './auth.types';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authApi.logout(),
  });
};
