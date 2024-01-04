
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFViewer = () => {
    const source = { uri: 'https://www.imprentanacional.go.cr/editorialdigital/libros/literatura%20infantil/el_principito_edincr.pdf', cache: true };

    return (
        <View style={styles.container}>
            <Pdf
                trustAllCerts={true}
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