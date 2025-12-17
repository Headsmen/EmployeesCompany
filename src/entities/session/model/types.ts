export interface Session {
  user: SessionUser;
  token: string;
  loginTimestamp: number;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface SessionState {
  session: Session | null;
  isAuthenticated: boolean;
  initSession: () => void;
  setSession: (session: Session) => void;
  clearSession: () => void;
}
