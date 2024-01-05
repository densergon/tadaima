import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
    const { id } = useLocalSearchParams()
    return (
        <View>
            <Text>showStudents {id}</Text>
        </View>
    )
}

export default Page