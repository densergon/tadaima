import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Pressable, Platform } from "react-native";
import { Icon } from "@rneui/themed";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/LoginForm.styles";
import axios, { formToJSON } from "axios";
import { Link, router } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from 'expo-web-browser'
import { useAuthStore } from "../auth/authStore";

interface FacebookResponse {
  type: string;
  authentication?: {
    accessToken: string;
  };
}

interface FacebookUserData {
  id: string;
  email?: string;
  name: string;
}

interface YourComponentProps {
  response: FacebookResponse;
  setUser: (user: FacebookUserData) => void;
}
WebBrowser.maybeCompleteAuthSession()
const LoginForm = () => {
  const [user, setUser] = useState<FacebookUserData | null>(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '266422566409025'
  })

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      (async () => {
        if (response.authentication?.accessToken != null) {
          try {
            const url = `https://graph.facebook.com/v13.0/me?fields=id,email,name&access_token=${response.authentication.accessToken}`;
            const respuestaFacebook = await axios.get<FacebookUserData>(url);
            console.log(respuestaFacebook.data);
            setUser(respuestaFacebook.data);
          } catch (error) {
            console.error('Error al obtener datos de Facebook:', error);
            // Manejar el error adecuadamente
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
  const navigation = useNavigation();

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
          method: 'local'
        });
        useAuthStore.setState({ isAuthenticated: true });

        // Redirigir al usuario según su rol
        switch (data.rol) {
          case 0:
            router.replace('/administrator/');
            break;
          case 1:
            router.replace('/teacher/');
            break;
          case 2:
            router.replace('/student/');
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

