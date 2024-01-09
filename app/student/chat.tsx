import { View, Text, ScrollView, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import axios from 'axios'
import { useAuthStore } from '../../components/auth/authStore'
import { useIsFocused } from '@react-navigation/native'

interface Conversacion {
    nombre: string,
    contenido: string,
    created: string,
    conversacion: number
}

const Page = () => {
    const focused = useIsFocused()
    const [conversaciones, setConversaciones] = useState<Array<Conversacion>>([])
    const id = Number(useAuthStore().user?.id_usuario)
    const getConversaciones = async () => {
        const response = await axios.get(`http://192.168.3.9:3000/api/chat/conversaciones/${id}`)
        setConversaciones(response.data)
    }
    useEffect(() => {
        getConversaciones()
    }, [focused])
    return (
        <ScrollView style={style.container}>
            {conversaciones.map((conversacion, index) => (
                <Link href={{
                    pathname: "/student/schat/[id]",
                    params: { id: conversacion.conversacion }
                }} asChild key={index}>
                    <Pressable style={style.item}>
                        <View style={style.itemHeader}>
                            <Text style={style.itemPerson}>Prof.{conversacion.nombre}</Text>
                            <Text style={style.time}>{new Date(conversacion.created).toLocaleDateString()}</Text>
                        </View>
                        <Text style={style.message}>{conversacion.contenido}</Text>
                    </Pressable>
                </Link>
            ))}
        </ScrollView>
    )
}

export default Page

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'column',
        gap: 5
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemPerson: {
        fontWeight: '500',
        fontSize: 18
    },
    time: {
        color: '#95a5a6'
    },
    message: {
        color: '#7f8c8d'
    }

})