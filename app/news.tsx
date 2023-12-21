import React from "react";
import { View, Text, Platform } from "react-native"; // Importa Platform
import { WebView } from "react-native-webview";
import { FacebookProvider, Page } from "react-facebook";

const facebookAppId = "720324572856305"; // Reemplaza con tu App ID de Facebook
const pageUrl = "https://www.facebook.com/escomipnmx"; // Reemplaza con la URL de la página de Facebook

const facebookUrl = "https://www.facebook.com/escomipnmx";

const LoginPage = () => {
    if (Platform.OS === "web") {
        // En un entorno web, usa elementos HTML
        return (
            <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FacebookProvider appId={facebookAppId}>
                    <Page href={pageUrl} tabs="timeline" style={{ width: "100%", height: '100vh' }} />
                </FacebookProvider>
            </div>

        );
    } else {
        // En React Native, usa componentes específicos de React Native
        return (
            <WebView
                source={{ uri: facebookUrl }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}
                mixedContentMode="compatibility"
                originWhitelist={['*']}
                userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"
                onError={(error) => console.error('Error en WebView: ', error)}
            />
        );
    }
}
export default LoginPage