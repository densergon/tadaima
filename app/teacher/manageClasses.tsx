import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import { useAuthStore } from '../../components/auth/authStore';
import { Link } from 'expo-router';

interface Clase {
    profesor: number,
    idClases: number,
    asignatura: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string
}
const Page = () => {
    const [clases, setClases] = useState([]);
    const idProfesor = useAuthStore.getState().user?.id_usuario;

    useEffect(() => {
        const fetchClases = async () => {
            try {
                const response = await axios.get('http://192.168.3.9:3000/api/classes');
                const clasesDelProfesor = response.data.filter((clase: Clase) => clase.profesor === idProfesor);
                setClases(clasesDelProfesor);
            } catch (error) {
                console.error('Error al obtener las clases:', error);
            }
        };

        fetchClases();
    }, []);

    return (
        <ScrollView>
            <View>
                <View style={style.header}>
                    <Text style={style.p}>Mis clases</Text>
                    <Pressable style={style.btnAddClass}>
                        <Text>Agregar clase</Text>
                    </Pressable>
                </View>
                {clases.map((clase: Clase) => (
                    <View style={style.class} key={clase.idClases}>
                        <Text style={style.p}>{clase.asignatura}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Page;

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    btnAddClass: {
        backgroundColor: '#3498db',
        margin: 5,
        padding: 10
    },
    class: {
        backgroundColor: 'white',
        padding: 10,
    },
    p: {
        fontSize: 18
    }
})
