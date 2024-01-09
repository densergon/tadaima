import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
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


    return (
        <ScrollView>
            <View>
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