import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import { useAuthStore } from '../../components/auth/authStore';
import { Link } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

interface Clase {
    curso: string,
    idCurso: number
}
const Page = () => {
    const [clases, setClases] = useState<Clase[]>([]);
    const idProfesor = useAuthStore.getState().user?.id_usuario;
    const focused = useIsFocused()
    const fetchClases = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/classes/all/${idProfesor}`);
            console.log(response.data)
            setClases(response.data);
        } catch (error) {
            console.error('Error al obtener las clases:', error);
        }
    };

    useEffect(() => {
        fetchClases();
    }, [focused]);


    return (
        <ScrollView>
            <View>
                {clases.map((clase: Clase) => (
                    <Link href={{
                        pathname: "/teacher/clases/[id]",
                        params: { id: clase.idCurso }
                    }} asChild key={clase.idCurso}>
                        <Pressable style={style.class}  >
                            <Text style={style.p}>{clase.curso}</Text>
                        </Pressable>
                    </Link>
                ))}
            </View>
        </ScrollView>
    );
};

export default Page;

const style = StyleSheet.create({
    class: {
        backgroundColor: 'white',
        padding: 10,
    },
    p: {
        fontSize: 20
    }
})
