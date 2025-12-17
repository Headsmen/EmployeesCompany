import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SessionState, Session } from './types';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      session: null,
      isAuthenticated: false,

      initSession: () => {
        const state = get();

        if (state.isAuthenticated && state.session?.loginTimestamp) {
          const now = Date.now();
          const timePassed = now - state.session.loginTimestamp;

          if (timePassed > ONE_DAY_MS) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('userId');

            set({
              session: null,
              isAuthenticated: false,
            });
          }
        }
      },

      setSession: (session: Session) => {
        set({
          session,
          isAuthenticated: true,
        });
      },

      clearSession: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');

        set({
          session: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'session-storage',
    }
  )
);
