import { create } from 'zustand'

interface User {
    email: string;
    authToken: string;
    tipo_usuario: number;
    id_usuario: number,
    name: string,
}


type State = {
    isAuthenticated: boolean,
    user: null | User,
}

type Actions = {
    login: (userData: User) => void;
    logout: () => void;
}

export const useAuthStore = create<State & Actions>(set => ({
    isAuthenticated: false,
    user: null,
    login: (userData) => set({ isAuthenticated: true, user: userData }),
    logout: () => set({ isAuthenticated: false, user: null })
}));

