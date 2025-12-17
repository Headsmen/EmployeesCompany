import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { enterprisesApi } from '../api/enterprisesApi';
import type { Enterprise, CreateEnterpriseDto, UpdateEnterpriseDto } from './types';

// Дефолтные предприятия (для разработки)
const DEFAULT_ENTERPRISES: Enterprise[] = [
  { id: '1', name: 'ООО "Рога и Копыта"', description: 'Основное предприятие' },
  { id: '2', name: 'ИП Иванов', description: 'Дополнительное предприятие' },
  { id: '3', name: 'ООО "Технологии"', description: 'IT компания' },
];

interface EnterprisesState {
  enterprises: Enterprise[];
  activeEnterpriseId: string | null;
  isLoading: boolean;
  error: string | null;

  fetchEnterprises: () => Promise<void>;
  setActiveEnterprise: (id: string) => void;
  addEnterprise: (data: CreateEnterpriseDto) => Promise<void>;
  updateEnterprise: (data: UpdateEnterpriseDto) => Promise<void>;
  deleteEnterprise: (id: string) => Promise<void>;
  getActiveEnterprise: () => Enterprise | null;
}

export const useEnterprisesStore = create<EnterprisesState>()(
  persist(
    (set, get) => ({
      enterprises: DEFAULT_ENTERPRISES,
      activeEnterpriseId: DEFAULT_ENTERPRISES[0]?.id || null,
      isLoading: false,
      error: null,

      fetchEnterprises: async () => {
        set({ isLoading: true, error: null });
        try {
          const enterprises = await enterprisesApi.getAll();
          set({
            enterprises,
            isLoading: false,
            activeEnterpriseId: get().activeEnterpriseId || enterprises[0]?.id || null
          });
        } catch (error) {
          console.warn('Failed to fetch enterprises from API, using defaults', error);
          set({
            enterprises: DEFAULT_ENTERPRISES,
            activeEnterpriseId: get().activeEnterpriseId || DEFAULT_ENTERPRISES[0]?.id || null,
            error: null,
            isLoading: false
          });
        }
      },

      setActiveEnterprise: (id: string) => {
        set({ activeEnterpriseId: id });
      },

      addEnterprise: async (data: CreateEnterpriseDto) => {
        set({ isLoading: true, error: null });
        try {
          const newEnterprise = await enterprisesApi.create(data);
          set(state => ({
            enterprises: [...state.enterprises, newEnterprise],
            isLoading: false
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create enterprise',
            isLoading: false
          });
          throw error;
        }
      },

      updateEnterprise: async (data: UpdateEnterpriseDto) => {
        set({ isLoading: true, error: null });
        try {
          const updatedEnterprise = await enterprisesApi.update(data);
          set(state => ({
            enterprises: state.enterprises.map(e =>
              e.id === updatedEnterprise.id ? updatedEnterprise : e
            ),
            isLoading: false
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update enterprise',
            isLoading: false
          });
          throw error;
        }
      },

      deleteEnterprise: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await enterprisesApi.delete(id);
          set(state => ({
            enterprises: state.enterprises.filter(e => e.id !== id),
            activeEnterpriseId: state.activeEnterpriseId === id
              ? state.enterprises.find(e => e.id !== id)?.id || null
              : state.activeEnterpriseId,
            isLoading: false
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to delete enterprise',
            isLoading: false
          });
          throw error;
        }
      },

      getActiveEnterprise: () => {
        const state = get();
        return state.enterprises.find(e => e.id === state.activeEnterpriseId) || null;
      },
    }),
    {
      name: 'enterprises-storage',
      partialize: (state) => ({
        activeEnterpriseId: state.activeEnterpriseId
      }),
    }
  )
);
