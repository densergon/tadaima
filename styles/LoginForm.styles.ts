import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 2
    },
    input: {
        width: "70%",
        margin: 10,
        fontSize: 18
    },
    icon: {
        color: "#c1c1c1",
        marginRight: 20
    },
    btnContainer: {
        marginTop: 20,
        width: "90%",
        alignItems: 'center'
    },
    btn: {
        backgroundColor: "#800080",
        width: 150,
        padding: 10,
        borderRadius: 10,
        margin: 10

    },
    txtBtn: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    fbBtn: {
        backgroundColor: '#4267B2',
        flexDirection: 'row',
        padding: 10,
        margin: 5,
        gap: 10,
        borderRadius: 10
    },
    fbTxt: {
        color: 'white',
        textAlign: 'center'
    }
});