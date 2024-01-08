import { View, Text, ImageBackground, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import img from '../../../assets/img/BG.png'
import { Navigator, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import data from '../../../fakeapi/conversacion.json'
import { useAuthStore } from '../../../components/auth/authStore';
import io, { Socket } from 'socket.io-client'
import axios from 'axios';

interface Mensaje {
    de: number,
    para: number,
    contenido: string,
    created: string,
    conversacion: number
}
interface Data {
    nombre: string
}

const Page = () => {
    const socket = useRef<Socket | null>(null);
    const [nombre, setNombre] = useState('')
    const { id } = useLocalSearchParams();
    const [mensaje, setMensaje] = useState('')
    const [mensajes, setMensajes] = useState<Mensaje[]>([])
    const myid = useAuthStore().user?.id_usuario;
    const conversacion = Number(id)

    Navigator.Screen({
        options: {
            title: nombre
        }
    })

    const getNombre = async () => {
        const result = await axios.post('http://192.168.3.9:3000/api/chat/data', {
            conversacion,
            usuario: myid
        })
        console.log(result.data)
        setNombre(((result.data as Array<Data>)[0]).nombre)
    }


    const getMensajes = async () => {
        const response = await axios.get(`http://192.168.3.9:3000/api/chat/conversacion/${conversacion}`)
        setMensajes(response.data)
    }
    useEffect(() => {
        getNombre();
        getMensajes();
        socket.current = io("http://192.168.3.9:3000");

        if (socket.current) {
            socket.current.emit("register", myid);
            socket.current.on('chat message', (message: Mensaje) => {
                setMensajes(last => [...last, message]);
            });
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);



    const isMyMessage = (id: number) => {
        return id == useAuthStore.getState().user?.id_usuario;
    }

    const format = (dateObject: Date) => {
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // getMonth() devuelve un valor de 0 a 11
        const day = dateObject.getDate().toString().padStart(2, '0');

        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const seconds = dateObject.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const sendMessage = () => {

        const message: Mensaje = {
            de: Number(myid),
            para: 5,
            created: format(new Date()),
            contenido: mensaje,
            conversacion: 1
        }
        console.log(message)
        if (socket.current) {
            socket.current.emit('chat message', message);
            setMensajes((mensajes) => [...mensajes, message]);
            setMensaje('');
        }
    };
    return (
        <ImageBackground source={img} style={style.container}>
            <ScrollView style={style.scrollView}>
                {
                    /*
                    [...data] // Crea una copia del arreglo para no modificar el estado original.
                        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) // Ordena los mensajes por fecha.
                        .map((item: Mensaje, index: number) => (
                            <View key={index} style={isMyMessage(item.idUsuario) ? style.mine : style.notMine}>
                                <Text>{item.mensaje}</Text>
                                <Text>{formatTime(item.fecha)}</Text>
                            </View>
                        ))*/
                }
                {
                    mensajes ? mensajes.map((msg, index) => (
                        <View key={index} style={isMyMessage(msg.de) ? style.mine : style.notMine}>
                            <Text>{msg.contenido}</Text>
                        </View>
                    )) : <></>
                }
            </ScrollView>
            <View style={style.bottom}>
                <TextInput style={style.input} placeholder='Mensaje' onChangeText={setMensaje} value={mensaje} />
                <Pressable style={style.sendBtn} onPress={sendMessage}>
                    <Feather name="send" size={24} color="black" />
                </Pressable>
            </View>
        </ImageBackground>
    );
};

export default Page

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        paddingTop: 10,
        marginBottom: 1
    },
    messageBox: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 10
    },
    bottom: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 5
    },
    input: {
        width: '90%',
        fontSize: 20,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    sendBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mine: {
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        boxShadow: '3 4 5 1 rgba(0,0,0,0.91)'
    },
    notMine: {
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        boxShadow: '3 4 5 1 rgba(0,0,0,0.91)'
    }

})