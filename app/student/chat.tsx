import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/Chats.styles'

const Page = () => {
    return (
        <ScrollView>
            <View style={styles.searchBox}>
                <TextInput style={styles.txtIpt} />
                <Pressable style={styles.searchBtn}>
                    <Ionicons name="search" size={24} color="black" />
                </Pressable>
            </View>
            <View>
                <Text style={styles.h2}>Chats anteriores</Text>
            </View>
            <View>
                <View>
                    <Text>Pedro</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Page