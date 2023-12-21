import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from '../components/Login/Login'
import { StatusBar } from 'expo-status-bar'
import Account from '../components/Account'
import { useAuthStore } from '../components/auth/authStore'

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

const Page = () => {

    const isAuth = useAuthStore().isAuthenticated;

    return (
        <>
            <StatusBar style="light" />
            {isAuth ? <Account /> : <LoginScreen />}
        </>
    );
}

export default Page