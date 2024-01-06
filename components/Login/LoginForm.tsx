import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import Toast from "react-native-toast-message";
import { styles } from "../../styles/LoginForm.styles";
import axios from "axios";
import { Link, router } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from "expo-auth-session";
import { useAuthStore } from "../auth/authStore";


interface FacebookUserData {
  id: string;
  name: string;
}

WebBrowser.maybeCompleteAuthSession();



const LoginForm = () => {
  const [user, setUser] = useState<FacebookUserData | null>(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '266422566409025'
  })

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        if (response.authentication) {
          const userInfoResponse = await fetch(
            `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,email`
          );
          const userInfo = await userInfoResponse.json();
          const userAccessData = {
            token: response.authentication.accessToken,
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email
          }
          const result = await axios.post("http://192.168.3.9:3000/api/auth/facebook", userAccessData);
          if (result.status == 200) {
            const data = result.data;
            if (result.data.token) {
              // Actualizar el estado global usando Zustand
              useAuthStore.getState().login({
                email: data.email,
                authToken: data.token,
                tipo_usuario: data.rol,
                id_usuario: data.idUsuario,
                name: data.name
              });


            }
          }

        }
      })();
    }
  }, [response]);


  const handleFb = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert('Something went wrong')
      return;
    }
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onShowHidePassword = () => setShowPassword(!showPassword);

  const onSubmit = async () => {
    try {
      const { data } = await axios.post("http://192.168.3.9:3000/api/auth/custom", { email, password });
      // Si la autenticación es exitosa y recibimos un token del backend
      if (data.token) {
        // Actualizar el estado global usando Zustand
        useAuthStore.getState().login({
          email: data.email,
          authToken: data.token,
          tipo_usuario: data.rol,
          id_usuario: data.idUsuario,
          name: data.name
        });


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
  const userAuth = useAuthStore().user;

  useEffect(() => {
    if (auth) {
      // Redirigir al usuario según su rol
      switch (userAuth?.tipo_usuario) {
        case 1:
          router.replace('/administrator/');
          break;
        case 2:
          router.replace('/teacher/');
          break;
        case 3:
          router.replace('/student/');
          break;
      }
    }
  }, [auth])

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

