import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { AntDesign, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

interface Material {
    idMateriales: number;
    nombre: string;
    uri: string;
    curso: number;
}

const Page = () => {
    const focused = useIsFocused()
    const { id } = useLocalSearchParams()
    const [materiales, setMateriales] = useState([])
    const getMateriales = async () => {
        try {
            const { data } = await axios.get(`http://192.168.3.9:3000/api/materiales/all/${id}`);
            setMateriales(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getMateriales()
    }, [focused])

    const deleteMaterial = async (idM: number) => {
        await axios.delete(`http://192.168.3.9:3000/api/materiales/${idM}`)
    }

    return (
        <ScrollView>
            <View style={styles.materialesContainer}>
                {materiales.map((material: Material) =>
                    <View key={material.idMateriales} style={styles.materialItem}>
                        <Link href={{
                            pathname: "/teacher/teacherMaterial/[id]",
                            params: { id: Number(material.idMateriales) }
                        }} asChild>
                            <Pressable>
                                <Text style={styles.materialName}>{material.nombre}</Text>
                            </Pressable>
                        </Link>
                        <Pressable style={styles.delBtn} onPress={() => deleteMaterial(Number(material.idMateriales))}>
                            <Feather name="trash" size={24} color="white" />
                        </Pressable>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default Page

const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
        margin: 10
    },
    btn: {
        backgroundColor: '#3498db',
        padding: 10,
        width: '50%',
        alignSelf: 'flex-end',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        margin: 5
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    materialesContainer: {
        marginTop: 10
    },
    materialItem: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    materialName: {
        fontSize: 20,
        paddingLeft: 20
    },
    delBtn: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 10
    }
})