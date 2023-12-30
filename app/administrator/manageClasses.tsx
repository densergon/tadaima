import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import ModalAddClass from '../../components/administrator/ModalAddClass';


interface Clasess {
    idClases: number,
    asignatura: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string
}
const Page = () => {

    const [classes, setClasses] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [id, setId] = useState<number | null>(null)

    const getClasses = async () => {
        const response = await axios.get('http://192.168.3.9:3000/api/classes');
        setClasses(response.data)
    }

    const deleteClase = async (idClases: number) => {
        console.log(idClases)
        const result = await axios.delete('http://192.168.3.9:3000/api/classes/' + idClases)
        if (result.data.status == 200) {
            getClasses()
        }
    }

    useEffect(() => {
        getClasses()
    }, []);
    return (
        <View>
            <ModalAddClass visible={visible} onHide={() => setVisible(false)} getClasses={() => getClasses()} />
            <View style={styles.btnContainer}>
                <Pressable style={styles.btn} onPress={() => setVisible(true)}>
                    <Text style={styles.txtBtn}>Dar de alta Clase</Text>
                    <Entypo name="plus" size={24} color="white" />
                </Pressable>
            </View>
            <ScrollView>
                {classes.map((clase: Clasess, index) => (
                    <View key={index}>
                        <View style={styles.teacherBtn}>
                            <Pressable>
                                <Text style={styles.teacherTxtBtn}>{`${clase.asignatura}`}</Text>
                            </Pressable>
                            <View style={styles.span}>
                                <Pressable style={styles.editBtn} onPress={() => {
                                    setId(clase.idClases)
                                    setVisible2(true)
                                }}>
                                    <Text style={styles.editTxtBtn}>Editar</Text>
                                </Pressable>
                                <Pressable style={styles.deleteBtn} onPress={() => {
                                    deleteClase(clase.idClases)
                                    getClasses()
                                }}>
                                    <Text style={styles.deleteTxtBtn}>Eliminar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Page;
const styles = StyleSheet.create({
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end'
    },
    btn: {
        backgroundColor: '#3498db',
        width: 200,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        flexDirection: 'row',
        gap: 5,
    },
    txtBtn: {
        color: 'white',
        fontSize: 18
    },
    teacherBtn: {
        backgroundColor: 'white',
        padding: 10,
        margin: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    teacherTxtBtn: {
        fontSize: 18
    },
    editBtn: {
        backgroundColor: '#f1c40f',
        padding: 5
    },
    editTxtBtn: {
        fontSize: 16,
        fontWeight: '500'
    },
    deleteBtn: {
        backgroundColor: '#e74c3c',
        padding: 5
    },
    deleteTxtBtn: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    },
    span: {
        flexDirection: 'row',
        gap: 5
    }
})