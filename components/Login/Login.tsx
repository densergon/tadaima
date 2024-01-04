import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text, Image } from "@rneui/themed";
import LoginForm from "./LoginForm";
import { styles } from "../../styles/Login.styles";
import Img from '../../assets/img/hollowprofile.jpg'

const LoginScreen = () => {

  return (
    <ScrollView>
      <Image source={Img} style={styles.image} />
      <View style={styles.content}>
        <LoginForm />
      </View>
    </ScrollView>
  )
}
export default LoginScreen