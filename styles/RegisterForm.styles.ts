import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    box: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5
    },
    input: {
        width: "90%",
        padding: 10,
        fontSize: 18,
    },
    icon: {
        color: "#c1c1c1",
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
    },
    picker: {
        color: 'black'
    }
});