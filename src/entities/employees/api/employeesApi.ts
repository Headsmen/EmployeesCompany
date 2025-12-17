import { baseApi } from '@/shared/api';
import type { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '../model/types';

const EMPLOYEES_ENDPOINT = '/employees';

export const employeesApi = {
  getAll: async (enterpriseId?: string): Promise<Employee[]> => {
    const params = enterpriseId ? { enterpriseId } : {};
    const response = await baseApi.get<Employee[]>(EMPLOYEES_ENDPOINT, { params });
    return response.data;
  },

  getById: async (id: string): Promise<Employee> => {
    const response = await baseApi.get<Employee>(`${EMPLOYEES_ENDPOINT}/${id}`);
    return response.data;
  },

  create: async (data: CreateEmployeeDto): Promise<Employee> => {
    const response = await baseApi.post<Employee>(EMPLOYEES_ENDPOINT, data);
    return response.data;
  },

  update: async ({ id, ...data }: UpdateEmployeeDto): Promise<Employee> => {
    const response = await baseApi.patch<Employee>(`${EMPLOYEES_ENDPOINT}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await baseApi.delete(`${EMPLOYEES_ENDPOINT}/${id}`);
  },
};
