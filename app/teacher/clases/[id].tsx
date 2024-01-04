import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { Link, Navigator, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface Curso {
    curso: string,
    idCurso: number
}
const Page = () => {

    const focused = useIsFocused()
    const { id } = useLocalSearchParams();
    const [curso, setCurso] = useState<Curso>({ curso: '', idCurso: 0 });

    Navigator.Screen({
        options: {
            title: curso.curso
        }
    })

    const getClass = async () => {
        try {
            const result = await axios.get(`http://192.168.3.9:3000/api/classes/one/${id}`)
            setCurso(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getClass()
    }, [focused])

    return (
        <ScrollView>
            <View>
                <Link href={{
                    pathname: "/teacher/manageMateriales/[id]",
                    params: { id: Number(id) }
                }} asChild>
                    <Pressable style={styles.btn}>
                        <Text style={styles.btnTxt}>Materiales</Text>
                        <SimpleLineIcons name="docs" size={24} color="white" />
                    </Pressable>
                </Link>
                <Link href={{
                    pathname: "/teacher/manageHomeworks/[id]",
                    params: { id: Number(id) }
                }} asChild>
                    <Pressable style={styles.btn}>
                        <Text style={styles.btnTxt}>Tareas</Text>
                        <FontAwesome5 name="tasks" size={24} color="white" />
                    </Pressable>
                </Link>
                <Link href={{
                    pathname: "/teacher/students/[id]",
                    params: { id: Number(id) }
                }} asChild>
                    <Pressable style={styles.btn}>
                        <Text style={styles.btnTxt}>Alumnos</Text>
                        <MaterialIcons name="groups" size={24} color="white" />
                    </Pressable>
                </Link>
            </View>
        </ScrollView>
    );
};

export default Page;

const styles = StyleSheet.create({
    clase: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20
    },
    btn: {
        backgroundColor: '#3498db',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    btnTxt: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    }
})
