import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuthStore } from '../../../components/auth/authStore';
import { Link } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router'
import ModalAddHomework from '../../../components/teacher/ModalAddHomework';
import { Feather } from '@expo/vector-icons';
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
    const idP = useAuthStore.getState().user?.id_usuario;
    const { id } = useLocalSearchParams()
    const [visible, setVisible] = useState(false);

    const focus = useIsFocused();

    const fetchTareas = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/homeworks/clase/${id}`);
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

    useEffect(() => {
        fetchTareas();
    }, [focus]);

    return (
        <ScrollView>
            <View>
                <Pressable style={styles.btn} onPress={() => setVisible(true)}>
                    <Feather name="plus" size={22} color="white" />
                    <Text style={styles.btnTxt}>Agregar tarea</Text>
                </Pressable>
                <View style={styles.container}>
                    {tareas.map((tarea) => (

                        <Link href={{
                            pathname: "/student/homework/[id]",
                            params: { id: Number(tarea.idTareas) }
                        }} asChild key={tarea.idTareas}>
                            <Pressable style={styles.homework} >
                                <View>
                                    <Text style={styles.homeworkTitle}>{tarea.nombre}</Text>
                                    <Text style={styles.homeworkTitle}>{tarea.descripcion}</Text>
                                </View>
                            </Pressable>
                        </Link>

                    ))}
                </View>
            </View>
            <ModalAddHomework visible={visible} onHide={() => setVisible(false)} getData={() => fetchTareas()} />

        </ScrollView>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btn: {
        padding: 10,
        backgroundColor: '#2980b9',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    btnTxt: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20
    },
    homework: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    homeworkTitle: {
        fontSize: 20
    }
})