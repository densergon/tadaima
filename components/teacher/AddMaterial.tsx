import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import AWS from 'aws-sdk';
import DocumentPicker from 'react-native-document-picker'
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';




AWS.config.update({
    accessKeyId: 'AKIAVLK4GWAQNUPFWUWE',
    secretAccessKey: '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',
    region: 'us-west-1'
})
/**
 * Funcion que convierte un archivo de una url a blob (binario)
 * @param {string} uri 
 * @returns {Promise}
 */
export function uriToBlob(uri: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // If successful -> return with blob
        xhr.onload = function () {
            resolve(xhr.response);
        };

        // reject on error
        xhr.onerror = function () {
            reject(new Error('uriToBlob failed'));
        };

        // Set the response type to 'blob' - this means the server's response 
        // will be accessed as a binary object
        xhr.responseType = 'blob';

        // Initialize the request. The third argument set to 'true' denotes 
        // that the request is asynchronous
        xhr.open('GET', uri, true);

        // Send the request. The 'null' argument means that no body content is given for the request
        xhr.send(null);
    });
};

const s3 = new AWS.S3();

const uploadFiletoS3 = async (bucketName: string, fileName: string, filePath: Blob): Promise<string> => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: filePath
    };

    const data = await s3.upload(params).promise();
    return data.Location;
};
interface Props {
    getData: () => void
}
const AddMaterial = ({ getData }: Props) => {
    const { id } = useLocalSearchParams()
    const pickFile = async () => {
        try {
            const fileDetails = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],
                copyTo: 'cachesDirectory'
            });

            const bucketName = 'my-hosted-content-19d';
            const filePath = fileDetails.uri.replace('file://', '');
            const fileName = fileDetails.name;

            if (fileName) {
                const fileData = await uriToBlob(filePath);
                const fileURL = await uploadFiletoS3(bucketName, fileName, fileData);
                console.log('File uploaded:', fileName);
                console.log('File URL:', fileURL);
                const result = await axios.post('http://192.168.3.9:3000/api/materiales', {
                    uri: fileURL,
                    curso: Number(id),
                    nombre: fileName
                })
                if (result.status == 200) {
                    Alert.alert('Agregado exitosamente');
                    getData()
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Pressable style={styles.btn} onPress={pickFile}>
            <Text style={styles.btnText}>Agregar Material</Text>
            <AntDesign name="pluscircleo" size={24} color="white" />
        </Pressable>
    )
}

export default AddMaterial

const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
        margin: 10
    },
    btn: {
        backgroundColor: '#3498db',
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    }
});