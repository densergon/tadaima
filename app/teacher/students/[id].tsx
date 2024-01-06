import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import ModalAddStudent from '../../../components/teacher/ModalAddStudent'

interface Student {
    boleta: string,
    nombre: string
}

const Page = () => {
    const { id } = useLocalSearchParams()
    const [students, setStudents] = useState<Array<Student>>([]);
    const [visible, setVisible] = useState(false)

    const getStudents = async () => {
        const response = await axios.get(`http://192.168.3.9:3000/api/students/curso/${id}`)
        setStudents(response.data)
    }
    useEffect(() => {
        getStudents()
    }, [])

    return (
        <View style={styles.container}>
            <ModalAddStudent visible={visible} onHide={() => setVisible(false)} getStudents={() => getStudents()} />
            <View>
                <Pressable style={styles.btnAddStudent} onPress={() => setVisible(true)}>
                    <Text style={styles.btnTxt}>Inscribir alumno</Text>
                </Pressable>
            </View>
            <View>
                {
                    students.map((student) => (
                        <Pressable key={student.boleta} style={styles.item}>
                            <Text style={styles.itemTxt}>{student.nombre}</Text>
                            <Text style={styles.itemTxt}>{student.boleta}</Text>
                        </Pressable>
                    ))
                }
            </View>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    btnAddStudent: {
        backgroundColor: '#3498db',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
    item: {
        backgroundColor: '#FFF',
        padding: 10
    },
    itemTxt: {
        fontSize: 18
    }
})