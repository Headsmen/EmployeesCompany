import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeesApi } from './employees.api';
import type { CreateEmployeeDto, UpdateEmployeeDto } from './employees.types';

export const employeesKeys = {
  all: ['employees'] as const,
  lists: () => [...employeesKeys.all, 'list'] as const,
  list: (enterpriseId?: string) => [...employeesKeys.lists(), { enterpriseId }] as const,
  details: () => [...employeesKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeesKeys.details(), id] as const,
};

export const useEmployees = (enterpriseId?: string) => {
  return useQuery({
    queryKey: employeesKeys.list(enterpriseId),
    queryFn: () => employeesApi.getAll(enterpriseId),
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: employeesKeys.detail(id),
    queryFn: () => employeesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeDto) => employeesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.lists() });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEmployeeDto) => employeesApi.update(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: employeesKeys.detail(variables.id) });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => employeesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.lists() });
    },
  });
};
