export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
    email: string, 
    password: string,
}

export interface RegisterData extends LoginCredentials {
    firstName: string,
    lastName: string,
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  initAuth: () => void;
  login: (user: User, token: string) => void; 
  logout: () => void;
}