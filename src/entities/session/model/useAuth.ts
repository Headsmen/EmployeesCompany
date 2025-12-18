import { useNavigate } from "react-router-dom";
import { useSessionStore } from './store';
import { useLogin as useLoginBase, useRegister as useRegisterBase, useLogout as useLogoutBase } from '@/shared/api';

export const useLogin = () => {
  const setSession = useSessionStore(state => state.setSession);
  const navigate = useNavigate();
  const loginMutation = useLoginBase();

  return {
    ...loginMutation,
    mutate: (credentials: Parameters<typeof loginMutation.mutate>[0]) => {
      loginMutation.mutate(credentials, {
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
    }
  };
};

export const useRegister = () => {
  const setSession = useSessionStore(state => state.setSession);
  const navigate = useNavigate();
  const registerMutation = useRegisterBase();

  return {
    ...registerMutation,
    mutate: (data: Parameters<typeof registerMutation.mutate>[0]) => {
      registerMutation.mutate(data, {
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
    }
  };
};

export const useLogout = () => {
  const clearSession = useSessionStore(state => state.clearSession);
  const navigate = useNavigate();
  const logoutMutation = useLogoutBase();

  return {
    ...logoutMutation,
    mutate: () => {
      logoutMutation.mutate(undefined, {
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
    }
  };
};
