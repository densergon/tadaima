import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import PDFViewer from '../../../components/PDFViewer'

const Page = () => {
    const { id } = useLocalSearchParams()
    return (
        <PDFViewer />
    )
}

export default Page