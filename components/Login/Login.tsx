import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text, Image } from "@rneui/themed";
import LoginForm from "./LoginForm";
import { styles } from "../../styles/Login.styles";
import Img from '../../assets/img/hollowprofile.jpg'
import { Link } from 'expo-router';

const LoginScreen = () => {

  return (
    <ScrollView>
      <Image source={Img} style={styles.image} />
      <View style={styles.content}>
        <LoginForm />
        <View style={styles.txtContainer}>
          <Text style={styles.textRegister}>
            ¿Aun no tienes cuenta?
          </Text>
          <Link href='/register' asChild >
            <Pressable >
              <Text style={styles.textregist}>Regístrarse</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  )
}
export default LoginScreen