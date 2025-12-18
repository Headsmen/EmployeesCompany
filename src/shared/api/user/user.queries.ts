import { useQuery } from '@tanstack/react-query';
import { userApi } from './user.api';

export const userKeys = {
  all: ['user'] as const,
  current: () => [...userKeys.all, 'current'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: () => userApi.getCurrentUser(),
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => userApi.getMe(),
  });
};
