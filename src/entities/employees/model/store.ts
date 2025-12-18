import { create } from 'zustand';
import { employeesApi } from '@/shared/api';
import type { Employee, CreateEmployeeDto, UpdateEmployeeDto } from './types';

interface EmployeesState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;

  fetchEmployees: (enterpriseId: string) => Promise<void>;
  addEmployee: (data: CreateEmployeeDto) => Promise<void>;
  updateEmployee: (data: UpdateEmployeeDto) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useEmployeesStore = create<EmployeesState>((set) => ({
  employees: [],
  isLoading: false,
  error: null,

  fetchEmployees: async (enterpriseId: string) => {
    set({ isLoading: true, error: null });
    try {
      const employees = await employeesApi.getAll(enterpriseId);
      set({ employees, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки сотрудников',
        isLoading: false
      });
    }
  },

  addEmployee: async (data: CreateEmployeeDto) => {
    set({ isLoading: true, error: null });
    try {
      const newEmployee = await employeesApi.create(data);
      set((state) => ({
        employees: [...state.employees, newEmployee],
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'H81:0 A>740=8O A>B@C4=8:0',
        isLoading: false
      });
      throw error;
    }
  },

  updateEmployee: async (data: UpdateEmployeeDto) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEmployee = await employeesApi.update(data);
      set((state) => ({
        employees: state.employees.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        ),
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'H81:0 >1=>2;5=8O A>B@C4=8:0',
        isLoading: false
      });
      throw error;
    }
  },

  deleteEmployee: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await employeesApi.delete(id);
      set((state) => ({
        employees: state.employees.filter((emp) => emp.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'H81:0 C40;5=8O A>B@C4=8:0',
        isLoading: false
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
