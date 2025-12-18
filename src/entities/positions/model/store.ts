import { create } from 'zustand';
import { positionsApi } from '@/shared/api';
import { DEFAULT_POSITIONS } from '@/entities/positions/config';
import type { Position, CreatePositionDto, UpdatePositionDto } from './types';

interface PositionsState {
  positions: Position[];
  isLoading: boolean;
  error: string | null;

  fetchPositions: () => Promise<void>;
  addPosition: (data: CreatePositionDto) => Promise<void>;
  updatePosition: (data: UpdatePositionDto) => Promise<void>;
  deletePosition: (id: string) => Promise<void>;
}

export const usePositionsStore = create<PositionsState>((set) => ({
  positions: DEFAULT_POSITIONS,
  isLoading: false,
  error: null,

  fetchPositions: async () => {
    set({ isLoading: true, error: null });
    try {
      const positions = await positionsApi.getAll();
      set({ positions, isLoading: false });
    } catch (error) {
      // Если API недоступен, используем дефолтные должности
      console.warn('Failed to fetch positions from API, using defaults', error);
      set({
        positions: DEFAULT_POSITIONS,
        error: null,
        isLoading: false
      });
    }
  },

  addPosition: async (data: CreatePositionDto) => {
    set({ isLoading: true, error: null });
    try {
      const newPosition = await positionsApi.create(data);
      set(state => ({
        positions: [...state.positions, newPosition],
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create position',
        isLoading: false
      });
      throw error;
    }
  },

  updatePosition: async (data: UpdatePositionDto) => {
    set({ isLoading: true, error: null });
    try {
      const updatedPosition = await positionsApi.update(data);
      set(state => ({
        positions: state.positions.map(p =>
          p.id === updatedPosition.id ? updatedPosition : p
        ),
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update position',
        isLoading: false
      });
      throw error;
    }
  },

  deletePosition: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await positionsApi.delete(id);
      set(state => ({
        positions: state.positions.filter(p => p.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete position',
        isLoading: false
      });
      throw error;
    }
  },
}));
