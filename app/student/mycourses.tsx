import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useAuthStore } from '../../components/auth/authStore';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

interface Curso {
    curso: string,
    nombre: string
    apellidoPaterno: string,
    apellidoMaterno: string,
    idCurso: number
}

const Page = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const idUsuario = useAuthStore.getState().user?.id_usuario;
    const focused = useIsFocused()

    const fetchCursos = async () => {
        try {
            if (useAuthStore.getState().user?.tipo_usuario === 3) {
                const response = await axios.get(`http://192.168.3.9:3000/api/cursos/${idUsuario}`);
                setCursos(response.data);
            }
        } catch (error) {
            console.error('Error al obtener cursos:', error);
        }
    };

    useEffect(() => {
        fetchCursos();
    }, [focused]);

    return (
        <ScrollView style={styles.container}>
            {cursos.map((curso, index) => (
                <Link href={{
                    pathname: "/student/courses/[id]",
                    params: { id: curso.idCurso }
                }}
                    key={index} style={styles.courseitem} asChild>

                    <Pressable>
                        <Text style={styles.courseTitle}>{curso.curso}</Text>
                        <Text style={styles.courseTeacher}>{curso.nombre} {curso.apellidoPaterno} {curso.apellidoPaterno}</Text>
                    </Pressable>
                </Link>
            ))}
        </ScrollView>
    );
};

export default Page
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    courseitem: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10
    },
    courseTitle: {
        textAlign: 'center',
        fontSize: 20
    },
    courseTeacher: {
        fontSize: 18,
        textAlign: 'center'
    }
})