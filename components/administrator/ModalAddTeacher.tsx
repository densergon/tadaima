import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

interface ModalProps {
    visible: boolean,
    onHide: () => void,
    getTeachers: () => void
}
const ModalAddTeacher = ({ visible, onHide, getTeachers }: ModalProps) => {
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleSubmit = async () => {
        if (password !== verifyPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        const teacherData = {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            email,
            password,
        };

        try {
            console.log(teacherData)
            const response = await axios.post('http://192.168.3.19:3000/api/teachers', teacherData);
            if (response.data.message === 'Usuario registrado') {
                Alert.alert('Exito', 'Profesor registrado correctamente');
                getTeachers()
                onHide(); // Cerrar el modal después de un registro exitoso
            } else {
                Alert.alert('Error', 'No se pudo registrar el profesor');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al intentar registrar al profesor');
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
                        <Text style={styles.h1}>Registro de profesor</Text>
                        <TextInput style={styles.txtIpt} placeholder='Nombre' onChangeText={setNombre} />
                        <TextInput style={styles.txtIpt} placeholder='Apellido Paterno' onChangeText={setApellidoPaterno} />
                        <TextInput style={styles.txtIpt} placeholder='Apellido Materno' onChangeText={setApellidoMaterno} />
                        <TextInput style={styles.txtIpt} placeholder='Correo Electronico' onChangeText={setEmail} />
                        <TextInput style={styles.txtIpt} placeholder='Contraseña' onChangeText={setPassword} secureTextEntry />
                        <TextInput style={styles.txtIpt} placeholder='Verificar Contraseña' onChangeText={setVerifyPassword} secureTextEntry />
                        <Pressable style={styles.addBtn} onPress={handleSubmit}>
                            <Text style={styles.addTxtBtn}>Agregar Profesor</Text>
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

export default ModalAddTeacher;
