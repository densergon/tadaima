import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthStore } from '../components/auth/authStore'
import { router } from 'expo-router'

const Page = () => {
    const user = useAuthStore.getState().user
    useEffect(() => {
        if (user?.tipo_usuario == 2) {
            router.replace('/student/')
        }
    }, [])
    return (
        <></>
    )
}

export default Page