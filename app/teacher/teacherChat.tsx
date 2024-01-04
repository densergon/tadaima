import { View, Text, ScrollView, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {

    return (
        <ScrollView style={style.container}>
            <Link href={{
                pathname: "/teacher/tchat/[id]",
                params: { id: 1 }
            }} asChild>
                <Pressable style={style.item}>
                    <View style={style.itemHeader}>
                        <Text style={style.itemPerson}>Pedro Armendariz</Text>
                        <Text style={style.time}>10:12</Text>
                    </View>
                    <Text style={style.message}>Ahorita se lo mando profe</Text>
                </Pressable>
            </Link>
            <View style={style.item}>
                <View style={style.itemHeader}>
                    <Text style={style.itemPerson}>Diego Luna</Text>
                    <Text style={style.time}>8:11</Text>
                </View>
                <Text style={style.message}>Si profe</Text>
            </View>
        </ScrollView>
    )
}

export default Page

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'column',
        gap: 5
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemPerson: {
        fontWeight: '500',
        fontSize: 18
    },
    time: {
        color: '#95a5a6'
    },
    message: {
        color: '#7f8c8d'
    }

})