import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import Toast from "react-native-toast-message";
import { styles } from "../../styles/LoginForm.styles";
import axios from "axios";
import { router } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from 'expo-web-browser'
import { useAuthStore } from "../auth/authStore";
import * as Linking from 'expo-linking';

interface FacebookUserData {
  id: string;
  name: string;
}

WebBrowser.maybeCompleteAuthSession()
const LoginForm = () => {
  const [user, setUser] = useState<FacebookUserData | null>(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '266422566409025',
    redirectUri: Linking.createURL('expo-auth-session', { scheme: 'tadaima' })
  })

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        if (response.authentication) {

          const userInfoResponse = await fetch(
            `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name`
          );
          const userInfo = await userInfoResponse.json();
          setUser(userInfo);
          console.log(JSON.stringify(response, null, 2));
        }
      })();
    }
  }, [response]);


  const handleFb = async () => {
    const result = await promptAsync();

    console.log(result)
    if (result.type !== "success") {
      alert('Something went wrong')
      return;
    } else if (result.type == "success") {
      const result = await axios.put('')
      console.log(result)
      router.replace('/student/');
    }
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onShowHidePassword = () => setShowPassword(!showPassword);

  const onSubmit = async () => {
    try {
      const { data } = await axios.post("http://192.168.3.9:3000/api/auth", { email, password });

      // Si la autenticación es exitosa y recibimos un token del backend
      if (data.token) {
        // Actualizar el estado global usando Zustand
        useAuthStore.getState().login({
          email: data.email,
          authToken: data.token,
          tipo_usuario: data.rol,
          method: 'local',
          id_usuario: data.idUsuario,
          name: data.name,
          boleta: data.boleta
        });

        // Redirigir al usuario según su rol
        switch (data.rol) {
          case 1:
            router.replace('/administrator/');
            break;
          case 2:
            router.replace('/teacher/');
            break;
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Usuario o contraseña incorrectos",
      });
    }
  };

  const auth = useAuthStore().isAuthenticated

  return (
    <View style={styles.content}>

      <View style={styles.box}>
        <TextInput
          style={styles.input}
          placeholder="Correo Electronico"
          onChangeText={setEmail}
          underlineColorAndroid="transparent"
        />
        <Icon type="material-community" name="at" iconStyle={styles.icon} />
      </View>

      <View style={styles.box}>
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={onShowHidePassword}>
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
          />
        </Pressable>
      </View>

      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btn}
          onPress={onSubmit}
        >
          <Text style={styles.txtBtn}>Iniciar Sesion</Text>
        </Pressable>
        <View style={styles.btnContainer}>
          <Pressable style={styles.fbBtn} onPress={handleFb}>
            <Text style={styles.fbTxt}>Iniciar Sesión con Facebook</Text>
            <Entypo name="facebook" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;

