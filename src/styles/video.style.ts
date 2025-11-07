import { StyleSheet } from "react-native";

export const videoStyles = StyleSheet.create({
    container: {
        width: "100%",
        overflow: "hidden",
        marginBottom: 20,
    },
    miniatura: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
        gap: 10,
    },
    canalImagen: {
        width: 42,
        height: 42,
    },
    textContainer: {
        flex: 1,
        flexShrink: 1,
    },
    titulo: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 3,
    },
    metadatos: {
        fontSize: 13,
    },
});
