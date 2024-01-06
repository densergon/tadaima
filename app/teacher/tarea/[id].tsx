import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'

const Page = () => {
    const focused = useIsFocused()
    const { id } = useLocalSearchParams();
    const prioridad = ["Opcional", "Regular", "Urgente"]
    const [homework, setHomework] = useState({
        idTareas: 0,
        nombre: '',
        descripcion: '',
        created: new Date().toString(),
        dateDelivery: new Date().toString(),
        curso: 1,
        prioridad: 1
    })
    const getHomework = async () => {
        const response = await axios.get(`http://192.168.3.9:3000/api/homeworks/tarea/${id}`)
        setHomework(response.data);
    }
    const deleteHomework = async () => {
        const response = await axios.delete(`http://192.168.3.9:3000/api/homeworks/${id}`);
        if (response.data.message == "Eliminada exitosamente") {
            router.push('/teacher/manageClasses')
        }
    }
    useEffect(() => {
        getHomework()
    }, [focused])
    return (
        <View>
            <View>
                <Text style={style.h1}>{homework.nombre}</Text>
                <Text style={style.h2}>{homework.descripcion}</Text>
            </View>
            <View style={style.infoSpan}>
                <Text>Fecha de entrega:{new Date(homework.dateDelivery).toLocaleDateString()}</Text>
                <Text>{prioridad[homework.prioridad]}</Text>
            </View>
            <View style={style.btnsContainer}>
                <Link href={{
                    pathname: "/teacher/deliveredTHomeworks/[id]",
                    params: { id: Number(id) }
                }} asChild style={[style.btn]} >
                    <Pressable >
                        <Text style={[style.btnTxt]}>Ver tareas entregadas</Text>
                    </Pressable>

                </Link>
                <Pressable style={[style.btn, style.editBtn]}>
                    <Text style={[style.btnTxt]}>Editar</Text>
                </Pressable>
                <Pressable style={[style.btn, style.delBtn]} onPress={deleteHomework}>
                    <Text style={[style.btnTxt]}>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Page

const style = StyleSheet.create({
    h1: {
        fontSize: 20,
        marginTop: 15,
        marginLeft: 15
    },
    h2: {
        fontSize: 19,
        marginTop: 10,
        marginLeft: 15
    },
    infoSpan: {
        padding: 15
    },
    btnsContainer: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10
    },
    btn: {
        padding: 15,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 15,
        backgroundColor: '#3498db'
    },
    btnTxt: {
        fontSize: 15,
        color: 'white'
    },
    delBtn: {
        backgroundColor: '#e74c3c'
    },
    editBtn: {
        backgroundColor: '#f1c40f'
    }
})