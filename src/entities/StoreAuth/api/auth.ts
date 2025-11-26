
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../model/types';

const getUsersFromStorage = (): User[] => {
  const users = localStorage.getItem('mock-users');
  return users ? JSON.parse(users) : [];
};

const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem('mock-users', JSON.stringify(users));
};

const generateMockToken = (email: string) => {
  return `mock-jwt-token-${btoa(email)}-${Date.now()}`;
};

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getUsersFromStorage();
    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      throw new Error('User not found');
    }

    if (!credentials.password) {
      throw new Error('Invalid password');
    }

    const token = generateMockToken(credentials.email);

    return {
      user,    // сначала user
      token    // потом token
    };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getUsersFromStorage();
    
    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      role: 'user'
    };

    users.push(newUser);
    saveUsersToStorage(users);

    const token = generateMockToken(data.email);

    return {
      user: newUser,    // сначала user
      token             // потом token
    };
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

// Функция для инициализации тестового пользователя
export const initializeMockData = () => {
  const users = getUsersFromStorage();
  if (users.length === 0) {
    const testUser: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user'
    };
    users.push(testUser);
    saveUsersToStorage(users);
    console.log('Test user created: test@example.com (any password)');
  }
};