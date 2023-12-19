import React from 'react'
import { Drawer } from 'expo-router/drawer';

const _layout = () => {
    return (
        <Drawer >
            <Drawer.Screen
                name="index" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Home',
                    title: '',
                }} />
            <Drawer.Screen
                name="manageHomeworks" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Tareas',
                    title: 'Tareas',
                }} />
        </Drawer>
    )
}

export default _layout