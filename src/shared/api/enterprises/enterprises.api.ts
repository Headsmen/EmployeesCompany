import { baseApi } from '../base-api';
import type { Enterprise, CreateEnterpriseDto, UpdateEnterpriseDto } from './enterprises.types';

const ENTERPRISES_ENDPOINT = '/enterprises';

export const enterprisesApi = {
  getAll: async (): Promise<Enterprise[]> => {
    const response = await baseApi.get<Enterprise[]>(ENTERPRISES_ENDPOINT);
    return response.data;
  },

  getById: async (id: string): Promise<Enterprise> => {
    const response = await baseApi.get<Enterprise>(`${ENTERPRISES_ENDPOINT}/${id}`);
    return response.data;
  },

  create: async (data: CreateEnterpriseDto): Promise<Enterprise> => {
    const response = await baseApi.post<Enterprise>(ENTERPRISES_ENDPOINT, data);
    return response.data;
  },

  update: async ({ id, ...data }: UpdateEnterpriseDto): Promise<Enterprise> => {
    const response = await baseApi.patch<Enterprise>(`${ENTERPRISES_ENDPOINT}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await baseApi.delete(`${ENTERPRISES_ENDPOINT}/${id}`);
  },
};
