import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ModalCalificar from '../../../components/teacher/ModalCalificar';
//import Pdf from 'react-native-pdf';
interface Entregada {
    calificacion: number | null,
    delivered: string,
    idAlumno: string,
    idEntregadas: number,
    idTareanumber: number,
    uri: null
}
const Page = () => {
    const { id } = useLocalSearchParams();
    const focused = useIsFocused()
    const [entregada, setEntregada] = useState<Entregada | null>(null);
    const [visible, setVisible] = useState(false)
    // Datos de ejemplo
    const getDelivered = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/delivered/one/${id}`);
            setEntregada(response.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const onCalificarPress = () => {
        setVisible(true)
    };

    useEffect(() => {
        getDelivered()
    }, [focused])

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>calificacion:</Text>
                {entregada ? <Text>{entregada.calificacion}</Text> : <Text>h</Text>}
                <Button title="Calificar" onPress={onCalificarPress} />
            </View>
            {/*<Pdf
                source={{ uri: tarea.uriPdf }}
                style={styles.pdf}
                onError={(error) => {
                    console.log(error);
                }}
            />*/}
            <ModalCalificar visible={visible} onHide={() => setVisible(false)} getEntregada={() => getDelivered()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    infoContainer: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pdf: {
        flex: 1,
        width: '100%',
    }
});

export default Page;
