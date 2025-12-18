import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { positionsApi } from './positions.api';
import type { CreatePositionDto, UpdatePositionDto } from './positions.types';

export const positionsKeys = {
  all: ['positions'] as const,
  lists: () => [...positionsKeys.all, 'list'] as const,
  list: () => [...positionsKeys.lists()] as const,
  details: () => [...positionsKeys.all, 'detail'] as const,
  detail: (id: string) => [...positionsKeys.details(), id] as const,
};

export const usePositions = () => {
  return useQuery({
    queryKey: positionsKeys.list(),
    queryFn: () => positionsApi.getAll(),
  });
};

export const usePosition = (id: string) => {
  return useQuery({
    queryKey: positionsKeys.detail(id),
    queryFn: () => positionsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePositionDto) => positionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: positionsKeys.lists() });
    },
  });
};

export const useUpdatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePositionDto) => positionsApi.update(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: positionsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: positionsKeys.detail(variables.id) });
    },
  });
};

export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => positionsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: positionsKeys.lists() });
    },
  });
};
