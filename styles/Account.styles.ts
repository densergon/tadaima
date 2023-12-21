import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10
    },
    h1: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        margin: 20
    },
    header: {
        width: '100%',
        flexDirection: 'row'
    },
    icon: {
        margin: 20
    },
    box: {
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    dataContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    p: {
        fontSize: 18
    },
    red: {
        color: '#e74c3c',
        fontWeight: '500'
    }
})