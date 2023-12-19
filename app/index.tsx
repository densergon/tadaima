import { View, Text, Linking } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'
import FloatingButton from '../components/FloatingButton';
import Img from '../assets/img/Messenger_logo.png'


const Page = () => {
    const openMessenger = () => {
        Linking.openURL('https://www.messenger.com/t/147090621829895');
    };
    return (
        <View style={{ marginTop: Constants.statusBarHeight, height: '100%' }}>
            <Text>index</Text>
            <FloatingButton onPress={openMessenger} imageSource={Img} />
        </View>
    )
}

export default Page