import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Page = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Administrador</Text>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    h1: {
        fontSize: 22
    }
})