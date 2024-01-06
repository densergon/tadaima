import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import { useAuthStore } from '../../components/auth/authStore';
import { Link } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import ModalAddClass from '../../components/teacher/ModalAddClass';
import { Feather } from '@expo/vector-icons';


interface Clase {
    curso: string,
    idCurso: number
}
const Page = () => {
    const [clases, setClases] = useState<Clase[]>([]);
    const [visible, setVisible] = useState(false);
    const idProfesor = useAuthStore.getState().user?.id_usuario;
    const focused = useIsFocused()
    const fetchClases = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/classes/all/${idProfesor}`);
            setClases(response.data);
        } catch (error) {
            console.error('Error al obtener las clases:', error);
        }
    };

    const deleteClass = async (id: number) => {
        await axios.delete(`http://192.168.3.9:3000/api/classes/${id}`)
        fetchClases()
    }

    useEffect(() => {
        fetchClases();
    }, [focused]);


    return (
        <ScrollView>
            <View>
                <Pressable style={style.btn} onPress={() => setVisible(true)}>
                    <Text style={style.btnTxt}>Agregar clase</Text>
                    <AntDesign name="pluscircleo" size={22} color="white" />
                </Pressable>
            </View>
            <View>
                {clases.map((clase: Clase) => (
                    <View key={clase.idCurso} style={style.class}>
                        <Link href={{
                            pathname: "/teacher/clases/[id]",
                            params: { id: clase.idCurso }
                        }} asChild >
                            <Pressable>
                                <Text style={style.p}>{clase.curso}</Text>
                            </Pressable>
                        </Link>
                        <View style={style.btnSpan}>
                            <Pressable style={style.editBtn}>
                                <Feather name="edit" size={22} color="white" />
                            </Pressable>

                            <Pressable style={style.deleteBtn} onPress={() => deleteClass(clase.idCurso)}>
                                <Feather name="trash" size={22} color="white" />
                            </Pressable>
                        </View>
                    </View>
                ))}
            </View>
            <ModalAddClass visible={visible} onHide={() => setVisible(false)} getClasses={() => fetchClases()} />
        </ScrollView>
    );
};

export default Page;

const style = StyleSheet.create({
    class: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    p: {
        fontSize: 20
    },
    btnSpan: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    btn: {
        padding: 15,
        backgroundColor: '#3498db',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    editBtn: {
        backgroundColor: '#f1c40f',
        padding: 8,
        borderRadius: 10
    },
    editBtnTxt: {
        color: 'white',
        fontSize: 18
    },
    deleteBtn: {
        backgroundColor: '#e74c3c',
        padding: 8,
        borderRadius: 10
    }
})
