import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { styles } from '../../styles/Account.styles';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../auth/authStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
interface User {
    idUsuarios: number,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    email: string
}


const Account = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const userId = useAuthStore().user?.id_usuario;

    useEffect(() => {
        fetch(`http://192.168.3.9:3000/api/teachers/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setIsLoading(false);
            });
    }, [userId]);


    const rol = useAuthStore().user?.tipo_usuario;
    const logOut = () => {
        useAuthStore.getState().logout();
    };

    const goBack = () => {
        if (rol == 1) {
            router.replace('/administrator/');
        } else if (rol == 2) {
            router.replace('/teacher/');
        } else if (rol == 3) {
            router.replace('/student/');
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <View style={{ marginTop: Constants.statusBarHeight }}>
            <StatusBar style='dark' />
            <View style={styles.container} >
                <View style={styles.header}>
                    <Pressable style={styles.icon} onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </Pressable>
                    <Text style={styles.h1}>Mis datos</Text>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.dataContainer}>
                        <View style={styles.box}>
                            <Text style={styles.p}>Nombre:</Text>
                            {user ? <Text style={styles.p}>{user?.nombre} {user?.apellidoPaterno} {user?.apellidoMaterno}</Text> : <Text></Text>}
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.p}>Email:</Text>
                            <Text style={styles.p}>{user?.email}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ margin: 10 }}>
                    <Text>Cambiar contraseña</Text>
                </View>
                <View>
                    <Pressable onPress={logOut}>
                        <Text style={styles.red}>Cerrar Sesión</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Account