import { createStore } from 'zustand'

interface User {
    email: string;
    authToken: string;
    tipo_usuario: number;
    method: string
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export const useAuthStore = createStore<AuthState>()(set => ({
    isAuthenticated: false,
    user: null,
    login: (userData) => set({ isAuthenticated: true, user: userData }),
    logout: () => set({ isAuthenticated: false, user: null })
}));

