import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { styles } from "../../styles/LoginForm.styles";
import { Input, Icon, Button } from "@rneui/themed";

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={styles.content}>
            <View style={styles.box}>
                <Icon
                    type="material-community"
                    name="account"
                    iconStyle={styles.icon}
                />
                <TextInput
                    placeholder="Nombre"
                    style={styles.input}
                    onChangeText={() => { }}
                />
            </View>

            <View style={styles.box}>
                <Icon
                    type="material-community"
                    name="account"
                    iconStyle={styles.icon}
                />
                <TextInput
                    placeholder="Boleta"
                    style={styles.input}
                    onChangeText={() => { }}
                />
            </View>
            <View style={styles.box}>
                <Icon type="material-community" name="at" iconStyle={styles.icon} />
                <TextInput
                    placeholder="Correo Electronico"
                    style={styles.input}
                    onChangeText={() => { }}
                />
            </View>

            <View style={styles.box}>
                <Pressable
                    onPress={() => setShowPassword(showPassword!)}>
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                    />
                </Pressable>
                <TextInput
                    placeholder="Contraseña"
                    style={styles.input}
                    secureTextEntry={showPassword ? false : true}
                    onChangeText={() => { }}
                />
            </View>

            <View style={styles.box}>
                <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(showPassword!)}
                />
                <TextInput
                    placeholder="Repetir Contraseña"
                    style={styles.input}
                    secureTextEntry={showPassword ? false : true}
                    onChangeText={() => { }}
                />
            </View>

            <View style={styles.btnContainer}>
                <Pressable onPress={() => { }} style={styles.btn} >
                    <Text>Crear Sesion</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default RegisterForm