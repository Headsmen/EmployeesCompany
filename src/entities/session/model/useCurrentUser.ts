import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/shared/api';
import type { User } from '@/entities/user';

const hasToken = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};

export const useCurrentUser = () => {
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        return await userApi.getCurrentUser();
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
          const err = error as { response?: { status?: number } };
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
          }
        }
        return null;
      }
    },
    enabled: hasToken(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  return { user, isLoading, error };
};
