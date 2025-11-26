import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, User } from "./types";
// import { AuthState, User } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (userData: User, token: string) =>
        set({ user: userData, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    initAuth: () => {
        // Проверяем, есть ли сохраненные данные для автоматического входа
        const state = get();
        if (state.token && state.user) {
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
function get() {
  throw new Error("Function not implemented.");
}

