
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFViewer = () => {
    const source = { uri: 'https://my-hosted-content-19d.s3.us-west-1.amazonaws.com/Material+Ejemplo.pdf', cache: false };

    return (
        <View style={styles.container}>
            <Pdf
                trustAllCerts={false}
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
        </View>
    )

}

export default PDFViewer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
    },
    pdf: {
        flex: 1,
        width: '100%'
    }
});