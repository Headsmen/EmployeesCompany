import { baseApi } from '../base-api';
import type { Position, CreatePositionDto, UpdatePositionDto } from './positions.types';

const POSITIONS_ENDPOINT = '/positions';

export const positionsApi = {
  getAll: async (): Promise<Position[]> => {
    const response = await baseApi.get<Position[]>(POSITIONS_ENDPOINT);
    return response.data;
  },

  getById: async (id: string): Promise<Position> => {
    const response = await baseApi.get<Position>(`${POSITIONS_ENDPOINT}/${id}`);
    return response.data;
  },

  create: async (data: CreatePositionDto): Promise<Position> => {
    const response = await baseApi.post<Position>(POSITIONS_ENDPOINT, data);
    return response.data;
  },

  update: async ({ id, ...data }: UpdatePositionDto): Promise<Position> => {
    const response = await baseApi.patch<Position>(`${POSITIONS_ENDPOINT}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await baseApi.delete(`${POSITIONS_ENDPOINT}/${id}`);
  },
};
