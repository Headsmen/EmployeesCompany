import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enterprisesApi } from './enterprises.api';
import type { CreateEnterpriseDto, UpdateEnterpriseDto } from './enterprises.types';

export const enterprisesKeys = {
  all: ['enterprises'] as const,
  lists: () => [...enterprisesKeys.all, 'list'] as const,
  list: () => [...enterprisesKeys.lists()] as const,
  details: () => [...enterprisesKeys.all, 'detail'] as const,
  detail: (id: string) => [...enterprisesKeys.details(), id] as const,
};

export const useEnterprises = () => {
  return useQuery({
    queryKey: enterprisesKeys.list(),
    queryFn: () => enterprisesApi.getAll(),
  });
};

export const useEnterprise = (id: string) => {
  return useQuery({
    queryKey: enterprisesKeys.detail(id),
    queryFn: () => enterprisesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateEnterprise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEnterpriseDto) => enterprisesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enterprisesKeys.lists() });
    },
  });
};

export const useUpdateEnterprise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEnterpriseDto) => enterprisesApi.update(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: enterprisesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: enterprisesKeys.detail(variables.id) });
    },
  });
};

export const useDeleteEnterprise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => enterprisesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enterprisesKeys.lists() });
    },
  });
};
