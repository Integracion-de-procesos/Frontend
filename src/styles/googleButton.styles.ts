import { StyleSheet } from "react-native";

export const googleStyles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 1
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
    },
    text: {
        fontSize: 14,
        fontWeight: "bold"
    },
    error: {
        color: "red", marginTop: 10
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode: "contain",
    },
});