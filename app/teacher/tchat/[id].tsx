import { View, Text, ImageBackground, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import img from '../../../assets/img/BG.png'
import { Navigator, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import data from '../../../fakeapi/conversacion.json'
import { useAuthStore } from '../../../components/auth/authStore';
import io, { Socket } from 'socket.io-client'

interface Mensaje {
    idUsuario: string,
    paraUsuario: string,
    fecha: string,
    mensaje: string
}
interface Message {
    message: string
}


const Page = () => {
    const socket = useRef<Socket | null>(null);
    const [mensajes, setMensajes] = useState<Message[]>([])

    useEffect(() => {
        socket.current = io("http://192.168.3.9:3000");
        if (socket.current) {
            socket.current.on('chat message', (message: Message) => {
                setMensajes(last => [...last, { message: message.message }]);
            })
        }
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    Navigator.Screen({
        options: {
            title: 'Pedro Armendariz'
        }
    })
    const { id } = useLocalSearchParams();
    const [message, setMessage] = useState('')
    const conversacion = ((data as any) as Array<Mensaje>)

    const isMyMessage = (id: String) => {
        return Number(id) == useAuthStore.getState().user?.id_usuario;
    }

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();

        // Asegurarse de que las horas y minutos sean de dos dígitos
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        return `${hours}:${minutes}`;
    };
    const sendMessage = () => {
        console.log(message)
        if (message && socket.current) {
            socket.current.emit('chat message', { message });
            setMensajes((last) => [...last, { message: message }])
            setMessage(''); // Limpiar el campo de texto después de enviar
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
                        <View key={index} style={style.messageBox}>
                            <Text>{msg.message}</Text>
                        </View>
                    )) : <></>
                }
            </ScrollView>
            <View style={style.bottom}>
                <TextInput style={style.input} placeholder='Mensaje' onChangeText={setMessage} value={message} />
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