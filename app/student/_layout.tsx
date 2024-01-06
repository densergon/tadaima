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
                name="mycourses" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Mis cursos',
                    title: 'Mis cursos',
                }} />
            <Drawer.Screen
                name="homeworks" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Tareas',
                    title: 'Tareas',
                }} />
            <Drawer.Screen
                name="chat" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: 'Chats',
                    title: 'Chats',
                }} />
            <Drawer.Screen
                name="homework/[id]" // This is the name of the page and must match the url from root
                options={{
                    drawerItemStyle: {
                        height: 0
                    },
                    title: ''
                }} />
            <Drawer.Screen
                name="courses/[id]" // This is the name of the page and must match the url from root
                options={{
                    drawerItemStyle: {
                        height: 0
                    },
                    title: ''
                }} />
            <Drawer.Screen
                name="courseHomeworks/[id]" // This is the name of the page and must match the url from root
                options={{
                    drawerItemStyle: {
                        height: 0
                    },
                    title: ''
                }} />
            <Drawer.Screen
                name="materiales/[id]" // This is the name of the page and must match the url from root
                options={{
                    drawerItemStyle: {
                        height: 0
                    },
                    title: ''
                }} />
        </Drawer>
    )
}

export default _layout