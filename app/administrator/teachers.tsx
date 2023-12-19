import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const Page = () => {
    return (
        <View>
            <View style={styles.btnContainer}>
                <Pressable style={styles.btn}>
                    <Text style={styles.txtBtn}>Dar de alta profesor</Text>
                </Pressable>
            </View>
            <ScrollView>
                <View>
                    <Text>Profesor A</Text>
                </View>
                <View>
                    <Text>Profesor B</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Page

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
        margin: 10
    },
    txtBtn: {
        color: 'white',
        fontSize: 18
    }
})