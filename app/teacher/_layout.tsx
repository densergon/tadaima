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
                name="manageClasses" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Clases',
                    title: 'Mis clases',
                }} />
            <Drawer.Screen
                name="teacherChat" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Chat',
                    title: 'Chat',
                }} />
            <Drawer.Screen
                name="clases/[id]" // This is the name of the page and must match the url from root
                options={{
                    drawerItemStyle: {
                        height: 0
                    },
                    title: ''
                }}
            />
            <Drawer.Screen
                name="manageHomeworks/[id]" // This is the name of the page and must match the url from root
                options={{
                    drawerItemStyle: {
                        height: 0
                    },
                    title: ''
                }}
            />
            <Drawer.Screen
                name="manageMateriales/[id]" // This is the name of the page and must match the url from root
                options={{
                    drawerItemStyle: {
                        height: 0
                    },
                    title: ''
                }}
            />
        </Drawer>
    )
}

export default _layout