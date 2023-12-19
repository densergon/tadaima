import React from 'react';
import { ScrollView, View } from 'react-native';
import { Image } from "@rneui/themed";
import { styles } from "../../styles/Register.styles";
import Img from '../../assets/img/hollowregister.jpg'
import RegisterForm from './RegisterForm';

export function RegisterScreen() {
    return (
        <ScrollView>
            <Image source={Img} style={styles.image} />
            <View style={styles.content}>
                <RegisterForm />
            </View>
        </ScrollView>
    );
}