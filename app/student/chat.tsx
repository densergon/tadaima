import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from '../../styles/Chats.styles'

const Page = () => {
    return (
        <ScrollView>
            <View>
                <View style={styles.chatItem}>
                    <Text style={styles.person}>Pedro</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Page

