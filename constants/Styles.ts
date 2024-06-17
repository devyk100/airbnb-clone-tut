import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
    body: {
        backgroundColor: "#FDFFFF",
    },
    container: {
        padding: 10,
        flex: 1,
        fontFamily: "mon"
    },
    btn:{
        backgroundColor: Colors.primary,
        width: "auto",
        height: 50,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "mon",
        marginHorizontal: 20
    },
    inputField: {
        marginHorizontal: 20,
        margin: 5,
        padding:10,
        fontFamily: "mon",
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#ABABAB",
        backgroundColor: "#fff",
        borderRadius: 8
    },
    btnText: {
        fontFamily: "mon-sb",
        fontSize: 16,
        color: "#fff"
    },
    btnOutline: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
        marginHorizontal: 20
    },
    btnOutlineText: {
        fontFamily: "mon-sb",
        fontSize: 16,
        color: "#000"
    }
})