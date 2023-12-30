import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

interface Curso {
    curso: string,
    idCurso: number
}
const Page = () => {
    const focused = useIsFocused()
    const { id } = useLocalSearchParams();
    const [curso, setCurso] = useState<Curso | null>(null);

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
                {curso ? <Text style={styles.clase}>{curso.curso}</Text> : <Text></Text>}
                <Link href={{
                    pathname: "/teacher/manageMateriales/[id]",
                    params: { id: Number(id) }
                }} asChild>
                    <Pressable style={styles.btn}>
                        <Text style={styles.btnTxt}>Materiales</Text>
                    </Pressable>
                </Link>
                <Link href={{
                    pathname: "/teacher/manageHomeworks/[id]",
                    params: { id: Number(id) }
                }} asChild>
                    <Pressable style={styles.btn}>
                        <Text style={styles.btnTxt}>Tareas</Text>
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
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
})
