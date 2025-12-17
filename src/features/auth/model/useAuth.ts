import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from '@/entities/session';
import { authApi } from '../api/authApi';

export const useLogin = () => {
  const setSession = useSessionStore(state => state.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setSession({
        user: data.user,
        token: data.token,
        loginTimestamp: Date.now()
      });
      navigate("/");
    },
    onError: (error: Error) => {
      console.error('Login error:', error.message);
    }
  });
};

export const useRegister = () => {
  const setSession = useSessionStore(state => state.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setSession({
        user: data.user,
        token: data.token,
        loginTimestamp: Date.now()
      });
      navigate("/");
    },
    onError: (error: Error) => {
      console.error('Registration error:', error.message);
    }
  });
};

export const useLogout = () => {
  const clearSession = useSessionStore(state => state.clearSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearSession();
      navigate('/login');
    },
    onError: (error: Error) => {
      console.error('Logout error:', error);
      clearSession();
      navigate('/login');
    }
  });
};
