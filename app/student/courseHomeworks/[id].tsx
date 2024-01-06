import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Navigator, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'


interface Tarea {
    idTareas: number,
    nombre: string,
    descripcion: string,
    created: string,
    dateDelivery: string,
    curso: number,
    prioridad: 1
}


const Page = () => {
    const focused = useIsFocused()
    const { id } = useLocalSearchParams()
    const [tareas, setTareas] = useState<Array<Tarea>>([])

    Navigator.Screen({
        options: {
            title: 'Tareas del curso'
        }
    })

    const getTareas = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/homeworks/clase/${Number(id)}`)
            setTareas(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTareas()
    }, [focused])

    return (
        <View>
            <>
                {
                    tareas.map((tarea) => (
                        <Link href={{
                            pathname: '/student/homework/[id]',
                            params: { id: Number(tarea.idTareas) }
                        }} asChild key={tarea.idTareas} >
                            <Pressable style={style.item}>
                                <Text>{tarea.nombre}</Text>
                                <Text>{tarea.descripcion}</Text>
                            </Pressable>
                        </Link>
                    ))
                }
            </>
        </View>
    )
}

export default Page

const style = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 15
    }
})