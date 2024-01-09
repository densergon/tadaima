import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

const Page = () => {
    // Datos de ejemplo
    const tarea = {
        nombre: "Tarea de Historia",
        descripcion: "Leer el libro y hacer un resumen",
        fechaEntrega: "2024-01-15",
        uriPdf: "https://www.sev.gob.mx/clasesdesdecasa/documentos/c8cf01c83fcd163f06e727cabcff90ac100-a%C3%B1os-de-soledad-Gabriel-Garc%C3%ADa-Marquez.pdf"
    };

    const onCalificarPress = () => {
        // Acciones para calificar
        console.log("Calificar");
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Nombre de la tarea: {tarea.nombre}</Text>
                <Text>Descripción: {tarea.descripcion}</Text>
                <Text>Fecha de entrega: {tarea.fechaEntrega}</Text>
                <Button title="Calificar" onPress={onCalificarPress} />
            </View>
            <Pdf
                source={{ uri: tarea.uriPdf }}
                style={styles.pdf}
                onError={(error) => {
                    console.log(error);
                }}
            />
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
