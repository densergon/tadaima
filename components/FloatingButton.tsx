import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface props {
    onPress: () => void,
    imageSource: ImageSourcePropType
}

const FloatingButton = ({ onPress, imageSource }: props) => {
    return (
        <SafeAreaView style={styles.floatingButtonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.floatingButton}>
                <Image source={imageSource} style={styles.buttonImage} />
                <Text >Soporte</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,// Un poco de margen desde el fondo
    },
    floatingButton: {
        width: 90, // Ancho del botón
        backgroundColor: 'clear', // Color de fondo
        borderRadius: 30, // Bordes redondeados
        padding: 10, // Relleno interno,
        paddingBottom: 30,
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonImage: {
        width: 60, // Ajusta el ancho según tus necesidades
        height: 60, // Ajusta la altura según tus necesidades
        resizeMode: 'contain', // Esto asegura que la imagen se escale correctamente
    }
});

export default FloatingButton;