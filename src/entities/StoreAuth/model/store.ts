// entities/StoreAuth/model/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from './types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,

      initAuth: () => {
        // persist middleware автоматически восстанавливает состояние
      },

      login: (user: User, token: string) => { // Теперь сначала user, потом token
        set({ 
          isAuthenticated: true, 
          user,
          token 
        });
      },

      logout: () => {
        set({ 
          isAuthenticated: false, 
          user: null,
          token: null 
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);