import { Tabs, router } from 'expo-router'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

const _layout = () => {
    const back = () => {
        router.push('/profile');
    }
    return (
        <Tabs >
            <Tabs.Screen name='index' options={{
                title: 'Pagina Principal',
                tabBarIcon: () => <AntDesign name="home" size={24} color="black"
                />
            }} />
            <Tabs.Screen name='teacher' options={{
                href: null,
                headerShown: false,
            }} />
            <Tabs.Screen name='[...missing]' options={{
                href: null,
                headerShown: false,

            }} />
            <Tabs.Screen name='register' options={{
                title: 'Registro',
                href: null,
                headerLeft: () => <>
                    <View style={{ margin: 10 }}>
                        <Pressable onPress={back}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </Pressable>
                    </View></>
            }} />
            <Tabs.Screen name='news' options={{
                title: 'Noticias',
                headerShown: false,
                tabBarIcon: () => <Entypo name="news" size={24} color="black" />
            }} />
            <Tabs.Screen name='profile' options={{
                title: 'Perfil',
                tabBarIcon: () => <FontAwesome name="user-circle-o" size={24} color="black" />,
                headerShown: false
            }} />
            <Tabs.Screen name='student' options={{
                headerShown: false,
                href: null,
            }} />
            <Tabs.Screen name='administrator' options={{
                headerShown: false,
                href: null,
            }} />
        </Tabs>
    )
}

export default _layout