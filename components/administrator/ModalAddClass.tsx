import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

interface ModalProps {
    visible: boolean,
    onHide: () => void,
    getClasses: () => void
}
interface Teacher {
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    idUsuarios: number
}
const ModalAddClass = ({ visible, onHide, getClasses }: ModalProps) => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [nombre, setNombre] = useState('');
    const [profesor, setProfesor] = useState<number>(0);
    const getTeachers = async () => {
        const response = await axios.get('http://192.168.3.19:3000/api/teachers');
        console.log(response.data)
        setTeachers(response.data)
    }

    useEffect(() => {
        getTeachers().then(() => {
            if (teachers.length > 0) {
                setProfesor(teachers[0].idUsuarios);
            }
        });
    }, [])

    const handleSubmit = async () => {

        const classData = {
            nombre,
            profesor
        };

        try {
            console.log(classData)
            const response = await fetch('http://192.168.3.19:3000/api/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(classData),
            });
            const data = await response.json();
            if (data.message === 'Creado exitosamente') {
                Alert.alert('Exito', 'Clase creada correctamente');
                getClasses()
                onHide(); // Cerrar el modal después de un registro exitoso
            } else {
                Alert.alert('Error', 'No se pudo registrar la clase');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al intentar registrar la clase');
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => onHide()}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.form}>
                        <View style={styles.closeBtn}>
                            <Pressable onPress={() => onHide()}>
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                        </View>
                        <Text style={styles.h1}>Registro de clase</Text>
                        <TextInput style={styles.txtIpt} placeholder='Nombre' onChangeText={setNombre} />


                        <Pressable style={styles.addBtn} onPress={handleSubmit}>
                            <Text style={styles.addTxtBtn}>Agregar Clase</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        width: '95%',
        borderRadius: 10,
        marginTop: 40
    },
    closeBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    form: {
        margin: 5
    },
    txtIpt: {
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 18,
        padding: 10,
        margin: 5
    },
    h1: {
        fontSize: 20,
        margin: 10
    },
    addBtn: {
        backgroundColor: '#3498db',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    addTxtBtn: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
});

export default ModalAddClass;
