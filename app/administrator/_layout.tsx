import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer'

const _layout = () => {
    return (
        <Drawer>
            <Drawer.Screen
                name="index" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Inicio',
                    title: 'Inicio',
                }} />
            <Drawer.Screen
                name="teachers" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Profesores',
                    title: 'Profesores',
                }} />
            <Drawer.Screen
                name="manageClasses" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Clases',
                    title: 'Clases',
                }} />
        </Drawer>
    )
}

export default _layout