import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
interface Tarea {
    idTareas: number,
    nombre: string,
    descripcion: string,
    fechaInicio: null,
    fechaEntrega: null,
    idClase: number,
    prioridad: number
}
const Page = () => {
    const [tareas, setTareas] = useState([]);
    const { id } = useLocalSearchParams(); // Cambia esto al ID de la clase que deseas

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/homeworks/clase/${id}`);
                setTareas(response.data);
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
            }
        };

        fetchTareas();
    }, [id]);

    return (
        <ScrollView>
            <View>
                <Text>Tareas de la Clase</Text>
                {tareas.map((tarea: Tarea) => (
                    <View key={tarea.idTareas}>
                        <Text>Nombre: {tarea.nombre}</Text>
                        <Text>Descripción: {tarea.descripcion}</Text>
                        <Text>Fecha de Inicio: {tarea.fechaInicio || 'No especificado'}</Text>
                        <Text>Fecha de Entrega: {tarea.fechaEntrega || 'No especificado'}</Text>
                        <Text>Prioridad: {tarea.prioridad}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Page;
