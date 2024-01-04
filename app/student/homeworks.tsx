import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/HomeWorks.styles';
import axios from 'axios';
import { useAuthStore } from '../../components/auth/authStore';
import { Link } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
interface Tarea {
    idTareas: number,
    nombre: string,
    descripcion: string,
    created: string,
    dateDelivery: string,
    curso: number,
    prioridad: number
}
const Page = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const id = useAuthStore.getState().user?.id_usuario;
    const prioridad = ["Urgente", "Normal", "No urgente", "Opcional"]

    const focus = useIsFocused()

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const response = await axios.get(`http://192.168.3.9:3000/api/homeworks/current/${id}`);
                const tareasOrdenadas = response.data.sort((a: Tarea, b: Tarea) => {
                    const dateA = new Date(a.dateDelivery);
                    const dateB = new Date(b.dateDelivery);
                    return dateA.getTime() - dateB.getTime();
                });
                setTareas(tareasOrdenadas);
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
            }
        };

        fetchTareas();
    }, [focus]);

    return (
        <ScrollView>
            <View style={{ padding: 10 }}>
                <Text style={styles.h1}>Tareas Pendientes</Text>
                <View style={styles.container}>
                    {tareas.map((tarea) => (

                        <Link href={{
                            pathname: "/student/homework/[id]",
                            params: { id: Number(tarea.idTareas) }
                        }} asChild key={tarea.idTareas}>
                            <Pressable style={styles.homework} >
                                <View>
                                    <Ionicons name="checkmark-circle-outline" size={24} color="black" />
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={styles.homeworkTitle}>{tarea.nombre}</Text>
                                    <Text style={styles.homeworkTitle}>{tarea.descripcion}</Text>
                                    <Text style={styles.homeworkTitle}>{prioridad[Number(tarea.prioridad)]}</Text>
                                </View>
                            </Pressable>
                        </Link>

                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Page;
