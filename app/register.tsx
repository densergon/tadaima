import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { RegisterScreen } from '../components/Register/Register'

const registerPage = () => {
    return (
        <>
            <StatusBar style='auto' />
            <RegisterScreen />
        </>
    )
}

export default registerPage