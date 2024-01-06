import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'

interface Entregada {
    idEntregadas: number,
    calificacion: number,
    nombre: string,
    boleta: string
}

const Page = () => {
    const { id } = useLocalSearchParams()
    const focused = useIsFocused()
    const [entregadas, setEntregadas] = useState<Array<Entregada>>([])

    const getEntregadas = async () => {
        const response = await axios.get(`http://192.168.3.9:3000/api/delivered/${Number(id)}`)
        setEntregadas(response.data)
    }
    useEffect(() => {
        getEntregadas()
    }, [focused])
    return (
        <View>
            {entregadas.map((entregada) => (
                <View key={entregada.idEntregadas} style={styles.item}>
                    <Pressable>
                        <Text>{entregada.nombre}</Text>
                        <Text>{entregada.boleta}</Text>
                    </Pressable>
                    <View>
                        <Text>{entregada.calificacion}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})