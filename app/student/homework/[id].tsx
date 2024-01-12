import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Navigator, router, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import { useAuthStore } from '../../../components/auth/authStore'
//import PDFViewer from '../../../components/PDFViewer'
interface Tarea {
    idTareas: 1,
    nombre: string,
    descripcion: string,
    created: string,
    dateDelivery: string,
    curso: number,
    prioridad: number
}
const Page = () => {
    const { id } = useLocalSearchParams()
    const focused = useIsFocused()
    const [tarea, setTarea] = useState<Tarea | null>(null);
    const idUsuario = useAuthStore().user?.id_usuario;

    Navigator.Screen({
        options: {
            title: 'Descripción'
        }
    })

    const getTarea = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/homeworks/tarea/${id}`)
            setTarea(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTarea()
    }, [focused]);

    const entregar = async () => {
        const tarea = {
            idUsuario,
            idTarea: id,
            uri: ''
        }
        try {
            const response = await axios.post(`http://192.168.3.9:3000/api/delivered/`, tarea)
            console.log(response.data)
            router.replace('/student/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            {tarea ? <>

                <View>
                    <Text style={style.h1}>{tarea.nombre}</Text>
                    <Text style={style.h2}>{tarea.descripcion}</Text>
                    <Text style={style.h2}>Fecha de entrega:{new Date(tarea.dateDelivery).toLocaleDateString()}</Text>
                </View>
                <View>
                    <Pressable style={style.btn} onPress={entregar}>
                        <Text style={style.btnTxt}>Entregar tarea</Text>
                    </Pressable>
                </View>
            </> : <></>}
        </View>
    )
}

export default Page


const style = StyleSheet.create({
    h1: {
        fontSize: 18,
        margin: 10
    },
    h2: {
        fontSize: 16,
        margin: 8
    },
    btn: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e67e22'
    },
    btnTxt: {
        color: 'white',
        fontSize: 18
    }
})