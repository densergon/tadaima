import React from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from '../components/Login/Login';
import AdminAccount from '../components/administrator/AdminAccount';
import TeacherAccount from '../components/teacher/TeacherAccount';
import StudentAccount from '../components/student/StudentAccount';
import { useAuthStore } from '../components/auth/authStore';

const Page = () => {
    const { isAuthenticated, user } = useAuthStore();

    const renderAccountScreen = () => {
        switch (user?.tipo_usuario) {
            case 1: // Rol de Administrador
                return <AdminAccount />;
            case 2: // Rol de Docente
                return <TeacherAccount />;
            case 3: // Rol de Estudiante
                return <StudentAccount />;
        }
    };

    return (
        <>
            <StatusBar style="light" />
            {isAuthenticated ? renderAccountScreen() : <LoginScreen />}
        </>
    );
};

export default Page;
